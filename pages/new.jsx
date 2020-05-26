import React, {useState} from 'react';
import Base from "../components/core/Base";
import Button from "../components/ui/Button";

import { ListEditor } from './../components/list';

const NewListPage = () => {
    const [showEditor, setShowEditor] = useState(true);
    return <Base
        meta={{
            title: 'New List',
            description: 'Edit'
        }}
        hideFooter
    >
        <h1>New List Page</h1>
        <Button onClick={() => setShowEditor(true)} text="Create List" />
        {   showEditor ?
            <ListEditor
                isNew
                onExit={() => setShowEditor(false)}
            /> : null
        }

    </Base>
};

export default NewListPage;
