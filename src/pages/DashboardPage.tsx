import React, { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/Timeline';

const DashboardPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Instagram';
  });

  return (
    <div className='bg-gray-background'>
      <Header />
      <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg px-4 lg:px-0'>
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardPage;
