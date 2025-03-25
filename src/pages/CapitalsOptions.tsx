
import React, { useEffect } from 'react';
import CapitalsOptions from '../components/CapitalsOptions';

const CapitalsOptionsPage = () => {
  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A202C] to-[#2D3748] pb-16">
      <CapitalsOptions />
    </div>
  );
};

export default CapitalsOptionsPage;
