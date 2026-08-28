'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function ChenpiIntro() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className={styles.introFold}>
      <div className={styles.introFoldBlock}>
        <h3>什么是新会陈皮</h3>
        <p>新会陈皮，是用广东江门新会出产的茶枝柑果皮，经晒干并陈化三年以上而成的干制果皮。新会地处西江、潭江与南海咸淡水交汇之处，独特的水土让柑皮油室细密、香气醇厚，陈放越久越显温润，因此有“一两陈皮一两金”的说法，也是“广陈皮”中最负盛名的一支。</p>
      </div>

      <div className={`${styles.introFoldBlock} ${styles.foldTarget} ${expanded ? styles.foldOpen : ''}`}>
        <h3>新会陈皮的功效</h3>
        <p>传统上，新会陈皮有理气健脾、燥湿化痰、和胃止呕的用途，常用于改善脘腹胀满、消化不良与咳嗽痰多；现代研究则发现，陈皮中的挥发油、橙皮苷与川陈皮素等活性成分，有助于促进消化液分泌、舒缓胃肠胀气，其所含黄酮类物质亦有抗氧化作用。日常将它泡茶、煲汤、入膳，温和百搭。</p>
      </div>

      <button
        className={styles.foldToggle}
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? '收起' : '查看全部'} <span>{expanded ? '↑' : '↓'}</span>
      </button>
    </section>
  )
}