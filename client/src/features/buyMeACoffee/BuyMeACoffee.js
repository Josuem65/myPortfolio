import React, { useRef, useEffect } from 'react';
import { isDesktop, isTablet } from 'react-device-detect';
import BuyMeACoffeeButton from '../../logos/BuyMeACoffeeButton.png';

export const buyMeCoffeeRef = React.createRef();

export function BuyMeACoffee() {
  const localBuyMeCoffeeRef = useRef(null);

  useEffect(() => {
    buyMeCoffeeRef.current = localBuyMeCoffeeRef.current; // Assign the local reference to the exported reference
  }, []);

  const openWindow = () => {
    if (isDesktop) {
      const width = 500;
      const height = 600;
      const left = (document.documentElement.clientWidth - width) / 2;
      const top = (document.documentElement.clientHeight - height) / 2;
      window.open(
        "https://www.buymeacoffee.com/josuem95",
        "popup",
        `width=${width},height=${height},left=${left},top=${top}`
      ); 
        } else if (isTablet) {
      window.open("https://www.buymeacoffee.com/josuem95", "_blank");
        } else {
      window.location.href = "https://www.buymeacoffee.com/josuem95";
        }
  }

  return (
    <div ref={localBuyMeCoffeeRef} className="buyMeCoffeeSection">
      <div className="coffeeMain">
        <img onClick={()=> openWindow()}src={BuyMeACoffeeButton} alt="BuyMeACoffeeButton" />
      </div>
      <p className="coffeeText">
        If you like my work and want to support it, consider buying me a coffee! Your support is very appreciated. Thank you!
      </p>
    </div>
  );
}
