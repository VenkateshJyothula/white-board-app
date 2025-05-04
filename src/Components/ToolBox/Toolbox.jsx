import React, { useContext } from 'react'


import classes from './ToolBox.module.css'
import { FILL_COLORS, COLORS, FILL_TYPE, STROKE_TYPE,SIZE_TYPE, TOOL_ITEMS } from '../../constants'
import cx from 'classnames'
import toolBoxContext from '../../store/toolBoxContext'
import boardContext from '../../store/boardcontext'
const Toolbox = () => {
    const {activeToolItem} =useContext(boardContext)
    const {toolBoxState,changeStrokeHandler,changeFillHandler,changeSizeHandler}=useContext(toolBoxContext)
    const strokeColor=toolBoxState[activeToolItem]?.stroke;
    const fillColor=toolBoxState[activeToolItem]?.fill;
    const size=toolBoxState[activeToolItem]?.size;
  return (
    <div className={classes.container}>
        {STROKE_TYPE.includes(activeToolItem)&&<div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Stroke Color</div>
            <div className={classes.colorsContainer}>
                <input type="color" className={classes.colorPicker} name="StrokeColorpick" onChange={(e)=>changeStrokeHandler(activeToolItem,e.target.value)} value={toolBoxState[activeToolItem].stroke} id="" />
                {
                    Object.values(COLORS).map((c)=>{
                        return(
                            <button key={c} className={cx(classes.colorBox,{[classes.activeColorBox]:strokeColor===c})} 
                            onClick={()=>{changeStrokeHandler(activeToolItem,c)}}
                            style={{backgroundColor:c}}></button>
                        )
                    })
                }
            </div>
        </div>}
        {FILL_TYPE.includes(activeToolItem)&&<div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Fill Color</div>
            <div className={classes.colorsContainer}>
                {fillColor===undefined?
                <div className={cx(classes.colorPicker,classes.noFillColorBox)}></div>
                :
                <input type="color" className={classes.colorPicker} name="Fillcolorpick" onChange={(e)=>changeFillHandler(activeToolItem,e.target.value)} value={toolBoxState[activeToolItem].fill} id="" />
                }
                <button className={cx(classes.colorBox,classes.noFillColorBox,{[classes.activeColorBox]:fillColor===undefined})} 
                            onClick={()=>{changeFillHandler(activeToolItem,undefined)}}
                            ></button>
                {
                    Object.values(FILL_COLORS).map((c)=>{
                        return(
                            <button key={c} className={cx(classes.colorBox,{[classes.activeColorBox]:fillColor===c})} 
                            onClick={()=>{changeFillHandler(activeToolItem,c)}}
                            style={{backgroundColor:c}}></button>
                        )
                    })
                }
            </div>
        </div>}
        {SIZE_TYPE.includes(activeToolItem)&&<div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Size </div>
            <input 
            type="range" 
            min={activeToolItem==TOOL_ITEMS.TEXT?12:1} 
            max={activeToolItem==TOOL_ITEMS.TEXT?64:10}  
            step={1}  
            value={size}
            onChange={(event)=>changeSizeHandler(activeToolItem,event.target.value)}  
            />
        </div>}
    </div>
  )
}

export default Toolbox