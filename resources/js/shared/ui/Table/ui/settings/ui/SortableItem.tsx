import { FC, PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
    id: UniqueIdentifier;
    checked: boolean;
    onToggle: () => void;
    activeId: UniqueIdentifier | null;
};

export const SortableItem: FC<PropsWithChildren<Props>> = ({
    id: keyProp,
    checked,
    onToggle,
    children,
    activeId,
}) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
        id: keyProp,
    });

    const isDragging = activeId === keyProp;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1, // прозрачность при drag
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="flex items-center select-none cursor-grab px-2 py-1 rounded hover:bg-gray-100"
        >
            <input
                className={
                    'cursor-pointer checked:text-checkbox-custom' +
                    ' outline-none border focus:ring-checkbox-ring focus:ring-offset-0 rounded active:border-transparent ' +
                    ' focus:outline-none ' +
                    'bg-background-block mr-2 cursor-pointer'
                }
                // className=""     
                id={String(keyProp)}
                name={String(keyProp)}
                type="checkbox"
                onChange={onToggle}
                checked={checked}
            />
            <span className="text-table-base line-clamp-1">{children}</span>
        </div>
    );
};
