import React, {useState} from 'react';
import Base from "../components/core/Base";
// import ListEditor from "../modules/editor/ListEditor";
import Button from "../components/ui/Button";

const NewListPage = () => {
    const [showEditor, setShowEditor] = useState(true);
    return <Base
        meta={{
            title: 'New List',
            description: 'Edit'
        }}
    >
        <h1>New List Page</h1>
        <Button onClick={() => setShowEditor(true)} text="Create List" />
        {/*{*/}
        {/*    showEditor ?*/}
        {/*    <ListEditor*/}
        {/*        isNew*/}
        {/*        onExit={() => setShowEditor(false)}*/}
        {/*    /> : null*/}
        {/*}*/}

    </Base>
};

export default NewListPage;
