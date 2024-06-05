import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import anousouk from '../assets/anousouk.png';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-indigo-100 to-purple-200 shadow-lg text-center py-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 space-y-4 sm:space-y-0">
        <div className="text-purple-600">
          &copy; {new Date().getFullYear()} Cooperative. All rights reserved.
        </div>
        <ul className="flex gap-4">
          <li>
            <Link to='/contact' className='text-purple-700 hover:underline'>Contact</Link>
          </li>
          <li>
            <Link to='/privacy-policy' className='text-purple-700 hover:underline'>Privacy Policy</Link>
          </li>
        </ul>
        <div className="flex gap-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='text-purple-700 hover:text-purple-900'>
            <FaFacebookF />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className='text-purple-700 hover:text-purple-900'>
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='text-purple-700 hover:text-purple-900'>
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className='text-purple-700 hover:text-purple-900'>
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
