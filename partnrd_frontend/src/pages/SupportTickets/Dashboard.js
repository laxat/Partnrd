import React, {useState, useEffect} from "react"; 
import axios from "axios"; 
import {useHistory} from "react-router-dom"; 
import { createUseStyles } from "react-jss";
import CreateButton from "../../components/CreateButton";
import SLUGS from "../../resources/slugs";
import TicketComponent from "./TicketComponent";
import {Row, Column} from "simple-flexbox"; 
import { CircularProgress } from "@material-ui/core";
import { convertSlugUrl } from "../../resources/utils";


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
        marginTop: 20,
      },
    },
    buttonStyle: {
      display: "flex",
      justifyContent: "flex-end",
    },
  });

export default function TicketDashboard() 
{
    const {push} = useHistory();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(); 
    const classes = useStyles(); 

    useEffect(() => {
        getData(); 
    }, []); 

    const token = sessionStorage.getItem("xrsf");
    const config = {
      headers: { 'Authorization': `Bearer ${token}` },
    };

    const api = `${process.env.REACT_APP_API}/api/tickets`

    const getData = async () =>{
        setLoading(true);
        await axios
        .get(api, config)
        .then((res) => {
            console.log(res.data)
            setData(res.data); 
            setLoading(false);
        }) 
        .catch((err) => {
            setLoading(false); 
        }) 
    }

    function onClick(slug, parameters = {}) {
        push(convertSlugUrl(slug, parameters));
    }

    return(
        !loading ?
        <div>
        <Row horizontal="end" className={classes.buttonRow}>
            <CreateButton
            label="New Support Ticket"
            onClick={() => onClick(SLUGS.createSupportTicket)}
            />
        </Row>
        <Column className={classes.lastRow}> 
            <TicketComponent
                data={data}
                containerStyles={classes.tasks}
                loading={loading}
            />
        </Column>
        </div>
        :
        <CircularProgress/>
    ); 

}