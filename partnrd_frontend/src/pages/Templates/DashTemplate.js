import React from "react";
import { Column, Row } from "simple-flexbox";
import { createUseStyles } from "react-jss";
import CreateButton from "../../components/CreateButton";

const useStyles = createUseStyles({
  cardsContainer: {
    marginRight: -30,
    marginTop: -30,
  },
  buttonRow: {
    marginTop: 0,
    "@media (max-width: 768px)": {
      marginTop: 0,
    },
  },
  lastRow: {
    marginTop: 30,
    "@media (max-width: 768px)": {
      marginTop: 10,
    },
  },
  tasks: {
    marginTop: 0,
    "@media (max-width: 1024px)": {
      marginTop: 30,
    },
  },
  buttonStyle: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

function DashTemplate() {
  const classes = useStyles();
  return (
    <Column>
      <Row
        horizontal="end"
        className={classes.buttonRow}
        breakpoints={{ 1024: "column" }}
      >
        <CreateButton label="Request Template" />
      </Row>
    </Column>
  );
}

export default DashTemplate;
