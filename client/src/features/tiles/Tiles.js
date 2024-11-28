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
    // console.log('tileEntries:', tileRefs.current);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // console.log('entry: ', entry);
        console.log('entry.target: ', entry.target);
        const tile = entry.target;
        console.log('entry.target: ', tile);
        // console.log('entries: ', entries);
        console.log('entry is intersecting: ', entry.isIntersecting);
        if(entry.isIntersecting) {
          // Why is entry.target [object HTMLDivElement] and not the actual div element? after entering this conditional statement?
          // console.log(`entry.target: ${entry.target}`); // [object HTMLDivElement]
          // console.log(`entry.target: ${tile}`); // [object HTMLDivElement]

          // console.log(`entry.target.childNodes: ${entry.target.childNodes}`); // [object NodeList]

          console.log(`Conditional went through, entry: ${tile} is intersecting`);
          let isScrolling = false;

          window.addEventListener('scroll', () => {
            console.log('Scrolling has started');
            isScrolling = true;
            clearTimeout(scrollFnct);
          
            scrollFnct = setTimeout(() => {
              // Your code to execute when scrolling ends
              console.log('Scrolling has ended');
              isScrolling = false;
            }, 10000); // Adjust the timeout as needed
            while(entry.isIntersecting && isScrolling) {
              console.log(`entry: ${entry.target} is intersecting`);
              const elementRect = entry.target.getBoundingClientRect();
              const parentRect = entry.target.parentNode.getBoundingClientRect();
              
              const elementCenterX = elementRect.left + elementRect.width / 2;
              const parentCenterX = parentRect.left + parentRect.width / 2;
              const distance = Math.abs(elementCenterX - parentCenterX);
              
              const maxDistance = parentRect.width / 2;
              const minScale = 1;
              const maxScale = 1.2; //adjust as needed
              
              const scaleFactor = maxScale - (distance / maxDistance) * (maxScale - minScale);
          console.log(`distance: ${distance}, scaleFactor: ${scaleFactor}`)

          const targetChildren = entry.target.childNodes;
          // targetChildren[0].style.transform = `scale(${scaleFactor})`;
          // targetChildren[0].style.transform = 'transition: transform 0.3s';
          // targetChildren[1].style.transform = `scale(${scaleFactor})`;
          // targetChildren[1].style.transform = 'transition: transform 0.3s';

          // if (entry.isIntersecting) {
            // entry.target.className = 'tile transformTile';
            // targetChildren[0].style.transform = `scale(${scaleFactor})`;
            targetChildren[1].style.transition = `transform 0.3s`;
            targetChildren[1].style.transform = `scale(${scaleFactor})`;
            console.log(`img styel: ${targetChildren[1].style.transform}`);
          }
        });
        }
        console.log('entry.target: ', entry.target);
        // }
        // else {
        //   entry.target.className = 'tile';
        //   targetChildren[0].className = '';
        //   targetChildren[1].className = 'tileImg';
        // }

        // entry.target.className = entry.isIntersecting ? 'tile transformTile' : 'tile';
      });
     }, 
    {
      // root: null,
      rootMargin:  `0px -${window.innerWidth - (window.innerWidth / 2) + 100}px`,
      // threshold: 1.0
    });
    const screenWidth = window.innerWidth;
    if(screenWidth < 769) {
      tileRefs.current.forEach(tile => {
        observer.observe(tile);
      });
    }
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
          return <div className="tile" ref={(element) => tileRefs.current[index] = element} onClick={() => openInNewTab(item.url)} key={item.id}><p>{item.name}</p><img class="tileImg" src={item.image}/></div>
        })}
      </div>
  );
}