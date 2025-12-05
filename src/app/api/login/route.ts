import { NextResponse, type NextRequest } from 'next/server'

const AUTH_COOKIE_NAME = 'auth_token'

async function sha256(value: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(value)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

function validateCredentials(username: string, password: string) {
  const siteUser = process.env.SITE_USER
  const sitePass = process.env.SITE_PASSWORD
  const adminUser = process.env.ADMIN_USER
  const adminPass = process.env.ADMIN_PASSWORD

  const isAdmin = adminUser && adminPass && username === adminUser && password === adminPass
  const isSite = siteUser && sitePass && username === siteUser && password === sitePass

  if (isAdmin) return 'admin'
  if (isSite) return 'site'
  return null
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const username = (body?.username || '').trim()
    const password = (body?.password || '').trim()

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Kullanıcı adı ve şifre gerekli.' }, { status: 400 })
    }

    const role = validateCredentials(username, password)
    if (!role) {
      return NextResponse.json({ success: false, message: 'Geçersiz kullanıcı adı veya şifre.' }, { status: 401 })
    }

    const secret = process.env.AUTH_SECRET
      || process.env.SITE_PASSWORD
      || process.env.ADMIN_PASSWORD
      || 'default-secret'

    const payload = `${role}:${Date.now()}`
    const signature = await sha256(`${payload}:${secret}`)
    const token = `${payload}.${signature}`

    const response = NextResponse.json({ success: true, role })
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 gün
    })

    return response
  } catch (error) {
    console.error('Login error', error)
    return NextResponse.json({ success: false, message: 'Beklenmeyen bir hata oluştu.' }, { status: 500 })
  }
}
