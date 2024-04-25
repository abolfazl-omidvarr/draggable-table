import {useSortable} from '@dnd-kit/sortable'
import {Person} from "../../utils/types.ts";
import {CSSProperties, useMemo} from "react";
import {CSS} from "@dnd-kit/utilities";
import {UniqueIdentifier} from "@dnd-kit/core";


export function DraggableRow({person, activeId, isOverlay}: {
    person: Person,
    activeId?: UniqueIdentifier,
    isOverlay?: boolean
}) {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: person.id})

    const style: CSSProperties = useMemo(() => ({
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: activeId === person.id ? '0.5' : '1',
        boxShadow: isOverlay
            ? 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px'
            : 'null'
    }), [activeId, isOverlay, transform])

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}
             className='w-full h-[50px] flex border-[1px] my-2 rounded-xl bg-white'>
            <div className='flex w-1/3 h-full justify-center items-center'>{person.fullName}</div>
            <div className='flex w-1/3 h-full justify-center items-center'>{person.userName}</div>
            <div className='flex w-1/3 h-full justify-center items-center'>{person.age}</div>
        </div>
    )
}
