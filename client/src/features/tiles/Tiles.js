import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './tilesSlice';
import { togglePopup } from '../popup/popupSlice';
import tileImgList from '../../images.js';

export function Tiles() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const tilesMainRef = useRef(null);
  const tileRefs = useRef([]);
  const boxRef = useRef(null);
  // const tileParentRef = useRef(null);
  // const [tileEntries, setTileEntries] = useState([]);

  useEffect(() => {
    // Check if screen size is that of a mobile device.
    const screenWidth = document.documentElement.clientWidth;
    if (screenWidth < 769) {
      const thresholdArr = [];
      for (let i = 0; i <= 1; i += 0.01) {
        thresholdArr.push(i);
      }

      // create LINKED LIST  of tiles.
      let tileCount = 0; 
      let prevTile = null;
      tileRefs.current.forEach((tile, index) => {  
        if (tileCount < tileRefs.current.length) {
          prevTile != null ? prevTile.next = tile : null;
          tile.prev = prevTile;
          tile.next = null;
          prevTile = tile;
          tileCount++;
        }
      });

      // tilesMainRef.lastScrollX = tilesMainRef.current.scrollLeft;
      // let headTile = tileRefs.current[0];
      tilesMainRef.intersectingEntries = {};

      // let scrollAnimationFrame;
      // let startX;
      // let endX;
      // let scrollDirection;
      // let scrollSpeed;

      // Calculate scroll speed, scroll direction, and do tasks based on speed and direction.
      // const detectScrollMomentum = () => {
      //   console.log('scrollDirection: ', scrollDirection);
      //   headTile.currScrollX = tilesMainRef.current.scrollLeft;
      //   scrollSpeed = Math.abs(headTile.currScrollX - tilesMainRef.lastScrollX);
      //   console.log('scrollSpeed: ', scrollSpeed);
      //   tilesMainRef.lastScrollX = headTile.currScrollX;
      //   const tileWithHighestRatio = () => {
      //     return Object.values(tilesMainRef.intersectingEntries).reduce((prev, curr) => {
      //       const prevRatio = prev.intersectionRatio;
      //       const currRatio = curr.intersectionRatio;
      //       return currRatio > prevRatio ? curr : prev;
      //     });
      //   }
      //   // If user lets go of screen, center tile closest to the center of the screen.
      //   if (scrollSpeed <= 1) {
      //     console.log('scroll speed <= 2, scrollSpeed: ', scrollSpeed);
      //       const targetPosition = tileWithHighestRatio().target.offsetLeft;
      //       const scrollPosition = targetPosition - (screenWidth / 2) + (tileWithHighestRatio().target.offsetWidth / 2);
      //       tilesMainRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      //     if (scrollAnimationFrame) { // stop scroll animation frame.
      //       cancelAnimationFrame(scrollAnimationFrame);
      //       scrollAnimationFrame = null;
      //     }
      //   } else if (scrollSpeed <= 5) {
      //     console.log('scroll speed <= 10, scrollSpeed: ', scrollSpeed);
      //     tileWithHighestRatio().target.hook = true;
      //     // If scroll speed is slow enough then add a hook key to the next tile so it centers in the viewport. If no next tile then add hook to current tile.
      //   } else if(scrollSpeed <= 25) {
      //     console.log('scroll speed <= 10, scrollSpeed: ', scrollSpeed);
      //     if(scrollDirection === 'left') {
      //       let nextTile = tileWithHighestRatio().target.next;
      //       if(nextTile) {
      //         nextTile.hook = true;
      //         console.log('nextTile.hook: ', nextTile.hook);
      //       } else {   
      //         tileWithHighestRatio().target.hook = true;
      //       }                             
      //     } else if(scrollDirection === 'right') {
      //       let prevTile = tileWithHighestRatio().target.prev;
      //       if(prevTile) {
      //         prevTile.hook = true;
      //       } else {
      //         tileWithHighestRatio().target.hook = true;
      //       }
      //     }

      //     if (scrollAnimationFrame) {
      //       cancelAnimationFrame(scrollAnimationFrame);
      //       scrollAnimationFrame = null;
      //     }
      //   } else {
      //     scrollAnimationFrame = requestAnimationFrame(detectScrollMomentum);
      //   }
      // }

      // Event listeners for screen interaction. On touch and lift of finger starts scroll speed calculation.
      // tilesMainRef.current.addEventListener('touchstart', event => startX = event.touches[0].clientX);
      // tilesMainRef.current.addEventListener('touchend', (event) => {
      //   endX = event.changedTouches[0].clientX; // Get the first touch point
      //   scrollDirection = startX > endX ? 'left' : 'right';
      //   if (scrollAnimationFrame) {
      //     cancelAnimationFrame(scrollAnimationFrame);
      //   }
      //   scrollAnimationFrame = requestAnimationFrame(detectScrollMomentum);
      // });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const tile = entry.target; // the html itself
          const imgP = entry.target.children[0]; // caption
          const img = entry.target.children[1];
          const scale = (min, max) => {
            let n = min + (entry.intersectionRatio * max);
            return n;
          }
          
          if (entry.isIntersecting) {
            // console.log('entry.isIntersecting: ', entry);
            tile.classList.add('transformTile'); // this will change the margin, boxy shadow, and z-index of the tile.
            img.style.transform = `scale(${scale(1, .2)})`;
            tile.style.margin = `auto ${scale(10, 10)}px`;
            tilesMainRef.intersectingEntries[entry.target.innerText] = entry;
            // if(scrollSpeed <= 10) {
              // 1. find the x-axis offset the entry's left side needs to be at to be centered in the viewport.
              // const clientWidthLeftOffset = (screenWidth / 2) - (tile.offsetWidth / 2);
              // 2. if tile.offsetLeft equals clientWidthLeftOffset, cancelAnimationFrame()
              // const rect = tile.getBoundingClientRect();
              // const tileLeftOffset = rect.left + window.scrollX;
              // if(tile.offsetLeft === clientWidthLeftOffset) {
                // console.log('tile.offsetLeft === clientwidthLeftOffset. Tile with hook should be centered in the viewport.');
                // cancelAnimationFrame(scrollAnimationFrame);
                // entry.hook = false;
            //   }
            // }
          } else {
            delete tilesMainRef.intersectingEntries[entry.target.innerText];
            tile.classList.remove('transformTile'); // remove the transformTile class from the tile.
          }
        });
      },
        {
          rootMargin: `0px -${screenWidth - (screenWidth / 2 + 130)}px 0px -${screenWidth - (screenWidth / 2 + 130)}px`, // '0px 0px 0px 0px'
          threshold: thresholdArr,
        },
      );
      tileRefs.current.forEach(tile => {
        observer.observe(tile);
      });
    }
    const redBox = boxRef.current;
    // redBox.style.width =260 + 'px';
    // redBox.style.left = ((screenWidth/2) - 130) + 'px';
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
  // tileRefs.current[index].prevRatio = 0;
}

  return (
    <div className="tilesMain" ref={tilesMainRef}>
      {tileImgList.map((item, index) => {
        return <div className="tile"
          ref={(element) => tileRefHandler(element, index)}
          onClick={() => openInNewTab(item.url)}
          key={item.id}>
          <p>{item.name}</p>
          <img
            className={'tileImg'}
            src={item.image} />
        </div>
      })}
      {/* <div className='redBox' ref={boxRef}></div> */}
    </div>
  );
}