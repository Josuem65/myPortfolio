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
    console.log('tileRefs', tileRefs);
    const screenWidth = document.documentElement.clientWidth;
    if (screenWidth < 769) {
      const thresholdArr = [];
      for (let i = 0; i <= 1; i += 0.01) {
        thresholdArr.push(i);
      }

      tilesMainRef.lastScrollX = tilesMainRef.current.scrollLeft;
      console.log('tilesMainRef.lastScrollX: ', tilesMainRef.lastScrollX);
      let headTile = tileRefs.current[0];
      headTile.currScrollX;
      // console.log('tilesMainRef.lastScrollX: ', tilesMainRef.lastScrollX);
      tilesMainRef.intersectingEntries = {};

      let scrollAnimationFrame;
      let startX;
      let endX;
      let scrollDirection;

      const detectScrollMomentum = () => {
        console.log('scrollDirection: ', scrollDirection);
        headTile.currScrollX = tilesMainRef.current.scrollLeft;
        console.log('currScrollX: ', headTile.currScrollX);
        const scrollSpeed = Math.abs(headTile.currScrollX - tilesMainRef.lastScrollX);
        console.log('scrollSpeed: ', scrollSpeed);
        tilesMainRef.lastScrollX = headTile.currScrollX;
        console.log('tilesMainRef.lastScrollX: ', tilesMainRef.lastScrollX);
        const tileWithHighestRatio = () => {
          return Object.values(tilesMainRef.intersectingEntries).reduce((prev, curr) => {
            const prevRatio = prev.intersectionRatio;
            const currRatio = curr.intersectionRatio;
            return currRatio > prevRatio ? curr : prev;
          });
        }

        if (scrollSpeed <= 2) {
          console.log('scroll speed <= 2, scrollSpeed: ', scrollSpeed);
          //find the tile in the intersectingEntries object that is closest to the center of the viewport.
          console.log('Tile with highest intersecting ratio:', tileWithHighestRatio().target.innerText);
            const targetPosition = tileWithHighestRatio().target.offsetLeft;
            const scrollPosition = targetPosition - (screenWidth / 2) + (tileWithHighestRatio().target.offsetWidth / 2);
            tilesMainRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });

          // stop the scroll animation frame.
          if (scrollAnimationFrame) {
            cancelAnimationFrame(scrollAnimationFrame);
            scrollAnimationFrame = null;
          }
        } else if(scrollSpeed <= 10) {
          // element next in array, whether its the next or previous element, should be locked in the center of the viewport when it reaches the center.
          // 1. find which way the user is scrolling... scrollDirection = 'left' or 'right'.
          if(scrollDirection === 'left') {
            // the next element (current tile index + 1) in the tilesMainRef.intersectingEntries array should stop the scrolling when it reaches the center of the viewport.
            // 1. Obtain the current entry with the highest intersection ratio. tileWithHighestRatio()
              console.log(tileWithHighestRatio());
            // 2. Find the next element in the tilesMainRef.intersectingEntries array.



                        // L F T   O F F   H E R E !



            //      B U G   H E R E  R E L A T I N G   T O   T H E  A R R A Y  W E ' R E   U S I N G!!!!!!!!!!!!!!!!!!!!!!!!1
            // entriesObj will be used instead of tilesMainRef.intersectingEntries
            let nextTile = Object.values(tilesMainRef.intersectingEntries)[tileWithHighestRatio().index + 1]; // check to see if index property is correct.
            // 3. If the next element exists, stop at the next element.
            if(nextTile) {
              // 4. add some sort of a hook that hooks the nextTile's x-axis center to the viewport's x-axis center and cancelAnimationFrame()
              nextTile.hook = true;
              console.log('nextTile: ', nextTile);
            } else {
              // 4. if next tile is undefined, add hook to tileWithHighestRatio()
              tileWithHighestRatio().hook = true;
              console.log('tileWithHighestRatio() hook: ', tileWithHighestRatio());
            }
          } else if(scrollDirection === 'right') {
            // the next element (current tile index - 1) in the tilesMainRef.intersectingEntries array should stop the scrolling when it reaches the center of the viewport.
            let prevTile = Object.values(tilesMainRef.intersectingEntries)[tileWithHighestRatio().index - 1];
            if(prevTile) {
              prevTile.hook = true;
              console.log('prevTile: ', prevTile);
            } else {
              tileWithHighestRatio().hook = true;
              console.log('tileWithHighestRatio() hook: ', tileWithHighestRatio());
            }
          }
          // 2. if (scrollDirection === left/right) {next element left/right of the current tilesMainRef.intersectingEntries array should stop the scrolling when it reaches the center of the viewport.}
          //    1. 
          // F I N D   T H E   S C R O L L  D I R E C T I O N
          // get the x coordinate of the finger when the touchend event is fired.

          if (scrollAnimationFrame) {
            cancelAnimationFrame(scrollAnimationFrame);
            scrollAnimationFrame = null;
          }
        } else {
          scrollAnimationFrame = requestAnimationFrame(detectScrollMomentum);
        }
      }

      tilesMainRef.current.addEventListener('touchstart', event => startX = event.touches[0].clientX);
      tilesMainRef.current.addEventListener('touchend', (event) => {
        console.log('scrolling event fired');
        endX = event.changedTouches[0].clientX; // Get the first touch point
        scrollDirection = startX > endX ? 'left' : 'right';
        if (scrollAnimationFrame) {
          cancelAnimationFrame(scrollAnimationFrame);
        }
        scrollAnimationFrame = requestAnimationFrame(detectScrollMomentum);
      });

      let tileIndex = 0;
      let entriesObj = {};
      
      const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

          entry.index === undefined ? entry.index = tileIndex++ : null;
          if (entriesObj[entry.target.innerText] === undefined) {
            entriesObj[entry.target.innerText] = entry;
          }

          const tile = entry.target; // the html itself
          const imgP = entry.target.children[0]; // caption
          const img = entry.target.children[1];
          const scale = (min, max) => {
            let n = min + (entry.intersectionRatio * max);
            return n;
          }
          console.log('entriesObj: ', entriesObj);
          
          if (entry.isIntersecting) {
            // console.log('entry.isIntersecting: ', entry);
            tile.classList.add('transformTile'); // this will change the margin, boxy shadow, and z-index of the tile.
            img.style.transform = `scale(${scale(1, .2)})`;
            tile.style.margin = `auto ${scale(10, 10)}px`;
            tilesMainRef.intersectingEntries[entry.target.innerText] = entry;
            if(entry.hook) {
              // 1. find the x-axis offset the entry's left side needs to be at to be centered in the viewport.
              const offsetToCenter = (screenWidth / 2) - (tile.offsetWidth / 2);
              // 2. if tile.offsetLeft equals offsetToCenter, cancelAnimationFrame()
              console.log('offsetToCenter: ', offsetToCenter);
              console.log('tile.offsetLeft: ', tile.offsetLeft);
              if(tile.offsetLeft === offsetToCenter) {
                cancelAnimationFrame(scrollAnimationFrame);
                entry.hook = false;
              }
            }
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