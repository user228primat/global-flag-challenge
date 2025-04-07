
import React, { useEffect } from 'react';
import CapitalsOptions from '../components/CapitalsOptions';

const CapitalsOptionsPage = () => {
  // Reset scroll position when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pb-16 relative overflow-hidden">
      {/* Background texture and effects */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYySDF0djJoMnYyaC0ydjJoMnYyaDJ2LTRoNHYtMmgtNHYtMmg0di0yaC02em04IDB2Mmg0djJoLTJ2MmgydjJoMnYtNmgtNnptNCA0aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>

      {/* Glowing elements */}
      <div className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px] opacity-60"></div>
      <div className="absolute bottom-40 -left-20 w-96 h-96 rounded-full bg-[#FF5252]/5 blur-[100px] opacity-50"></div>

      <CapitalsOptions />
    </div>
  );
};

export default CapitalsOptionsPage;
