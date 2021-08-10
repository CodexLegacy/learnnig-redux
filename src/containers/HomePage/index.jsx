/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Axios from 'axios';
import { setUsers } from './actions';
import { makeSelectUsers } from './selectors';

import { UsersList } from './UsersList';

const stateSelector = createSelector(makeSelectUsers, (users) => ({
  users,
}));

const actionDispatch = (dispatch) => ({
setUser: (users) => dispatch(setUsers(users))
})

export function HomePage(props) {
    const { users } = useSelector(stateSelector);
    const {setUser} =actionDispatch(useDispatch());

  const fecthUsers = async () => {
    const response = await Axios.get('https://reqres.in/api/users')
    .catch(
      (err) => {
        console.log('Err: ', err);
      }
    );
    setUser(response.data.data);
  };

  useEffect(() => {
    fecthUsers();
  }, []);
  
  // console.log("Users: ", users);

  return <div>
  <UsersList />
  </div>;
}
