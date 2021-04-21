import { useContext } from 'react';
import UserContext from '../../context/user';
import { UserContextState } from '../../interfaces/context';

export default function useUserContext(): UserContextState {
  return useContext(UserContext) as UserContextState;
}
