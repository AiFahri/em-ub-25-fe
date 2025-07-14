import React from 'react';
import WelcomeDesktop from './WelcomeDekstop';
import WelcomeMobile from './WelcomeMobile';

const Welcome = () => {
  return (
    <>
      <div className="block md:hidden overflow-hidden">
        <WelcomeMobile />
      </div>
      <div className="hidden md:block">
        <WelcomeDesktop />
      </div>
    </>
  );
};

export default Welcome;
