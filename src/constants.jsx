
import {
    FaPaintBrush,
    FaSlash,
    FaRegCircle,
    FaArrowRight,
    FaUndoAlt,
    FaRedoAlt,
    FaEraser,
    FaFont,
  } from "react-icons/fa";
  import { LuRectangleHorizontal } from "react-icons/lu";
  
  export const TOOL_ITEMS = {
    BRUSH: "BRUSH",
    LINE: "LINE",
    RECTANGLE: "RECTANGLE",
    CIRCLE: "CIRCLE",
    ARROW: "ARROW",
    ERASE: "ERASE",
    TEXT: "TEXT",
  };
  export const TOOL_ID = {
    BRUSH: 1,
    LINE: 2,
    RECTANGLE: 3,
    CIRCLE: 4,
    ARROW: 5,
    ERASER: 6,
    TEXT: 7,
  };

  export const TOOL_DESCRIPTION={
    BRUSH: "BRUSH",
    LINE: "DRAW LINE",
    RECTANGLE: "DRAW RECTANGLE",
    CIRCLE: "DRAW CIRCLE",
    ARROW: "DRAW ARROW",
    ERASE: "ERASE",
    TEXT: "TEXT",
    FaUndoAlt:"UNDO",
    FaRedoAlt:"REDO",

  }
  export const COLORS = {
    BLACK: "#000000",
    RED: "#ff0000",
    GREEN: "#00ff00",
    BLUE: "#0000ff",
    ORANGE: "#ffa500",
    YELLOW: "#ffff00",
    WHITE: "#ffffff",
  };
export const FILL_COLORS = {
    BLACK: "#000000",
    RED: "#ff0000",
    GREEN: "#00ff00",
    BLUE: "#0000ff",
    ORANGE: "#ffa500",
    YELLOW: "#ffff00",
  };
  export const TOOL_ICONS = {
    BRUSH: FaPaintBrush,
    LINE: FaSlash,
    RECTANGLE: LuRectangleHorizontal,
    CIRCLE: FaRegCircle,
    ARROW: FaArrowRight,
    ERASE: FaEraser,
    TEXT: FaFont,
  };
  

  export const BOARD_ACTION={
    CHANGE_TOOL:"CHANGE_TOOL",
    DRAW_DOWN:"DRAW_DOWN",
    DRAW_UP:"DRAW_UP",
    DRAW_MOVE:"DRAW_MOVE",
    UNDO:"UNDO",
    REDO:"REDO",
    ERASE:"ERASE",
    WRITING:"WRITING",
    CHANGE_ACTION_TYPE:"CHANGE_ACTION_TYPE",
    CHANGE_TEXT:"CHANGE_TEXT",
    LOAD_ELEMENTS:"LOAD_ELEMENTS",
  }

  export const TOOL_ACTION_TYPE={
    NONE:"NONE",
    DRAWING:"DRAWING",
    ERASE:"ERASE",
    WRITING:"WRITING",
  };

  export const FILL_TYPE=[TOOL_ITEMS.RECTANGLE,TOOL_ITEMS.CIRCLE]
  export const STROKE_TYPE=[TOOL_ITEMS.ARROW,TOOL_ITEMS.LINE,TOOL_ITEMS.RECTANGLE,TOOL_ITEMS.CIRCLE,TOOL_ITEMS.BRUSH,TOOL_ITEMS.TEXT]
  export const SIZE_TYPE=[TOOL_ITEMS.ARROW,TOOL_ITEMS.LINE,TOOL_ITEMS.RECTANGLE,TOOL_ITEMS.CIRCLE,TOOL_ITEMS.TEXT]

  export const TOOLBOX_ACTIONS={
    CHANGE_STROKE:"CHANGE_STROKE",
    CHANGE_FILL:"CHANGE_FILL",
    CHANGE_SIZE:"CHANGE_SIZE",
  }

  export const OTHER_ICONS={
    FaUndoAlt:FaUndoAlt,
    FaRedoAlt:FaRedoAlt,
  }

  export const ELEMENT_ERASE_THRESHOLD = 0.1;