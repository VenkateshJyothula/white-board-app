

import { TOOL_ITEMS } from "../constants"
import rough from 'roughjs/bin/rough'
const gen=rough.generator();

import getStroke from "perfect-freehand";
import { isPointCloseToLine,isPointCloseToEllipse } from "./math";

export const getSvgPathFromStroke = (stroke) => {
    if (!stroke.length) return "";
  
    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length];
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
      },
      ["M", ...stroke[0], "Q"]
    );
  
    d.push("Z");
    return d.join(" ");
  };
  
export const createElement = (id,x1,y1,x2,y2,{type,stroke,fill,size}) => {
    const element={
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        fill,
        stroke,
        size,
    }
    let option={
        seed:id+1,
        fillStyle: 'solid',
    }
    if(stroke)
    {
        option.stroke=stroke;
    }
    if(size)
    {
        option.strokeWidth=size;
    }
    if(fill)
    {
        option.fill=fill;
    }
    switch(type)
    {
        case TOOL_ITEMS.BRUSH:{
            const brushElement = {
                    id,
                    points: [{ x: x1, y: y1 }],
                    path: new Path2D(getSvgPathFromStroke(getStroke([{ x: x1, y: y1 }],{size:size}))),
                    type,
                    stroke,
                    size:size,
                    fill,
                  };
                  return brushElement;
        }
        case TOOL_ITEMS.LINE:
            element.roughEle=gen.line(x1,y1,x2,y2,option)
            return element;
        case TOOL_ITEMS.RECTANGLE:
            element.roughEle=gen.rectangle(x1,y1,x2-x1,y2-y1,option)
            return element;
        case TOOL_ITEMS.CIRCLE:
            element.roughEle=gen.ellipse((x1+x2)/2,(y1+y2)/2,(x2-x1),y2-y1,option);
            return element
        case TOOL_ITEMS.ARROW:
            {
                const {x3,y3,x4,y4}=arrowheadcalc(x1,y1,x2,y2);
                element.roughEle=gen.linearPath([[x1,y1],[x2,y2],[x3,y3],[x2,y2],[x4,y4]],option);
                return element;
            }
        case TOOL_ITEMS.TEXT:{
            element.text="";
            return element
        }
        default:
            throw Error("Error"); 
    }
}

export function arrowheadcalc(x1,y1,x2,y2){
    const angle=Math.atan2((y2-y1),(x2-x1));
    const dis=Math.sqrt((y2-y1)*(y2-y1)+(x2-x1)*(x2-x1));
    const r=Math.min(dis*0.5,7);
    const x3=x2-r*Math.cos(angle+Math.PI/6);
    const y3=y2-r*Math.sin(angle+Math.PI/6);
    const x4=x2-r*Math.cos(angle-Math.PI/6);
    const y4=y2-r*Math.sin(angle-Math.PI/6);
    return {x3,y3,x4,y4};
}

export const isPointNearElement=(element,pointX,pointY)=>
{
    const {x1,y1,x2,y2,type}=element;
    switch(type)
    {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.ARROW:
            return isPointCloseToLine(x1,y1,x2,y2,pointX,pointY);
        case TOOL_ITEMS.RECTANGLE:
            return isPointCloseToLine(x1,y1,x1,y2,pointX,pointY)||isPointCloseToLine(x2,y1,x2,y2,pointX,pointY)||
            isPointCloseToLine(x1,y1,x2,y1,pointX,pointY)||isPointCloseToLine(x1,y2,x2,y2,pointX,pointY);
        case TOOL_ITEMS.CIRCLE:
            return isPointCloseToEllipse(x1,y1,x2,y2,pointX,pointY);
        case TOOL_ITEMS.BRUSH:
        {
            const context=document.getElementById("canvas").getContext("2d");
            return  context.isPointInPath(element.path,pointX,pointY);
        }
        case TOOL_ITEMS.TEXT:
        {
            const context=document.getElementById("canvas").getContext("2d");
            context.font=`${element.size}px Caveat`,
            context.fillStyle = element.stroke;
                  const textWidth = context.measureText(element.text).width;
                  const textHeight = parseInt(element.size);
                  context.restore();
                  return (
                    isPointCloseToLine(x1, y1, x1 + textWidth, y1, pointX, pointY) ||
                    isPointCloseToLine(
                      x1 + textWidth,
                      y1,
                      x1 + textWidth,
                      y1 + textHeight,
                      pointX,
                      pointY
                    ) ||
                    isPointCloseToLine(
                      x1 + textWidth,
                      y1 + textHeight,
                      x1,
                      y1 + textHeight,
                      pointX,
                      pointY
                    ) ||
                    isPointCloseToLine(x1, y1 + textHeight, x1, y1, pointX, pointY)
                  );
        }
        default:
            throw new Error("Type Not recognised");
    }
}