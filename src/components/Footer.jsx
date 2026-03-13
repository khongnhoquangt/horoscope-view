import { Sparkles, Facebook, Youtube, Twitter, Gift, ArrowRight, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <>
      {/* Newsletter Section */}
      <section className="mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-800/90 to-red-950/90 backdrop-blur-3xl" />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")`
          }} />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-600/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-sm font-medium mb-6 text-amber-100 border-white/20">
              <Gift className="w-4 h-4" />
              Miễn phí
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Nhận Lịch Vạn Niên 2026</h2>
            <p className="text-amber-100 mb-8 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              Đăng ký để nhận lịch âm dương đầy đủ, ngày giờ hoàng đạo và những bài viết phong thủy mới nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1 group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-red-400 transition-colors" />
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-neutral-900 bg-white/95 backdrop-blur-sm border border-white/30 outline-none focus:ring-4 focus:ring-white/30 text-sm placeholder:text-neutral-400 transition-all shadow-lg"
                />
              </div>
              <button className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-semibold transition-all shadow-xl text-sm whitespace-nowrap flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
                Đăng ký
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-panel rounded-2xl p-8 mt-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-700 to-amber-600 flex items-center justify-center text-white shadow-lg ring-1 ring-white/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-white">Tuvixemtuong</h3>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Nền tảng xem tử vi, phong thủy hiện đại với độ chính xác cao.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-4 text-sm">Sản phẩm</h4>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li><a href="#" className="hover:text-red-400 dark:hover:text-red-300 transition-colors">Tử vi trọn đời</a></li>
              <li><a href="#" className="hover:text-red-400 dark:hover:text-red-300 transition-colors">Xem ngày tốt</a></li>
              <li><a href="#" className="hover:text-red-400 dark:hover:text-red-300 transition-colors">Phong thủy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-4 text-sm">Công ty</h4>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li><a href="#" className="hover:text-red-400 dark:hover:text-red-300 transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-red-400 dark:hover:text-red-300 transition-colors">Liên hệ</a></li>
              <li><a href="#" className="hover:text-red-400 dark:hover:text-red-300 transition-colors">Chính sách</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-4 text-sm">Kết nối</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl glass-button flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-red-400 dark:hover:text-red-300 hover:scale-110 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass-button flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-red-400 dark:hover:text-red-300 hover:scale-110 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass-button flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-amber-400 dark:hover:text-amber-300 hover:scale-110 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-900/20 dark:border-amber-900/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <p>&copy; 2026 Tuvixemtuong.com. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </>
  )
}
