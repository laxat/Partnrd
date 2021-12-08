import React from "react";
import { any, arrayOf, func, string } from "prop-types";
import { Column, Row } from "simple-flexbox";
import { createUseStyles, useTheme } from "react-jss";
import CollapsibleContent from "../Collapsible/CollapsibleContent";
import { useSidebar } from "./useSidebar";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    height: 50,
    cursor: "pointer",
    padding: "13px 20px",
    transition: "all 0.4s ease-in-out",
  },
  iconSize: {
    fontSize: 16,
  },
  title: {
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.2px",
    color: ({ theme, isActive }) =>
      isActive ? theme.color.black : theme.color.grey,
    fontWeight: ({ isActive }) => (isActive ? "bold" : ""),
    marginLeft: 10,
  },
  collape: {
    background: "rgb(0 0 0 / 2%)",
    marginLeft: "-5px",
  },
});

function MenuItemComponent({
  children,
  icon: Icon,
  id,
  items = [],
  level = 1,
  onClick,
  title,
}) {
  const theme = useTheme();
  const isCollapsible = children && children.length > 0;
  const { isExpanded, isActive, onItemClick } = useSidebar({
    isCollapsible,
    item: id,
    items,
  });
  const classes = useStyles({ theme, level, isActive });
  const classNameColumn = isActive ? classes.leftBar : "";
  const classNameContainer = [
    classes.container,
    isActive && classes.activeContainer,
  ].join(" ");
  const iconColor = isActive ? theme.color.black : theme.color.grey;

  function onItemClicked(e) {
    if (onClick) {
      onClick(e);
    }
    onItemClick();
  }

  return (
    <Column key={id} className={classNameColumn}>
      <Row
        vertical="center"
        onClick={onItemClicked}
        className={classNameContainer}
      >
        <Icon className={classes.iconSize} fill={iconColor} />
        <span className={classes.title}>{title}</span>
      </Row>
      {isCollapsible && (
        <CollapsibleContent className={classes.collape} expanded={isExpanded}>
          {children.map((child) => child.type({ ...child.props }))}
        </CollapsibleContent>
      )}
    </Column>
  );
}

MenuItemComponent.defaultProps = {};

MenuItemComponent.propTypes = {
  children: any,
  id: string,
  onClick: func,
  items: arrayOf(string),
  title: string,
};

export default MenuItemComponent;
