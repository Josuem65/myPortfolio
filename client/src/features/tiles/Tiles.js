import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './tilesSlice';
import { togglePopup } from '../popup/popupSlice';
import imageList from '../../images.js';

export function Tiles() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const tileRefs = useRef([]);
  // const tileParentRef = useRef(null);
  // const [tileEntries, setTileEntries] = useState([]);

  useEffect(() => { 
    console.log('tileEntries:', tileRefs.current);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log('entry: ', entry)
        entry.target.className = entry.isIntersecting ? 'tile transformTile' : 'tile';
      });
    }, 
    {
      // root: null,
      rootMargin: '0px -25%',
      // threshold: 1.0
    });
    tileRefs.current.forEach(tile => {
      observer.observe(tile);
    });
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
  return (
      <div className="tilesMain">
        {imageList.map((item, index) => {
          return <div className="tile" ref={(element) => tileRefs.current[index] = element} onClick={() => openInNewTab(item.url)} key={item.id}>{item.name}<img class="tileImg" src={item.image}/></div>
        })}
      </div>
  );
}