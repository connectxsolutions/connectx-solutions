'use client'

import { useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { Globe } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('LanguageSwitcher')

  const onSelectChange = (nextLocale: string) => {
    // تجنب إعادة التوجيه لو ضغط المستخدم على اللغة الحالية المفعلة بالفعل
    if (nextLocale === locale) return

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* أضفنا تغيير بسيط للمؤشر أثناء التحميل ليعرف المستخدم أن هناك عملية تتم خلف الكواليس */}
        <Button 
          variant="ghost" 
          size="sm" 
          disabled={isPending}
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t('changeLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => onSelectChange('en')}
          className={locale === 'en' ? 'font-bold' : ''}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onSelectChange('ar')}
          className={locale === 'ar' ? 'font-bold' : ''}
        >
          {t('arabic')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}