import React, { useEffect } from 'react';
import Header from '../components/Header';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Instagram - Not found';
  });

  return (
    <div className='bg-gray-background'>
      <Header />
      <div className='mx-auto max-w-screen-lg'>
        <p className='text-center text-2xl'>Not found</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
