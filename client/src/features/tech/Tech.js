import React, { useState, useRef, useEffect } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './techSlice';
import techLogos from './techLogos';

export const techRef = React.createRef();

export function Tech() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const localTechRef = useRef(null);

  useEffect(() => {
    techRef.current = localTechRef.current; // Assign the local reference to the exported reference
  }, []);

  return (
    <div ref={localTechRef} className={isMobileOnly ? "mobileTechMain techMain" : "techMain"}>
      <h1>Tech Stack</h1>
      <div className={isMobileOnly ? "mobileTechContainer techContainer" : "techContainer"}>
        {techLogos.map((logo) => {
          return (
            <div className={isMobileOnly ? "mobileTechLogoBox techLogoBox" : "techLogoBox"} key={logo.id}>
              <p>{logo.tech}</p>
              <img src={logo.image} alt={logo.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
