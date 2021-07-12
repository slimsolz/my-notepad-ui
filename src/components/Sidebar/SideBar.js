import Pagination from "@material-ui/lab/Pagination";
import SidebarListItem from "../SidebarListItem/SidebarListItem";
import classes from "./SideBar.module.scss";
const SideBar = ({
  clicked,
  listItems,
  totalCount,
  onChange,
  currentPage,
}) => {
  return (
    <div className={classes.SideBar}>
      <ul className={classes.SideBar__list}>
        {listItems.map((item, index) => (
          <SidebarListItem
            click={clicked}
            key={index}
            id={item._id}
            content={item.content}
          />
        ))}
      </ul>
      <div className={classes.SideBar__tablePagination}>
        <Pagination
          count={totalCount}
          siblingCount={0}
          page={currentPage}
          size="small"
          onChange={(e, value) => onChange(value)}
        />
      </div>
    </div>
  );
};

export default SideBar;
