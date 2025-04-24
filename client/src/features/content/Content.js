import React, { useEffect } from 'react';
import contentList from '../../contentImgs.js';
import connectObj from '../connections/connectLogos.js';

export function Content() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Get the current scroll position
      const viewportHeight = window.innerHeight; // Get the viewport height
      const maxScroll = viewportHeight * 0.5; // 35% of the viewport height

      const opacity = Math.min(scrollPosition / maxScroll, 0.6); // Cap opacity at 0.6 (60%)
      const blur = Math.min((scrollPosition / maxScroll) * 7, 7); // Cap blur at 5px

      const film = document.querySelector('.imageFilm');
        film.style.background = `rgba(0, 0, 0, ${opacity})`; // Adjust the background opacity
        film.style.backdropFilter = `blur(${blur}px)`; // Apply the dynamic blur effect
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="contentMain">
      {contentList.map((item) => {
        return (
          <div className="contentDiv" key={item.id}>
            <div className="imageFilm"></div>
            <img src={item.image} alt={item.name} />
            <div className="profilePicture">
              <img src={connectObj[1].profileURL} alt="Creator's profile picture" />
              <h1>Josue Martinez</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}
