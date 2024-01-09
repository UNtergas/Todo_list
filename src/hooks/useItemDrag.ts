import { useDrag } from 'react-dnd';
import { useAppState } from './index';
import { DragItem } from '../types/DragItem';

export const useItemDrag = (item: DragItem) => {
    const { dispatch } = useAppState()
    const [{ isDragging }, drag] = useDrag({
        type: item.type,
        item: () => {
            return [item,
                dispatch({
                    type: "SET_DRAGGED_ITEM",
                    payload: item
                }) //Need to return Item + action
            ]
        },
        end: () => dispatch({ type: "SET_DRAGGED_ITEM", payload: undefined }),
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    })
    return { drag, isDragging }
}