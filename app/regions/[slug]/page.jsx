import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { regionStories, storyBySlug } from '../../../src/regionStories'
import SeasonScale from './SeasonScale'
import styles from './story.module.css'

export function generateStaticParams() {
  return regionStories.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const story = storyBySlug[slug]
  return story ? { title: `${story.name}产区｜新会陈皮`, description: story.summary } : {}
}

export default async function RegionStoryPage({ params }) {
  const { slug } = await params
  const story = storyBySlug[slug]
  if (!story) notFound()

  const theme = {
    '--ink': story.colors.ink,
    '--deep': story.colors.deep,
    '--accent': story.colors.accent,
    '--soft': story.colors.soft,
    '--paper': story.colors.paper,
  }
  const index = String(regionStories.findIndex(item => item.slug === slug) + 1).padStart(2, '0')

  return (
    <main className={`${styles.page} ${styles[story.variant]} ${styles[story.motif]}`} style={theme}>
      <header className={styles.hero}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.back} aria-label="返回产区地图">← <span>产区地图</span></Link>
          <span className={styles.navSeal}>新会陈皮 · 产地志</span>
          <span className={styles.index}>{index} / {regionStories.length}</span>
        </nav>

        <div className={styles.heroGrid}>
          <div className={`${styles.heroCopy} ${styles[`cover_${story.variant}`]}`}>
            <span className={styles.coverRule} aria-hidden="true" />
            <span className={styles.coverCode}>ORIGIN / {index}</span>
            <p className={styles.eyebrow}>{story.eyebrow}</p>
            <div className={styles.titleRow}>
              <span className={styles.mark} aria-hidden="true">{story.mark}</span>
              <div><h1>{story.name}</h1><p>新会柑核心风土档案</p></div>
            </div>
            <h2>{story.headline}</h2>
            <p className={styles.summary}>{story.summary}</p>
            {story.rank.startsWith('一线') && <span className={styles.coverIndex}>{story.rank}</span>}
          </div>
          <div className={styles.heroArt}>
            <Image
              className={styles.heroImage}
              src={`/assets/regions/${story.slug}-hero.webp`}
              alt={`${story.name}产区风土主视觉`}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <span className={styles.imageWash} aria-hidden="true" />
            <span className={styles.symbol}>{story.mark}</span>
            <span className={styles.coordinates}>22°N · XINHUI</span>
            <span className={styles.photoCaption}>{story.terrain[0][0]} / {story.journey[0][0]}</span>
          </div>
        </div>

        <div className={styles.facts}>
          {story.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </header>

      {/* 悬浮引言卡 */}
      <aside className={styles.introCard}>
        <span className={styles.introMark} aria-hidden="true">“</span>
        <p>{story.summary}</p>
        <small>广东 · 江门 · 新会 · {story.name}产区</small>
      </aside>

      <div className={styles.body}>

        {/* 01 历史溯源 */}
        <section className={styles.section}>
          <span className={styles.num}>01 / 历史溯源</span>
          <h2>从一方地名，到百年柑乡</h2>
          <p className={styles.lead}>{story.name}的名字、来路与种柑记忆，从这里说起。</p>
          <div className={styles.textCard}>
            <strong>{story.foundation}</strong>
          </div>
        </section>

        {/* 02 种植土质 */}
        <section className={styles.section}>
          <span className={styles.num}>02 / 种植土质</span>
          <h2>{story.terroirTitle}</h2>
          <p className={styles.lead}>一方水土养一方柑，读懂土质，就读懂了这里的陈皮。</p>
          <div className={styles.textCard}>
            <strong>{story.soilStory}</strong>
          </div>
        </section>

        {/* 03 新会柑特性 */}
        <section className={styles.section}>
          <span className={styles.num}>03 / 新会柑特性</span>
          <h2>{story.fruitName}</h2>
          <p className={styles.lead}>从皮相到口感，新会柑的个性都写在果子里。</p>
          <div className={styles.flavourCard}>
            <span className={styles.flavourMark} aria-hidden="true">{story.mark}</span>
            <h3>{story.fruitName}</h3>
            <p>{story.fruitDescription}</p>
            {story.rank.startsWith('一线') && <div className={styles.rankBadge}>{story.rank}</div>}
          </div>
        </section>

        {/* 04 人文建筑 */}
        <section className={styles.section}>
          <span className={styles.num}>04 / 人文建筑</span>
          <h2>循着建筑与乡愁，走进{story.name}</h2>
          <p className={styles.lead}>一条从人文建筑到风土柑园的行读路线。</p>
          <div className={styles.featureList}>
            {story.journey.map(([place, copy], index) => (
              <div className={styles.feature} key={place}>
                <span className={styles.featureIcon}>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{place}</h3><p>{copy}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* 05 时令体验 */}
        <section className={styles.section}>
          <span className={styles.num}>05 / 时令体验</span>
          <h2>从青柑，到冬后柑</h2>
          <p className={styles.lead}>每年 8 月至次年 1 月是新会柑的采摘季，每个阶段都有不同的香气与用途。</p>
          <SeasonScale />
        </section>

        {/* 区域价值 CTA */}
        <section className={styles.cta}>
          <span className={styles.ctaKicker}>REGIONAL VALUE</span>
          <h2>{story.valueTitle}</h2>
          <p>{story.valueCopy}</p>
          <Link href="/" className={styles.ctaButton}>返回产区总览 <span>↗</span></Link>
        </section>

      </div>

      <footer className={styles.footer}>
        <div><span className={styles.footerMark}>{story.mark}</span><div><p>XINHUI ORIGIN ARCHIVE</p><h2>每一片陈皮，都有自己的故乡。</h2></div></div>
        <Link href="/">返回产区总览 <span>↗</span></Link>
      </footer>

      {/* 底部悬浮返回 */}
      <Link href="/" className={styles.dock}>← 返回产区地图</Link>
    </main>
  )
}