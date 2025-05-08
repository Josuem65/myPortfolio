import React, { useState, useEffect, useRef } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './tilesSlice';
import { togglePopup } from '../popup/popupSlice';
import tileImgList from '../../images.js';

export const tilesRef = React.createRef();

export function Tiles() {
  const localTilesRef = useRef(null); // Local reference inside the component
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const tilesMainRef = useRef(null);
  const tileRefs = useRef([]);
  const boxRef = useRef(null);

  useEffect(() => {
    tilesRef.current = localTilesRef.current; // Assign the local reference to the exported reference
  }, []);

  const checkOverflow = () => {
    if (tilesMainRef.current) {
      setIsOverflowing(tilesMainRef.current.scrollWidth > tilesMainRef.current.clientWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  useEffect(() => {
    const screenWidth = document.documentElement.clientWidth;
    if (isMobileOnly) {
      const thresholdArr = [];
      for (let i = 0; i <= 1; i += 0.01) {
        thresholdArr.push(i);
      }

      //biderctional linked list

      // let tileCount = 0; 
      // let prevTile = null;
      // tileRefs.current.forEach((tile, index) => {  
      //   if (tileCount < tileRefs.current.length) {
      //     prevTile != null ? prevTile.next = tile : null;
      //     tile.prev = prevTile;
      //     tile.next = null;
      //     prevTile = tile;
      //     tileCount++;
      //   }
      // });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const tile = entry.target;
          const imgP = entry.target.children[0];
          const img = entry.target.children[1];
          const scale = (min, max) => {
            let n = min + (entry.intersectionRatio * max);
            return n;
          }
          
          if (entry.isIntersecting) {
            tile.style.transform = `scale(${scale(1, .3)})`;
            // tile.style.margin = `auto ${scale(20, 10)}px`;
          }
        });
      },
        {
          rootMargin: `0px -${screenWidth - (screenWidth / 2 + 130)}px 0px -${screenWidth - (screenWidth / 2 + 130)}px`,
          threshold: thresholdArr,
        },
      );
      tileRefs.current.forEach(tile => {
        observer.observe(tile);
      });
    }
    const redBox = boxRef.current;
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer")
  }

  const tileRefHandler = (element, index) => {
    tileRefs.current[index] = element;
  }
console.log('isMobileOnly', isMobileOnly)
  return (
    <div ref={localTilesRef} className={isMobileOnly ? 'mobileTilesWrapper' : "tilesWrapper"}>
      <h1 className="tilesHeader">Deployed Projects</h1>
      <div className={isMobileOnly ? 'mobileTilesMain' : 'tilesMain'} ref={tilesMainRef}>
        {tileImgList.map((item, index) => {
          return <div className={isMobileOnly ? 'mobileTile' : 'tile'}
            ref={(element) => tileRefHandler(element, index)}
            onClick={() => openInNewTab(item.url)}
            key={item.id}>
            <p>{item.name}</p>
            <img className={'tileImg'} src={item.image} />
            <p className="tileDetails">Details</p>
          </div>
        })}
      </div>
    </div>
  );
}
