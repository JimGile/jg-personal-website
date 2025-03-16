// src/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-500 text-white py-2">
        <div className="container mx-auto px-2 md:px-2">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-0">
                    <p>&copy; {new Date().getFullYear()} Jim Gile. All rights reserved.</p>
                </div>
                <div className="flex space-x-2">
                    <a href={`https://www.linkedin.com/in/james-gile`} className="text-gray-300 hover:text-white transition-colors duration-200">
                        <i className="fab fa-linkedin text-xl" aria-hidden="true"></i>
                    </a>
                    <a href={`https://github.com/JimGile`} className="text-gray-300 hover:text-white transition-colors duration-200">
                        <i className="fab fa-github text-xl" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;
