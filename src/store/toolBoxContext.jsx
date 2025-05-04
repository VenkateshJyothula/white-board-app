import { createContext } from "react";

const toolBoxContext=createContext({
    toolBoxState:{},
    changeStrokeHandler:()=>{},
    changeFillHandler:()=>{},
    changeSizeHandler:()=>{},
});

export default toolBoxContext;