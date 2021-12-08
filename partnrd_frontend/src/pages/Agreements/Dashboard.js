import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Column } from "simple-flexbox";
import { createUseStyles } from "react-jss";
import AgreementComponent from "./AgreementComponent";
import CreateButton from "../../components/CreateButton";
import SLUGS from "../../resources/slugs";
import { convertSlugUrl } from "../../resources/utils";
import { useHistory } from "react-router-dom";

const useStyles = createUseStyles({
  buttonRow: {
    "@media (max-width: 768px)": {
      marginTop: 0,
    },
  },
  lastRow: {
    marginTop: 30,
  },
  tasks: {
    flexGrow: 1, 
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

function DashboardComponent() {
  const { push } = useHistory();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const token = sessionStorage.getItem("xrsf");
  const config = {
    headers: { 'Authorization': `Bearer ${token}` },
  };

  const getItems = async () => {
    setLoading(true); 
    await axios
      .get(`${process.env.REACT_APP_API}/api/agreements`, config)
      .then((res) => {
        // console.log(res.data)
        setItems(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  };

  function onClick(slug, parameters = {}) {
    push(convertSlugUrl(slug, parameters));
  }

  const classes = useStyles();
  return (
    <div>
      <Row horizontal="end" className={classes.buttonRow}>
        <CreateButton
          label="Create Agreement"
          onClick={() => onClick(SLUGS.selectTemplate)}
        />
      </Row>
      <Column className={classes.lastRow}>
        <AgreementComponent containerStyles={classes.tasks} items={items} loading={loading}/>
      </Column>
    </div>
  );
}

export default DashboardComponent;
