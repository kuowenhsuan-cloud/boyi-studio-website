'use client';

// force update

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
  }, [images.length]);

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

      {/* 文字內容 */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-end text-right w-full">
          <div className="max-w-md">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-wide">
              {lang === 'zh' ? (
                <>
                  書畫裝裱與
                  <br className="md:hidden" />
                  修復
                </>
              ) : (
                'Mounting & Restoration'
              )}
            </h1>

            <p className="mt-4 text-gray-100 text-sm md:text-base leading-relaxed">
              {lang === 'zh'
                ? '提供作品評估、裝裱與修復服務，協助判斷最適合的處理方式。'
                : 'Assessment, mounting and restoration services. We advise the most suitable approach for each artwork.'}
            </p>

            <div className="mt-6">
              <a
                href="#contact"
                className="inline-block border border-white px-6 py-2 text-sm transition hover:bg-white hover:text-black"
              >
                {lang === 'zh' ? '線上估價 / 預約' : 'Get a Quote'}
              </a>
            </div>
          </div>
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!name || !email || !size || !links || !message) {
    alert(lang === 'zh' ? '請先填寫所有欄位' : 'Please fill in all fields');
    return;
  }

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message: `
作品尺寸 / Size & material: ${size}
圖片連結 / Image links: ${links}

需求說明 / Description:
${message}
        `.trim(),
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert(lang === 'zh' ? '寄送成功' : 'Message sent successfully');
      setName('');
      setEmail('');
      setSize('');
      setLinks('');
      setMessage('');
    } else {
      console.error(data);
      alert(
        lang === 'zh'
          ? `寄送失敗：${data.error || '未知錯誤'}`
          : `Failed: ${data.error || 'Unknown error'}`
      );
    }
  } catch (error) {
    console.error(error);
    alert(
      lang === 'zh'
        ? '寄送失敗，請查看 console'
        : 'Failed to send, check console'
    );
  }
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
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            {lang === 'zh' ? '團隊成員 Team' : 'Team'}
          </h2>

          <p className="text-gray-600 text-sm mb-12 max-w-xl mx-auto">
            {lang === 'zh'
              ? '柏宜山房由當前核心成員持續運作，並承接其創立以來的工藝精神與保存實踐。'
              : 'Brad Studio is sustained by its current core members, continuing the studio’s foundational philosophy of craft and conservation.'}
          </p>

          {/* 上：柏利（單獨） */}
          <div className="mb-12 flex justify-center">
            <div className="max-w-sm text-left">
              <img
                src="/optimized/bradley-small.jpg"
                alt="Bradley James Gardner"
                className="rounded-xl mb-4 object-cover w-full aspect-square"
              />
              <div className="font-medium">
                甘柏宜 Bradley James Gardner（1982–2014）
              </div>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {lang === 'zh'
                  ? '永遠的夥伴（In Memoriam）。其對東方裝裱工藝的專注與實踐，奠定了工作室的核心精神。'
                  : 'Our enduring partner (In Memoriam). His dedication to East Asian mounting laid the ethical foundation of the studio.'}
              </p>
            </div>
          </div>

          {/* 下：兩位並排 */}
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {/* 你 */}
            <div>
              <img
                src="/optimized/kuo-small.jpg"
                alt="Wen-Hsuan Kuo"
                className="rounded-xl mb-4 object-cover w-full aspect-square"
              />
              <div className="font-medium">郭汶瑄 Wen-Hsuan Kuo</div>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {lang === 'zh'
                  ? '專長書畫裝裱修復與可逆性裝裱技術，結合傳統與保存修復理念，現為柏宜山房負責人。'
                  : 'Specialized in mounting and restoration, integrating traditional methods with conservation practice. Director of Brad Studio.'}
              </p>
              <a
                href="https://www.instagram.com/kuowenhsuan/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm underline"
              >
                Instagram →
              </a>
            </div>

            {/* 呂兪樺 */}
            <div>
              <img
                src="/optimized/lu_yuhua-small.jpg"
                alt="Yu-Hua Lu"
                className="rounded-xl mb-4 object-cover w-full aspect-square"
              />
              <div className="font-medium">呂兪樺 Yu-Hua Lu</div>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {lang === 'zh'
                  ? '陶藝與紙材結構設計，協助裝裱結構與材料應用，參與工藝研究與實驗。'
                  : 'Works across ceramics and paper-based structures, contributing to mounting techniques and material research.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Images */}
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

      {/* About - 依語言切換 */}
      <>
        {lang === 'zh' && (
          <section id="about" className="border-b bg-gray-50">
            <div className="mx-auto max-w-6xl px-4 py-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-center">
                關於柏宜山房
              </h2>

              <div className="mt-8 max-w-3xl text-sm md:text-base text-gray-700 leading-relaxed space-y-6">
                <p className="font-medium text-gray-900">
                  柏宜山房位於台北，成立於2012年，專注於中國書畫裝裱與修復。
                </p>

                <p>
                  工作室建立於長期工藝實踐與材料理解之上，並以裝裱作為藝術保存條件的延伸。
                  在長期實務中，我們面對的不僅是形式修復，而是在時間中的變化、材料與再判斷之間建立關係並依作品狀況提供個別化處理建議。
                </p>

                <p>
                  2014年，工作室以「Brad Studio」之名，紀念合作夥伴 甘柏宜，
                  Bradley James Gardner（1982–2014）。
                </p>

                <hr className="my-2 border-gray-200" />

                <p>
                  本工作室採用可逆性（reversible）處理原則，所有裝裱與修復介入，皆以不破壞原作為前提，並保留未來再處理與再判斷的可能性。
                  在每件作品處理前，我們進行結構與材質評估，包括紙質纖維狀態、裝裱層結構、歷史修復痕跡與展示條件，以制定相應的處理方式。
                  裝裱在此不僅作為形式完成，而是一種對作品長期保存的結構介入。
                  修復亦非單純回復視覺，而是在歷史、材料與時間之間，建立可持續存在的平衡關係。
                  柏宜山房的實踐，建立於工藝技術、材料理解與保存倫理之上，其核心並非改變作品，而是延長其在時間中的存在條件。
                </p>
              </div>
            </div>
          </section>
        )}

        {lang === 'en' && (
          <section id="about-en" className="border-b bg-white">
            <div className="mx-auto max-w-6xl px-4 py-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-center">
                About Brad Studio
              </h2>

              <div className="mt-8 max-w-3xl text-sm md:text-base text-gray-700 leading-relaxed space-y-6">
                <p className="font-medium text-gray-900">
                  Brad Studio is based in Taipei, specializing in the mounting
                  and restoration of traditional Chinese paintings.
                </p>

                <p>
                  Our practice is grounded in long-term craftsmanship and
                  material understanding, treating mounting as an extension of
                  the conditions for preservation. In sustained studio work, we
                  confront not only formal repair, but also the relationship
                  between change over time, material condition, and future
                  reassessment.
                </p>

                <p>
                  In 2014, the studio adopted the name “Brad Studio” in memory
                  of collaborator Bradley James Gardner (1982–2014).
                </p>

                <hr className="my-2 border-gray-200" />

                <p>
                  All treatments follow a reversible approach. Any intervention
                  in mounting or restoration is made on the condition that the
                  original work is not harmed, while preserving the possibility
                  of future treatment and renewed judgment.
                </p>

                <p>
                  Before each work is treated, we assess its structure and
                  material condition, including paper fibers, mounting layers,
                  traces of previous restorations, and display conditions, in
                  order to determine an appropriate course of treatment.
                </p>

                <p>
                  Mounting is understood not merely as a finishing process, but
                  as a structural intervention for the long-term preservation of
                  the work. Restoration is not simply the recovery of
                  appearance, but the establishment of a sustainable balance
                  between history, material, and time.
                </p>

                <p>
                  The practice of Brad Studio is rooted in craftsmanship,
                  material knowledge, and conservation ethics. Its purpose is
                  not to alter the work, but to extend the conditions of its
                  existence over time.
                </p>
              </div>
            </div>
          </section>
        )}
      </>

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
                ? '立軸裝裱：NT$12,000 起'
                : 'Hanging scrolls: from NT$12,000'}
            </li>

            <li>
              {lang === 'zh'
                ? '畫框裝裱：NT$8,000 起'
                : 'Framing: from NT$8,000'}
            </li>

            <li>
              {lang === 'zh'
                ? '書畫修復與保存處理：基本費用 NT$15,000 起'
                : 'Restoration: base fee from NT$15,000'}
            </li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">
            {lang === 'zh'
              ? '實際費用將依作品尺寸、年代與保存狀況進行評估。'
              : 'Final pricing depends on size, age, and condition of the artwork.'}
          </p>
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
  onSubmit={handleSubmit}
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
  type="submit"
  className="rounded-2xl px-5 py-3 border shadow hover:shadow-md"
>
  {lang === 'zh' ? '送出需求' : 'Send request'}
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
        <span className="underline">kuowenhsuan@gmail.com</span>
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

      {/* LA Studio */}
      <section id="la-studio" className="border-b bg-gray-50 text-center">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h3 className="text-lg font-medium text-gray-600">
            {lang === 'zh' ? '加州工作室計劃' : 'Los Angeles Studio Plan'}
          </h3>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            {lang === 'zh'
              ? '未來計畫：於洛杉磯設立工作據點，持續發展書畫裝裱與修復實踐。'
              : 'Future plan: establishing a working base in Los Angeles for mounting and conservation practice.'}
          </p>
          <p className="mt-2 text-xs text-gray-400">
            {lang === 'zh'
              ? 'Coming Soon · Los Angeles, California（籌備中）'
              : 'Coming Soon · Los Angeles, California'}
          </p>
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
              href="https://www.kuowenhsuan.com/"
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
}