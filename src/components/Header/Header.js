import classes from "./Header.module.scss";
import { Add } from "@material-ui/icons";

const Header = ({ setIsNew }) => {
  const addNewNote = () => {
    setIsNew(true);
    console.log("clicked");
  };

  return (
    <div className={classes.Header}>
      <span className={classes.Header__iconContainer}>
        <Add className={classes.Header__icon} onClick={addNewNote} />
      </span>
      <h1 className={classes.Header__title}>my awesome notepad</h1>
    </div>
  );
};

export default Header;
