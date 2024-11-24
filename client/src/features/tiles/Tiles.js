import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './tilesSlice';
import { togglePopup } from '../popup/popupSlice';
import imageList from '../../images.js';

export function Tiles() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const tileRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log('entries', entries);
      entries.forEach(entry => {
       //code that checks if element in intersecting with atleast 25% of its root element (parent element)
       console.log(`entry is visible: ${entry, entry.isVisible}`);
      });
      //observe all the elements that have tileRef as a reference
    observer.observe(tileRef.current);
    });
  }, []);
  

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
        {imageList.map((item) => {
          return <div className="tile" ref={tileRef} onClick={() => openInNewTab(item.url)} key={item.id}>{item.name}<img class="tileImg" src={item.image}/></div>
        })}
      </div>
  );
}