import { Route, Routes, useLocation } from "react-router-dom";
import Index from "./pages/index";
import { Path } from "./enums/path.enum";
import GameContextProvider from "./store/game-context";
import { lazy, Suspense } from "react";
import LoadingIndicator from "./components/UI/LoadingIndicator/LoadingIndicator";
import Header from "./components/Header/Header";

const Settings = lazy(() => import("./pages/settings/Settings"));

const App = () => {
  const location: any = useLocation();
  const background = location.state && location.state.background;

  return (
    <GameContextProvider>
      <Header />
      <Suspense fallback={<LoadingIndicator />}>
        <Routes location={background || location}>
          <Route path={Path.Root} element={<Index />} />
        </Routes>
        {background && (
          <Routes>
            <Route path={Path.Settings} element={<Settings />} />
          </Routes>
        )}
      </Suspense>
    </GameContextProvider>
  );
};

export default App;
