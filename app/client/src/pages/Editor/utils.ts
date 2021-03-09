import ReactDOM from "react-dom";

export const draggableElement = (
  element: any,
  onPositionChange: any,
  initPostion?: any,
  dragHandle?: () => JSX.Element,
) => {
  let newXPos = 0,
    newYPos = 0,
    oldXPos = 0,
    oldYPos = 0;
  let dragHandler = element;

  const setElementPosition = () => {
    element.style.top = initPostion.top + "px";
    element.style.left = initPostion.left + "px";
  };
  if (dragHandle) {
    dragHandler = createDragHandler(element, dragHandle);
  }

  if (initPostion) {
    setElementPosition();
  }
  const dragMouseDown = (e: MouseEvent) => {
    e = e || window.event;
    e.preventDefault();
    oldXPos = e.clientX;
    oldYPos = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };
  dragHandler.onmousedown = dragMouseDown;

  const calculateBoundaryConfinedPosition = (
    calculatedLeft: number,
    calculatedTop: number,
  ) => {
    if (calculatedLeft <= 0) {
      calculatedLeft = 15;
    }
    if (calculatedTop <= 30) {
      calculatedTop = 30;
    }
    if (calculatedLeft >= window.innerWidth - element.clientWidth) {
      calculatedLeft = window.innerWidth - element.clientWidth;
    }
    if (calculatedTop >= window.innerHeight - element.clientHeight) {
      calculatedTop = window.innerHeight - element.clientHeight;
    }
    return {
      left: calculatedLeft,
      top: calculatedTop,
    };
  };

  const elementDrag = (e: MouseEvent) => {
    e = e || window.event;
    e.preventDefault();
    newXPos = oldXPos - e.clientX;
    newYPos = oldYPos - e.clientY;
    oldXPos = e.clientX;
    oldYPos = e.clientY;
    const calculatedTop = element.offsetTop - newYPos;
    const calculatedLeft = element.offsetLeft - newXPos;
    const { left, top } = calculateBoundaryConfinedPosition(
      calculatedLeft,
      calculatedTop,
    );
    element.style.top = top + "px";
    element.style.left = left + "px";
  };

  const closeDragElement = () => {
    onPositionChange({
      left: element.getBoundingClientRect().left,
      top: element.getBoundingClientRect().top,
    });
    document.onmouseup = null;
    document.onmousemove = null;
  };
};

const createDragHandler = (el: any, dragHandle: () => JSX.Element) => {
  const dragElement = document.createElement("div");
  dragElement.style.position = "absolute";
  dragElement.style.left = "0px";
  dragElement.style.top = "0px";
  el.appendChild(dragElement);
  ReactDOM.render(dragHandle(), dragElement);
  return dragElement;
};
