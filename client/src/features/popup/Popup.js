import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTogglePopup, togglePopup } from './popupSlice';
import styles from './popup.css';

export function Popup() {
  const toggleState = useSelector(selectTogglePopup);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');


  return (
    <div>
      <div className={toggleState ? "popupMain" : "hide"} onClick={()=>{dispatch(togglePopup())}}>
        <h1 className="popupText">Popup</h1>
      </div>
    </div>
  );
}
