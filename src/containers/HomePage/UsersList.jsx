import {React} from 'react';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import styled from'styled-components'
import { makeSelectUsers } from './selectors';
import { useHistory } from 'react-router-dom';


const stateSelector = createSelector(makeSelectUsers, (users) => ({
  users,
}));

export function UsersList(props) {
const {users} = useSelector( stateSelector)

const history = useHistory();


const goToUserPage =(id) => {
history.push(`/user/${id}`);
}

const isEmptyUser = !users || (users && users.length === 0);
if(isEmptyUser) 
return null;
return <UserContainer>
{users.map((user, idx) => (
<UserWrapper key= {idx} onClick={() => goToUserPage(user.id)}>
<UserImage>
<img src={user.avatar} alt="user-avatar" />
</UserImage>
<UserName>{user.first_name} {user.last_name}</UserName>
</UserWrapper>
))}
</UserContainer>
}

const UserContainer = styled.div`
width: 100%;
display: flex;
justify-content:space-evenly;
`;

const UserWrapper = styled.div`
display: flex;
flex-direction: column;
`;


const UserImage = styled.div`
width: 7em;
height: 7em;
img {
width: 100%;height: 100%;
} 
`

const UserName = styled.h3`
font-size: 20px;
color: #000;
margin: 0;
`;

