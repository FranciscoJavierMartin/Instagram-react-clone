import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Dashboard from '../../pages/DashboardPage';
import { getPhotos, getSuggestedProfiles } from '../../services/firebase';
import useUser from '../../hooks/useUser';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('../../services/firebase');
jest.mock('../../hooks/useUser');

describe('<Dashboard/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dashboard with a user profile and follows a user from the suggested profile sidebar', async () => {
    await act(async () => {
      getPhotos.mockImplementation(() => photosFixture);
      getSuggestedProfiles.mockImplementation(() => suggestedProfilesFixture);
      useUser.mockImplementation(() => ({ user: userFixture }));

      const {
        getByText,
        getByTitle,
        getAllByText,
        getByAltText,
        getByTestId,
      } = render(
        <Router>
          <FirebaseContext.Provider
            value={{ firebase: null as any, FieldValue: null as any }}
          >
            <UserContext.Provider value={{ user: { uid: 1 } as any }}>
              <Dashboard />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      await waitFor(() => {
        expect(document.title).toBe('Instagram');
        expect(getByTitle('Sign Out')).toBeTruthy();
        expect(getAllByText('raphael')).toBeTruthy();
        expect(getByAltText('Instagram')).toBeTruthy();
        expect(getByAltText('fran profile')).toBeTruthy();
        expect(getAllByText('Saint George and the Dragon')).toBeTruthy();
        expect(getByText('Suggestions for you')).toBeTruthy();

        fireEvent.click(getByText('Follow'));
        fireEvent.click(getByTestId('like-photo-12345'));
        fireEvent.click(getByTestId('like-photo-12345'), {
          key: 'Enter'
        });

        //TODO: 1:29:09
      });
    });
  });
});
