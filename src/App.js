import { Suspense, lazy, useState } from "react";
import classes from "./App.module.scss";

const Header = lazy(() => import("./components/Header/Header"));
const Note = lazy(() => import("./components/Note/Note"));

const App = () => {
  const [isNew, setIsNew] = useState(false);

  return (
    <Suspense fallback="">
      <div className={classes.App}>
        <Header setIsNew={setIsNew} />
        <Note setNew={setIsNew} isNew={isNew} />
      </div>
    </Suspense>
  );
};

export default App;
