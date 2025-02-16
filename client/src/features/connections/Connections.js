import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './connectionsSlice';
import connectLogos from './connectLogos';

export function Connections() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div className="connectMain">
      {connectLogos.map((logo) => {
        return (
          <div className="logo logoConnect" key={logo.id}>
            <img onClick={() => dispatch(connect)} src={logo.image} alt={logo.name} />
          </div>
        );
      })}
    </div>
  );
}
