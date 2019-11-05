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

export function setProjectFields(projectId, projectTitle, projectCustomer, projectType) {
    return {
        type: 'SET_PROJECT_FIELDS',
        projectId, projectTitle, projectCustomer, projectType
    }
}

export function setProgressActiveIndex(progressActiveIndex) {
    return {
        type: 'SET_PROGRESS_ACTIVE_INDEX',
        progressActiveIndex
    }
}

export function setReadonly(readonly) {
    return {
        type: 'SET_READONLY',
        readonly
    }
}
