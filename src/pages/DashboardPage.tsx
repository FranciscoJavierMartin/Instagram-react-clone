import React, { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';

const DashboardPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Instagram';
  });

  return (
    <div className='bg-gray-background'>
      <Header />
      <div className='grid'>
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardPage;
