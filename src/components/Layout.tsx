import { useState, useEffect, useCallback } from 'react'
import type { FC } from 'react'
import { Outlet, Link, useLocation } from '@tanstack/react-router'
import {
  Sparkles, LayoutDashboard, Star, Calendar, UserCircle, Compass,
  Heart, ChevronDown, X, Menu, Search, Sun, Moon, Bell, Crown,
  Settings, ArrowUp
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface MenuItem {
  href: string
  label: string
}

interface MenuGroup {
  id: string
  label: string
  icon: LucideIcon
  iconColor: string
  defaultOpen?: boolean
  items: MenuItem[]
  subheader?: string
  subItems?: MenuItem[]
}

const menuGroups: MenuGroup[] = [
  {
    id: 'tuvi',
    label: 'Tử Vi',
    icon: Star,
    iconColor: 'text-yellow-400',
    defaultOpen: true,
    items: [
      { href: '/lap-la-so', label: 'Lá số tử vi' },
      { href: '#', label: 'Quỷ Cốc Toán' },
      { href: '#', label: 'Tử Vi Trọn Đời' },
      { href: '#', label: 'Tử vi hàng ngày' },
    ],
    subheader: 'Học thuật',
    subItems: [
      { href: '#', label: 'Ý nghĩa các sao' },
    ],
  },
  {
    id: 'tutru',
    label: 'Tứ Trụ - Bát Tự',
    icon: Calendar,
    iconColor: 'text-red-400',
    items: [
      { href: '#', label: 'Xem Tứ Trụ' },
      { href: '#', label: 'Bát Tự Tử Bình' },
      { href: '#', label: 'Hà Lạc Lý Số' },
    ],
  },
  {
    id: 'nhan-tuong',
    label: 'Nhân Tướng',
    icon: UserCircle,
    iconColor: 'text-rose-400',
    items: [
      { href: '#', label: 'Nhân Tướng Học' },
      { href: '#', label: 'Xem tướng nốt ruồi' },
      { href: '#', label: 'Xem chữ ký' },
    ],
  },
  {
    id: 'phong-thuy',
    label: 'Phong Thủy',
    icon: Compass,
    iconColor: 'text-amber-400',
    items: [
      { href: '#', label: 'Bát Trạch Minh Cảnh' },
      { href: '#', label: 'Thước Lỗ Ban' },
      { href: '#', label: 'Chọn hướng nhà' },
    ],
  },
  {
    id: 'xem-boi',
    label: 'Xem Bói',
    icon: Sparkles,
    iconColor: 'text-red-400',
    items: [
      { href: '#', label: 'Gieo Quẻ Dịch' },
      { href: '#', label: 'Thái Ất Thần Quẻ' },
      { href: '#', label: 'Bói Bài Tarot' },
    ],
  },
  {
    id: 'xem-tuoi',
    label: 'Xem Tuổi',
    icon: Heart,
    iconColor: 'text-rose-500',
    items: [
      { href: '#', label: 'Xem tuổi vợ chồng' },
      { href: '#', label: 'Coi tuổi kết hôn' },
      { href: '#', label: 'Xem tuổi làm ăn' },
    ],
  },
]

const Layout: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ tuvi: true })
  const [showFab, setShowFab] = useState(false)
  const location = useLocation()

  // Dark mode
  useEffect(() => {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = useCallback(() => {
    const html = document.documentElement
    const body = document.body
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      html.classList.add('dark')
      body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }, [])

  const toggleMenu = useCallback((menuId: string) => {
    setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }))
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  // Close sidebar on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Keyboard shortcut for search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        ;(document.querySelector('input[type="text"]') as HTMLInputElement | null)?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const scrollToTop = useCallback(() => {
    document.querySelector('.custom-scrollbar')?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setShowFab((e.target as HTMLDivElement).scrollTop > 300)
  }, [])

  return (
    <div className="antialiased overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 glass-sidebar transform transition-transform duration-300 ease-out flex flex-col ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-amber-900/30 dark:border-amber-900/20 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-700 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-red-900/30 ring-2 ring-amber-600/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight text-amber-100 dark:text-amber-50">Tuvixemtuong</h1>
                <p className="text-[11px] text-amber-400/80 dark:text-yellow-400/80 font-medium tracking-wide uppercase">
                  Nền Tảng Tử Vi
                </p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden ml-auto p-2 rounded-xl hover:bg-white/20 dark:hover:bg-white/5 text-neutral-600 dark:text-neutral-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 space-y-1">
            {/* Dashboard */}
            <Link
              to="/"
              className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-amber-600 dark:text-yellow-500"
            >
              <LayoutDashboard className="w-[18px] h-[18px] shrink-0" />
              <span>Trang Chủ</span>
            </Link>

            {/* Menu Groups */}
            {menuGroups.map((group) => {
              const Icon = group.icon
              const isOpen = openMenus[group.id] || false
              return (
                <div key={group.id} className="menu-group">
                  <button
                    onClick={() => toggleMenu(group.id)}
                    className="sidebar-item w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-amber-600 dark:text-yellow-500 border-l-3 border-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-[18px] h-[18px] shrink-0 ${group.iconColor}`} />
                      <span>{group.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 chevron ${isOpen ? 'rotate' : ''}`} />
                  </button>
                  <div className={`submenu ${isOpen ? 'open' : ''} pl-4 pr-2 space-y-1 mt-1`}>
                    {group.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block px-4 py-2.5 text-sm text-amber-600 dark:text-yellow-500 hover:text-amber-500 dark:hover:text-yellow-400 rounded-lg hover:bg-white/15 dark:hover:bg-white/5 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                    {group.subheader && (
                      <>
                        <div className="pt-2 pb-1">
                          <span className="px-4 text-[11px] font-semibold text-amber-500/80 dark:text-yellow-500/80 uppercase tracking-wider">
                            {group.subheader}
                          </span>
                        </div>
                        {group.subItems?.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="block px-4 py-2.5 text-sm text-amber-600 dark:text-yellow-500 hover:text-amber-500 dark:hover:text-yellow-400 rounded-lg hover:bg-white/15 dark:hover:bg-white/5 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </nav>

          {/* User Profile Summary */}
          <div className="p-4 border-t border-amber-900/20 dark:border-amber-900/15 shrink-0">
            <div className="glass-card rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                  KH
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-gray-800 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">Khách</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">Đăng nhập để lưu</p>
              </div>
              <Settings className="w-4 h-4 text-neutral-400" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {/* Glass Header */}
          <header className="h-16 glass-header flex items-center justify-between px-6 lg:px-8 sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2.5 rounded-xl hover:bg-red-900/20 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 transition-colors glass-button"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search */}
              <div className="hidden md:flex items-center max-w-md w-full glass-input rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-red-500/50 transition-all shadow-sm">
                <Search className="w-4 h-4 text-neutral-400 mr-3" />
                <input
                  type="text"
                  placeholder="Tìm kiếm công cụ, bài viết..."
                  className="bg-transparent border-none outline-none text-sm w-full text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500"
                />
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium text-neutral-400 bg-white/50 dark:bg-black/20 rounded border border-neutral-200 dark:border-neutral-700">
                  ⌘K
                </kbd>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl glass-button text-neutral-600 dark:text-neutral-400 hover:text-yellow-400 dark:hover:text-amber-400 transition-colors"
                title="Chuyển chế độ sáng/tối"
              >
                <Sun className="w-5 h-5 hidden dark:block" />
                <Moon className="w-5 h-5 block dark:hidden" />
              </button>

              {/* Notifications */}
              <button className="relative p-2.5 rounded-xl glass-button text-neutral-600 dark:text-neutral-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800 animate-pulse" />
              </button>

              {/* Upgrade Button */}
              <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-red-800/25 hover:shadow-red-800/40 ring-1 ring-white/20">
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Nâng cấp Pro</span>
              </button>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 relative" onScroll={handleScroll}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <div
        className="fab"
        onClick={scrollToTop}
        title="Cuộn lên đầu trang"
        style={{
          opacity: showFab ? 1 : 0,
          transform: showFab ? 'scale(1)' : 'scale(0)',
        }}
      >
        <ArrowUp className="w-6 h-6" />
      </div>
    </div>
  )
}

export default Layout
