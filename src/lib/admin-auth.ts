// Basit admin doğrulaması
// Üretimde daha güçlü bir sistem (JWT, session vb) kullanın

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export function verifyAdmin(password: string): boolean {
  if (!password) return false
  return password === ADMIN_PASSWORD
}

export function getAdminPasswordFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) return null

  // Bearer token'dan password'ünü çıkar
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null

  return parts[1]
}
