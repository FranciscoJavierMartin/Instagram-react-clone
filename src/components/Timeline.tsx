import React from 'react';
import usePhotos from '../hooks/usePhotos';

const Timeline: React.FC = () => {
  const { photos } = usePhotos();
  return <div className='container col-span-2'>Timeline</div>;
};

export default Timeline;
