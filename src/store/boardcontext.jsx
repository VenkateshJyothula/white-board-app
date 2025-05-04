import { createContext } from "react";


const boardContext=createContext({
    activeToolItem:"",
    changeToolHandler:()=>{},
    elements:[],
    history:[],
    toolActionType:"",
    boardMouseDownHandler:()=>{},
    boardMouseMoveHandler:()=>{},
    boardMOuseUpHandler:()=>{},
    undoRedoHandler:()=>{},
    textAreaBlueHandler:()=>{},
    handleDownloadClick:()=>{},
});

export default boardContext;