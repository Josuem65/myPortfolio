import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './techSlice';
import techLogos from './techLogos';

export function Tech() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div className="logosDiv techMain">
      {techLogos.map((logo) => {
        return (
          <div className="logo logoTech" key={logo.id}>
            <img src={logo.image} alt={logo.name} />
          </div>
        );
      })}
    </div>
  );
}
