import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import shortid from 'shortid';

import { Card } from '../'
import { ItemCard } from '../../../item'

import {Button, PopUp} from "../../../ui/";
import {getListAPI} from "../../api";
import {APIRequest} from "../../../../utils";
import {EditorContainer} from "../../views";
import ErrorCard from "../../../core/ErrorCard";

import { DeleteButton } from '../'

import Sidebar from './sidebar';
import {LogListVote, useAuthState} from "../../../../states";

import {ListItemViewer} from '../../views';

const FloatingButton = styled(Button)`
    position: fixed;
    bottom: 1.5rem;
    right: 1.25rem;
    z-index: 5000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    i {
      --ggs: 1.2
    }
`;

const NewItemPopup = styled(PopUp)`
    background: none!important;
    display: flex;
    align-items: center;
    margin: 0 1rem;
    max-width: 600px;
    .popup-item-card {
      max-height: 90vh;
      overflow-y: auto;
    }
`;

const ListViewer = ({ username, slug, isEditing: isEditingProps }) => {
    const router = useRouter();

    const [data, setData] = useState(false);
    const [canLoadMore, setLoadMore] = useState(false);
    const [loadError, setError] = useState(false);
    const [userInfo, setUserInfo] = useAuthState('userInfo');

    const fetchData = () => {
        const query = getListAPI({
            fields: [
                "name", "description", "curator", "topic", "properties", "items", "coverURL", "userVote",
                "timestampCreated", "timestampLastEdited", "itemCount", "userCanEdit", "hasEntries"
            ],
            args: [ "itemCount" ]
        });
        const variables = { slug, username, itemCount:20 };
        const requireAuth = !(userInfo === null);
        APIRequest({ query, variables, requireAuth }).then(res => {
            if (!Object.prototype.hasOwnProperty.call(res, 'errors')) {
                if (res.list.items && res.list.items[res.list.items.length-1].nextItem)
                    setLoadMore(res.list.items[res.list.items.length-1].nextItem);
                if(res.list && res.list.userVote && res.list.userVote.id)
                    LogListVote(slug, res.list.userVote.id);
                setData(res.list);
            }
        }).catch(({ errors, data }) => {
            if(data && data.list && data.list.items === null && errors && errors[0].code === "POSITION_CORRUPTED")
            {
                console.error(errors);
                setData(data.list);
                toast.error(
                    "We could not retrieve any items in this list. Please try again.",
                    {
                        autoClose: 1000, hideProgressBar: true, closeButton: false,
                        position: toast.POSITION.BOTTOM_CENTER,
                    }
                );
            }
            else setError(true);
        });
    };

    const loadMore = () => {
        const query = getListAPI({
            fields: ["items",],
            args: [ "itemCount", "itemStarting" ]
        });
        const variables = { slug, username, itemCount: 5 };
        if(canLoadMore)
        {
            variables.itemStarting = canLoadMore;
            setLoadMore(false);
            APIRequest({query, variables, requireAuth: false }).then(res => {
                if (!Object.prototype.hasOwnProperty.call(res, 'errors'))
                {
                    if (res.list.items && res.list.items[res.list.items.length-1].nextItem)
                        setLoadMore(res.list.items[res.list.items.length-1].nextItem ? res.list.items[res.list.items.length-1].nextItem : false);
                    if(res.list && res.list.items)
                    {
                        setData(false);
                        const newData = data;
                        newData['items'] = [...newData['items'],...res.list.items];
                        setData(newData);
                    }
                }
            }).catch(({ errors, data }) => {
                console.error(errors);
            });
        }
    };

    const [isEditing, setEditMode] = useState(isEditingProps);

    useEffect(fetchData, [username, slug]);

    const renderAddFloatingButton =
    <FloatingButton
        brandAccent
        onClick={() => setShowItemAdder(true)}
        text={<div><i className="gg-math-plus" /></div>}
    />;

    const [showItemAdder, setShowItemAdder] = useState(false);
    const createItem = async (variables) => {
        const query = `
        mutation create_item($slug: String!, $input: ItemInput!){
          itemCreate(list: { slug: $slug}, object: $input)
          {
            returning {
              id
            }
          }
        }`;
        return await APIRequest({ query, variables }).then((data) => {
            return { success: true };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    const handleCreate = (object) => {
        const variables = {
            slug,
            input: {
                ...object,
                poll: null,
                position: (data.items && data.items.length || 0) + 1
            }
        };
        if(object.poll && object.poll.options && object.poll.options.length > 1)
        {
            const poll = {};
            const options = object.poll.options;
            // .forEach(({id, name, mediaID }) => {
            //     options.push({ id, name, mediaID });
            // });
            if(object.poll.answer !== null)
                poll['answerID'] = object.poll.answer;
            poll['options'] = options;
            variables['input']['poll'] = poll;
        } else {
            delete variables['input']['poll'];
        }
        createItem(variables).then(({ success, errors, data }) => {
            if(success)
            {
                toast.success(
                    "Item added successfully",
                    {
                        autoClose: 1000, hideProgressBar: true, closeButton: false,
                        position: toast.POSITION.BOTTOM_CENTER,
                    }
                );
                fetchData();
            } else {
                toast.error(
                    "Could not add item due to an unknown error. Please try again.",
                    {
                        autoClose: 1000, hideProgressBar: true, closeButton: false,
                        position: toast.POSITION.BOTTOM_CENTER,
                    }
                );
            }
        });
        setShowItemAdder(false);
    };

    const renderItemAdder = () =>
    <NewItemPopup
        isOpen
        onClose={() => setShowItemAdder(false)}
        label="Item Adder"
        className="p-0 container"
        appElement=".app"
        showTopbarOnMobile={false}
    >
        <ItemCard
            key={shortid.generate()}
            className="popup-item-card my-0 w-100"
            index={(data.items && data.items.length || 0) + 1}
            totalItems={data.items && data.items.length || 0}

            id={shortid.generate()}
            slug={slug}
            isEditing
            isCreating
            userCanEdit
            onSave={handleCreate}
            onClose={() => setShowItemAdder(false)}
            showSaveButton
            showDeleteButton={false}
            showMoveButtons={false}
            allowSave={false}
            labels={{ 'save': "Add Item" }}
        />
    </NewItemPopup>;

    const handleDelete = (index) => {
        setData({...data, items: [
            ...data.items.slice(0,index),
            ...data.items.slice(index+1)
        ]});
    };

    const renderHeader = () =>
    <Card
        isTitleCard
        isEditing={isEditing}
        userCanEdit={data.userCanEdit}

        name={data.name}
        description={data.description}
        properties={data.properties}
        coverURL={data.coverURL}
        topic={data.topic}
        slug={slug}
        curator={data.curator}

        itemCount={data.itemCount}
        timestampLastEdited={data.timestampLastEdited}
        timestampCreated={data.timestampCreated}

        onDelete={() => { router.push(`/${data.curator.username}`)  }}
        onEdit={() =>  setEditMode(true)}
        onExitEdit={() =>  setEditMode(false)}
    />;

    const renderPreview = () =>
    <div className="row m-0">
        <div className="col-12 p-0">
            {renderHeader()}
        </div>
        <div className="col p-0">
            <ListItemViewer
                items={data.items}
                slug={slug}
                listProperties={data.properties}
                onDelete={handleDelete}
                isEditing={isEditing}
                requireUpdate={fetchData}
                userCanEdit={data.userCanEdit}
                canLoadMore={canLoadMore}
                onLoadMore={loadMore}
                sidebar={<Sidebar data={data} />}
            />
        </div>
    </div>;

    const renderEditMode = () =>
    <EditorContainer
        preventExit={false}
        labels={{
            "topbarTitle": "Editing List",
            "discardText": "Changes you made may not be saved, do you wish to continue?"
        }}
        header={renderHeader()}
        actionButton={<DeleteButton slug={slug} />}
        items={
            <div className="p-md-2">
                <ListItemViewer
                    items={data.items}
                    slug={slug}
                    listProperties={data.properties}
                    onDelete={handleDelete}
                    isEditing={isEditing}
                    requireUpdate={fetchData}
                    userCanEdit={data.userCanEdit}
                    canLoadMore={canLoadMore}
                    onLoadMore={loadMore}
                    hideTopbar
                />
                { renderAddFloatingButton }
                { showItemAdder && renderItemAdder() }
            </div>
        }
        onExit={() => setEditMode(false)}
    />;


    return loadError ?
        <ErrorCard message="Failed to Load" code="FAILED_TO_LOAD" /> :
    data && (isEditing && data.userCanEdit ? renderEditMode() : renderPreview())
};

export default ListViewer;