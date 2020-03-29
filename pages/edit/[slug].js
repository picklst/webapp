import React from 'react';
import {useRouter} from "next/router";
import Base from "../../components/core/Base";
import ListEditor from "../../modules/editor/ListEditor";

const EditListPage = () => {
    const router = useRouter();

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
                slug={router.query.slug}
                editMode
            />
        </div>
    </Base>
};

export default EditListPage;
