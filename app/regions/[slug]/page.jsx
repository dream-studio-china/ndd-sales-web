import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { regionStories, storyBySlug } from '../../../src/regionStories'
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

  return (
    <main className={`${styles.page} ${styles[story.variant]} ${styles[story.motif]}`} style={theme}>
      <header className={styles.hero}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.back} aria-label="返回产区地图">← <span>产区地图</span></Link>
          <span className={styles.navSeal}>新会陈皮 · 产区志</span>
          <span className={styles.index}>{String(regionStories.findIndex(item => item.slug === slug) + 1).padStart(2, '0')} / {regionStories.length}</span>
        </nav>

        <div className={styles.heroGrid}>
          <div className={`${styles.heroCopy} ${styles[`cover_${story.variant}`]}`}>
            <span className={styles.coverRule} aria-hidden="true" />
            <span className={styles.coverCode}>ORIGIN / {String(regionStories.findIndex(item => item.slug === slug) + 1).padStart(2, '0')}</span>
            <p className={styles.eyebrow}>{story.eyebrow}</p>
            <div className={styles.titleRow}>
              <span className={styles.mark} aria-hidden="true">{story.mark}</span>
              <div><h1>{story.name}</h1><p>新会柑核心风土档案</p></div>
            </div>
            <h2>{story.headline}</h2>
            <p className={styles.summary}>{story.summary}</p>
            <span className={styles.coverIndex}>{story.rank}</span>
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

      <section className={styles.origin}>
        <div className={styles.sectionLabel}><span>01</span> 来处 · ORIGIN</div>
        <div className={styles.originGrid}>
          <h2>一方地名，<br />一段水土记忆。</h2>
          <p>{story.foundation}</p>
        </div>
      </section>

      <section className={styles.terroir}>
        <div className={styles.sectionLabel}><span>02</span> 风土 · TERROIR</div>
        <div className={styles.terroirHead}>
          <h2>{story.terroirTitle}</h2>
          <p>{story.terroirIntro}</p>
        </div>
        <div className={styles.terrainCards}>
          {story.terrain.map(([title, copy], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.fruit}>
        <div className={styles.fruitVisual} aria-hidden="true">
          <div className={styles.citrus}><i /><b>{story.mark}</b></div>
          <span>本区风味标本</span>
        </div>
        <div className={styles.fruitCopy}>
          <div className={styles.sectionLabel}><span>03</span> 柑香 · AROMA</div>
          <p className={styles.rank}>{story.rank}</p>
          <h2>{story.fruitName}</h2>
          <p>{story.fruitDescription}</p>
          <div className={styles.tasting}>{story.tasting.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
      </section>

      <section className={styles.value}>
        <p>REGIONAL VALUE</p>
        <h2>{story.valueTitle}</h2>
        <div><span>{story.mark}</span><p>{story.valueCopy}</p></div>
      </section>

      <section className={styles.journey}>
        <div className={styles.sectionLabel}><span>04</span> 入境 · JOURNEY</div>
        <div className={styles.journeyTitle}><h2>沿着风土，走进{story.name}</h2><p>一条从人文到柑园的产区路线</p></div>
        <div className={styles.stops}>
          {story.journey.map(([place, copy], index) => (
            <article key={place}><span>{String(index + 1).padStart(2, '0')}</span><h3>{place}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.season}>
        <p>一枚柑的成熟刻度</p>
        <div className={styles.timeline}><span>8月 青柑</span><i /><span>10月 二红</span><i /><span>12月 大红</span><i /><span>三年 陈香初成</span></div>
      </section>

      <footer className={styles.footer}>
        <div><span className={styles.footerMark}>{story.mark}</span><div><p>XINHUI ORIGIN ARCHIVE</p><h2>每一片陈皮，都有自己的故乡。</h2></div></div>
        <Link href="/">返回产区总览 <span>↗</span></Link>
      </footer>
    </main>
  )
}
