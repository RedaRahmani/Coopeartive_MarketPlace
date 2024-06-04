import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { BiCartAlt } from "react-icons/bi";
import CartList from '../components/cartlist';
import anousouk from '../assets/anousouk.png';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-gradient-to-br from-indigo-100 to-purple-200 shadow-lg'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <img src={anousouk} alt="Cooperative Logo" className='h-12 w-32 sm:h-16 sm:w-48' />
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-white p-2 rounded-full flex items-center shadow-md'
        >
          <input
            type="text"
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 px-2'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-purple-600' />
          </button>
        </form>
        <ul className='flex gap-4 items-center'>
          <Link to='/'>
            <li className='hidden sm:inline text-purple-700 hover:underline'>Home</li>
          </Link>
          {/* <Link to='/about'>
            <li className='hidden sm:inline text-purple-700 hover:underline'>About</li>
          </Link> */}
          
          <Link to={currentUser?.role === 'coop' ? '/sellerdashboard' : '/profile'} className="mr-4">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-purple-600"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className='text-purple-700 hover:underline'>Sign In</li>
            )}
          </Link>
          {currentUser && currentUser.role === 'client' && (
            <CartList />
          )}
        </ul>
      </div>
    </header>
  );
}
