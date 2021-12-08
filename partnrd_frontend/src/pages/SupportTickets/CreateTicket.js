import { FormGroup, Input } from "reactstrap";
import React from "react"; 
import { Row } from "simple-flexbox";
import { useForm } from "react-hook-form";
import axios from "axios";
import SLUGS from "../../resources/slugs";
import { useHistory } from "react-router-dom";

function CreateTicket() 
{
    const {push} =  useHistory(); 
    const methods = useForm(); 

    const onSubmit = (data) => {
        console.log(JSON.stringify(data, null, 2));
        console.log(data.ticket_title); 
        sendData(data);  
    }

    const sendData = async (data) => {

        const token = sessionStorage.getItem("xrsf");
        const config = {
        headers: { Authorization: `Bearer ${token}` },
        };

        const api = `${process.env.REACT_APP_API}/api/tickets`; 
        
        const d = {
            title: data.ticket_title, 
            description: data.ticket_desc, 
            priority: data.ticket_priority
        }; 

        await axios.post(api, d, config)
        .then((res) => {
            push(SLUGS.thanksPage); 
        })
        .catch((err) => {
            console.log(err)
            push(SLUGS.supportTickets)
        })

    }

    return(
        <div>
            <form className="smallForm" onSubmit={methods.handleSubmit(onSubmit)}>
                <h2>Create Support Ticket</h2>
                <FormGroup>
                    <label>What is your problem?</label>
                    <Input
                        required
                        type="text"
                        name="ticket_title"
                        innerRef={methods.register}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Can you describe what the issue is?</label>
                    <Input 
                        required
                        type="textarea"
                        name="ticket_desc"
                        innerRef={methods.register}
                    />
                </FormGroup>
                <FormGroup>
                    <label>How serious is this problem</label>
                    <Input
                        required
                        type="select"
                        name="ticket_priority"
                        innerRef={methods.register}
                    >
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                    </Input>
                </FormGroup>
                <Row horizontal="center">
                <button type="submit">Create Support Ticket</button>
                </Row>
            </form>
        </div>
    )
}

export default CreateTicket; 