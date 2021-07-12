import { Suspense, lazy, useState } from "react";
import { ReactQueryConfigProvider } from "react-query";
import classes from "./App.module.scss";

const Header = lazy(() => import("./components/Header/Header"));
const Note = lazy(() => import("./components/Note/Note"));

const queryConfig = { queries: { refetchOnWindowFocus: false } }; // This disables background refresh
const App = () => {
  const [isNew, setIsNew] = useState(false);

  return (
    <ReactQueryConfigProvider client={queryConfig}>
      <Suspense fallback="">
        <div className={classes.App}>
          <Header setIsNew={setIsNew} />
          <Note setNew={setIsNew} isNew={isNew} />
        </div>
      </Suspense>
    </ReactQueryConfigProvider>
  );
};

export default App;
