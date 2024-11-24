import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './tilesSlice';
import { togglePopup } from '../popup/popupSlice';
import imageList from '../../images.js';

export function Tiles() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  // const targetRef = useRef(null);

  // useEffect(() => {

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //      //add a targetRef to each of the entries
  //       entry.target.classList.add('visible');
  //       console.log(entry.target);
  //     });
  //   },)
  //   observer.observe(targetRef.current);
    
  //   });


  // onClick={() => dispatch(togglePopup())}   //taken off div with className 'tile' for now.
  // Instead of opening a new tab on onClick{openInNewTab()}, you can open a popup browser window. refer to 'https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_screenx'

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer")
  }

  //Determine the midpoint of the viewport vertically using window.innerHeight / 2. In this case calculate the midpoint of the viewport horizontally.
//   Find closest element:
// Loop through each list element, calculate its distance from the center, and keep track of the element with the smallest distance.
// Scroll into view:
// Use scrollIntoView on the closest element with the block: 'center' option to align it to the center of the viewport. 
//you can use JavaScript's scrollIntoView method with the behavior: 'smooth' option to scroll smoothly to the element.
window.addEventListener('resize', () => {
  console.log('window resized');
});
  return (
      <div className="tilesMain">
        {imageList.map((item) => {
          return <div className="tile"  onClick={() => openInNewTab(item.url)} key={item.id}>{item.name}<img class="tileImg" src={item.image}/></div>
        })}
      </div>
  );
}