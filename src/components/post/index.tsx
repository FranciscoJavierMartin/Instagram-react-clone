import React, { RefObject, useRef } from 'react';
import { PhotoWithUserDetails } from '../../interfaces/firebase';
import Actions from './Actions';
import Comments from './Comments';
import Footer from './Footer';
import Header from './Header';
import Image from './Image';

interface PostProps {
  content: PhotoWithUserDetails;
}

const Post: React.FC<PostProps> = ({
  content: {
    username,
    imageSrc,
    caption,
    docId,
    likes,
    userLikedPhoto,
    comments,
    dateCreated,
  },
}) => {
  const commentInput: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
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
      <Comments
        docId={docId}
        comments={comments}
        posted={dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Post;
