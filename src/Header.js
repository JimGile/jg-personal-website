// src/Header.js
import React from 'react';

function Header() {
  return (
    <header className="relative">
        <div className="header-bg py-16 md:py-24 relative">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
                    <div className="profile-image rounded-full overflow-hidden border-2 border-white w-40 h-40 md:w-48 md:h-48">
                        <img 
                            src="/profile.png" 
                            alt="Jim Gile" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-left md:text-left text-white">
                        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-md">Jim Gile</h1>
                        <p className="text-xl md:text-2xl mt-2 font-light drop-shadow-md">Software Engineer & Technology Professional</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}

export default Header;
