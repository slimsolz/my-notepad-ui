import { getTitle } from "../../utils";
import classes from "./SidebarListItem.module.scss";

const SidebarListItem = ({ id, title, isActive, click }) => {
  const menuTitle = getTitle(title);

  return (
    <li
      onClick={() => click(id)}
      className={`${isActive && classes.Active} ${classes.SidebarListItem}`}
    >
      {menuTitle}
    </li>
  );
};

export default SidebarListItem;
