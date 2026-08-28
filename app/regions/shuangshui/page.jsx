import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: '双水产区 · 山水之间的柑稻之乡',
  description: '走进新会双水，了解古兜山与潭江平原共同孕育的双水大红柑、采摘季与乡土人文。',
}

const facts = [
  { value: '明代', label: '建镇肇始' },
  { value: '2种', label: '山地·平原风土' },
  { value: '8—1月', label: '新会柑采摘季' },
]

const harvest = [
  { month: '08—09', name: '小青柑', note: '清新馥郁，果香明快' },
  { month: '09—10', name: '大青柑', note: '青香渐柔，滋味饱满' },
  { month: '10—11', name: '二红柑', note: '甜润初显，香气平衡' },
  { month: '11—12', name: '大红柑', note: '圆润丰盈，适合收藏' },
  { month: '12—01', name: '冬后柑', note: '成熟醇甜，风味沉厚' },
]

const journey = [
  { index: '01', title: '将军山大圣寺', copy: '循山而上，在林木与古寺之间感受双水的禅意古韵。' },
  { index: '02', title: '红色人文记忆', copy: '走访张其光文化纪念地与岛桥红色文旅点，读懂乡土精神。' },
  { index: '03', title: '柑园非遗体验', copy: '入园采下当季鲜果，亲手体验非遗二刀法开皮。' },
]

function Icon({ name, size = 20 }) {
  const paths = {
    back: <path d="m15 18-6-6 6-6" />,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
    mountain: <><path d="m3 20 6-10 4 5 3-5 5 10" /><path d="M2 20h20" /></>,
    water: <><path d="M3 8c2.2 0 2.2-2 4.5-2S9.8 8 12 8s2.2-2 4.5-2S18.8 8 21 8" /><path d="M3 13c2.2 0 2.2-2 4.5-2s2.3 2 4.5 2 2.2-2 4.5-2 2.3 2 4.5 2" /><path d="M3 18c2.2 0 2.2-2 4.5-2s2.3 2 4.5 2 2.2-2 4.5-2 2.3 2 4.5 2" /></>,
    leaf: <><path d="M20 4c-8 0-14 4-14 10 0 3 2 5 5 5 6 0 9-7 9-15Z" /><path d="M4 21c3-6 7-10 13-13" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

export default function ShuangshuiPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/assets/shuangshui/orchard-hero.png"
          alt="古兜山下、潭江平原旁的双水新会柑园"
          fill
          priority
          sizes="(max-width: 680px) 100vw, 680px"
        />
        <div className={styles.heroShade} />
        <header className={styles.topbar}>
          <Link className={styles.roundButton} href="/" aria-label="返回产区地图"><Icon name="back" /></Link>
          <span>新会 · 产区志</span>
          <span className={styles.edition}>NO. 07</span>
        </header>
        <div className={styles.heroCopy}>
          <div className={styles.location}><Icon name="pin" size={15} /> 广东江门 · 新会双水镇</div>
          <p className={styles.kicker}>MOUNTAIN MEETS PLAIN</p>
          <h1>双水<span>产区</span></h1>
          <p className={styles.heroLead}>古兜山下，潭江之畔<br />一颗柑，兼得山气与水土</p>
        </div>
        <div className={styles.scrollCue}><span />向下探索</div>
      </section>

      <section className={styles.intro}>
        <div className={styles.sectionMark}>01 · ORIGIN</div>
        <p className={styles.leadText}>双水立镇于明。西倚古兜山，东北接潭江冲积平原，山与水在这里共同写下风土。</p>
        <p className={styles.bodyText}>旧时稻、蔗、蒲葵连片；近二十年柑园复兴，双水成为新会西南部最具活力的新兴产区之一。</p>
        <div className={styles.factGrid}>
          {facts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
        </div>
      </section>

      <section className={styles.terroir}>
        <div className={styles.sectionHeading}>
          <div><span>02 · TERROIR</span><h2>一镇，兼得<br />两种风土</h2></div>
          <p>山平原交错的<br />天然肥力池</p>
        </div>
        <div className={styles.terrainCard}>
          <div className={styles.contourLines} aria-hidden="true" />
          <div className={styles.terrainHalf}>
            <span className={styles.terrainIcon}><Icon name="mountain" /></span>
            <small>WEST · 古兜山</small>
            <h3>山溪入园</h3>
            <p>山地气息清爽，昼夜温差更为鲜明。</p>
          </div>
          <div className={`${styles.terrainHalf} ${styles.plain}`}>
            <span className={styles.terrainIcon}><Icon name="water" /></span>
            <small>NORTHEAST · 潭江</small>
            <h3>平原沃土</h3>
            <p>冲积淤土沙黏交替，肥力适中、热量充足。</p>
          </div>
          <div className={styles.terrainResult}><span>山地 × 平原</span><strong>折中派风味</strong></div>
        </div>
      </section>

      <section className={styles.flavour}>
        <div className={styles.citrusOrb} aria-hidden="true"><span /><i /></div>
        <div className={styles.flavourCopy}>
          <div className={styles.sectionMark}>03 · THE FRUIT</div>
          <h2>双水<br />大红柑</h2>
          <p>皮圆润饱满，油胞均匀。新皮柑香里带着清朗草本气，陈化后沉稳醇和，不走偏锋。</p>
          <div className={styles.tastingNotes}>
            <span>圆润饱满</span><span>草本柑香</span><span>耐煮适汤</span>
          </div>
        </div>
      </section>

      <section className={styles.season}>
        <div className={styles.sectionHeading}>
          <div><span>04 · HARVEST</span><h2>从青到红<br />一季五味</h2></div>
          <div className={styles.seasonBadge}>8月<small>至</small>1月</div>
        </div>
        <div className={styles.timeline}>
          {harvest.map((item, index) => (
            <article className={styles.timelineItem} key={item.name}>
              <div className={styles.timelineDot} style={{ '--ripeness': `${25 + index * 18}%` }}><i /></div>
              <time>{item.month}</time>
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
        <p className={styles.seasonNote}>不同成熟阶段，各有独特香气与居家食养体验。</p>
      </section>

      <section className={styles.journey}>
        <div className={styles.sectionMark}>05 · JOURNEY</div>
        <h2>不止柑香<br />也有人间故事</h2>
        <p className={styles.bodyText}>古寺胜迹、红色记忆与田园柑乡在双水相遇，适合用半日到一日慢慢走读。</p>
        <div className={styles.journeyList}>
          {journey.map((item) => (
            <article key={item.index}>
              <span>{item.index}</span>
              <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              <Icon name="arrow" size={18} />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.trust}>
        <span className={styles.trustIcon}><Icon name="shield" size={25} /></span>
        <div className={styles.sectionMark}>TRACEABLE FARMING</div>
        <h2>每一颗，都有来路</h2>
        <p>双水合作果园接入农邻居数据农场：开花、施肥与用药记录持续留痕，让种植过程更透明。</p>
        <div className={styles.trustTags}><span>产地直连</span><span>过程可溯</span><span>鲜果现摘</span></div>
      </section>

      <section className={styles.cta}>
        <p>从双水柑园，到你的餐桌</p>
        <h2>来摘一颗<br />山水养成的柑</h2>
        <div className={styles.ctaActions}>
          <a href="#reserve">预约采摘 <Icon name="arrow" size={18} /></a>
          <a href="#order" className={styles.secondaryAction}>咨询鲜果</a>
        </div>
        <span className={styles.brand}>农邻居 · 让好产地被看见</span>
      </section>
    </main>
  )
}
