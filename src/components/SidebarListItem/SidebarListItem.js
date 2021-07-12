import { getTitle } from "../../utils";
import classes from "./SidebarListItem.module.scss";

const SidebarListItem = ({ id, content, isActive, click }) => {
  const menuTitle = getTitle(content);

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
