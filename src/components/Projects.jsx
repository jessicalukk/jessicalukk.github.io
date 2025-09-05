import React, { useEffect } from 'react';

export default function Projects() {
  useEffect(() => {
    const heading = document.getElementById('projects-heading');

    const handleScroll = () => {
      if (!heading) return;
      const rect = heading.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible) {
        heading.classList.add('start-typing');
      } else {
        heading.classList.remove('start-typing');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="featured-project" id="projects">
      <h2 id="projects-heading" className="projects-heading typing-animation">MY PROJECTS</h2>
      <a
        href="https://github.com/JustinScitech/BubbleMathics"
        target="_blank"
        rel="noopener noreferrer"
        className="project-card hover-reveal-card"
      >
        <div className="project-image-wrapper">
          <img
            src="/bubble_mathics.png"
            alt="BubbleMathics Screenshot"
            className="project-bubble-image"
          />
          <div className="overlay-text">
            <div>
              <h3>BubbleMathics</h3>
              <p>Real-time interactive & collaborative math game. Built with MERN & Socket.io.</p>
            </div>
          </div>
        </div>
      </a>
    </section>
  );
}
