import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './contentSlice';
import contentList from '../../contentImgs.js'

export function Content() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
      <div className="contentMain">
        <h1>Content</h1>
        <div className="content">
          {contentList.map((item) => {
            return <div className="contentTile" key={item.id}>{item.name}<img className="contentImg" src={item.image}/></div>
          })}
      </div>
    </div>
  );
}
