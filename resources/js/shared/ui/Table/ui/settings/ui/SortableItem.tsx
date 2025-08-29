import { FC, PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
    id: UniqueIdentifier
    checked: boolean
    onToggle: () => void;
}



export const SortableItem: FC<PropsWithChildren<Props>> = ({ checked, id: keyProp, children, onToggle }) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: keyProp })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <input
                id={String(keyProp)}
                name={String(keyProp)}
                type="checkbox"
                onChange={onToggle}
                checked={checked}
            />
            <span className='text-table-base select-none'>
                {children}
                {keyProp}
            </span>
        </div>
    )
}