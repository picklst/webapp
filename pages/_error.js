import React from 'react';
import Base from "../components/core/Base";

const ErrorPage = () => {
    return <Base
        meta={{
            title: 'Error'
        }}
        hideFooter
    >
        <h1>Error Page</h1>
    </Base>
};

export default ErrorPage;