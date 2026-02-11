'use client'

import Link from 'next/link'
import { Music, Settings, LogOut, Book } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AdminNav() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/admin/audio" className="flex items-center gap-2 font-bold text-xl hover:text-blue-400 transition">
            <Music className="w-6 h-6" />
            Admin Panel
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/audio"
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <Music className="w-4 h-4" />
              Ses Yönetimi
            </Link>

            <Link
              href="/admin/literary-works"
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <Book className="w-4 h-4" />
              Şiir Yönetimi
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <Settings className="w-4 h-4" />
              Ayarlar
            </Link>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
          Çıkış
        </button>
      </div>
    </nav>
  )
}
