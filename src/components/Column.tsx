import React, { useRef } from "react";
import { ColumnContainer, ColumnTitle } from "../styles";
import AddNewItem from "./AddNewItem";
import { useAppState, useItemDrag } from "../hooks";
import Card from "./Card";
import { v4 as uuid } from "uuid";

interface ColumnProp {
    text: string,
    index: number,
    id: string,
    isDragged?: boolean
}


const Column = ({ text, index, id }: ColumnProp) => {
    const { state, dispatch } = useAppState()
    const { drag, isDragging } = useItemDrag({ type: "COLUMN", id, index, text })
    const ref = useRef<HTMLDivElement>(null)
    drag(ref)
    return (
        <>
            <ColumnContainer ref={ref} $isDragged={isDragging}>
                <ColumnTitle> {text} </ColumnTitle>
                {state.lists[index].tasks.map(task => (
                    <Card text={task.text} key={task.id} />
                ))}
                <AddNewItem
                    toggleButtonText="+ Add new task"
                    //! taskId here is Column's id
                    onAdd={text => dispatch({ type: "ADD_TASK", payload: { text, taskId: id } })}
                    dark
                />
            </ColumnContainer>
        </>
    )
}

export default Column