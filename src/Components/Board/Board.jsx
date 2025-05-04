
import { useContext, useEffect, useLayoutEffect, useRef } from "react"
import rough from 'roughjs'
import boardContext from "../../store/boardcontext";
import { BOARD_ACTION, TOOL_ACTION_TYPE, TOOL_ITEMS } from "../../constants";
import toolBoxContext from "../../store/toolBoxContext";
import classes from './Board.module.css'
function Board() {

  const {elements,toolActionType,undoRedoHandler,textAreaBlueHandler,boardMouseDownHandler,boardMouseMoveHandler,boardMOuseUpHandler} = useContext(boardContext);
  const {toolBoxState} =useContext(toolBoxContext);
  const canvasref=useRef();
  const textareaRef=useRef();
  useLayoutEffect(()=>{
    const canvas=canvasref.current;
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
  },[])


  useLayoutEffect(()=>{
    const canvas=canvasref.current;
    const context=canvas.getContext("2d");
    context.save();
    const roughcanvas=rough.canvas(canvas);
    elements.forEach((element)=>{
      switch(element.type)
      {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
          roughcanvas.draw(element.roughEle);
          break;
        case TOOL_ITEMS.BRUSH:
        {
          context.fillStyle=element.stroke;
          context.fill(element.path);
          context.restore();
          break;
        }
        case TOOL_ITEMS.TEXT:
        {
          context.textBaseline = "top";
          context.font = `${element.size}px Caveat`;
          context.fillStyle = element.stroke;
          context.fillText(element.text, element.x1, element.y1);
          context.restore();
          break;
        }
      }
    }
    )

    return ()=>{
      context.clearRect(0,0,canvas.width,canvas.height);
    }
  },[elements])
  useEffect(()=>{
    function handleKeyDown(event)
    {
      if(event.ctrlKey&&event.key==="z")
      {
        undoRedoHandler("UNDO");
      }
      if(event.ctrlKey&&event.key==="y")
      {
        undoRedoHandler("REDO");
      }
    }

    document.addEventListener("keydown",handleKeyDown);

    return ()=>{
      document.removeEventListener("keydown",handleKeyDown);
    }
  })
  useEffect(()=>{
    const textarea=textareaRef.current;
    if(toolActionType===BOARD_ACTION.WRITING)
    {
      setTimeout(()=>{
        textarea.focus();
      }
        ,0
      )
    }
  },[toolActionType])


  function handleMouseDown(event)
  {
    boardMouseDownHandler(event,toolBoxState);
  }
  function handleMouseMove(event)
  {
    boardMouseMoveHandler(event);
  }
  function handleMouseUp()
  {
    boardMOuseUpHandler();
  }
  return (
    <>
      {toolActionType===TOOL_ACTION_TYPE.WRITING&&<textarea 
      type="text"
      ref={textareaRef} 
      className={classes.textElementBox}
      style={{
        position: 'absolute',
        top:`${elements[elements.length-1].y1}px`,
        left:`${elements[elements.length-1].x1}px`,
        fontSize:`${elements[elements.length-1].size}px`,
        color:elements[elements.length-1]?.stroke,
        border:'1px solid #DDDDDD',
        borderRadius:'5px'
      }} 
      onBlur={(e)=>textAreaBlueHandler(e.target.value)}
      id=""></textarea>}
      <canvas id="canvas" ref={canvasref} 
      onMouseDown={(event)=>{handleMouseDown(event)}} 
      onMouseMove={(event)=>{handleMouseMove(event)}}
      onMouseUp={handleMouseUp}/>
    </>
  )
}

export default Board;
