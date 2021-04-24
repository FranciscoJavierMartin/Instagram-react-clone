import React, { Dispatch, useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import { FirebaseUser } from '../../interfaces/firebase';
import { UserProfileState } from '../../interfaces/profile';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

interface HeaderProps {
  photosCount: number;
  profile: FirebaseUser;
  followerCount: number;
  setFollowerCount: Dispatch<Partial<UserProfileState>>;
}

const Header: React.FC<HeaderProps> = ({
  profile,
  photosCount,
  followerCount,
  setFollowerCount,
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState<boolean>(false);
  const activeBtnFollow = user?.username && user.username !== profile.username;

  useEffect(() => {
    if (user) {
      (async function isLoggedInUserFollowingProfile() {
        const isFollowing: boolean = await isUserFollowingProfile(
          user.userId,
          profile.userId
        );
        setIsFollowingProfile(isFollowing);
      })();
    }
  }, [profile.userId, user]);

  const handleToggleFollow = async () => {
    if (user) {
      setIsFollowingProfile((prevState) => !prevState);
      setFollowerCount({
        followerCount: isFollowingProfile
          ? followerCount - 1
          : followerCount + 1,
      });
      await toggleFollow(
        isFollowingProfile,
        user.docId,
        profile.docId,
        profile.userId,
        user.userId
      );
    }
  };

  return (
    <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
      <div className='container flex justify-center'>
        <img
          className='rounded-full h-40 w-40 flex'
          alt={`${profile.username} profile`}
          src={`/images/avatars/${profile.username}.jpg`}
        />
      </div>
      <div className='flex items-center justify-center flex-col col-span-2'>
        <div className='container flex items-center'>
          <p className='text-2xl mr-4'>{profile.username}</p>
          {activeBtnFollow && (
            <button
              className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8'
              type='button'
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className='container flex mt-4'>
          <>
            <p className='mr-10'>
              <span className='font-bold'>{photosCount}</span>{' '}
              {photosCount === 1 ? 'photo' : 'photos'}
            </p>
            <p className='mr-10'>
              <span className='font-bold'>{followerCount}</span>{' '}
              {followerCount === 1 ? 'follower' : 'followers'}
            </p>
            <p className='mr-10'>
              <span className='font-bold'>{profile.following.length}</span>{' '}
              following
            </p>
          </>
        </div>
        <div className='container mt-4'>
          <p className='font-medium'>{profile.fullName}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
