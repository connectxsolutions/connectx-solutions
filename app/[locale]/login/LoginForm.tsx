"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { BrandLogo } from "@/components/brand-logo";

export default function LoginForm() {
  const t = useTranslations('Login')
  const tc = useTranslations('Common')
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError(t('invalidCredentials'));
      return;
    }

    if (result?.ok) {
      router.push(callbackUrl);
    }
  };

  const canSubmit = email.trim() !== "" && password !== "";

  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-4 flex justify-center">
            <BrandLogo className="w-48 h-12" priority />
          </div>

          <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>
          <p className="text-muted-foreground text-sm mt-2">
            {t('subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              {tc('email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={t('emailPlaceholder')}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              {tc('password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !canSubmit}
            size="lg"
            className="w-full"
          >
            {loading ? t('signingIn') : t('signIn')}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>{t('restricted')}</p>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <Link href="/" className="text-primary hover:underline text-sm">
            {tc('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
