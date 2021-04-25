import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import NotFoundPage from '../../pages/NotFoundPage';

describe('<NotFound/>', () => {
  it('renders the not found page with a logged in user', () => {
    const { getByText, queryByText } = render(
      <Router>
        <FirebaseContext.Provider
          value={{ firebase: null as any, FieldValue: null as any }}
        >
          <UserContext.Provider value={{ user: { uid: '1' } as any }}>
            <NotFoundPage />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    );

    expect(queryByText('Not found')).toBeTruthy();
  });
});
