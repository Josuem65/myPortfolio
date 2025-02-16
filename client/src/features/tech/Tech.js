import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './techSlice';
import techLogos from './techLogos';

export function Tech() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className="techMain">
      {techLogos.map((logo) => {
        return (
          <div className="logoContainer" key={logo.id}>
            <p>{logo.tech}</p>
            <img class="techLogo" src={logo.image} alt={logo.name} />
          </div>
        );
      })}
    </div>
  );
}
