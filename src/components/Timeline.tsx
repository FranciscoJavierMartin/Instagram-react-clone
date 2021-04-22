import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhotos';
import Post from './post';

const Timeline: React.FC = () => {
  const { photos, isLoading } = usePhotos();
  return (
    <div className='container col-span-2'>
      {isLoading ? (
        <Skeleton count={4} width={640} height={400} className='mb-5' />
      ) : photos.length === 0 ? (
        <p className='text-center text-2xl'>Follow people to see photos</p>
      ) : (
        photos.map((content) => <Post key={content.docId} content={content}/>)
      )}
    </div>
  );
};

export default Timeline;
