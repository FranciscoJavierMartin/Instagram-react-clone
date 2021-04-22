import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase';

interface SuggestedProfileProps {
  profileDocId: string;
  username: string;
  profileId: string;
  userId: string;
  loggedInUserDocId: string;
}
const SuggestedProfile: React.FC<SuggestedProfileProps> = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId
}) => {
  const [followed, setFollowed] = useState<boolean>(false);

  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }

  return followed ? null : (
    <div className='flex flex-row items-center align-items justify-between'>
      <div className='flex items-center justify-between'>
        <img
          className='rounded-full w-8 flex mr-3'
          src={`/images/avatars/${username}.jpg`}
          alt='avatar'
        />
        <Link to={`/p/${username}`}>
          <p className='font-bold text-sm'>{username}</p>
        </Link>
      </div>
      <div>
        <button
          className='text-xs font-bold text-blue-medium'
          type='button'
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default SuggestedProfile;
