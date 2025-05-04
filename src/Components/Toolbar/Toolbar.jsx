import React, { useContext } from 'react'

import classes from './Toolbar.module.css'
import { TOOL_ITEMS ,TOOL_ICONS,TOOL_ID,TOOL_DESCRIPTION, OTHER_ICONS} from '../../constants';
import { LuRectangleHorizontal } from "react-icons/lu";
import cx from 'classnames'
import boardContext from '../../store/boardcontext';
import { FaDownload } from 'react-icons/fa';
const Toolbar = () => {
  // const [activeToolItem,setActiveTooolItem]=useState(TOOL_ITEMS.LINE)
  const {activeToolItem,changeToolHandler,undoRedoHandler,handleDownloadClick} =useContext(boardContext)
  return (
    <div className={classes.container}>
      {
        Object.keys(TOOL_ITEMS).map((key)=>{
          const IconComponent = TOOL_ICONS[key];
          return (
            <div title={TOOL_DESCRIPTION[key]} key={key} className={cx(classes.toolItem ,{[classes.active]:activeToolItem===TOOL_ITEMS[key]})} onClick={()=>{
              changeToolHandler(TOOL_ITEMS[key])
            }}>
            <IconComponent/>
            </div>)
        })
      }
      {
        Object.keys(OTHER_ICONS).map((key)=>{
          const IconComponent = OTHER_ICONS[key];
          return (
            <div title={TOOL_DESCRIPTION[key]} key={OTHER_ICONS[key]}className={cx(classes.toolItem)}
            onClick={()=>{undoRedoHandler(TOOL_DESCRIPTION[key])}}>
            <IconComponent/>
            </div>)
        })
      }
     <div title="Download" className={cx(classes.toolItem)}
            onClick={(e)=>{handleDownloadClick(e)}}
            >
            <FaDownload/>
            </div>
    </div>
  )
}

export default Toolbar