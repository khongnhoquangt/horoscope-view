import { useState, useEffect, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Sparkles, Facebook, ChevronDown, Check, PlusCircle,
  MessageSquareHeart, Star, Award, Quote, User,
  Compass, Calendar, Eye, Heart, BookOpen
} from 'lucide-react'
import RightSidebar from '../components/RightSidebar'
import Footer from '../components/Footer'

export default function LapLaSo() {
  const navigate = useNavigate()

  // Form state
  const [name, setName] = useState('Nguyen Van A')
  const [gender, setGender] = useState('1')
  const [calendar, setCalendar] = useState('solar')
  const [manualDate, setManualDate] = useState(false)
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [dayManual, setDayManual] = useState('')
  const [monthManual, setMonthManual] = useState('')
  const [yearManual, setYearManual] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [timezone, setTimezone] = useState('7')
  const [viewMonth, setViewMonth] = useState('')
  const [viewYear, setViewYear] = useState('')
  const [chartVisible, setChartVisible] = useState(false)

  // Generate date/time options
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const currentYear = new Date().getFullYear()
  const viewYears = Array.from({ length: 20 }, (_, i) => currentYear - 5 + i)

  const handleSubmit = (e) => {
    e.preventDefault()
    const d = manualDate ? dayManual : day
    const m = manualDate ? monthManual : month
    const y = manualDate ? yearManual : year

    navigate({
      to: '/ket-qua-la-so',
      search: {
        name,
        gender,
        d,
        m,
        y,
        cal: calendar,
        h: hour,
        min: minute,
        vy: viewYear || currentYear.toString(),
      },
    })
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <article className="flex-1 lg:max-w-[70%] animate-slide-up">
          {/* Breadcrumb */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-neutral-300 text-xs font-semibold shadow-lg">
                Tử Vi
              </span>
              <span className="text-neutral-400 dark:text-white/60">/</span>
              <span className="text-neutral-600 dark:text-white/80 text-sm font-medium">Lập Lá Số</span>
            </div>
            <h1 className="text-3xl md:text-[40px] font-bold text-red-900 dark:text-white mb-6 tracking-tight leading-[1.2]">
              Trình Lập Lá Số Tử Vi Chuyên Nghiệp
            </h1>

            {/* Intro Panel */}
            <div className="glass-panel p-6 md:p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold text-red-900 dark:text-red-300 mb-4">Giới thiệu về Lá Số Tử Vi</h2>
              <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed mb-5">
                Lá số tử vi là một biểu đồ được lập dựa trên thời điểm sinh (giờ, ngày, tháng, năm sinh theo Âm lịch) và giới tính
                của một người. Quá trình lập lá số gọi là an sao lá số tử vi, trong đó các vì sao được phân bổ vào 12 cung trên thiên bàn
                theo những quy tắc học thuật chặt chẽ.
              </p>
              <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed mb-6">
                Qua lá số tử vi, chúng ta có thể luận đoán về tính cách, hoàn cảnh, vận hạn phát triển của đời người dựa trên sự tương tác
                giữa các bộ sao nguyên thủy. Từ đó giúp quý bản mệnh có cái nhìn đa chiều về tương lai, biết chớp thời cơ phát triển và
                phòng tránh những rủi ro có thể xảy ra.
              </p>
              <a
                href="https://facebook.com/tuvixemtuong"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/30"
              >
                <Facebook className="w-4 h-4" />
                Nhận Luận Giải Lá Số Miễn Phí
              </a>
            </div>
          </div>

          {/* Form Section */}
          <div className="mb-12 animate-slide-up tuvi-context">
            <div className="glass-panel p-5 md:p-6 rounded-2xl mb-8 shadow-xl shadow-red-900/5 border border-amber-900/10 dark:border-amber-900/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white mb-3 shadow-lg shadow-red-900/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-white tracking-tight">
                  Nhập Thông Tin Lá Số
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium mt-1 mb-2">
                  Vui lòng nhập chính xác thông tin để kết quả an sao được chuẩn xác nhất
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Column 1: Basic Info */}
                  <div className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="txtName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        id="txtName"
                        placeholder="Ví dụ: Nguyễn Văn A"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full glass-input rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Ngày sinh</label>
                        <label className="flex items-center gap-1.5 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={manualDate}
                              onChange={() => setManualDate(!manualDate)}
                              className="peer sr-only"
                            />
                            <div className={`w-3.5 h-3.5 rounded border-2 transition-all flex items-center justify-center ${manualDate ? 'bg-red-600 border-red-600' : 'border-neutral-300 dark:border-neutral-600'}`}>
                              {manualDate && <Check className="w-2.5 h-2.5 text-white" />}
                            </div>
                          </div>
                          <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-red-600 dark:group-hover:text-red-400">
                            Nhập tay
                          </span>
                        </label>
                      </div>

                      {/* Select Date */}
                      {!manualDate && (
                        <div className="grid grid-cols-3 gap-2">
                          <div className="relative">
                            <select
                              value={day}
                              onChange={(e) => setDay(e.target.value)}
                              className="w-full glass-input rounded-xl px-2 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all cursor-pointer"
                            >
                              <option value="" disabled>Ngày</option>
                              {days.map((d) => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                            <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                          <div className="relative">
                            <select
                              value={month}
                              onChange={(e) => setMonth(e.target.value)}
                              className="w-full glass-input rounded-xl px-2 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all cursor-pointer"
                            >
                              <option value="" disabled>Tháng</option>
                              {months.map((m) => (
                                <option key={m} value={m}>{m}</option>
                              ))}
                            </select>
                            <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                          <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="Năm"
                            min="1900"
                            max="2100"
                            className="w-full glass-input rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                          />
                        </div>
                      )}

                      {/* Manual Date Input */}
                      {manualDate && (
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="number"
                            value={dayManual}
                            onChange={(e) => setDayManual(e.target.value)}
                            placeholder="Ngày"
                            min="1"
                            max="31"
                            required
                            className="w-full glass-input rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                          />
                          <input
                            type="number"
                            value={monthManual}
                            onChange={(e) => setMonthManual(e.target.value)}
                            placeholder="Tháng"
                            min="1"
                            max="12"
                            required
                            className="w-full glass-input rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                          />
                          <input
                            type="number"
                            value={yearManual}
                            onChange={(e) => setYearManual(e.target.value)}
                            placeholder="Năm"
                            min="1900"
                            max="2100"
                            required
                            className="w-full glass-input rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                          />
                        </div>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="space-y-1.5 flex items-center justify-between">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Giới tính</label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input
                              type="radio"
                              name="selGender"
                              value="1"
                              checked={gender === '1'}
                              onChange={() => setGender('1')}
                              className="peer sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 transition-colors ${gender === '1' ? 'border-red-600 dark:border-red-500' : 'border-neutral-300 dark:border-neutral-600'}`} />
                            <div className={`absolute w-2 h-2 rounded-full bg-red-600 dark:bg-red-500 transition-opacity ${gender === '1' ? 'opacity-100' : 'opacity-0'}`} />
                          </div>
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-red-600 dark:group-hover:text-red-400">Nam</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input
                              type="radio"
                              name="selGender"
                              value="0"
                              checked={gender === '0'}
                              onChange={() => setGender('0')}
                              className="peer sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 transition-colors ${gender === '0' ? 'border-red-600 dark:border-red-500' : 'border-neutral-300 dark:border-neutral-600'}`} />
                            <div className={`absolute w-2 h-2 rounded-full bg-red-600 dark:bg-red-500 transition-opacity ${gender === '0' ? 'opacity-100' : 'opacity-0'}`} />
                          </div>
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-red-600 dark:group-hover:text-red-400">Nữ</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Time */}
                  <div className="space-y-4">
                    {/* Calendar Type */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Loại Lịch</label>
                      <div className="flex items-center gap-6 h-[38px]">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input
                              type="radio"
                              name="selCalendar"
                              value="solar"
                              checked={calendar === 'solar'}
                              onChange={() => setCalendar('solar')}
                              className="peer sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 transition-colors ${calendar === 'solar' ? 'border-red-600 dark:border-red-500' : 'border-neutral-300 dark:border-neutral-600'}`} />
                            <div className={`absolute w-2 h-2 rounded-full bg-red-600 dark:bg-red-500 transition-opacity ${calendar === 'solar' ? 'opacity-100' : 'opacity-0'}`} />
                          </div>
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-red-600 dark:group-hover:text-red-400">Dương Lịch</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input
                              type="radio"
                              name="selCalendar"
                              value="lunar"
                              checked={calendar === 'lunar'}
                              onChange={() => setCalendar('lunar')}
                              className="peer sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 transition-colors ${calendar === 'lunar' ? 'border-red-600 dark:border-red-500' : 'border-neutral-300 dark:border-neutral-600'}`} />
                            <div className={`absolute w-2 h-2 rounded-full bg-red-600 dark:bg-red-500 transition-opacity ${calendar === 'lunar' ? 'opacity-100' : 'opacity-0'}`} />
                          </div>
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-red-600 dark:group-hover:text-red-400">Âm Lịch</span>
                        </label>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200">Giờ sinh & Múi giờ</label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <select
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}
                            className="w-full glass-input rounded-xl pl-2 pr-6 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all cursor-pointer"
                          >
                            <option value="" disabled>Giờ</option>
                            {hours.map((h) => (
                              <option key={h} value={h}>{h}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <span className="text-neutral-400 font-bold">:</span>
                        <div className="relative flex-1">
                          <select
                            value={minute}
                            onChange={(e) => setMinute(e.target.value)}
                            className="w-full glass-input rounded-xl pl-2 pr-6 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all cursor-pointer"
                          >
                            <option value="" disabled>Phút</option>
                            {minutes.map((m) => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <div className="relative flex-[1.2]">
                          <select
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            className="w-full glass-input rounded-xl pl-2 pr-6 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all cursor-pointer"
                          >
                            <option value="7">GMT+7</option>
                            <option value="8">GMT+8</option>
                            <option value="9">GMT+9</option>
                          </select>
                          <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* View Year */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                        Thời điểm xem hạn (Tuỳ chọn)
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <select
                            value={viewMonth}
                            onChange={(e) => setViewMonth(e.target.value)}
                            className="w-full glass-input rounded-xl px-2 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all cursor-pointer"
                          >
                            <option value="">Tất cả các tháng</option>
                            {months.map((m) => (
                              <option key={m} value={m}>Tháng {m}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <div className="relative flex-1">
                          <select
                            value={viewYear}
                            onChange={(e) => setViewYear(e.target.value)}
                            className="w-full glass-input rounded-xl px-2 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all cursor-pointer"
                          >
                            <option value="">Năm hiện tại</option>
                            {viewYears.map((y) => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white rounded-xl text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Lập Lá Số Ngay
                  </button>
                </div>
                <p className="text-center text-[11px] text-neutral-500 dark:text-neutral-500 mt-2">
                  Cam kết bảo mật thông tin tuyệt đối.
                </p>
              </form>
            </div>
          </div>

          {/* Q&A Section */}
          <section className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-red-900 dark:text-white">Hỏi Đáp Chuyên Gia</h2>
                <p className="text-base text-red-800/70 dark:text-white/80 mt-1">Cộng đồng chia sẻ và giải đáp</p>
              </div>
              <button className="px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-red-800/25 flex items-center gap-2 ring-1 ring-white/20">
                <PlusCircle className="w-4 h-4" />
                Đặt câu hỏi
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-amber-900/20 dark:border-amber-900/15 flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    Mới nhất
                  </h3>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 glass-button px-2 py-1 rounded-lg">3 chưa trả lời</span>
                </div>
                <div className="divide-y divide-white/10 dark:divide-white/5">
                  {[
                    { q: 'Sao Tử Vi ở cung Mệnh có ý nghĩa gì?', author: 'Minh Anh', time: '2 giờ' },
                    { q: 'Cách cục Tả Hữu Xương Khúc có tốt không?', author: 'Hương Giang', time: '5 giờ' },
                    { q: 'Đại hạn gặp Kình Dương nên làm gì?', author: 'Trung Kiên', time: '1 ngày' },
                  ].map((item, i) => (
                    <div key={i} className="px-5 py-4 hover:bg-white/30 dark:hover:bg-white/5 transition-colors cursor-pointer">
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">{item.q}</h4>
                      <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                        <span>👤 {item.author}</span>
                        <span>🕐 {item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-amber-900/20 dark:border-amber-900/15">
                  <h3 className="font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Nổi bật
                  </h3>
                </div>
                <div className="divide-y divide-white/10 dark:divide-white/5">
                  {[
                    { q: 'Luận giải tổ hợp Sát Phá Tham?', author: 'Admin', replies: 24 },
                    { q: 'Cung Phu Thê có Thiên Cơ Cự Giải?', author: 'Admin', replies: 18 },
                    { q: 'Bí quyết xem lá số cho người mới', author: 'Admin', replies: 42 },
                  ].map((item, i) => (
                    <div key={i} className="px-5 py-4 hover:bg-white/30 dark:hover:bg-white/5 transition-colors cursor-pointer">
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">{item.q}</h4>
                      <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                        <span>👤 {item.author}</span>
                        <span>💬 {item.replies} trả lời</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Blog Articles */}
          <section className="mb-12 animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-red-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-amber-500" />
                  Kiến Thức Tử Vi
                </h2>
                <p className="text-base text-red-800/70 dark:text-white/80 mt-1">Bài viết chuyên sâu từ chuyên gia</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { title: 'Ý nghĩa 14 chính tinh trong tử vi', cat: 'Kiến thức', date: '12/01/2026', icon: Compass, gradient: 'from-amber-600 to-red-800' },
                { title: 'Cách xem đại hạn và tiểu hạn', cat: 'Hướng dẫn', date: '08/02/2026', icon: Calendar, gradient: 'from-blue-700 to-indigo-900' },
                { title: 'Xem chỉ tay đường tình duyên', cat: 'Nhân tướng', date: '23/02/2026', icon: Heart, gradient: 'from-rose-700 to-red-900' },
              ].map((article, i) => (
                <article key={i} className="group glass-card rounded-2xl overflow-hidden hover-lift shine cursor-pointer">
                  <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${article.gradient}`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="glass-button px-3 py-1.5 rounded-full text-xs font-semibold text-amber-200 shadow-sm">{article.cat}</span>
                    </div>
                    <div className="absolute bottom-4 right-4 text-white/20 transform group-hover:scale-110 transition-transform duration-500">
                      <article.icon className="w-20 h-20" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-400 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> 2.1k đọc
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Famous People */}
          <section className="mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-red-900 dark:text-white flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-500" /> Lá Số Người Nổi Tiếng
                </h2>
                <p className="text-base text-red-800/70 dark:text-white/80 mt-1">Phân tích chuyên sâu lá số các vĩ nhân</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Phạm Nhật Vượng', initial: 'P', menh: 'Thổ', cuc: 'Hỏa Lục', desc: 'Phân tích lá số tỷ phú Phạm Nhật Vượng với thế cục Tử Phủ Vũ Tướng đắc địa...', tags: ['Tử Phủ Vũ Tướng', 'Lộc Tồn'], gradient: 'from-amber-600 to-red-800', tagColor: 'amber' },
                { name: 'Võ Nguyên Giáp', initial: 'V', menh: 'Kim', cuc: 'Thủy Nhị', desc: 'Đại tướng Võ Nguyên Giáp với lá số Sát Phá Tham đắc địa hội tụ Tướng Ấn...', tags: ['Sát Phá Tham', 'Quốc Ấn'], gradient: 'from-blue-600 to-indigo-800', tagColor: 'blue' },
              ].map((person, i) => (
                <div key={i} className="glass-card rounded-2xl p-5 hover border border-amber-900/10 dark:border-amber-900/30 group cursor-pointer transition-all hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${person.gradient} flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                      {person.initial}
                    </div>
                    <div>
                      <h3 className={`font-bold text-neutral-900 dark:text-white group-hover:text-${person.tagColor}-600 transition-colors`}>{person.name}</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Mệnh: {person.menh} | Cục: {person.cuc}</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-3">{person.desc}</p>
                  <div className="flex items-center gap-2">
                    {person.tags.map((tag, j) => (
                      <span key={j} className={`px-2 py-1 bg-${person.tagColor}-100 dark:bg-${person.tagColor}-900/30 text-${person.tagColor}-800 dark:text-${person.tagColor}-300 text-[10px] rounded-md font-medium`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feedback */}
          <section className="mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-red-900 dark:text-white flex items-center gap-2">
                  <MessageSquareHeart className="w-6 h-6 text-rose-500" /> Feedback Từ Khách Hàng
                </h2>
                <p className="text-base text-red-800/70 dark:text-white/80 mt-1">Những chia sẻ khi nhận luận giải tử vi miễn phí</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { text: '"Thật sự bất ngờ với độ chính xác của bài luận giải miễn phí. Admin phân tích rất kỹ về cung phu thê và quan lộc của mình, giúp mình định hướng rõ ràng hơn cho năm 2026."', name: 'Thanh Hằng', loc: 'TP. Hồ Chí Minh' },
                { text: '"Giao diện website rất đẹp và chuyên nghiệp. Lấy lá số nhanh, không bị lỗi. Đặc biệt phần tư vấn qua Facebook rất nhiệt tình, giải đáp mọi thắc mắc cặn kẽ."', name: 'Minh Tuấn', loc: 'Hà Nội' },
                { text: '"Mình đã thử nhiều trang web nhưng Tuvixemtuong cho kết quả an sao chuẩn xác nhất so với sách cổ. Các chỉ báo phụ tinh cũng được bố trí rất dễ nhìn và hợp lý."', name: 'Hoàng Nam', loc: 'Đà Nẵng' },
              ].map((fb, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl relative">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-neutral-200 dark:text-neutral-800" />
                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    {Array(5).fill(0).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-4 relative z-10 italic">{fb.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center overflow-hidden">
                      <User className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{fb.name}</h4>
                      <p className="text-[10px] text-neutral-500">{fb.loc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>

      <Footer />
    </div>
  )
}
