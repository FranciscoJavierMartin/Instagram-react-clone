import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { FirebaseUser } from '../../interfaces/firebase';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './SuggestedProfile';

interface SuggestionsProps {
  userId?: string;
  following?: string[];
  loggedInUserDocId?: string;
}

const Suggestions: React.FC<SuggestionsProps> = ({
  userId,
  following,
  loggedInUserDocId,
}) => {
  const [profiles, setProfiles] = useState<FirebaseUser[]>([]);

  useEffect(() => {
    if (userId && following) {
      (async function suggestedProfiles() {
        const response = await getSuggestedProfiles(userId, following);
        setProfiles(response);
      })();
    }
  }, [userId, following]);

  return profiles.length === 0 ? (
    <Skeleton count={1} height={150} className='mt-5' />
  ) : (
    <div className='rounded flex flex-col'>
      <div className='text-sm flex items-center align-items justify-between mb-2'>
        <p className='font-bold text-gray-base'>Suggestions for you</p>
      </div>
      <div className='mt-4 grid gap-5'>
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId!}
            loggedInUserDocId={loggedInUserDocId!}
          />
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
