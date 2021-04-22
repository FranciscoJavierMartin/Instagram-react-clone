import React, { useRef } from 'react';
import { PhotoWithUserDetails } from '../../interfaces/firebase';
import Actions from './Actions';
import Footer from './Footer';
import Header from './Header';
import Image from './Image';

interface PostProps {
  content: PhotoWithUserDetails;
}

const Post: React.FC<PostProps> = ({
  content: { username, imageSrc, caption, docId, likes, userLikedPhoto },
}) => {
  const commentInput = useRef<any>(null);
  const handleFocus = () => commentInput.current?.focus();
  return (
    <div className='rounded col-span-4 border bg-white border-gray-primary mb-8'>
      <Header username={username} />
      <Image src={imageSrc} caption={caption} />
      <Actions
        docId={docId}
        totalLikes={likes.length}
        likedPhoto={userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={caption} username={username} />
    </div>
  );
};

export default Post;
