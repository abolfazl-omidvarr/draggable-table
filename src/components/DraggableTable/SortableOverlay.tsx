import type {PropsWithChildren} from "react";
import {DragOverlay, defaultDropAnimationSideEffects} from "@dnd-kit/core";
import {restrictToParentElement} from '@dnd-kit/modifiers'
import type {DropAnimation} from "@dnd-kit/core";

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: "0.4",
            }
        }
    })
    ,
    duration: 200
};

interface Props {
}

export function SortableOverlay({children}: PropsWithChildren<Props>) {
    return (
        <DragOverlay modifiers={[restrictToParentElement]} dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
    );
}
