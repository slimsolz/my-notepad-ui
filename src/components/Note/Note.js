import { useState, useRef, useEffect } from "react";
import { DeleteForever } from "@material-ui/icons";
import classes from "./Note.module.scss";
import SideBar from "../Sidebar/SideBar";

const items = [
  {
    id: 0,
    title:
      "title goes here 0 title goes here 0 title goes here 0  title goes here 0",
  },
  { id: 1, title: "title goes here 1" },
  { id: 2, title: "title goes here 2" },
  { id: 3, title: "title goes here 3" },
];

const Note = ({ isNew, setNew }) => {
  const [content, setContent] = useState({
    id: null,
    title: "",
  });
  const [listItems, setListItems] = useState(items);
  const reference = useRef(content);

  const onView = (id) => {
    if (isNew) {
      setNew(false);
    }
    setContent({
      id,
      title: listItems[id].title,
    });
    console.log({
      id,
      title: listItems[id].title,
    });
  };

  const onSave = (id) => {
    const divElement = reference.current;
    const content = {
      id: id || listItems.length,
      title: divElement.innerText,
    };

    if (id) {
      const index = listItems.findIndex((list) => list.id === id);
      listItems.splice(index, 1, content);
    } else {
      listItems.push(content);
    }

    setListItems(listItems);
  };

  useEffect(() => {
    if (isNew) {
      setContent({
        id: null,
        title: "",
      });
      reference.current.focus();
    }
  }, [isNew]);

  return (
    <div className={classes.Note}>
      <div className={classes.Note__sidebar}>
        <SideBar clicked={onView} listItems={listItems} />
      </div>
      <div className={classes.Note__mainContainer}>
        <div
          className={classes.Note__main}
          ref={reference}
          contentEditable={isNew || content.title !== ""}
          suppressContentEditableWarning={true}
        >
          {content.title}
        </div>
        <div
          className={`${classes.Note__btnContainer} ${
            (isNew || content.title) && classes.Note__showBtn
          }`}
        >
          {content.title && (
            <DeleteForever className={classes.Note__btnDelete} />
          )}
          <button
            className={classes.Note__btnSave}
            onClick={() => onSave(content.id)}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
