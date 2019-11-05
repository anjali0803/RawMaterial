var initialState = {
  userLogin: false,
  userName: null,
  userRole: null,
  dataList: [],
  colList: [],
  projectId: null,
  projectType: null,
  projectCustomer: null,
  projectTitle: null,
  progressActiveIndex: 0,
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
    case 'SET_PROJECT_FIELDS':
      return {
        ...state,
        projectId: action.id,
        projectType: action.type,
        customer: action.customer,
        projectTitle: action.title
      };
    case 'SET_READONLY':
      return {
        ...state,
        readOnly: action.readOnly
      };

    case 'SET_PROGRESS_ACTIVE_INDEX':
      return {
        ...state,
        progressActiveIndex: action.progressActiveIndex
      };

    default:
      return state;
  }
}
