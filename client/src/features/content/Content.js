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
  // const [incrementAmount, setIncrementAmount] = useState('2');


  return (
      <div className="contentMain">
        <div className="content">
          {contentList.map((item) => {
            return <div className="contentTile" key={item.id}><img src={item.image}/></div>
          })}
      </div>
    </div>
  );
}
