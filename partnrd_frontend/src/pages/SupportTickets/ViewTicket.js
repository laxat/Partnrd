import React from "react";
import { useParams } from "react-router";

export default function ViewTicket()
{
    const {id} = useParams(); 
    
    return (
        <div>
            Support Ticket ID
        </div>
    )
}