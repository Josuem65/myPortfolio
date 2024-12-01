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
  const boxRef = useRef(null);
  // const tileParentRef = useRef(null);
  // const [tileEntries, setTileEntries] = useState([]);

    useEffect(() => { 
    const screenWidth = window.innerWidth;
    if(screenWidth < 769) {
      const thresholdList = [];
      for (let i=0; i<=1; i+=0.01) {
        thresholdList.push(i);
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const imgP = entry.target.children[0];
          const img = entry.target.children[1];
          let prevRatio = 0.0;

          if(entry.intersectionRatio > prevRatio) {
            //This will be the calculation of the ratio as it gets closer to the center of the root bounding box.
            // entryChildren[1].classList.add('transform_img');
            // entry.target.classList.add('transform_Img');
            // transform: scale(1.2);
            /* border-radius: 35px; */
            // z-index: 3;
            // transition: 0.3s ease;
            // box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.5); 
            img.style.trasform = `scale(${1})`; //x is the calculation of ratio as it gets closer to the center of the root bounding box.
            console.log('entry.target: ', entry.target);
            console.log('entry rootBounds: ', entry.rootBounds);
            // entry.target.className = 'tile transformTile';
            // entry.target.style.transform = 'translateX(0px)';
            // entry.target.style.transition = 'transform 1s';
          } else {
            //This will be the calculation of the ratio as it gets further from the center of the root bounding box.
            // entryChildren[1].classList.remove('transformImg');
            // entry.target.style.transform = 'translateX(100px)';
            // entry.target.style.transition = 'transform 1s';
          }
          prevRatio = entry.intersectionRatio;
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
    redBox.style.left = ((window.innerWidth/2) - 130) + 'px';
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
          return <div className="tile" ref={(element) => tileRefs.current[index] = element} onClick={() => openInNewTab(item.url)} key={item.id}><p>{item.name}</p><img className={'tileImg'} src={item.image}/></div>
        })}
        <div className='redBox' ref={boxRef}></div>
      </div>
  );
}