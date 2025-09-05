import React from 'react'

export default function Nav() {
  return (
    <nav className="nav">
      <a href="#home" className="brand">JL</a>
      <ul>
        <li><a href="#home">home</a></li>
        <li><a href="#experience">experiences</a></li>
        <li><a href="#projects">projects</a></li>
      </ul>
    </nav>
  )
}
