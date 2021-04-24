import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Login from '../../pages/LoginPage';
import FirebaseContext from '../../context/firebase';
import { DASHBOARD_PAGE_ROUTE } from '../../constants/routes';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

jest.mock('../../services/firebase');

describe('<Login/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login page with a form submission and logs the user in', async () => {
    const succeededToLogin = jest.fn(() => Promise.resolve('I am signed in!'));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeededToLogin,
      })),
    };
    const FieldValue: any = null;
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider
          value={{ firebase: firebase as any, FieldValue }}
        >
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      expect(document.title).toEqual('Instagram - Login');

      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'john@test.com' },
      });

      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: '123456' },
      });

      fireEvent.submit(getByTestId('login'));

      expect(succeededToLogin).toHaveBeenCalled();
      expect(succeededToLogin).toHaveBeenCalledWith('john@test.com', '123456');
      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(DASHBOARD_PAGE_ROUTE);
        expect((getByPlaceholderText('Email address') as any).value).toBe(
          'john@test.com'
        );
        expect((getByPlaceholderText('Password') as any).value).toBe('123456');
        expect(queryByTestId('error')).toBeFalsy();
      });
    });
  });

  it('renders the login in page with a form submission and fails to log a user in', async () => {
    const failToLogin = jest.fn(() => Promise.reject(new Error('Cannot sign in')));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: failToLogin,
      })),
    };
    const FieldValue: any = null;
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider
          value={{ firebase: firebase as any, FieldValue }}
        >
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      expect(document.title).toEqual('Instagram - Login');

      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'john@test.com' },
      });

      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: '123456' },
      });

      fireEvent.submit(getByTestId('login'));

      expect(failToLogin).toHaveBeenCalled();
      expect(failToLogin).toHaveBeenCalledWith('john@test.com', '123456');
      expect(failToLogin).rejects.toThrow('Cannot sign in');

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(DASHBOARD_PAGE_ROUTE);
        expect((getByPlaceholderText('Email address') as any).value).toBe(
          ''
        );
        expect((getByPlaceholderText('Password') as any).value).toBe('');
        expect(queryByTestId('error')).toBeTruthy();
      });
    });
  });
});
