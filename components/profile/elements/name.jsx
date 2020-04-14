import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default ({ firstName, lastName, isVerified }) =>
<React.Fragment>
    {firstName} {lastName}
    {isVerified ?
        <span className="pl-1 text-primary">
            <FontAwesomeIcon icon={faCheckCircle}/>
        </span> : null
    }
</React.Fragment>;