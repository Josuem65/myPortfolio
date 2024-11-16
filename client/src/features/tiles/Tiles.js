import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './tilesSlice';
import { togglePopup } from '../popup/popupSlice';
import imageList from '../../images.js';

export function Tiles() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  //add event listener to tiles, when mouse hovers over tile, make focused tile bigger and the rest smaller.
  //also, give it a depth effect, like if the focused tile is closer to the screen than the rest.

  // onClick={() => dispatch(togglePopup())}   //taken off div with className 'tile' for now.
  // Instead of opening a new tab on onClick{openInNewTab()}, you can open a popup browser window. refer to 'https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_screenx'

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer")
  }

  let lastScrollLeft = 0;
  let scrollDirectionX = 0;
  let scrollstrengthX = 0;

  window.addEventListener('scroll', () => {
    const currentScrollLeft = window.scrollX;
    const deltaX = currentScrollLeft - lastScrollLeft;
    //calculate scroll direction on the x-axis
    scrollDirectionX = deltaX > 0 ? 1 : deltaX < 0 ? -1 : 0;
    //calculate scroll strength on the x-axis
    scrollstrengthX = Math.abs(deltaX) * scrollDirectionX;
    console.log(scrollDirectionX, 'scroll strength: ', scrollstrengthX);
  })

  //Determine the midpoint of the viewport vertically using window.innerHeight / 2. In this case calculate the midpoint of the viewport horizontally.
//   Find closest element:
// Loop through each list element, calculate its distance from the center, and keep track of the element with the smallest distance.
// Scroll into view:
// Use scrollIntoView on the closest element with the block: 'center' option to align it to the center of the viewport. 

  return (
      <div className="tilesMain">
        {imageList.map((item) => {
          return <div className="tile" onClick={() => openInNewTab(item.url)} key={item.id}>{item.name}<img class="tileImg" src={item.image}/></div>
        })}
      </div>
  );
}

// function scrollToClosestToCenter(listSelector) {

//   const list = document.querySelector(listSelector);

//   const centerPoint = window.innerHeight / 2;

//   let closestElement;

//   let minDistance = Infinity;



//   for (const item of list.querySelectorAll('li')) { // Assuming list items are <li> elements

//     const rect = item.getBoundingClientRect();

//     const itemCenter = rect.top + rect.height / 2;

//     const distance = Math.abs(itemCenter - centerPoint);



//     if (distance < minDistance) {

//       minDistance = distance;

//       closestElement = item;

//     }

//   }



//   if (closestElement) {

//     closestElement.scrollIntoView({ block: 'center' });

//   }

// }



// // Call the function when needed, e.g. on a click event

// scrollToClosestToCenter('.my-list'); 
