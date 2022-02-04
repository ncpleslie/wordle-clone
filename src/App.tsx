import { Route, Routes, useLocation } from "react-router-dom";
import Index from "./pages/index";
import { Path } from "./enums/path.enum";
import Settings from "./pages/settings/Settings";
import GameContextProvider from "./store/game-context";

const App = () => {
  const location: any = useLocation();
  const background = location.state && location.state.background;

  return (
    <GameContextProvider>
      <Routes location={background || location}>
        <Route path={Path.Root} element={<Index />} />
      </Routes>
      {background && (
        <Routes>
          <Route path={Path.Settings} element={<Settings />} />
        </Routes>
      )}
    </GameContextProvider>
  );
};

export default App;
