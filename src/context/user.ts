import { createContext } from 'react';
import { UserContextState } from '../interfaces/context';

const UserContext = createContext<UserContextState | null>(null);

export default UserContext;
