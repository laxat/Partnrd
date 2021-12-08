import React from "react";
import { Column } from "simple-flexbox";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  container: {
    backgroundColor: "#FFFFFF",
    border: `1px solid #d8d8d8`,
    borderRadius: 4,
    padding: "0px",
    marginBottom: 20,
    width: "100%",
    height: "100%",
    "&:hover": {
      borderColor: "#000",
    },
  },
  containerMobile: {
    padding: "6px 16px 6px 16px !important",
    marginBottom: "10px !important",
    marginTop: "5px !important",
  },
  itemContainer: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 18,
    paddingTop: 18,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fff",
    },
    borderBottom: `1px solid #d8d8d8`,
    "&:last-child": {
      borderBottom: "none",
    },
  },
  itemContainerMobile: {
    marginLeft: -16,
    marginRight: -16,
    paddingLeft: 16,
    paddingRight: 16,
    cursor: "pointer",
    "&:hover": {
      borderColor: "#000",
      backgroundColor: "#fff",
    },
    zIndex: 1,
  },
  link: {
    ...theme.typography.link,
  },
  subtitle: {
    ...theme.typography.smallSubtitle,
    color: theme.color.grayishBlue2,
  },
  subtitle2: {
    color: theme.color.veryDarkGrayishBlue,
    marginLeft: 2,
  },
  title: {
    ...theme.typography.cardTitle,
    color: theme.color.veryDarkGrayishBlue,
  },
}));

function CardComponent({ onClick, items, containerStyles }) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  // const { onClick, items, containerStyles } = props;

  function renderItem(item, index) {
    function onItemClicked(e) {
      if (onClick) {
        onClick(e);
      }
      // onItemClick();
    }

    return (
      <Column
        className={[classes.itemContainer, "insideBox"].join(" ")}
        key={`item-${index}`}
        breakpoints={{ 426: classes.itemContainerMobile }}
        onClick={onItemClicked}
      >
        {item}
      </Column>
    );
  }

  return (
    <Column
      flexGrow={1}
      className={[classes.container, containerStyles].join(" ")}
      breakpoints={{ 426: classes.containerMobile }}
    >
      {items.map(renderItem)}
    </Column>
  );
}

export default CardComponent;
