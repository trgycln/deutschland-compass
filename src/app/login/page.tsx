'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, User, ArrowRight, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo') || '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()
      if (!res.ok || !data?.success) {
        setError(data?.message || 'Giriş başarısız. Bilgileri kontrol edin.')
        return
      }

      router.push(returnTo)
    } catch (err) {
      console.error(err)
      setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-slate-200">
            <Sparkles className="h-4 w-4 text-amber-300" />
            Güvenli Erişim Katmanı
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-white">Güvenli Giriş</h1>
            <p className="text-slate-300 max-w-xl leading-relaxed">
              Topluluğun korunması için tek adımlı giriş. Paylaşılan kullanıcı adı ve şifreyi girerek tüm rehber ve içeriklere erişebilirsiniz.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2"><Shield className="h-5 w-5 text-emerald-300" /></div>
              <div>
                <p className="font-medium text-slate-100">Yetkilendirilmiş erişim</p>
                <p className="text-slate-300/80">Size verilen kullanıcı adı ve şifreyle giriş yapın.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2"><Lock className="h-5 w-5 text-sky-300" /></div>
              <div>
                <p className="font-medium text-slate-100">Kolay ve güvenli</p>
                <p className="text-slate-300/80">Tarayıcı uyarısı olmadan modern bir giriş ekranı.</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-white text-slate-900 shadow-2xl border-0">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-slate-900">Giriş Yap</CardTitle>
            <CardDescription className="text-slate-500">Paylaşılan kullanıcı adı ve şifrenizi girin.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-700">Kullanıcı Adı</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="username"
                    name="username"
                    autoComplete="username"
                    placeholder="örn. admin"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Şifre</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Şifrenizi girin"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2 border border-destructive/30">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
