import React, { createContext, useReducer, useContext } from "react"
import { v4 as uuid } from "uuid";

import { findItemIndexById, moveItem } from "../utils"
import { DragItem } from "../types/DragItem";

interface Task {
    id: string
    text: string
}


interface List {
    id: string
    text: string
    tasks: Task[]
}



interface AppState {
    lists: List[],
    draggedItem?: DragItem
}


interface AppStateContextProps {
    state: AppState
    dispatch: React.Dispatch<Action> // Add the dispatch property
}
export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        }
    ]
}

type Action =
    | {
        type: "ADD_LIST"
        payload: string
    }
    | {
        type: "ADD_TASK"
        payload: { text: string; taskId: string }
    }
    | {
        type: "MOVE_LIST"
        payload: {
            dragIndex: number
            hoverIndex: number
        }
    }
    | {
        type: "SET_DRAGGED_ITEM"
        payload: DragItem | undefined
    }
const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_LIST": {
            // Reducer logic here...
            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: uuid(), text: action.payload, tasks: [] }
                ]
            }
        }
        case "ADD_TASK": {
            const targetLaneIndex = findItemIndexById(state.lists, action.payload.taskId)
            const targetLane = state.lists[targetLaneIndex];

            const updatedTasks = [...targetLane.tasks, { id: uuid(), text: action.payload.text }];

            const updatedLane = { ...targetLane, tasks: updatedTasks };

            const updatedLists = state.lists.map(list => list.id === action.payload.taskId ? updatedLane : list);
            return {
                ...state,
                lists: updatedLists
            }
        }
        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload
            return {
                ...state,
                lists: moveItem(state.lists, dragIndex, hoverIndex)
            }

        }
        case "SET_DRAGGED_ITEM": {
            return { ...state, draggedItem: action.payload }
        }
        default: {
            return state
        }
    }
}


const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData)
    console.log(state)
    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export { AppStateProvider }