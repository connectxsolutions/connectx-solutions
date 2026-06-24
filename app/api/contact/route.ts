import { connectDB } from '@/lib/mongodb'
import { Db, Collection } from 'mongodb'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    // 1. التحقق من وجود جميع الحقول المطلوبة
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 2. حفظ الرسالة أولاً في قاعدة بيانات MongoDB
    const db: Db = await connectDB()
    const collection: Collection = db.collection('contact_messages')

    const result = await collection.insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
      read: false
    })

    // 3. إرسال إشعار فوري إلى الإيميل عبر Nodemailer
    // تأكد من إضافة EMAIL_USER و EMAIL_PASS في ملف .env.local كما شرحنا سابقاً
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // ترسل إلى إيميل الشركة
        replyTo: email, // عند الضغط على Reply يتم الرد على العميل مباشرة
        subject: `ConnectX Contact: ${subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 12px;">
            <h2 style="color: #0284c7; border-bottom: 1px solid #ddd; padding-bottom: 10px;">رسالة جديدة من الموقع</h2>
            <p><strong>الاسم:</strong> ${name}</p>
            <p><strong>البريد الإلكتروني:</strong> ${email}</p>
            <p><strong>الموضوع:</strong> ${subject}</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #0284c7;">
              <p style="white-space: pre-line; margin: 0; line-height: 1.6;">${message}</p>
            </div>
          </div>
        `,
      }

      await transporter.sendMail(mailOptions)
    } catch (mailError) {
      // قمنا بوضع كود الإيميل داخل try/catch فرعية حتى إذا حدثت مشكلة مؤقتة في خوادم الإيميل، 
      // لا يتوقف الكود بل يستمر وينجح لأن الرسالة حُفظت بالفعل في قاعدة البيانات.
      console.error('Nodemailer failed but database insert succeeded:', mailError)
    }

    // 4. إرجاع النتيجة بنجاح بعد إتمام العمليتين
    return Response.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return Response.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}