import { createContext } from 'react';
import { FirebaseContextState } from '../interfaces/context';

const FirebaseContext = createContext<FirebaseContextState | null>(null);

export default FirebaseContext;
