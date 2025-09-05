import React, { useEffect, useRef } from 'react'

const items = [
  {
    year: '2025',
    logo: '/cibc_logo.png',
    alt: 'CIBC logo',
    text: 'Data Analyst'
  },
  {
    year: '2024',
    logo: '/simplii_financial_logo.png',
    alt: 'CIBC logo',
    text: 'Simplii Operations Analyst — Managed and streamlined daily operations.'
  },
  {
    year: '2023',
    logo: '/formula_electric_logo.png',
    alt: 'UW Formula Electric logo',
    text: 'Formula Electric — Designed PCBs and improved car performance.'
  },
  {
    year: '2023',
    logo: '/microsoft_logo.webp',
    alt: 'Microsoft logo',
    text: 'Azure & AI Fundamentals — Developed a financial savings app.'
  }
]

function useReveal(ref) {
  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref])
}

export default function Timeline() {
  return (
    <div className="timeline">
      {items.map((item, idx) => (
        <TimelineItem key={idx} {...item} />
      ))}
    </div>
  )
}

function TimelineItem({ year, logo, alt, text }) {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <div ref={ref} className="timeline-item">
      <div className="timeline-logo"><img src={logo} alt={alt} /></div>
      <div className="timeline-content">
        <h2>{year}</h2>
        <p>{text}</p>
      </div>
    </div>
  )
}
