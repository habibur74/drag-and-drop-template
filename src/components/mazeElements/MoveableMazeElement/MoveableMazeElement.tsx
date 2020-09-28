import React, { FunctionComponent, useEffect, useRef } from 'react';
import '../MazeElement/MazeElement.scss';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { MazeElement as IMazeElement } from '../../../types/models/Maze/Structure';
import { MazeDragElement } from '../../../types/models/dnd/maze';
import { buildElementDragOptions } from './MoveableMazeElement.service';
import MazeElement from '../MazeElement';
import DroppableMazeElement from './DroppableMazeElement';

interface Props {
  element: IMazeElement;
  dragItemType: string;
  dragItemNoneType: string;
  className?: string;
  moveElement?: (source: IMazeElement, target: IMazeElement) => void;
}

const MoveableMazeElement: FunctionComponent<Props> = ({
  element,
  dragItemType,
  dragItemNoneType,
  className,
  moveElement,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag, preview] = useDrag<MazeDragElement, unknown, unknown>(
    buildElementDragOptions(
      element,
      ref,
      dragItemType,
      dragItemNoneType,
      className || ''
    )
  );

  drag(ref);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return moveElement ? (
    <DroppableMazeElement
      ref={ref}
      className={className}
      element={element}
      dragItemType={dragItemType}
      dragItemNoneType={dragItemNoneType}
      moveElement={moveElement}
    />
  ) : (
    <MazeElement ref={ref} className={className} />
  );
};

export default MoveableMazeElement;