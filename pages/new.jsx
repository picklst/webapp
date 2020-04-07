import React from 'react';
import {useRouter} from "next/router";
import Base from "../components/core/Base";
import ListEditor from "../modules/editor/ListEditor";

const NewListPage = () => {
    const router = useRouter();

    return <Base
        meta={{
            title: 'New List',
            description: 'Edit'
        }}
    >
        <h1>new</h1>
        <ListEditor isNew />
    </Base>
};

export default NewListPage;
