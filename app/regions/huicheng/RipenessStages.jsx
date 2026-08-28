'use client'

import styles from './page.module.css'

const stages = [
  { no: '01', month: '08.01—09.01', name: '小青柑', color: '#1f5540', feature: '青绿 · 油室密集 · 香气高锐', role: '传统上偏重疏肝理气、消积化滞。', scene: '适合制成小青柑普洱茶，风味清润、解腻。', months: [8, 9] },
  { no: '02', month: '09.01—10.01', name: '大青柑', color: '#527045', feature: '青转黄绿 · 皮稍厚 · 挥发油丰富', role: '传统上用于理气调中、燥湿化痰。', scene: '晒干后可搭配白茶、普洱冲泡，亦用于配伍。', months: [9, 10] },
  { no: '03', month: '10.01—11.01', name: '二红柑', color: '#b57732', feature: '黄绿带红 · 皮渐厚 · 甜度增加', role: '传统上用于理气健脾、调和肝脾。', scene: '日常煲汤、煮水、泡茶皆宜，气质温和。', months: [10, 11] },
  { no: '04', month: '11.01—12.01', name: '大红柑', color: '#b74729', feature: '全红 · 皮厚 · 油室饱满', role: '传统上偏重健脾和胃、温中化痰。', scene: '陈化后称大红皮，适合煮水、炖汤和煮粥。', months: [11, 12] },
  { no: '05', month: '12.01—01.01', name: '冬后柑', color: '#742f28', feature: '深红至紫红 · 皮厚柔软 · 果香浓', role: '传统食养取其温和、温润的特点。', scene: '适合冬季炖汤、煮茶或泡酒，风味最为醇甜。', months: [12, 1] },
]

export default function RipenessStages() {
  const month = new Date().getMonth() + 1
  return (
    <div className={styles.stageList}>
      {stages.map((stage) => {
        const active = stage.months.includes(month)
        return (
          <article key={stage.name} style={{ '--stage': stage.color }} className={active ? styles.stageCurrent : ''}>
            <div className={styles.stageHead}><span>{stage.no}</span><time>{stage.month}</time><i /></div>
            <div className={styles.stageName}><h3>{stage.name}</h3><strong>{stage.feature}</strong></div>
            <p>{stage.role}</p><p>{stage.scene}</p>
          </article>
        )
      })}
    </div>
  )
}