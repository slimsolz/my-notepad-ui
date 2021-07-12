import SidebarListItem from "../SidebarListItem/SidebarListItem";
import classes from "./SideBar.module.scss";
const SideBar = ({ clicked, listItems }) => {
  return (
    <ul className={classes.SideBar}>
      {listItems.map((item, index) => (
        <SidebarListItem
          click={clicked}
          key={index}
          id={item.id}
          title={item.title}
        />
      ))}
    </ul>
  );
};

export default SideBar;
