import Board from "./Components/Board/Board";
import Toolbar from "./Components/Toolbar/Toolbar";
import Toolbox from "./Components/ToolBox/Toolbox";

import BoardProvider from "./store/Boardprovider";
import ToolBoxProvider from "./store/toolBoxProvider";
function App() {
  return (
    <BoardProvider>
      <ToolBoxProvider>
        <Toolbar/>
        <Board/>
        <Toolbox/>
      </ToolBoxProvider>
    </BoardProvider>
  )
}

export default App
