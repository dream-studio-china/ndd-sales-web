import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: '新会陈皮介绍 · 从青柑到冬后柑',
  description: '认识新会茶枝柑的五个采摘阶段、传统食养用途与四季使用方式。',
}

const stages = [
  { no: '01', month: '08.01—09.01', name: '小青柑', color: '#1f5540', feature: '青绿 · 油室密集 · 香气高锐', role: '传统上偏重疏肝理气、消积化滞。', scene: '适合制成小青柑普洱茶，风味清润、解腻。' },
  { no: '02', month: '09.01—10.01', name: '大青柑', color: '#527045', feature: '青转黄绿 · 皮稍厚 · 挥发油丰富', role: '传统上用于理气调中、燥湿化痰。', scene: '晒干后可搭配白茶、普洱冲泡，亦用于配伍。' },
  { no: '03', month: '10.01—11.01', name: '二红柑', color: '#b57732', feature: '黄绿带红 · 皮渐厚 · 甜度增加', role: '传统上用于理气健脾、调和肝脾。', scene: '日常煲汤、煮水、泡茶皆宜，气质温和。' },
  { no: '04', month: '11.01—12.01', name: '大红柑', color: '#b74729', feature: '全红 · 皮厚 · 油室饱满', role: '传统上偏重健脾和胃、温中化痰。', scene: '陈化后称大红皮，适合煮水、炖汤和煮粥。' },
  { no: '05', month: '12.01—01.01', name: '冬后柑', color: '#742f28', feature: '深红至紫红 · 皮厚柔软 · 果香浓', role: '传统食养取其温和、温润的特点。', scene: '适合冬季炖汤、煮茶或泡酒，风味最为醇甜。' },
]

const seasons = [
  { season: '春夏', use: '小青 · 大青', copy: '香气清锐，适合清爽茶饮与餐后解腻。' },
  { season: '长夏 / 初秋', use: '二红', copy: '甜润与青香平衡，泡茶煲汤都比较轻松。' },
  { season: '秋冬', use: '大红 · 冬后', copy: '气质温润醇厚，适合汤粥与暖饮。' },
]

export default function HuichengChenpiPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <Image className={styles.heroImage} src="/assets/regions/huicheng-chenpi.webp" alt="从青柑到红柑及晒制完成的新会陈皮" fill priority sizes="(max-width: 680px) 100vw, 680px" />
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
        <div className={styles.stageList}>
          {stages.map(stage => (
            <article key={stage.name} style={{ '--stage': stage.color }}>
              <div className={styles.stageHead}><span>{stage.no}</span><time>{stage.month}</time><i /></div>
              <div className={styles.stageName}><h3>{stage.name}</h3><strong>{stage.feature}</strong></div>
              <p>{stage.role}</p><p>{stage.scene}</p>
            </article>
          ))}
        </div>
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
    </main>
  )
}
