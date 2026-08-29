import Image from 'next/image'
import Link from 'next/link'
import ChenpiIntro from './ChenpiIntro'
import RipenessStages from './RipenessStages'
import styles from './page.module.css'

export const metadata = {
  title: '新会陈皮介绍 · 从青柑到冬后柑',
  description: '认识新会茶枝柑的五个采摘阶段、传统食养用途与四季使用方式。',
}

const seasons = [
  { season: '春夏', use: '小青 · 大青', copy: '香气清锐，适合清爽茶饮与餐后解腻。' },
  { season: '长夏 / 初秋', use: '二红', copy: '甜润与青香平衡，泡茶煲汤都比较轻松。' },
  { season: '秋冬', use: '大红 · 冬后', copy: '气质温润醇厚，适合汤粥与暖饮。' },
]

export default function HuichengChenpiPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <Image className={styles.heroImage} src="/ndd/assets/regions/huicheng-chenpi.webp" alt="从青柑到红柑及晒制完成的新会陈皮" fill priority sizes="(max-width: 680px) 100vw, 680px" />
        <div className={styles.heroShade} />
        <nav className={styles.nav}>
          <Link href="/" aria-label="返回产区地图">←</Link>
          <span>新会风物志</span>
          <b>GENERAL / 00</b>
        </nav>
        <div className={styles.heroCopy}>
          <p>XINHUI CHENPI · TIME MADE AROMA</p>
          <div className={styles.heroTitle}><span>陈</span><h1>新会<br />陈皮</h1></div>
          <h2>一枚茶枝柑，五段成熟刻度</h2>
          <div className={styles.heroMeta}><span>理气和中</span><span>燥湿化痰</span><span>陈久者良</span></div>
        </div>
      </header>

      <ChenpiIntro />

      <section className={styles.intro}>
        <div className={styles.sectionNo}>00 · INTRODUCTION</div>
        <h2>皮从果来，<br />香由时间完成。</h2>
        <p>新会陈皮以新会茶枝柑果皮晒制、陈化而成。随着时间推移，燥性渐减、气味愈加温和醇厚，民间因其稀贵而有“一两陈皮一两金”之说。</p>
        <div className={styles.tradition}>
          <span>传统认识</span>
          <div><strong>理气健脾</strong><strong>燥湿化痰</strong><strong>和胃止呕</strong><strong>疏肝利胆</strong></div>
        </div>
      </section>

      <section className={styles.ripeness}>
        <div className={styles.sectionNo}>01 · FIVE RIPENESS STAGES</div>
        <div className={styles.ripenessTitle}><h2>从青到红<br />五时五味</h2><p>08月<br />—<br />01月</p></div>
        <RipenessStages />
      </section>

      <section className={styles.aging}>
        <span>3</span>
        <div><p>YEARS & BEYOND</p><h2>陈化不是等待，<br />是香气缓慢重组。</h2><p>避光、通风、干燥保存，让果香逐渐收敛，木香、药香与甜润感随时间显现。</p></div>
      </section>

      <section className={styles.calendar}>
        <div className={styles.sectionNo}>02 · SEASONAL CALENDAR</div>
        <h2>四季怎么用</h2>
        <div className={styles.seasonList}>
          {seasons.map(item => <article key={item.season}><span>{item.season}</span><h3>{item.use}</h3><p>{item.copy}</p></article>)}
        </div>
      </section>

      <section className={styles.note}>
        <p>食养提示</p><h2>陈皮虽好，仍应适量。</h2><p>以上为传统食养与日常使用信息，不替代医疗诊断或用药建议；特殊体质、孕期或正在服药者，请先咨询专业人士。</p>
      </section>

      <footer className={styles.footer}><div><span>陈</span><p>农邻居 · 让好产地被看见</p></div><Link href="/">返回产区地图 ↗</Link></footer>
      <Link href="/" className={styles.floatingBack}>← 返回产区地图</Link>
    </main>
  )
}
