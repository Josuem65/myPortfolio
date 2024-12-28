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

      //get the element with the class of tilesMain and add a key of 'lastScrollX' to it.
      // T E S T I N G  T O  B E T T E R  U N D E R S T A N D  H O W  S C R O L L  W O R K S  W I T H  I N T E R S E C T I O N  O B S E R V E R
      tilesMainRef.lastScrollX = tilesMainRef.current.scrollLeft;
      console.log('tilesMainRef.lastScrollX: ', tilesMainRef.lastScrollX);
      let headTile = tileRefs.current[0];
      headTile.currScrollX;
      // console.log('tilesMainRef.lastScrollX: ', tilesMainRef.lastScrollX);
      tilesMainRef.intersectingEntries = {};

      let scrollAnimationFrame;
      const detectScrollMomentum = () => {
        headTile.currScrollX = tilesMainRef.current.scrollLeft;
        console.log('currScrollX: ', headTile.currScrollX);
        const scrollSpeed = Math.abs(headTile.currScrollX - tilesMainRef.lastScrollX);
        console.log('scrollSpeed: ', scrollSpeed);
        tilesMainRef.lastScrollX = headTile.currScrollX;
        console.log('tilesMainRef.lastScrollX: ', tilesMainRef.lastScrollX);

        if (scrollSpeed <= 2.5) {
          console.log('scroll speed <= 5, scrollSpeed: ', scrollSpeed);
          //find the tile in the intersectingEntries array that is closest to the center of the viewport.
            const tileWithHighestRatio = Object.values(tilesMainRef.intersectingEntries).reduce((prev, curr) => {
            const prevRatio = prev.intersectionRatio;
            const currRatio = curr.intersectionRatio;
            return currRatio > prevRatio ? curr : prev;
            });
          console.log('Tile with highest intersecting ratio:', tileWithHighestRatio.target.innerText);
          // scroll to the tile with the highest intersection ratio.
            const targetPosition = tileWithHighestRatio.target.offsetLeft;
            const scrollPosition = targetPosition - (screenWidth / 2) + (tileWithHighestRatio.target.offsetWidth / 2);
            tilesMainRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });

          // stop the scroll animation frame.
          if (scrollAnimationFrame) {
            cancelAnimationFrame(scrollAnimationFrame);
            scrollAnimationFrame = null;
          }

        } else {
          scrollAnimationFrame = requestAnimationFrame(detectScrollMomentum);
        }
      }
      tilesMainRef.current.addEventListener('touchend', () => {
        console.log('scrolling event fired');
        if (scrollAnimationFrame) {
          cancelAnimationFrame(scrollAnimationFrame);
        }
        scrollAnimationFrame = requestAnimationFrame(detectScrollMomentum);
      });
      // E N  D  O F  T E S T I N G ^^^^

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
            tile.classList.add('transformTile'); // this will change the margin, boxy shadow, and z-index of the tile.
            img.style.transform = `scale(${scale(1, .2)})`;
            tile.style.margin = `auto ${scale(10, 10)}px`;
            tilesMainRef.intersectingEntries[entry.target.innerText] = entry;
          } else {
            delete tilesMainRef.intersectingEntries[entry.target.innerText];
            tile.classList.remove('transformTile'); // remove the transformTile class from the tile.
          }
            // console.log('intersectingEntries: ', tilesMainRef.intersectingEntries.map(entry => entry.target.innerText));
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
    //get the object of the element with a class of 'redBox'
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