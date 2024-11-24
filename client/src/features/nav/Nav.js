import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './navSlice';
import { selectTogglePopup, togglePopup } from '../popup/popupSlice';
import styles from './nav.css';

export function Nav() {
  const count = useSelector(selectCount);
  const popupStatus = useSelector(selectTogglePopup);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const navList = ['myPortfolio', 'Related', 'Technology', 'Buy me a coffee'];
  //'myPortfolio' = home button, 'Related' = related connections, 'Technology' = tech stack, 'Buy me a coffee' = donation button
  
  // const scrollToTop = () => {  // helper function
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }

  // const goToHome = () => {  // helper function
  //   // go to top of the page without refreshing the page
  //   window.scrollTo(0, 0);
  // }
  const handleHomeClick = () => { 
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return popupStatus ? dispatch(togglePopup()) : null;
  }
  

  return (
    <div>
      <div className="mainNav">
        {navList.map((item) => {
          return <div onClick={handleHomeClick} className={item === 'myPortfolio' ? "navItem homeNav" : "navItem"} key={Math.random(32)}>{item}</div>
        })}
      </div>
    </div>
  );
}
