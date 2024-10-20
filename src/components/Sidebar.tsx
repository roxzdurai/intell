import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Briefcase, LayoutDashboard, Settings, User } from 'lucide-react';
import Logo from '../assets/images/Frame 1707478528.png'; // Update the path as needed
import { FiMenu, FiX } from 'react-icons/fi'; // Importing menu and close icons

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar visibility

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar when clicking a link on mobile
  const closeSidebarOnClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Hamburger menu icon for mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 focus:outline-none fixed top-0 left-0 z-20"
      >
        {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>

      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:h-screen z-10 flex flex-col justify-between`}
      >
        {/* Top Section: Logo and Navigation */}
        <div>
          <div className="flex items-center justify-center p-4">
            <img src={Logo} alt="IntelliRecruit Logo" className="h-10 w-auto" />
          </div>

          <nav className="flex flex-col space-y-4 px-4 mt-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg border-2 font-inter ${
                  isActive
                    ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]' // Custom background and border for active state
                    : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent' // Normal state
                } transition-all duration-300`
              }
              onClick={closeSidebarOnClick} // Close sidebar on page click
            >
              <Home className="mr-2 h-5 w-5" /> Dashboard
            </NavLink>

            <NavLink
              to="/candidates"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg border-2 font-inter ${
                  isActive
                    ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]' // Custom background and border for active state
                    : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent' // Normal state
                } transition-all duration-300`
              }
              onClick={closeSidebarOnClick} // Close sidebar on page click
            >
              <Users className="mr-2 h-5 w-5" /> Candidates
            </NavLink>

            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg border-2 font-inter ${
                  isActive
                    ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]' // Custom background and border for active state
                    : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent' // Normal state
                } transition-all duration-300`
              }
              onClick={closeSidebarOnClick} // Close sidebar on page click
            >
              <Briefcase className="mr-2 h-5 w-5" /> Jobs
            </NavLink>

            <NavLink
              to="/psychometrics"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-lg border-2 font-inter ${
                  isActive
                    ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]' // Custom background and border for active state
                    : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent' // Normal state
                } transition-all duration-300`
              }
              onClick={closeSidebarOnClick} // Close sidebar on page click
            >
              <LayoutDashboard className="mr-2 h-5 w-5" /> Psychometrics
            </NavLink>
          </nav>
        </div>

        {/* Bottom Section: Settings and User Account */}
        <div className="flex flex-col p-4 space-y-4">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center p-4 rounded-lg border-2 font-inter ${
                isActive
                  ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]' // Custom background and border for active state
                  : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent' // Normal state
              } transition-all duration-300`
            }
            onClick={closeSidebarOnClick} // Close sidebar on page click
          >
            <Settings className="mr-2 h-5 w-5" /> Settings
          </NavLink>

          <NavLink
            to="/user-account"
            className={({ isActive }) =>
              `flex items-center p-4 rounded-lg border-2 font-inter ${
                isActive
                  ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]' // Custom background and border for active state
                  : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent' // Normal state
              } transition-all duration-300`
            }
            onClick={closeSidebarOnClick} // Close sidebar on page click
          >
            <User className="mr-2 h-5 w-5" /> User Account
          </NavLink>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={toggleSidebar} // Close sidebar when clicking outside
        ></div>
      )}
    </div>
  );
};

export default Sidebar;