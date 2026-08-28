'use client'

import styles from './story.module.css'

const steps = [
  { months: [8, 9], label: '8月', note: '青柑 · 清锐' },
  { months: [10, 11], label: '10月', note: '二红 · 甜润' },
  { months: [12, 1], label: '12月', note: '大红 · 醇厚' },
  { months: [2, 3, 4, 5, 6, 7], label: '三年', note: '陈香初成' },
]

export default function SeasonScale() {
  const month = new Date().getMonth() + 1
  return (
    <div className={styles.seasonCards}>
      {steps.map((step) => (
        <div
          key={step.label}
          className={`${styles.seasonCard} ${step.months.includes(month) ? styles.seasonActive : ''}`}
        >
          <b>{step.label}</b>
          <span>{step.note}</span>
        </div>
      ))}
    </div>
  )
}