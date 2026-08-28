import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: '崖门产区 · 海风越过古战场',
  description: '走进新会崖门，认识出海口咸田、富硒土壤、滨海柑香与厚重海防人文。',
}

const fieldNotes = [
  { code: 'WIND', title: '海风通田', copy: '崖门水道直抵南海边缘，通风条件好，果园虫害相对更少。', icon: 'wind' },
  { code: 'SOIL', title: '围垦咸田', copy: '银湖湾围垦地略带盐碱，塑造皮身干爽、清朴利落的产区个性。', icon: 'soil' },
  { code: 'SE', title: '富硒线索', copy: '崖门土地含硒；2025 年陈皮检测记录中发现富硒成分。', icon: 'element' },
]

const route = [
  { no: '01', time: '09:00', title: '崖门古炮台', tag: '海防历史', copy: '触摸古炮遗存，从出海口回望一段守望山河的历史。' },
  { no: '02', time: '11:00', title: '宋元崖门海战文化旅游区', tag: '历史研学', copy: '沿着海潮读懂宋元更替与崖门水道的宏大叙事。' },
  { no: '03', time: '14:30', title: '银湖湾湿地', tag: '生态观潮', copy: '漫步滩涂，观看江海交融的水纹与候鸟生境。' },
  { no: '04', time: '17:30', title: '古兜温泉', tag: '温泉康养', copy: '在青山环抱中卸下旅途疲惫，让身体重新松弛。' },
]

const harvest = ['小青柑', '大青柑', '二红柑', '大红柑', '冬后柑']

function Icon({ name, size = 20 }) {
  const paths = {
    back: <path d="m15 18-6-6 6-6" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    wind: <><path d="M3 8h11a3 3 0 1 0-3-3" /><path d="M3 12h16a3 3 0 1 1-3 3" /><path d="M3 16h7" /></>,
    soil: <><path d="M3 7h18M5 11h14M7 15h10M9 19h6" /><circle cx="7" cy="7" r="1" /><circle cx="15" cy="11" r="1" /></>,
    element: <><circle cx="12" cy="12" r="9" /><path d="M8 15c1 1 2.2 1.5 4 1.5 2.2 0 4-1 4-2.8 0-4-7.5-1.2-7.5-5 0-1.7 1.5-3.2 3.8-3.2 1.5 0 2.7.4 3.7 1.2" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
    verify: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function SectionCode({ index, children }) {
  return <div className={styles.sectionCode}><span>{index}</span><b>{children}</b></div>
}

export default function YamenPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/assets/yamen/estuary-hero.png"
          alt="崖门出海口、古炮台与湿地水乡"
          fill
          priority
          sizes="(max-width: 720px) 100vw, 720px"
        />
        <div className={styles.heroWash} />
        <header className={styles.topbar}>
          <Link href="/" className={styles.back} aria-label="返回产区地图"><Icon name="back" /></Link>
          <div><small>ORIGIN ARCHIVE</small><strong>新会产区档案</strong></div>
          <span className={styles.archiveNo}>08<br /><i>YM</i></span>
        </header>
        <div className={styles.coordinate}>22°N / 113°E<br />ESTUARY GATE</div>
        <div className={styles.heroTitle}>
          <p>海风越过古战场</p>
          <h1>崖門</h1>
          <div className={styles.heroMeta}>
            <span><Icon name="pin" size={14} />江门 · 新会</span>
            <b>YAMEN<br />COASTAL ORIGIN</b>
          </div>
        </div>
        <div className={styles.tideScale} aria-hidden="true"><i /><i /><i /><i /><i /><span>TIDE 04.8M</span></div>
      </section>

      <section className={styles.dispatch}>
        <div className={styles.dispatchHead}><span>FIELD DISPATCH</span><time>ARCHIVE / 08</time></div>
        <p>崖门水道出海口，一边是宋元海战与古炮台的历史回声，一边是银湖湾围垦之后生长起来的新柑园。</p>
        <div className={styles.dispatchFacts}>
          <div><small>身份</small><strong>海门古战场</strong></div>
          <div><small>风土</small><strong>通风咸田</strong></div>
          <div><small>柑香</small><strong>滨海清朴</strong></div>
        </div>
      </section>

      <section className={styles.terroir}>
        <SectionCode index="01">COASTAL TERROIR</SectionCode>
        <div className={styles.titleRow}>
          <h2>风从海上来<br />柑在咸田生</h2>
          <span>江海交界<br />一口清朴</span>
        </div>
        <div className={styles.fieldGrid}>
          {fieldNotes.map((note, index) => (
            <article key={note.code} className={styles.fieldCard}>
              <div className={styles.fieldTop}><span>0{index + 1}</span><Icon name={note.icon} size={24} /></div>
              <small>{note.code}</small>
              <h3>{note.title}</h3>
              <p>{note.copy}</p>
            </article>
          ))}
        </div>
        <div className={styles.weatherStrip}>
          <span>SEA BREEZE</span><b>通风 · 光热足 · 湿度较低</b><i>DRY PEEL</i>
        </div>
      </section>

      <section className={styles.specimen}>
        <SectionCode index="02">CITRUS SPECIMEN</SectionCode>
        <div className={styles.specimenGrid}>
          <div className={styles.fruitPlate} aria-hidden="true">
            <div className={styles.crossSection}><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <span>YAMEN<br />RED MANDARIN</span>
          </div>
          <div className={styles.specimenCopy}>
            <p className={styles.micro}>SPECIMEN / R-112</p>
            <h2>崖门<br />大红柑</h2>
            <p>皮干爽规整，油胞中细。香气清朴，隐约带着海风底色；汤感干净、少杂味，适合日常烹饪与调味。</p>
            <dl>
              <div><dt>主产阶段</dt><dd>二红 · 大红</dd></div>
              <div><dt>风格类型</dt><dd>滨海清朴派</dd></div>
              <div><dt>日常角色</dt><dd>膳食调味主力</dd></div>
            </dl>
          </div>
        </div>
        <div className={styles.seleniumNote}>
          <span>Se</span>
          <div><small>2025 / TEST NOTE</small><strong>检测记录中的富硒线索</strong><p>来自崖门土地的独特元素，仍值得持续观察与研究。</p></div>
        </div>
      </section>

      <section className={styles.route}>
        <SectionCode index="03">COASTAL FIELD ROUTE</SectionCode>
        <div className={styles.titleRow}>
          <h2>沿着潮线<br />读一日崖门</h2>
          <span>历史 · 湿地<br />温泉 · 柑乡</span>
        </div>
        <div className={styles.routeMap}>
          <div className={styles.routeLine} aria-hidden="true" />
          {route.map((stop) => (
            <article key={stop.no}>
              <div className={styles.stopNo}>{stop.no}</div>
              <time>{stop.time}</time>
              <div><span>{stop.tag}</span><h3>{stop.title}</h3><p>{stop.copy}</p></div>
            </article>
          ))}
        </div>
        <div className={styles.routeFooter}><b>再加一站</b><span>崖门海鲜与渔家农家菜</span><Icon name="arrow" size={17} /></div>
      </section>

      <section className={styles.harvest}>
        <div className={styles.harvestMonth}><strong>08</strong><span>月</span><i>—</i><strong>01</strong><span>月</span></div>
        <div className={styles.harvestCopy}>
          <SectionCode index="04">HARVEST WINDOW</SectionCode>
          <h2>迎着海风<br />入园开柑</h2>
          <p>从青到红，每一阶段都是不同的柑香切片。入园采果，再用非遗二刀法亲手开出一朵陈皮。</p>
        </div>
        <div className={styles.harvestTicker}>
          {harvest.map((item, index) => <span key={item}><i>{index + 1}</i>{item}</span>)}
        </div>
      </section>

      <section className={styles.trace}>
        <div className={styles.traceIcon}><Icon name="verify" size={27} /></div>
        <small>NLJ / TRACE SYSTEM</small>
        <h2>果园不是黑箱</h2>
        <p>崖门合作果园接入农邻居数据农场。开花、施肥与用药记录持续留痕，让每一颗果的来路更清楚。</p>
        <div className={styles.traceData}><span>FLOWER / 花期</span><span>FERTILIZE / 施肥</span><span>RECORD / 用药</span></div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaSeal}>崖門<br /><span>YM</span></div>
        <p>FROM ESTUARY TO TABLE</p>
        <h2>尝一瓣<br />海风里的柑</h2>
        <div className={styles.actions}>
          <span>预约滨海采摘</span><Icon name="arrow" />
        </div>
        <small>农邻居 · 让好产地被看见</small>
      </section>
    </main>
  )
}
