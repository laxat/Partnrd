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
      padding: "5px 20px 5px 20px",
    },
  }));
  
const TAGS = {
    OPEN: { text: "PENDING", backgroundColor: "#FEC400", color: "#FFFFFF" },
    ANSWERED: { text: "ANSWERED", backgroundColor: "#29CC97", color: "#FFFFFF" },
    CLOSED: { text: "CLOSED", backgroundColor: "#F0F1F7", color: "#9FA2B4" },
};

function getNextTag(current) {
    return TAGS[current];
  }

export default function TicketComponent({data, containerStyles, loading})
{
    const classes = useStyles(); 
    const {push} = useHistory(); 
    const items = []; 

    data.map((x, i) => {
        console.log(x.title)
        return (items[i] = {
            id: x.id,
            title: x.title,
            description: x.description, 
            priority: x.priority,
            tag: getNextTag(x.status), 
            date: x.created_at
        });
    }); 

    function onClick(slug, parameters = {}) {
        push(convertSlugUrl(slug, parameters));
    }

    return !loading ? (
        items.length > 0 ? (
          items.map((item, index) => (
            <CardComponent
              key={index}
              containerStyles={containerStyles}
              items={[
                <TickComponent
                  onClick={() => onClick(SLUGS.viewSupportTicket + item.id)}
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

function TickComponent({ classes, item, onClick }) {
    const { tag = {} } = item;
    return (
      <Row horizontal="space-between" center="center" onClick={onClick}>
        <span className={[classes.itemTitle, "titleCard"].join(" ")}>
          {item.title}
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

