import React, { useReducer } from 'react'


// eslint-disable-next-line no-unused-vars
import toolBoxContext from './toolBoxContext'
import { COLORS, TOOL_ITEMS, TOOLBOX_ACTIONS } from '../constants'

function toolBoxReducer(state,action)
{
    switch(action.type)
    {
        case TOOLBOX_ACTIONS.CHANGE_STROKE:
        {
            const newState={...state};
            newState[action.payload.tool].stroke=action.payload.stroke;
            return newState;
        } 
        case TOOLBOX_ACTIONS.CHANGE_FILL:
        {
            const newState={...state};
            newState[action.payload.tool].fill=action.payload.fill;
            return newState;
        } 
        case TOOLBOX_ACTIONS.CHANGE_SIZE:
        {
            const newState={...state};
            newState[action.payload.tool].size=action.payload.size;
            return newState;
        }
        default:
        return state;
    }
    
}
const initialToolBoxState={
    [TOOL_ITEMS.BRUSH]:{
        stroke:COLORS.BLACK,
        fill:COLORS.BLACK,
        size:1,
    },
    [TOOL_ITEMS.LINE]:{
        stroke:COLORS.BLACK,
        size:1,
    },
    [TOOL_ITEMS.RECTANGLE]:{
        stroke:COLORS.BLACK,
        fill:COLORS.NONE,
        size:1,
    },
    [TOOL_ITEMS.CIRCLE]:{
        stroke:COLORS.BLACK,
        fill:COLORS.NONE,
        size:1,
    },
    [TOOL_ITEMS.ARROW]:{
        stroke:COLORS.BLACK,
        size:1,
    },
    [TOOL_ITEMS.TEXT]:{
        stroke:COLORS.BLACK,
        size:32,
    },
}
const ToolBoxProvider = ({children}) => {
    
    const [toolBoxState,dispatchToolBoxAction]=useReducer(toolBoxReducer,initialToolBoxState)
    const changeStrokeHandler=(tool,stroke)=>{
        dispatchToolBoxAction({
            type:TOOLBOX_ACTIONS.CHANGE_STROKE,
            payload:{
                tool,
                stroke,
            }
        })
    }
    function changeFillHandler(tool,fill){
        dispatchToolBoxAction({
            type:TOOLBOX_ACTIONS.CHANGE_FILL,
            payload:
            {
                tool,
                fill,
            }
        })
    }

    function changeSizeHandler(tool,size){
        dispatchToolBoxAction({
            type:TOOLBOX_ACTIONS.CHANGE_SIZE,
            payload:
            {
                tool,
                size,
            }
        })
    }
    const toolBoxContextValue={
        toolBoxState,
        changeStrokeHandler,
        changeFillHandler,
        changeSizeHandler,
    };
  return (
    <toolBoxContext.Provider value={toolBoxContextValue}>
        {children}
    </toolBoxContext.Provider>
  )
}

export default ToolBoxProvider