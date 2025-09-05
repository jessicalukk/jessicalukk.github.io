import React from 'react'
import Nav from './components/Nav.jsx'
import HeroExperience from './components/HeroExperience.jsx'
import Projects from './components/Projects.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <HeroExperience />

        <section id="projects" className="pad-y">
          <Projects />
        </section>

        
      </main>
      <footer>© {new Date().getFullYear()} Jessica Luk</footer>
    </>
  )
}

<h1 className="metal-text">Jessica&nbsp;Luk</h1>

