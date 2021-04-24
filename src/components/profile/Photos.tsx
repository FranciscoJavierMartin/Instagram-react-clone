import React from 'react';
import { FirebasePhoto } from '../../interfaces/firebase';

interface PhotosProps {
  photos: FirebasePhoto[];
}

const Photos: React.FC<PhotosProps> = ({ photos }) => {
  return <div></div>;
};

export default Photos;
