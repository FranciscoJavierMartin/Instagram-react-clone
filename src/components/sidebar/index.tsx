import React from 'react';
import useUser from '../../hooks/useUser';
import Suggestions from './Suggestions';
import User from './User';

const Sidebar: React.FC = () => {
  const { user } = useUser();

  return (
    <div className='hidden lg:block p-4'>
      <User username={user?.username} fullName={user?.fullName} />
      <Suggestions
        userId={user?.userId}
        following={user?.following}
        loggedInUserDocId={user?.docId}
      />
    </div>
  );
};

export default Sidebar;
