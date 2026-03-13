import { Search, Star, Compass, Calendar, Heart, TrendingUp, Clock } from 'lucide-react'

export default function RightSidebar() {
  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      {/* Search Widget */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Tìm kiếm</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm bài viết..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-input text-sm focus:ring-2 focus:ring-red-500/50 transition-shadow"
          />
        </div>
      </div>

      {/* Popular Tools Widget */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" /> Công cụ nổi bật
        </h3>
        <div className="space-y-3">
          <a href="#" className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/10 to-amber-500/10 flex items-center justify-center text-red-500">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-red-500 transition-colors">Lập lá số Tử Vi</h4>
              <p className="text-xs text-neutral-500">Phân tích chuyên sâu 100+</p>
            </div>
          </a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center text-blue-500">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-500 transition-colors">Xem ngày tốt xấu</h4>
              <p className="text-xs text-neutral-500">Động thổ, cưới hỏi, xuất hành</p>
            </div>
          </a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500/10 to-red-500/10 flex items-center justify-center text-rose-500">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-rose-500 transition-colors">Xem tuổi vợ chồng</h4>
              <p className="text-xs text-neutral-500">Luận giải hợp khắc</p>
            </div>
          </a>
        </div>
      </div>

      {/* Trending Articles Widget */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-red-500" /> Bài viết nổi bật
        </h3>
        <div className="space-y-4">
          <a href="#" className="flex gap-3 group">
            <div className="w-20 h-16 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 shrink-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-2 group-hover:text-red-500 transition-colors mb-1">
                Top 5 con giáp phát tài phát lộc năm 2026
              </h4>
              <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> 2 ngày trước
              </span>
            </div>
          </a>
          <a href="#" className="flex gap-3 group">
            <div className="w-20 h-16 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 shrink-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-2 group-hover:text-red-500 transition-colors mb-1">
                Cách bố trí phong thủy nhà ở đón lộc đầu năm
              </h4>
              <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> 1 tuần trước
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Categories Widget */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Danh mục</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 py-1 transition-colors">
              <span>Tử vi hàng ngày</span>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-500">24</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 py-1 transition-colors">
              <span>Phong thủy phi tinh</span>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-500">18</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 py-1 transition-colors">
              <span>Nhân tướng học</span>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-500">12</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}
