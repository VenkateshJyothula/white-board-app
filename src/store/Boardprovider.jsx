import React from 'react'
import { useReducer} from 'react'
import { TOOL_ITEMS,BOARD_ACTION, TOOL_ACTION_TYPE} from '../constants'
// eslint-disable-next-line no-unused-vars
import boardContext from './boardcontext'
import {createElement,getSvgPathFromStroke,isPointNearElement} from '../utils/elements'
import getStroke from 'perfect-freehand'
// import getStroke from "perfect-freehand";


function boardReducer(state,action){
  switch (action.type) {
    case BOARD_ACTION.CHANGE_ACTION_TYPE:{
      return {...state,toolActionType:action.payload.actionType};
    }
    case BOARD_ACTION.CHANGE_TOOL:{
      return {...state,activeToolItem:action.payload.tool}
    }
    case BOARD_ACTION.DRAW_DOWN:{
      const {clientX,clientY,stroke,fill,size}=action.payload;
      const newElement=createElement(state.elements.length,clientX,clientY,clientX,clientY,{type:state.activeToolItem,stroke:stroke,fill:fill,size});
      const PrevElements=state.elements
      return {
        ...state,
        toolActionType:TOOL_ACTION_TYPE.DRAWING,
        elements:[...PrevElements,newElement],
        history:[],
      }
    }
    case BOARD_ACTION.DRAW_MOVE:{
      const {clientX,clientY}=action.payload;
      const newElements=[...state.elements];
      const index=state.elements.length-1;
      const {type}=newElements[index];
      switch(type)
      {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
        {  
          const{x1,y1,stroke,fill,size}=newElements[index];
          const newelement=createElement(index,x1,y1,clientX,clientY,{type:state.activeToolItem,stroke,fill,size})
          newElements[index]=newelement
          return {...state,elements:newElements};
        }
        case TOOL_ITEMS.BRUSH:
        {  
          newElements[index].points=[...newElements[index].points,{x:clientX,y:clientY}];
          newElements[index].path=new Path2D(getSvgPathFromStroke(getStroke(newElements[index].points)));
          // newElements[index].path = new Path2D(
          //   getSvgPathFromStroke(getStroke(newElements[index].points))
          // );
          return {...state,
            elements:newElements
          }
        }
      }
      break; 
    }
    case BOARD_ACTION.DRAW_UP:{
      return {...state,toolActionType:TOOL_ACTION_TYPE.NONE};
    }
    case BOARD_ACTION.UNDO:
    {
      const oldElements=state.elements;
      if(oldElements.length==0) return state;
      const newElements=[...oldElements];
      const lastElement=newElements.pop();

      return {...state,elements:newElements,history:[...(state.history),lastElement]};
    }
    case BOARD_ACTION.REDO:
    {
      const oldElements=state.history;
      if(oldElements.length==0) return state;
      const newElements=[...oldElements];
      const lastElement=newElements.pop();

      return {...state,elements:[...(state.elements),lastElement],history:newElements};
    }
    case BOARD_ACTION.ERASE:
    {
      const {clientX,clientY}=action.payload;
      const oldElements=[...(state.elements)];
      const {newElements,deletedElements}=oldElements.reduce((initialarr,element)=>{
        if(isPointNearElement(element,clientX,clientY))
        {
          initialarr.deletedElements.push(element);
        }
        else{
          initialarr.newElements.push(element);

        }
      return initialarr;
      },{newElements:[],deletedElements:[]})
      deletedElements.reverse();
      const newHistory=[...(state.history),...deletedElements];
      return {...state, elements:newElements,history:newHistory};
    }
    case BOARD_ACTION.CHANGE_TEXT:
      {
        const{text}=action.payload;
        const index=state.elements.length-1;
        const newElements=[...(state.elements)];
        newElements[index].text=text;

        return {
          ...state,
          toolActionType:TOOL_ACTION_TYPE.NONE,
          elements:newElements
        };
      }
    default:
      console.log("no Board Action Matched");
      return state;
  }
}

const initialBoardState={
  activeToolItem:TOOL_ITEMS.BRUSH,
  elements:[],
  history:[],
  toolActionType:TOOL_ACTION_TYPE.NONE,
}
const BoardProvider = ({children}) => {
  const [boardState,dispatchBoardAction]=useReducer(boardReducer,initialBoardState);;
  


  const changeToolHandler=(tool)=>{
      dispatchBoardAction({type:BOARD_ACTION.CHANGE_TOOL,payload:{
        tool
      }})
    }

    const boardMouseDownHandler=(event,toolBoxState)=>{
      if(boardState.toolActionType==TOOL_ACTION_TYPE.WRITING) return;
      const {clientX,clientY}=event;
      if(boardState.activeToolItem===TOOL_ITEMS.ERASE)
      {
        dispatchBoardAction({
          type:BOARD_ACTION.CHANGE_ACTION_TYPE,
          payload:{
            actionType:TOOL_ACTION_TYPE.ERASE,
          }
        })
        return;
      }
      dispatchBoardAction({
        type:BOARD_ACTION.DRAW_DOWN,
        payload:{
          clientX,
          clientY,
          stroke:toolBoxState[boardState.activeToolItem]?.stroke,
          fill:toolBoxState[boardState.activeToolItem]?.fill,
          size:toolBoxState[boardState.activeToolItem]?.size,
        }
      }) 
      if(boardState.activeToolItem===TOOL_ITEMS.TEXT)
      {
        dispatchBoardAction({
          type:BOARD_ACTION.CHANGE_ACTION_TYPE,
          payload:{
            actionType:BOARD_ACTION.WRITING
          }
        })
      }
    }
    const boardMouseMoveHandler = (event) => {
      if(boardState.activeToolItem===TOOL_ITEMS.TEXT) return;
        const { clientX, clientY } = event;
        if (boardState.toolActionType === TOOL_ACTION_TYPE.DRAWING) {
          dispatchBoardAction({
            type: BOARD_ACTION.DRAW_MOVE,
            payload: {
              clientX,
              clientY,
            },
          });
        } else if (boardState.toolActionType === TOOL_ACTION_TYPE.ERASE) {
          dispatchBoardAction({
            type: BOARD_ACTION.ERASE,
            payload: {
              clientX,
              clientY,
            },
          });
        }
      };
    function boardMOuseUpHandler()
    {
      if(boardState.activeToolItem===TOOL_ITEMS.TEXT) return;
      dispatchBoardAction({type:BOARD_ACTION.DRAW_UP})
    }
    function undoRedoHandler(option)
    {
      dispatchBoardAction({type:option})
    }
    function textAreaBlueHandler(text)
    {
      dispatchBoardAction({
        type:BOARD_ACTION.CHANGE_TEXT,
        payload:{
          text,
        }
      })
    }
    function handleDownloadClick(e){
      e.preventDefault();
      const canvas=document.getElementById("canvas");
      const data= canvas.toDataURL("image/png")
      const anchor = document.createElement('a');
      anchor.href =data;
      anchor.download = 'board.png';
      anchor.click();
    }
    const boardContextValue={
        activeToolItem:boardState.activeToolItem,
        elements:boardState.elements,
        history:boardState.history,
        toolActionType:boardState.toolActionType,
        changeToolHandler,
        boardMouseDownHandler,
        boardMouseMoveHandler,
        boardMOuseUpHandler,
        textAreaBlueHandler,
        undoRedoHandler,
        handleDownloadClick,
    };
  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  )
}

export default BoardProvider