import React from 'react';
import Base from "./Base";

const ErrorPage = ({ title, description }) => {

    return <Base
        meta={{ title: `title` }}
    >
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </Base>

};

export default ErrorPage;