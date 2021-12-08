import React from "react";
import { useHistory } from "react-router-dom";
import SLUGS from "../../resources/slugs";
import { convertSlugUrl } from "../../resources/utils";

function ConfirmationPage() 
{
    const {push} = useHistory(); 

    function onClick(slug, parameters = {}) {
        push(convertSlugUrl(slug, parameters));
    }

    return (
        <div>
            Thank You for sending your problem, We wull solve it as soon as possible
            <div>
                <button
                onClick={() => onClick(SLUGS.supportTickets)}>
                    Go back to Home Page
                </button>
            </div>
        </div>
    );
}

export default ConfirmationPage; 