const defaultState = {
    checkbox: false
};

// галочка стоит или нет
export const reducerTaskDone = (state:any = defaultState, action: any) => {
    switch (action.type) {
        case "task_done":
            return {...state, checkbox: true}

        case "task_not_done":
            return {...state, checkbox: false}

        default:
            return state
    }
};
