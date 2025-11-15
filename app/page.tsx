'use client';
import React, { useEffect, useState } from 'react';

type Lang = 'zh' | 'en';

/* --- Hero Slider 抬頭區 --- */
function HeroSlider({ lang }: { lang: Lang }) {
  const images = [
    '/optimized/hero1.jpg',
    '/optimized/hero2.jpg',
    '/optimized/hero3.jpg',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden border-b text-white">
      {/* 背景輪播 */}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Brad Studio hero ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* 黑色遮罩 */}
      <div className="absolute inset-0 bg-black/45" />

      {/* 文字內容（全部靠右） */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-end text-right">
          {/* 主標 */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            中國書畫裝裱與修復｜柏宜山房 Brad Studio
          </h1>
          {/* 副標 */}
          <p className="mt-4 text-gray-100 text-sm md:text-base max-w-sm leading-relaxed">
            精工修復；絹帛裝裱
            <br />
            文人養分，更是文化厚度。
          </p>
        </div>
      </div>

      {/* 指示點 */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? 'bg-white/90' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* --- 首頁本體 --- */
export default function StudioHome() {
  const [lang, setLang] = useState<Lang>('zh');

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [size, setSize] = useState('');
  const [links, setLinks] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name && !email && !size && !links && !message) {
      alert('請先填寫至少一項資料，再送出估價需求。');
      return;
    }

    const subject =
      lang === 'zh'
        ? '線上估價 / 裝裱需求'
        : 'Online quotation / mounting request';

    const bodyLines = [
      `姓名 / 機構 (Name / Institution): ${name}`,
      `Email: ${email}`,
      `作品尺寸與材質 (Size & material): ${size}`,
      `照片連結 (Image links): ${links}`,
      `需求說明 (Description): ${message}`,
    ];

    const mailtoSubject = encodeURIComponent(subject);
    const mailtoBody = encodeURIComponent(bodyLines.join('\n'));

    window.location.href = `mailto:kuowenhsuan@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header
        role="banner"
        className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b"
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="font-semibold tracking-wide text-lg">
            柏宜山房 · Brad Studio
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:opacity-80">
              {lang === 'zh' ? '服務' : 'Services'}
            </a>
            <a href="#process" className="hover:opacity-80">
              {lang === 'zh' ? '流程' : 'Process'}
            </a>
            <a href="#team" className="hover:opacity-80">
              {lang === 'zh' ? '團隊' : 'Team'}
            </a>
            <a href="#studio-images" className="hover:opacity-80">
              {lang === 'zh' ? '工作現場' : 'Studio'}
            </a>
            <a href="#pricing" className="hover:opacity-80">
              {lang === 'zh' ? '估價' : 'Pricing'}
            </a>
            <a href="#contact" className="hover:opacity-80">
              {lang === 'zh' ? '聯絡' : 'Contact'}
            </a>
            <a
              href="https://www.instagram.com/2014_brad/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100"
            >
              IG
            </a>
            <a
              href="https://www.facebook.com/2014Brad/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100"
            >
              FB
            </a>
            <a
              href="https://maps.app.goo.gl/B5e9D92PVZT6QJFj8"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100"
            >
              地圖
            </a>

            {/* 語言切換 */}
            <div className="flex items-center gap-1 ml-2">
              <button
                type="button"
                onClick={() => setLang('zh')}
                className={`px-2 py-1 rounded text-xs border ${
                  lang === 'zh'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-transparent text-gray-600 border-gray-300'
                }`}
              >
                中
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded text-xs border ${
                  lang === 'en'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-transparent text-gray-600 border-gray-300'
                }`}
              >
                EN
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="hero">
        <HeroSlider lang={lang} />
      </section>

      {/* Services */}
      <section id="services" className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            {lang === 'zh' ? '裝裱服務' : 'Mounting Services'}
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div className="rounded-2xl border p-6">
              <div className="font-medium">
                {lang === 'zh'
                  ? '立軸／冊頁／手卷／屏風'
                  : 'Hanging scrolls / Albums / Handscrolls / Screens'}
              </div>
              <p className="mt-2">
                {lang === 'zh'
                  ? '可逆性膠料與分層結構；收藏級紙材與背襯。'
                  : 'Reversible adhesives and layered structures; archival-grade papers and backings.'}
              </p>
            </div>
            <div className="rounded-2xl border p-6">
              <div className="font-medium">
                {lang === 'zh' ? '框裱與展示結構' : 'Framing & display structures'}
              </div>
              <p className="mt-2">
                {lang === 'zh'
                  ? '畫框、背板、防酸材料與 UV 保護方案。'
                  : 'Frames, backing boards, acid-free materials and UV protection options.'}
              </p>
            </div>
            <div className="rounded-2xl border p-6">
              <div className="font-medium">
                {lang === 'zh' ? '修復與保存建議' : 'Restoration & conservation advice'}
              </div>
              <p className="mt-2">
                {lang === 'zh'
                  ? '破損補紙、清污脫酸、黏著剝離與保存環境規劃。'
                  : 'Paper infill, stain reduction, deacidification, adhesive removal and storage planning.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="border-b bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            {lang === 'zh'
              ? '流程與保存原則'
              : 'Workflow & Conservation Principles'}
          </h2>
          <ol className="mt-8 grid md:grid-cols-3 gap-6 text-sm text-gray-700 list-decimal list-inside">
            <li>
              {lang === 'zh'
                ? '初評估：尺寸、材質、狀況；提供初步建議與預估。'
                : 'Initial assessment: size, materials, condition; preliminary advice and estimate.'}
            </li>
            <li>
              {lang === 'zh'
                ? '方案確認：材質與結構擇定，預計工期與報價。'
                : 'Proposal: materials and structure confirmed, with timeframe and quotation.'}
            </li>
            <li>
              {lang === 'zh'
                ? '工藝執行：可逆性、可追溯；完工後提供保存建議。'
                : 'Execution: reversible and traceable methods; conservation guidance upon completion.'}
            </li>
          </ol>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            {lang === 'zh' ? '團隊成員 Team' : 'Team'}
          </h2>
          <p className="text-gray-600 text-sm">
            {lang === 'zh'
              ? '柏宜山房由多位專業成員組成，融合傳統裝裱工藝、木作結構與保存修復技術。'
              : 'Brad Studio brings together specialists in mounting, woodworking and conservation-oriented craft.'}
          </p>
          <div className="mt-10 grid md:grid-cols-4 gap-8 text-left">
            {[
              {
                name: '甘柏宜 Bradley James Gardner（1982–2014）',
                title:
                  lang === 'zh'
                    ? '永遠的夥伴 · In Memoriam'
                    : 'Our enduring partner · In Memoriam',
                img: '/optimized/bradley-small.jpg',
                desc:
                  lang === 'zh'
                    ? '以誠實與專注實踐東方裝裱工藝，對柏宜山房之成立與倫理奠基具有關鍵意義。'
                    : 'His honesty and focus in practicing East Asian mounting crafts laid the ethical foundation of Brad Studio.',
              },
              {
                name: '郭汶瑄 Wen-Hsuan Kuo',
                title:
                  lang === 'zh'
                    ? '裝裱與修復總監'
                    : 'Director of mounting & restoration',
                img: '/optimized/kuo-small.jpg',
                desc:
                  lang === 'zh'
                    ? '專長於書畫修復與可逆性裝裱技術，結合傳統與保存倫理，現為柏宜山房創辦人。'
                    : 'Specialized in painting and calligraphy restoration and reversible mounting methods; founder of Brad Studio.',
                link: 'https://www.instagram.com/kuowenhsuan/',
              },
              {
                name: '呂兪樺 Ly Yu-Hua',
                title:
                  lang === 'zh'
                    ? '陶作與紙本結構設計師'
                    : 'Ceramic & paper structure designer',
                img: '/optimized/ly_yuhua-small.jpg',
                desc:
                  lang === 'zh'
                    ? '以陶藝與紙本材料實驗為核心，協助開發裝裱與保存相關結構性部件，結合工藝與研究。'
                    : 'Works across ceramics and paper-based experiments, developing structural components for mounting and preservation.',
              },
              {
                name: '黃士桓 Huang Shih-Huan',
                title:
                  lang === 'zh'
                    ? '木工師、3D 繪圖設計師'
                    : 'Woodworker & 3D designer',
                img: '/optimized/huang_shihhuan-small.jpg',
                desc:
                  lang === 'zh'
                    ? '專注於畫框結構與榫卯製作，結合傳統工法與現代設計，並以 3D 建模輔助製作流程。'
                    : 'Focuses on frame structures and joinery, integrating traditional techniques with modern design and 3D modeling.',
                link: 'https://www.instagram.com/shih.artstudio/',
              },
            ].map((m, i) => (
              <figure
                key={i}
                className="rounded-2xl border p-5 hover:shadow-sm"
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="rounded-xl mb-4 object-cover w-full aspect-square"
                />
                <figcaption>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {m.title}
                  </div>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {m.desc}
                  </p>
                  {'link' in m && (m as any).link && (
                    <a
                      href={(m as any).link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm underline"
                    >
                      Instagram →
                    </a>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Images – 先保留原本輪播或改成之後再調整 */}
      <section id="studio-images" className="border-t bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            {lang === 'zh'
              ? '工作現場剪影 Studio Images'
              : 'Studio Images'}
          </h2>
          {(() => {
            const workshopImages = [
              '/optimized/workshop1-small.jpg',
              '/optimized/workshop2-small.jpg',
              '/optimized/workshop3-small.jpg',
              '/optimized/workshop4-small.jpg',
              '/optimized/workshop5-small.jpg',
              '/optimized/workshop6-small.jpg',
              '/optimized/workshop7-small.jpg',
              '/optimized/workshop8-small.jpg',
              '/optimized/workshop9-small.jpg',
            ];
            function Carousel() {
              const [idx, setIdx] = useState(0);
              useEffect(() => {
                const t = setInterval(
                  () => setIdx((i) => (i + 1) % workshopImages.length),
                  5600,
                );
                return () => clearInterval(t);
              }, []);
              return (
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl border">
                  {workshopImages.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Studio view ${i + 1}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                        i === idx ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  ))}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {workshopImages.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-6 rounded-full ${
                          i === idx ? 'bg-black/70' : 'bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              );
            }
            return <Carousel />;
          })()}
        </div>
      </section>

      {/* About – 依語言切換 */}
      {lang === 'zh' && (
        <section id="about" className="border-b bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-16 text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">
              關於柏宜山房
            </h2>
            <p className="mt-6 text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
              「柏宜山房」座落在台北市松山區，前身為 2012 年創立的「墨廊」。草創時期之所以以「墨」為名，
              除了指涉筆墨創作，也期盼回應空間成立的初衷──服膺墨家「兼愛」思想。

              2014 年，空間正式更名為「柏宜山房」（Brad Studio），此一命名同時也是為紀念曾一同學習的夥伴及摯友
              Bradley James Gardner 甘柏宜（1982–2014）。

              在山房裡的每一位夥伴，都具有相同的信念：從自身熱愛藝術的內心出發，透過裝裱形式的助益，
              推動優質藏品的流通，最終回歸創作本質。我們相信，無論是對創作者、收藏家、裝裱工作夥伴或藝文相關產業，
              均能形成一個共生共利的良性循環生態；並藉由彼此的合作與分享，促進藝術產業中穩定而持續的交流與經驗累積。
            </p>
          </div>
        </section>
      )}

      {lang === 'en' && (
        <section id="about-en" className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">
              About Brad Studio
            </h2>
            <p className="mt-6 text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
              Brad Studio is located in Songshan District, Taipei. Its
              predecessor, “Ink Gallery,” was established in 2012 as a space
              dedicated to ink-based art in this neighborhood. The name “Ink”
              was chosen not only to reflect the spirit of brush-and-ink
              creation, but also to embody a founding philosophy inspired by
              the Mohist ideal of universal love.

              In 2014, the studio was renamed “Brad Studio” (Boyi Shan Fang) in
              memory of our close friend and collaborator, Bradley James
              Gardner (1982–2014).

              Each member of the studio shares the same belief: beginning from
              a genuine passion for art, we seek to assist and preserve through
              the craft of mounting—supporting the circulation of significant
              works while ultimately returning to the essence of creation. We
              believe that, through collaboration among artists, collectors,
              craftspeople and the cultural sector, an ecosystem of mutual
              benefit and shared growth can emerge, fostering sustained
              exchange and the accumulation of experience in the field of art.
            </p>
          </div>
        </section>
      )}

      {/* LA Studio 計劃中 */}
      <section id="la-studio" className="border-b bg-gray-50 text-center">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Brad Studio LA｜加州工作室計劃
          </h2>
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            柏宜山房目前正規劃於未來在美國加州成立新據點，延伸中國書畫裝裱與修復工藝，
            並作為東方紙本藝術保存與研究的國際節點。相關進度與細節將於後續公布。
            <br />
            <span className="text-xs text-gray-400">
              Coming Soon · Los Angeles, California（籌備中）
            </span>
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            {lang === 'zh'
              ? '估價區間（參考）'
              : 'Reference price ranges'}
          </h2>
          <ul className="mt-6 text-sm text-gray-700 leading-7 list-disc list-inside">
            <li>
              {lang === 'zh'
                ? '立軸 NT$10,000 起（完成尺寸每才 900 起）'
                : 'Hanging scrolls from NT$10,000 (from NT$900 per tsai of finished size).'}
            </li>
            <li>
              {lang === 'zh'
                ? '框裱 NT$6,000 起'
                : 'Framing from NT$6,000.'}
            </li>
            <li>
              {lang === 'zh'
                ? '修復 NT$1,500–5,000 / 時（基本收費 8,000 起；依尺寸／年代／複雜度調整）'
                : 'Restoration NT$1,500–5,000 / hour (basic fee from NT$8,000; depending on size, age and complexity).'}
            </li>
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {lang === 'zh'
              ? '線上估價 / 預約'
              : 'Online quotation / Appointment'}
          </h2>
          <p className="mt-3 text-gray-600 text-sm">
            {lang === 'zh'
              ? '留下尺寸、材質與照片連結（Google Drive / Dropbox / Instagram），我們將回覆初估與建議。'
              : 'Please leave size, materials and image links (Google Drive / Dropbox / Instagram). We will reply with a preliminary estimate and suggestions.'}
          </p>
          <form
            className="mt-8 grid md:grid-cols-2 gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="border rounded-xl px-4 py-3"
              placeholder={lang === 'zh' ? '姓名 / 機構' : 'Name / Institution'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border rounded-xl px-4 py-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border rounded-xl px-4 py-3 md:col-span-2"
              placeholder={
                lang === 'zh'
                  ? '作品尺寸（長×寬×厚）與材質'
                  : 'Artwork size (H × W × D) & materials'
              }
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <input
              className="border rounded-xl px-4 py-3 md:col-span-2"
              placeholder={
                lang === 'zh'
                  ? '照片連結（可多個）'
                  : 'Image links (multiple allowed)'
              }
              value={links}
              onChange={(e) => setLinks(e.target.value)}
            />
            <textarea
              className="border rounded-xl px-4 py-3 md:col-span-2"
              rows={5}
              placeholder={
                lang === 'zh'
                  ? '需求說明（形式、預算、時程、展示 / 保存需求）'
                  : 'Description (format, budget, timeline, display / conservation needs)'
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-2xl px-5 py-3 border shadow hover:shadow-md"
              >
                {lang === 'zh'
                  ? '送出需求（將開啟 Email）'
                  : 'Send request (opens email client)'}
              </button>
            </div>
          </form>
          <div className="mt-10 text-sm text-gray-600 space-y-1">
            <div>
              {lang === 'zh'
                ? '工作室位置：台北市（預約制）｜'
                : 'Studio location: Taipei (by appointment only)｜'}
              <a
                className="underline"
                href="https://maps.app.goo.gl/B5e9D92PVZT6QJFj8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google 地圖
              </a>
            </div>
            <div>
              {lang === 'zh' ? '聯絡信箱：' : 'Email: '}
              <a
                className="underline"
                href="mailto:kuowenhsuan@gmail.com"
              >
                kuowenhsuan@gmail.com
              </a>
            </div>
            <div>
              Instagram：
              <a
                className="underline"
                href="https://www.instagram.com/2014_brad/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @2014_brad
              </a>{' '}
              ｜ Facebook：
              <a
                className="underline"
                href="https://www.facebook.com/2014Brad/"
                target="_blank"
                rel="noopener noreferrer"
              >
                2014Brad
              </a>
            </div>
            <div className="text-xs text-gray-500 mt-4">
              ※ 本工作室支援傳統付款與比特幣（BTC）收付，詳情可於洽談時確認。
              <br />
              BTC payment supported upon request.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer role="contentinfo" className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-500 grid md:grid-cols-2 gap-3">
          <div>
            © {new Date().getFullYear()} 柏宜山房 Brad Studio. All rights
            reserved.
          </div>
          <div className="md:text-right">
            個人網站：
            <a
              className="underline"
              href="https://www.instagram.com/kuowenhsuan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wen-Hsuan Kuo →
            </a>
          </div>
          <div className="md:col-span-2 mt-3">
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href="https://www.instagram.com/2014_brad/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/2014Brad/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook
              </a>
              <a
                href="https://maps.app.goo.gl/B5e9D92PVZT6QJFj8"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Google 地圖
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}// force redeploy
