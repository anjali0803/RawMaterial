var initialState = {
  userLogin: false,
  userName: null,
  userRole: null,
  userList: [],
  dataList: [],
  colList: [],
  projectId: '',
  projectType: '',
  projectTitle: '',
  projectCustomer: '',
  readOnly: false

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
    case 'SET_USER_LIST':
      return {
        ...state,
        userList: action.userList
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
    case 'SET_PROJECT_ID':
      return {
        ...state,
        projectId: action.projectId
      };
    case 'SET_PROJECT_TITLE':
      return {
        ...state,
        projectTitle: action.projectTitle
      };
    case 'SET_PROJECT_CUSTOMER':
      return {
        ...state,
        projectCustomer: action.projectCustomer
      };
    case 'SET_PROJECT_TYPE':
      return {
        ...state,
        projectType: action.projectType
      };
    case 'SET_READONLY':
      return {
        ...state,
        readOnly: action.readOnly
      };
    default:
      return state;
  }
}
