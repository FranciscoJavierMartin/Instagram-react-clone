import { useContext } from 'react';
import FirebaseContext from '../context/firebase';
import { FirebaseContextState } from '../interfaces/context';

export default function useFirebaseContext(): FirebaseContextState {
  return useContext(FirebaseContext) as FirebaseContextState;
}
