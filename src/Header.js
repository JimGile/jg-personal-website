// src/Header.js
import React from 'react';

function Header() {
  return (
    <header className="relative">
        <div className="header-bg relative">
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-10">
                        <div className="profile-image rounded-full overflow-hidden border-4 border-white w-28 h-28 md:w-32 md:h-32">
                          <img 
                              src="/profile.png" 
                              alt="Jim Gile" 
                              className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left md:text-left text-white">
                            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-md">Jim Gile</h1>
                            <p className="text-lg md:text-xl mt-1 font-light drop-shadow-md">Enterprise Software Architect / Engineer | AI Solutions Developer | Ski Mountaineer</p>
                        </div>
                    </div>
                </div>
            </div>


    </header>
  );
}

export default Header;
