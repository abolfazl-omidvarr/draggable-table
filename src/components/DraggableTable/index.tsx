import {useCallback, useContext, useState} from "react";
import {DndContext, closestCorners, DragEndEvent, UniqueIdentifier} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy, arrayMove} from '@dnd-kit/sortable'
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';

import {DraggableRow} from "./DraggableRow.tsx";
import {SortableOverlay} from "./SortableOverlay.tsx";
import {AppContext} from "../../providers/AppContextProviders.tsx";
import Header from "./Header.tsx";

export function DraggableTable() {
    const {persons, setPersons} = useContext(AppContext)
    const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>(undefined);


    const handleDragEnd = useCallback((e: DragEndEvent) => {
        const {active, over} = e
        if (!over || active.id === over.id) {
            setActiveId(undefined);
            return
        }

        setPersons(prevState => {
            const orgPos = persons.findIndex(p => p.id === active.id)
            const newPos = persons.findIndex(p => p.id === over.id)
            return arrayMove(prevState, orgPos, newPos)
        })
        setActiveId(undefined);

    }, [activeId])

    const handleDragStart = (e: DragEndEvent) => {
        setActiveId(e.active.id)
    }

    return (
        <div className='w-screen md:max-w-[768px] lg:max-w-[968px] xl:max-w-[1200px] h-[60vh]  bg-white shadow-xl rounded-xl overflow-hidden'>
            <Header/>
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={closestCorners}
                        modifiers={[restrictToVerticalAxis]}>
                <SortableContext items={persons} strategy={verticalListSortingStrategy}>
                    <div className='h-[88%] overflow-y-auto overflow-x-hidden px-3'>
                        {persons?.map(person => <DraggableRow activeId={activeId} key={person.id} person={person}/>)}
                    </div>
                </SortableContext>
                <SortableOverlay>
                    {
                        activeId
                            ? <DraggableRow key={activeId} isOverlay person={persons.find(p => p.id === activeId)!}/>
                            : null
                    }
                </SortableOverlay>
            </DndContext>
        </div>
    )
}


