import { csrfFetch } from "./csrf";

const GET_ALL_USERS = 'users/getAllUsers/get'

// Actions
const getAllUsersAction = (payload) => {
    return {
        type: GET_ALL_USERS,
        payload
    }
}

// Dispatcher
export const getAllUsers = () => async (dispatch) => {
    const response = await csrfFetch('/api/users', {
        method: 'GET'
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllUsersAction(data.Users))
    }
}

// Reducer
export const usersReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_USERS:
        newState = {  }
        action.payload.forEach((user) => (
          newState[user.id] = user
        ))
        return newState;
    default:
        return state;
  }
};
