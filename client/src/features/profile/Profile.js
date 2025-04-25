import React, { useState, useEffect, useRef } from 'react';
import { isMobileOnly } from 'react-device-detect';
import connectObj from '../connections/connectLogos.js';

export function Profile() {


  return (
    <div className={isMobileOnly ? "mobileProfileMain profileMain" : "profileMain"}>
        <div className={isMobileOnly ? "mobileProfileImg profileImg" : "profileImg"}>
            <img src={connectObj[1].profileURL} alt="Creator's profile picture" />
        </div>
        <h1>Josue Martinez</h1>
    </div>
  );
}
// export default Profile;