import React, { useEffect } from 'react';
import stickybits from 'stickybits'; // Import stickybits
import contentMedia from '../../contentImgs.js';

export function Content() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Get the current scroll position
      const viewportHeight = window.innerHeight; // Get the viewport height
      const maxScroll = viewportHeight * 0.5; // 35% of the viewport height

      const opacity = Math.min(scrollPosition / maxScroll, 0.8); // Cap opacity at 0.6 (60%)
      const blur = Math.min((scrollPosition / maxScroll) * 7, 7); // Cap blur at 5px

      const film = document.querySelector('.imageFilm');
        // film.style.background = `rgba(0, 0, 0, ${opacity})`; // Adjust the background opacity
        film.style.backdropFilter = `blur(${blur}px)`; // Apply the dynamic blur effect
    };

    window.addEventListener('scroll', handleScroll);
    stickybits('.contentMain', { stickyBitStickyOffset: 3.5 * 16 }); // Add stickybits with top offset of 3.5em
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="contentMain">
      {contentMedia.map((item) => {
        return (
          <div className="contentDiv" key={item.id}>
            <div className="imageFilm"></div>
            <img src={item.image} alt={item.name} />
          </div>
        );
      })}
    </div>
  );
}
