import React from 'react';
import Base from "../../components/core/Base";
import ListEditor from "../../modules/editor/ListEditor";

const EditListPage = ({ slug }) => {

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
