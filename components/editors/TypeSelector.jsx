import React from 'react';
import styled from '@emotion/styled';

import { Button, SwipeList } from "../../components/ui";

const AttachmentTypeButton = styled(Button)`width: 40px; height: 40px;`;

const ListEditorContentTypeSelector = ({ types }) => {
    const getAttachmentTypesList = () => {
        const list = [];
        types.map(i =>
            i.isActive ?
                list.push(
                    i.customButton ?
                        i.customButton :
                        <AttachmentTypeButton
                            onClick={i.onSelect}
                            text={i.text}
                        />
                ): null
        );
        return list;
    };

    return <SwipeList
        width="auto"
        minWidth={45}
        items={getAttachmentTypesList()}
    />

};

export default ListEditorContentTypeSelector;