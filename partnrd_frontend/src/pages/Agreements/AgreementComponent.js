import React  from "react";
import { Row } from "simple-flexbox";
import { createUseStyles, useTheme } from "react-jss";
import CardComponent from "../../components/cards/CardComponent";
import { useHistory } from "react-router-dom";
import SLUGS from "../../resources/slugs";
import { convertSlugUrl } from "../../resources/utils";
import { CircularProgress } from "@material-ui/core";


const useStyles = createUseStyles((theme) => ({
  itemTitle: {
    ...theme.typography.itemTitle,
    color: theme.color.veryDarkGrayishBlue,
  },
  itemDate: {
    ...theme.typography.itemTitle,
    color: theme.color.veryDarkGrayishBlue,
    alignItems: "right",
    textAlign: "right",
  },
  itemValue: {
    color: theme.color.grayishBlue2,
  },
  greyTitle: {
    color: theme.color.grayishBlue3,
  },
  tagContainer: {
    alignItems: "center",
    margin: "center",
  },
  tagStyles: {
    borderRadius: 20,
    fontWeight: "bold",
    fontSize: 11,
    letterSpacing: "0.5px",
    lineHeight: "14px",
    alignItems: "center",
    float: "left",
    padding: "5px 15px 5px 15px",
  },
}));

const TAGS = {
  UNSIGNED: { text: "UNSIGNED", backgroundColor: "#FEC400", color: "#FFFFFF" },
  SIGNED: { text: "SIGNED", backgroundColor: "#29CC97", color: "#FFFFFF" },
  DRAFTED: { text: "DRAFTED", backgroundColor: "#F0F1F7", color: "#9FA2B4" },
};

function getNextTag(current) {
  return TAGS[current];
}

function AgreementComponent({ items, containerStyles, loading }) {
  const theme = useTheme();
  const { push } = useHistory();
  const classes = useStyles({ theme });
  const dataItems = [];

  items.map((x, i) => {
    return (dataItems[i] = {
      id: x.id,
      user_id: x.owner,
      name: x.name,
      tag: getNextTag(x.status),
      date: x.created_at,
    });
  });

  function onClick(slug, parameters = {}) {
    push(convertSlugUrl(slug, parameters));
  }

  return !loading ? (
      dataItems.length > 0 ? (
        dataItems.map((item, index) => (
          <CardComponent
            key={index}
            containerStyles={containerStyles}
            items={[
              <AgreeComponent
                onClick={() => onClick(SLUGS.createShare + item.id)}
                classes={classes}
                index={index}
                item={item}
              />,
            ]}
          />
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p> Nothing Found Here </p>
        </div>
      )
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="inherit"/>
    </div>
  );
  
}

function AgreeComponent({ classes, item = {}, onClick }) {
  const { tag = {} } = item;
  return (
    <Row horizontal="space-between" center="center" onClick={onClick}>
      <span className={[classes.itemTitle, "titleCard"].join(" ")}>
        {item.name}
      </span>
      <div className={classes.tagContainer} vertical="center">
        <TagComponent
          backgroundColor={tag.backgroundColor}
          classes={classes}
          color={tag.color}
          text={tag.text}
        />
      </div>
      <div className={classes.itemDate}>{item.date}</div>
    </Row>
  );
}

function TagComponent({ backgroundColor, classes, color, text }) {
  return (
    <Row
      horizontal="center"
      vertical="center"
      style={{ backgroundColor, color }}
      className={classes.tagStyles}
    >
      {text}
    </Row>
  );
}

export default AgreementComponent;
