import React from 'react'
import Board from "../Components/Board/Board";
import Toolbar from "../Components/Toolbar/Toolbar";
import Toolbox from "../Components/ToolBox/Toolbox";

import BoardProvider from "../store/Boardprovider";
import ToolBoxProvider from "../store/toolBoxProvider";
import { useParams } from 'react-router-dom';
const Canvas = () => {
  const {id}=useParams();
  return (
    <BoardProvider id={id}>
      <ToolBoxProvider>
        <Toolbar/>
        <Board id={id}/>
        <Toolbox/>
      </ToolBoxProvider>
    </BoardProvider>
  )
}

export default Canvas