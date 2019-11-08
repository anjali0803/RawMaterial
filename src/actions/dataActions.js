export function setDataList(dataList) {
    return {
        type: 'SET_DATA_LIST',
        dataList
    }
}

export function setColList(colList) {
    return {
        type: 'SET_COL_LIST',
        colList
    }
}

export function setProjectId(projectId) {
    return {
        type: 'SET_PROJECT_ID',
        projectId
    }
}

export function setProjectType(projectType) {
    return {
        type: 'SET_PROJECT_TYPE',
        projectType
    }
}

export function setProjectTitle(projectTitle) {
    return {
        type: 'SET_PROJECT_TITLE',
        projectTitle
    }
}

export function setProjectCustomer(projectCustomer) {
    return {
        type: 'SET_PROJECT_CUSTOMER',
        projectCustomer
    }
}

export function setReadonly(readonly) {
    return {
        type: 'SET_READONLY',
        readonly
    }
}