export function setDataList (dataList) {
  return {
    type: 'SET_DATA_LIST',
    dataList
  }
}

export function setColList (colList) {
  return {
    type: 'SET_COL_LIST',
    colList
  }
}

export function setProjectId (projectId) {
  return {
    type: 'SET_PROJECT_ID',
    projectId
  }
}

export function setProjectType (projectType) {
  return {
    type: 'SET_PROJECT_TYPE',
    projectType
  }
}

export function setProjectTitle (projectTitle) {
  return {
    type: 'SET_PROJECT_TITLE',
    projectTitle
  }
}

export function setProjectCustomer (projectCustomer) {
  return {
    type: 'SET_PROJECT_CUSTOMER',
    projectCustomer
  }
}

export function setDocumentId (documentId) {
  return {
    type: 'SET_DOCUMENT_ID',
    documentId
  }
}

export function setReadonly (readonly) {
  return {
    type: 'SET_READONLY',
    readonly
  }
}

export function setCurrentURL (currentURL) {
  return {
    type: 'SET_CURRENT_URL',
    currentURL
  }
}

export function setDocumentArray (documentArray) {
  return {
    type: 'SET_DOCUMENT_ARRAY',
    documentArray
  }
}

export function setDocumentType (fileType) {
  return {
    type: 'SET_DOCUMENT_FILETYPE',
    fileType
  }
}

export function setDueDate (dueDate) {
  return {
    type: 'SET_DUE_DATE',
    dueDate
  }
}
