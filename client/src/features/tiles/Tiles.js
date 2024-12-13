import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './tilesSlice';
import { togglePopup } from '../popup/popupSlice';
import imageList from '../../images.js';

export function Tiles() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  // const tilesMain = useRef(null);
  const tileRefs = useRef([]);
  const boxRef = useRef(null);
  // const tileParentRef = useRef(null);
  // const [tileEntries, setTileEntries] = useState([]);

    useEffect(() => { 
      console.log('tileRefs', tileRefs);
    const screenWidth = document.documentElement.clientWidth;
    if(screenWidth < 769) {
      const thresholdList = [];
      for (let i=0; i<=1; i+=0.01) {
        thresholdList.push(i);
      }
      
      const observer = new IntersectionObserver((entries) => {
        
        entries.forEach(entry => {
          let prevRatio = entry.target.prevRatio;
          const tile = entry.target;
          const imgP = entry.target.children[0];
          const img = entry.target.children[1];
          function scale(min, max) {
            let n = min + (entry.intersectionRatio * max);
            return n;
          }

          if(entry.isIntersecting) {
            //get element with class of tilesMain
            const tilesMain = document.querySelector('.tilesMain');
            let lastScrollX = tilesMain.scrollLeft;
            console.log('lastScrollX: ', lastScrollX);
            let currentScrollX;
            // console.log('currentScrollX: ', currentScrollX);
            
            const detectScrollMomentum = () => {
              currentScrollX = tilesMain.scrollLeft;
              console.log('currentScrollX: ', currentScrollX);
              const scrollSpeed = Math.abs(currentScrollX - lastScrollX);
              console.log('scrollSpeed: ', scrollSpeed);
              lastScrollX = currentScrollX;
              console.log('lastScrollX: ', lastScrollX);

              if(scrollSpeed < 5) { //adjust threshold as needed.
                //Align the tile to the center of the screen.
                console.log('what the fuck');
                const viewportWidth = screenWidth;
                const tileWidth = tile.offsetWidth;
                const leftOffset = (viewportWidth - tileWidth) / 2;
                // tile.style.left = `${leftOffset}px`;
              } else {
                console.log('what the fuck, else')
                requestAnimationFrame(detectScrollMomentum);
              }
            };
            detectScrollMomentum();

            tile.classList.add('transformTile'); // this will change the margin, boxy shadow, and z-index of the tile.
            img.style.transform = `scale(${scale(1, .2)})`;
            tile.style.margin = `auto ${scale(10, 10)}px`;
            entry.target.prevRatio = entry.intersectionRatio;
          };
          tile.classList.remove('transformTile'); // remove the transformTile class from the tile.
        });
        }, 

        {
          // root: null,
          rootMargin: `0px -${screenWidth - (screenWidth/2 + 130)}px 0px -${screenWidth - (screenWidth/2 + 130)}px`, // '0px 0px 0px 0px'
          threshold: thresholdList,
        },
      );    
      console.log(observer);
        tileRefs.current.forEach(tile => {
          observer.observe(tile);
        });
    }
    //get the object of the element with a class of 'redBox'
    const redBox = boxRef.current;
    // console.log('redBox: ', redBox);
    redBox.style.width =260 + 'px';
    redBox.style.left = ((screenWidth/2) - 130) + 'px';
  }, [])  
  // onClick={() => dispatch(togglePopup())}   //taken off div with className 'tile' for now.
  // Instead of opening a new tab on onClick{openInNewTab()}, you can open a popup browser window. refer to 'https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_screenx'

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer")
  }

  //Determine the midpoint of the viewport vertically using window.innerHeight / 2. In this case calculate the midpoint of the viewport horizontally.

window.addEventListener('resize', () => {
  console.log('window resized');
});

const tileRefHandler = (element, index) => {
  tileRefs.current[index] = element;
  tileRefs.current[index].prevRatio = 0;
}

  return (
      <div className="tilesMain">
        {imageList.map((item, index) => {
          return <div className="tile" ref={(element) => tileRefHandler(element, index)} onClick={() => openInNewTab(item.url)} key={item.id}><p>{item.name}</p><img className={'tileImg'} src={item.image}/></div>
        })}
        <div className='redBox' ref={boxRef}></div>
      </div>
  );
}