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

  // buggy
  const handleMouseEnter = (e) => {
    e.target.style.transform = 'scale(1.2)';
    e.target.style.zIndex = '1';
    e.target.style.transition = 'transform 0.4s';
  }
// buggy
  const handleMouseLeave = (e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.zIndex = '0';
    e.target.style.transition = 'transform 0.4s';
  }
  return (
    <div>
      <div className="tilesMain">
        {imageList.map((item) => {
          return <div className="tile" onClick={() => dispatch(togglePopup())} key={item.id}>{item.name}<img class="tileImg" src={item.image}/></div>
        })}
      </div>
    </div>
  );
}
 