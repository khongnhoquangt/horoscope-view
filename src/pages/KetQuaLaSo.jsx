import { useEffect, useRef, useState, useCallback } from 'react'
import { useSearch, Link } from '@tanstack/react-router'
import {
  Download, Share2, Check, Facebook,
  Sparkles, Star, Award, Quote, User, PlusCircle,
  MessageSquareHeart, BookOpen, Calendar, Eye
} from 'lucide-react'
import RightSidebar from '../components/RightSidebar'
import Footer from '../components/Footer'

export default function KetQuaLaSo() {
  const search = useSearch({ from: '/ket-qua-la-so' })
  const { name, gender, d: day, m: month, y: year, cal, h: hour, min, vy: viewYear } = search

  const [shareText, setShareText] = useState('Chia sẻ')
  const chartRef = useRef(null)

  // Build title string
  const titleStr = `Luận Giải Lá Số ${name} Sinh ${hour} giờ ${min} phút ngày ${day} tháng ${month} năm ${year}`

  // Load external tuvi-logic.js script
  useEffect(() => {
    // Load CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/tuvi-generator.css'
    document.head.appendChild(link)

    // Load script
    const script = document.createElement('script')
    script.src = '/tuvi-logic.js?v=20260305c'
    script.onload = () => {
      // After script loads, set form values and generate chart
      setTimeout(() => {
        const setVal = (id, val) => {
          const el = document.getElementById(id)
          if (el) {
            if (el.tagName === 'SELECT') {
              el.innerHTML = `<option value="${val}">${val}</option>`
            } else if (el.tagName === 'INPUT') {
              el.value = val
            }
          }
        }
        const setText = (id, val) => {
          const el = document.getElementById(id)
          if (el) el.textContent = val
        }

        setVal('txtName', name)
        setVal('numDay', day)
        setVal('numMonth', month)
        setVal('numYear', year)
        setVal('selHour', hour)
        setVal('selMinute', min)
        setVal('numViewYear', viewYear)

        if (gender === '1' && document.getElementById('genNam')) document.getElementById('genNam').checked = true
        if (gender === '0' && document.getElementById('genNu')) document.getElementById('genNu').checked = true
        if (cal === 'solar' && document.getElementById('calSolar')) document.getElementById('calSolar').checked = true
        if (cal === 'lunar' && document.getElementById('calLunar')) document.getElementById('calLunar').checked = true

        setText('resultTitle', titleStr)
        setText('descName', name)

        if (typeof window.generateChart === 'function') {
          window.generateChart()
        }
      }, 300)
    }
    document.body.appendChild(script)

    return () => {
      document.head.removeChild(link)
      document.body.removeChild(script)
    }
  }, [name, gender, day, month, year, cal, hour, min, viewYear, titleStr])

  // Download chart as JPEG
  const handleDownload = useCallback(async () => {
    try {
      const html2canvas = (await import('html2canvas')).default
      const grid = document.querySelector('.tuvi-grid')
      if (!grid) return

      await new Promise(r => setTimeout(r, 200))
      const gridRect = grid.getBoundingClientRect()
      const cells = Array.from(grid.querySelectorAll('.house, .thien-ban'))
      const cellMetrics = cells.map(cell => {
        const rect = cell.getBoundingClientRect()
        return { left: rect.left - gridRect.left, top: rect.top - gridRect.top, width: rect.width, height: rect.height }
      })

      const badges = Array.from(grid.querySelectorAll('.tt-badge'))
      let oTop = 0, oBottom = 0, oLeft = 0, oRight = 0
      badges.forEach(b => {
        const bRect = b.getBoundingClientRect()
        const bL = bRect.left - gridRect.left, bT = bRect.top - gridRect.top
        const bR = bL + bRect.width, bB = bT + bRect.height
        if (bT < oTop) oTop = bT
        if (bB > gridRect.height + oBottom) oBottom = bB - gridRect.height
        if (bL < oLeft) oLeft = bL
        if (bR > gridRect.width + oRight) oRight = bR - gridRect.width
      })

      const pT = Math.max(0, Math.abs(oTop) + 10)
      const pB = Math.max(0, oBottom + 10)
      const pL = Math.max(0, Math.abs(oLeft) + 10)
      const pR = Math.max(0, oRight + 10)

      const canvas = await html2canvas(grid, {
        scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false, allowTaint: true,
        y: -pT, x: -pL,
        width: gridRect.width + pL + pR, height: gridRect.height + pT + pB,
        windowWidth: document.body.scrollWidth, windowHeight: document.body.scrollHeight,
        onclone: (clonedDoc) => {
          const cg = clonedDoc.querySelector('.tuvi-grid')
          if (!cg) return
          cg.style.cssText = `display:block;position:relative;width:${gridRect.width}px;height:${gridRect.height}px;overflow:visible;border:none;padding:0;margin:0;`
          cells.forEach((lc, i) => {
            const m = cellMetrics[i], cc = cg.children[i]
            if (cc) {
              cc.style.cssText = `position:absolute;left:${m.left}px;top:${m.top}px;width:${m.width}px;height:${m.height}px;margin:0;padding:${getComputedStyle(lc).padding};overflow:visible;`
            }
          })
          clonedDoc.querySelectorAll('.tt-badge').forEach(b => { b.style.zIndex = '9999'; b.style.overflow = 'visible' })
        }
      })

      const link = document.createElement('a')
      link.download = `${name.replace(/\s+/g, '-')}-tuvi.jpg`
      link.href = canvas.toDataURL('image/jpeg', 0.95)
      link.click()
    } catch (e) {
      alert('Không thể tải ảnh. Vui lòng thử lại.')
      console.error(e)
    }
  }, [name])

  // Share link
  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url: window.location.href })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareText('Đã copy Link!')
        setTimeout(() => setShareText('Chia sẻ'), 2000)
      }
    } catch (e) { console.error(e) }
  }, [])

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1 lg:max-w-[70%] animate-slide-up">
          {/* Breadcrumb */}
          <div className="mb-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-neutral-300 text-xs font-semibold shadow-lg">
                Tử Vi
              </span>
              <span className="text-neutral-400 dark:text-white/60">/</span>
              <span className="text-neutral-600 dark:text-white/80 text-sm font-medium">Kết Quả Lá Số</span>
            </div>
            <h1 id="resultTitle" className="text-2xl md:text-3xl font-bold text-red-900 dark:text-white mb-3 tracking-tight leading-snug">
              {titleStr}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Phân tích chuyên sâu lá số tử vi cho <strong id="descName">{name}</strong>
            </p>
          </div>

          {/* Hidden form elements for tuvi-logic.js */}
          <div style={{ display: 'none' }}>
            <input type="text" id="txtName" defaultValue={name} />
            <input type="radio" name="selGender" value="1" id="genNam" defaultChecked={gender === '1'} />
            <input type="radio" name="selGender" value="0" id="genNu" defaultChecked={gender === '0'} />
            <select id="numDay"><option value={day}>{day}</option></select>
            <select id="numMonth"><option value={month}>{month}</option></select>
            <input type="number" id="numYear" defaultValue={year} />
            <input type="radio" name="selCalendar" value="solar" id="calSolar" defaultChecked={cal === 'solar'} />
            <input type="radio" name="selCalendar" value="lunar" id="calLunar" defaultChecked={cal === 'lunar'} />
            <select id="selHour"><option value={hour}>{hour}</option></select>
            <select id="selMinute"><option value={min}>{min}</option></select>
            <input type="checkbox" id="chkManualDate" />
            <select id="numViewYear"><option value={viewYear}>{viewYear}</option></select>
            <select id="selViewMonth"><option value="">Tất cả</option></select>
            <select id="selTimezone"><option value="7">GMT+7</option></select>
          </div>

          {/* Chart Container */}
          <div className="mb-8 tuvi-context" ref={chartRef}>
            <div id="chartContainer" className="chart-container">
              <div id="exportWrapper" style={{ padding: 0, display: 'block', width: '780px', margin: '0 auto', backgroundColor: 'transparent', boxSizing: 'border-box' }}>
                <div className="tuvi-grid">
                  {/* TOP ROW */}
                  <div className="house h-ty" id="house-5" />
                  <div className="house h-ngo" id="house-6" />
                  <div className="house h-mui" id="house-7" />
                  <div className="house h-than" id="house-8" />
                  {/* MIDDLE */}
                  <div className="house h-thin" id="house-4" />
                  <div className="thien-ban">
                    <div className="w-full h-full rounded-lg tuvi-card overflow-hidden flex flex-col">
                      <div className="px-8 py-4 tuvi-header flex-shrink-0">
                        <div className="flex flex-col items-center space-y-1">
                          <h1 className="text-xl md:text-2xl font-bold tracking-[0.15em] text-amber-900 uppercase" style={{ fontFamily: "'Inter', sans-serif", margin: 0 }}>
                            Lá Số Tử Vi
                          </h1>
                          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-50 my-1" />
                          <p className="text-[0.7rem] text-amber-700 font-medium tracking-wide m-0">Thiên Bàn & Mệnh Cục</p>
                        </div>
                      </div>
                      <div className="px-5 py-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-0">
                          {/* Name */}
                          <div className="info-row flex justify-between items-center py-2">
                            <span className="text-amber-800 font-bold text-xs uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>Họ và Tên</span>
                            <span className="text-amber-900 font-semibold text-sm tracking-wide" id="outName" style={{ fontFamily: "'Inter', sans-serif" }} />
                          </div>
                          {/* Time Row */}
                          <div className="info-row grid grid-cols-3 items-center py-2">
                            <span className="text-amber-800 font-bold text-xs uppercase tracking-wider">Giờ sinh</span>
                            <span className="text-amber-900 font-sans text-sm text-center font-medium" id="outHourNum" />
                            <div className="flex justify-end"><span className="text-amber-900 font-bold tracking-wider text-sm" id="outHourCanChi" /></div>
                          </div>
                          {/* Day Row */}
                          <div className="info-row grid grid-cols-3 items-center py-2">
                            <span className="text-amber-800 font-bold text-xs uppercase tracking-wider">Ngày</span>
                            <span className="text-amber-900 font-sans text-sm text-center font-medium" id="outDayNum" />
                            <div className="flex justify-end"><span className="text-amber-900 font-bold tracking-wider text-sm" id="outDayCanChi" /></div>
                          </div>
                          {/* Month Row */}
                          <div className="info-row grid grid-cols-3 items-center py-2">
                            <span className="text-amber-800 font-bold text-xs uppercase tracking-wider">Tháng</span>
                            <span className="text-amber-900 font-sans text-sm text-center font-medium" id="outMonthNum" />
                            <div className="flex justify-end"><span className="text-amber-900 font-bold tracking-wider text-sm" id="outMonthCanChi" /></div>
                          </div>
                          {/* Year Row */}
                          <div className="info-row grid grid-cols-3 items-center py-2">
                            <span className="text-amber-800 font-bold text-xs uppercase tracking-wider">Năm sinh</span>
                            <span className="text-amber-900 font-sans text-sm text-center font-bold" id="outYearNum" />
                            <div className="flex justify-end"><span className="text-amber-900 font-bold tracking-wider text-sm" id="outYearCanChi" /></div>
                          </div>
                          {/* View Year */}
                          <div className="info-row grid grid-cols-3 items-center py-2">
                            <span className="text-amber-800 font-bold text-xs uppercase tracking-wider">Năm xem</span>
                            <div className="flex justify-center">
                              <div className="year-control">
                                <button type="button" className="year-btn" onClick={() => window.changeYearView?.(-1)}>−</button>
                                <span className="year-display px-2 bg-transparent text-center" id="inYearViewStr" />
                                <button type="button" className="year-btn" onClick={() => window.changeYearView?.(1)}>+</button>
                              </div>
                            </div>
                            <div className="flex justify-end"><span className="text-amber-900 font-bold tracking-wider text-sm" id="outYearViewCanChi" /></div>
                          </div>
                        </div>
                        <div className="divider-gold my-4" />
                        {/* Destiny Stats */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="stat-card rounded-lg p-2 text-center">
                            <div className="text-[0.6rem] font-bold text-amber-700 uppercase tracking-wider mb-1">Bản Mệnh</div>
                            <div className="text-amber-900 font-semibold text-[0.8rem] leading-tight" id="outBanMenh" />
                          </div>
                          <div className="stat-card rounded-lg p-2 text-center">
                            <div className="text-[0.6rem] font-bold text-amber-700 uppercase tracking-wider mb-1">Cục</div>
                            <div className="text-red-700 font-semibold text-[0.8rem] leading-tight" id="outCuc" />
                          </div>
                          <div className="stat-card rounded-lg p-2 text-center">
                            <div className="text-[0.6rem] font-bold text-amber-700 uppercase tracking-wider mb-1">Cân Lượng</div>
                            <div className="text-amber-900 font-semibold text-[0.8rem] leading-tight" id="outCanLuong" />
                          </div>
                        </div>
                        {/* Three Pillars */}
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {['Chủ Mệnh', 'Chủ Thân', 'Lai Nhân'].map((label, i) => (
                            <div key={i} className="pillar-card rounded-md p-2 text-center transition-all duration-200">
                              <div className="text-[0.6rem] font-bold text-amber-700 uppercase tracking-wider mb-1">{label}</div>
                              <div className="text-amber-900 font-bold text-[0.85rem] tracking-wide" id={['outChuMenh', 'outChuThan', 'outLaiNhanCung'][i]} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="house h-dau" id="house-9" />
                  <div className="house h-mao" id="house-3" />
                  <div className="house h-tuat" id="house-10" />
                  {/* BOTTOM ROW */}
                  <div className="house h-dan" id="house-2" />
                  <div className="house h-suu" id="house-1" />
                  <div className="house h-zi" id="house-0" />
                  <div className="house h-hoi" id="house-11" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={handleDownload}
              id="btnDownload"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-red-800/25 ring-1 ring-white/20"
            >
              <Download className="w-4 h-4" /> Tải lá số
            </button>
            <button
              onClick={handleShare}
              id="btnShare"
              className="flex items-center gap-2 px-5 py-2.5 glass-button rounded-xl text-sm font-semibold transition-all hover:scale-105"
            >
              {shareText === 'Chia sẻ' ? <Share2 className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              {shareText}
            </button>
            <a
              href="https://facebook.com/tuvixemtuong"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/30"
            >
              <Facebook className="w-4 h-4" /> Nhận Luận Giải Miễn Phí
            </a>
          </div>

          {/* Interpretation Section */}
          <div className="space-y-6 mb-12">
            <div className="glass-panel p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-red-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Luận Giải Tổng Quan
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-red-800 dark:text-red-300 mb-2">Mệnh và Cục</h3>
                  <p id="interpMenhCuc" className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    Mệnh và Cục tương sinh, bạn dễ dàng nhận được sự trợ giúp từ môi trường xung quanh, đường đời tương đối hanh thông.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-red-800 dark:text-red-300 mb-2">Cung Mệnh</h3>
                  <p id="interpMenh" className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    Lá số này có cường độ cát tinh mạnh mẽ, báo hiệu một cuộc đời nhiều thành tựu nhưng cũng đi kèm với không ít thăng trầm.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-red-800 dark:text-red-300 mb-2">Cung Thân</h3>
                  <p id="interpThan" className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    Cung Thân thể hiện hậu vận vững chắc, càng có tuổi càng có lộc, tuy nhiên cẩn thận chuyện thị phi.
                  </p>
                </div>
              </div>
            </div>

            {/* House Navigation */}
            <div className="glass-panel p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-red-900 dark:text-white mb-4">Luận Giải 12 Cung</h2>
              <div id="houseNavButtons" className="flex flex-wrap gap-2 mb-4">
                {['Mệnh', 'Phúc Đức', 'Quan Lộc', 'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Phu Thê', 'Huynh Đệ', 'Tử Tức', 'Nô Bộc', 'Điền Trạch', 'Phụ Mẫu'].map((cung, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 border border-red-500/30 rounded-full text-sm font-semibold transition ${i === 0 ? 'text-white bg-red-600 shadow-sm' : 'text-red-700 bg-white hover:bg-red-50 hover:text-red-800 shadow-sm'}`}
                  >
                    {cung}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Q&A */}
          <section className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-red-900 dark:text-white">Hỏi Đáp Chuyên Gia</h2>
                <p className="text-base text-red-800/70 dark:text-white/80 mt-1">Cộng đồng chia sẻ và giải đáp</p>
              </div>
              <button className="px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-red-800/25 flex items-center gap-2 ring-1 ring-white/20">
                <PlusCircle className="w-4 h-4" /> Đặt câu hỏi
              </button>
            </div>
          </section>

          {/* Feedback */}
          <section className="mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-red-900 dark:text-white flex items-center gap-2">
                  <MessageSquareHeart className="w-6 h-6 text-rose-500" /> Feedback Từ Khách Hàng
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { text: '"Thật sự bất ngờ với độ chính xác..."', name: 'Thanh Hằng', loc: 'TP. Hồ Chí Minh' },
                { text: '"Giao diện website rất đẹp và chuyên nghiệp..."', name: 'Minh Tuấn', loc: 'Hà Nội' },
                { text: '"Tuvixemtuong cho kết quả an sao chuẩn xác nhất..."', name: 'Hoàng Nam', loc: 'Đà Nẵng' },
              ].map((fb, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl relative">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-neutral-200 dark:text-neutral-800" />
                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    {Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-4 relative z-10 italic">{fb.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
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

        <RightSidebar />
      </div>

      <Footer />
    </div>
  )
}
