import React from 'react';
import Base from "../../components/core/Base";
import ListEditor from "../../modules/editor/ListEditor";

const EditListPage = ({ slug }) => {

    const handleExit = () => {
        if(window)
        {
            window.history.back()
        }
    };

    return <Base
        meta={{
            title: 'Edit List',
            description: 'Edit'
        }}
        loginRequired
        hideTopbar
    >
        <div className="d-flex justify-content-center">
            <ListEditor
                slug={slug}
                editMode
                onExit={handleExit}
            />
        </div>
    </Base>
};

EditListPage.getInitialProps = async ({ query }) => {
    return {
        slug: query.slug
    }
};

export default EditListPage;
