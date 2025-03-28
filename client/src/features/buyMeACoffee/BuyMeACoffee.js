import React, { useRef, useEffect } from 'react';

export const buyMeCoffeeRef = React.createRef();

export function BuyMeACoffee() {
  const localBuyMeCoffeeRef = useRef(null);

  useEffect(() => {
    buyMeCoffeeRef.current = localBuyMeCoffeeRef.current; // Assign the local reference to the exported reference
  }, []);

  return (
    <div ref={localBuyMeCoffeeRef} className="buyMeCoffeeSection">
      <div className="coffeeMain">
        <h1>Buy me a coffee</h1>
      </div>
    </div>
  );
}
