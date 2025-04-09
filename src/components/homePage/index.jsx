import React, { useEffect, useState } from 'react';
import RobotMap from './RobotMap';
import ManagePackages from './ManagePackages';


const HomePage = () => {
  const [activeTab, setActiveTab] = useState('RobotMap');

  const formatTabTitle = (title) => {
    return title.replace(/([A-Z])/g, ' $1').trim();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'RobotMap':
        return <RobotMap />;
      case 'ManagePackages':
        return <ManagePackages />;
      default:
        return <RobotMap />;
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow w-full p-2 flex items-center justify-between">
        <div className="flex items-center w-full justify-between">
          <img
            src="./LOGO.png"
            alt="Logo"
            className="mr-2"
          />
          <h2 className='text-2xl font-bold'>WAREHOUSE MANAGEMENT SYSTEM</h2>
        </div>
        <div className="space-x-5">
          <button>
            <i className="fas fa-bell text-gray-500 text-lg"></i>
          </button>
          <button>
            <i className="fas fa-user text-gray-500 text-lg"></i>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-wrap">
        {/* Sidebar */}
        <div className="p-2 bg-white w-full md:w-60 flex flex-col hidden md:flex" id="sideNav">
          <nav className='flex flex-col justify-center gap-12 items-center h-full'>
            <a
              className={`block text-black w-full text-center py-2.5 px-4 my-4 bg-gray-400 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-200 hover:text-white ${activeTab === 'RobotMap' ? 'bg-gradient-to-r from-cyan-500 to-cyan-500 text-white' : ''}`}
              href="#"
              onClick={() => setActiveTab('RobotMap')}
            >
              <i className="fas fa-home mr-2"></i>Robot Map
            </a>
            <a
              className={`block text-black w-full text-center py-2.5 px-4 my-4 bg-gray-400 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-200 hover:text-white ${activeTab === 'ManagePackages' ? 'bg-gradient-to-r from-cyan-500 to-cyan-500 text-white' : ''}`}
              href="#"
              onClick={() => setActiveTab('ManagePackages')}
            >
              <i className="fas fa-file-alt mr-2"></i>Manage Packages
            </a>

          </nav>
          <a
            className="block text-gray-500 py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white mt-auto"
            href="#"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Log Out
          </a>
          <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>
          <p className="mb-1 px-5 py-3 text-left text-xs text-cyan-500">
            Copyright Charikat Dajaj@2024
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 w-full md:w-1/2">

          {/* Charts */}
          <h1 className='text-3xl font-bold'>{formatTabTitle(activeTab)}</h1>
          {renderContent()}
        </div>
      </div>
    </div >
  );

};

export default HomePage;
