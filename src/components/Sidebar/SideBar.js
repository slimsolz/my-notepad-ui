import SidebarListItem from "../SidebarListItem/SidebarListItem";
import classes from "./SideBar.module.scss";
const SideBar = ({ clicked, listItems }) => (
  <ul className={classes.SideBar}>
    {listItems.map((item, index) => (
      <SidebarListItem
        click={clicked}
        key={index}
        id={item._id}
        content={item.content}
      />
    ))}
  </ul>
);

export default SideBar;
