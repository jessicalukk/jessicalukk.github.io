import React from 'react'

export default function LogoCarousel() {
  const logos = [
    { src: '/cibc_logo.png', alt: 'CIBC' },
    { src: '/microsoft_logo.webp', alt: 'Microsoft' },
    { src: '/formula_electric_logo.png', alt: 'Formula Electric' },
    { src: '/simplii_financial_logo.png', alt: 'Tech Bubble' }
  ]

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track">
        {[...logos, ...logos].map((logo, index) => (
          <div className="carousel-logo" key={index}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  )
}
