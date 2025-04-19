import React, { useRef, useEffect } from 'react';
import BuyMeACoffeeButton from '../../logos/BuyMeACoffeeButton.png';

export const buyMeCoffeeRef = React.createRef();

export function BuyMeACoffee() {
  const localBuyMeCoffeeRef = useRef(null);

  useEffect(() => {
    buyMeCoffeeRef.current = localBuyMeCoffeeRef.current; // Assign the local reference to the exported reference
  }, []);

  return (
    <div ref={localBuyMeCoffeeRef} className="buyMeCoffeeSection">
      <div className="coffeeMain">
        <img src={BuyMeACoffeeButton} alt="BuyMeACoffeeButton" />
      </div>
    </div>
  );
}
