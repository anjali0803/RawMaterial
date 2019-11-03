var initialState = {
  userLogin: false,
  userName: null,
  userRole: null,
  dataList: [],
  colList: []
};

export default (state = initialState, action) => {
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
    case 'SET_DATA_LIST':
      return {
        ...state,
        dataList: action.dataList
      };
    case 'SET_COL_LIST':
      return {
        ...state,
        colList: action.colList
      };
    default:
      return state;
  }
}
