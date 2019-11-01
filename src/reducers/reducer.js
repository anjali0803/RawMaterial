var initialState = {
  userLogin: false,
  userName: null,
  userRole: null
};

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_LOGIN':
      return {
        ...state,
        userLogin: action.userLogin
      };
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.userName
      };
    case 'SET_USER_ROLE':
      return {
        ...state,
        userRole: action.userRole
      };
    default:
      return state;
  }
}
