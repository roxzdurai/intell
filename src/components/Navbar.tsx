import React, { useState } from 'react';
import { FiBell, FiShare2, FiSearch } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
  };

  return (
    <header className="bg-white py-2 px-6 w-full flex justify-between items-center shadow-md">
      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full md:w-1/3 ml-4 md:ml-0 border border-gray-300"
      >
        {/* Search Icon */}
        <FiSearch className="text-gray-500 mr-2 w-4 h-4" /> {/* Add Search Icon */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search Keyword"
          className="bg-transparent w-full focus:outline-none text-gray-700 placeholder-gray-500"
        />
        <span className="text-gray-500">/</span>
      </form>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell Icon */}
        <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 border border-gray-300">
          <FiBell className="w-5 h-5 text-gray-500" />
        </button>

        {/* Share Icon */}
        <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 border border-gray-300">
          <FiShare2 className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;