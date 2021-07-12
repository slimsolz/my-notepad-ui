import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { DeleteForever } from "@material-ui/icons";
import Swal from "sweetalert2";
import classes from "./Note.module.scss";
import SideBar from "../Sidebar/SideBar";
import Services from "./services";

const Note = ({ isNew, setNew }) => {
  const [pageNo, setPageNo] = useState(1);
  const [pageDetail, setPageDetail] = useState({});
  const [content, setContent] = useState({
    id: null,
    content: "",
  });

  const [listItems, setListItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const reference = useRef(content);

  const { refetch } = useQuery(["notes", pageNo], Services.getAllNotes, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const {
        data: { notes, pageDetails },
      } = data;
      setListItems(notes);
      setPageDetail(pageDetails);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const [saveNote, { isLoading: isSaving }] = useMutation(Services.saveNote, {
    onSuccess: (data, variables, context) => {
      refetch();
    },
    onError: (error, variables, context) => {
      setErrorMessage(error.message);
    },
  });

  const [updateNote, { isLoading: isUpdating }] = useMutation(
    Services.updateNote,
    {
      onSuccess: (data, variables, context) => {
        refetch();
      },
      onError: (error, variables, context) => {
        setErrorMessage(error.message);
      },
    }
  );

  const [deleteNote, { isLoading: isDeleting }] = useMutation(
    Services.deleteNote,
    {
      onSuccess: (data, variables, context) => {
        setContent({
          id: null,
          content: "",
        });
        refetch();
      },
      onError: (error, variables, context) => {
        setErrorMessage(error.message);
      },
    }
  );

  const onView = (id) => {
    if (isNew) {
      setNew(false);
    }

    const content = listItems.filter((list) => list._id === id)[0];
    setContent(content);
  };

  const onSave = (id) => {
    const divElement = reference.current;
    const payload = {
      id: id,
      content: divElement.innerText,
    };
    showError("");

    if (id) {
      updateNote(payload);
    } else {
      saveNote(payload);
    }
  };

  const onRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "red",
    }).then(async (result) => {
      if (result.value) {
        const res = await deleteNote(id);
        res === 204
          ? Swal.fire({
              title: "Deleted!",
              text: "Successfully deleted",
              icon: "success",
              confirmButtonColor: "red",
            })
          : Swal.fire({
              title: "Cancelled",
              text: "Could not delete, please try again",
              icon: "error",
              confirmButtonColor: "red",
            });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Delete cancelled",
          icon: "error",
          confirmButtonColor: "red",
        });
      }
    });
  };

  const showError = (error) => {
    if (error) {
      Swal.fire({
        title: "Cancelled",
        text: error,
        icon: "error",
        confirmButtonColor: "red",
      });
    }
  };

  useEffect(() => {
    if (errorMessage) showError(errorMessage);
  }, [errorMessage]);

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
        <SideBar
          clicked={onView}
          listItems={listItems}
          totalCount={pageDetail.totalPages}
          onChange={setPageNo}
          currentPage={pageNo}
        />
      </div>
      <div className={classes.Note__mainContainer}>
        <div
          className={classes.Note__main}
          ref={reference}
          contentEditable={isNew || content.content !== ""}
          suppressContentEditableWarning={true}
        >
          {content.content}
        </div>
        <div
          className={`${classes.Note__btnContainer} ${
            (isNew || content.content) && classes.Note__showBtn
          }`}
        >
          {content.content && (
            <DeleteForever
              className={classes.Note__btnDelete}
              onClick={() => onRemove(content._id)}
            />
          )}
          <button
            className={classes.Note__btnSave}
            onClick={() => onSave(content._id)}
            disabled={isSaving || isUpdating || isDeleting}
          >
            {content._id ? "update" : "save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
