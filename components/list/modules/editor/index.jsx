import React, {useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";

import { Button, BottomPopup, Card } from "../../../ui";

import PropertiesEditor from './properties';
import Items from './items';

import {EditorContainer, PublishedWindow, PublishingWindow} from '../../views'

import {APIPost, APIRequest} from "../../../../utils";
import {createFileFromURI} from "../../../commons";

export default ({ onExit }) => {
    const [isInitialized, setInitialized] = useState(false);
    const [data, setData] = useState(false);
    const [items, setItems] = useState(false);

    const [isSaving, setSaving] = useState(false);
    const [response, setResponse] = useState(false);


    const uploadCover = async (blobURL, slug) => {
        const d = new FormData();
        const mediaFile = await createFileFromURI({ dataURI:  blobURL, fileName: 'cover.jpg' });
        d.append('cover', mediaFile);
        const query = `mutation { listCoverUpload(list: { slug : "${slug}"}) }`;
        d.append('query', query);
        return await APIPost({data: d, requireAuth: true}).then((data) => {
            return { success: true, data };
        }).catch((errors) => { return { success: false, errors }; });
    };

    const listCreate = async (variables) => {
        const query = `mutation create_list($input: ListCreationInput) {
          listCreate(input: $input)
          {
            returning
            {
              slug
              curator
              {
                username
              }
            }
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: true }).then((data) => {
            return { success: true, data};
        }).catch((errors) => { return { success: false, errors } })
    };

    const handlePublish = async () => {
        setSaving(true);

        items.forEach((i, index) => {
            i.position = index + 1;
            if(i.media && i.media.id)
                i.mediaID = i.media.id;
            if(i.poll && i.poll.options && i.poll.options.length > 1)
            {
                const poll = {};
                const options = [];
                i.poll.options.forEach(({id, name, media}) => {
                    const op = { id, name };
                    if(media && media.id) { op['mediaID'] = media.id }
                    options.push(op);
                });
                if(i.poll.answer !== null)
                    poll['answerID'] = i.poll.answer;
                poll['options'] = options;
                i['poll'] = poll;
            }
            delete i.media;
            delete i.id;
            delete i.key;
        });

        const variables = {
            input: {
                name: data.name,
                slug: data.slug,
                description: data.comment,
                tags: data.tags,
                properties: data.properties,
                items: items
            }
        };
        if(data.topic)
            variables['input']['topic'] = data.topic.slug;
        const r = await listCreate(variables).then(({ success, data, errors }) => {
            if(success){
                return data.listCreate.returning;
            } else {
                console.error(errors);
            }
        });
        if (data.cover && data.cover.url && data.cover.url.startsWith("blob")) {
            await uploadCover(data.cover.url, r.slug).then(({ success, data, errors}) => {
                if(success){
                    console.log('media uploaded');
                } else {
                    console.error()
                }
            })
        }
        setResponse(r);
        setSaving(false);
    };

    const handleInitialization = (data) => {
        setInitialized(true);
        if(!data.name || data.name.length < 1)
            data.name = 'Untitled List';
        setData(data);
    };

    const renderInitializer = () =>
    <BottomPopup
        title={'Create your List'}
        discardLabel="Discard List"
        className="bg-white"
        contentClassName="px-md-3 px-2"
        onClose={onExit}
    >
        <PropertiesEditor
            isInitializing
            onSaveTopic={handleInitialization}
            onSave={setData}
        />
    </BottomPopup>;


    const renderEditor = () =>
    <EditorContainer
        labels={{
            "topbarTitle": "Creating a List",
            "discardText": "This list has not been saved, do you wish to discard this list?"
        }}
        preventExit={!response}
        header={
            <Card className="bg-white py-2 mb-2">
                { isSaving ? <PublishingWindow /> : null}
                { response ? <PublishedWindow username={response.curator.username} slug={response.slug} onClose={onExit} /> : null }
                <PropertiesEditor
                    name={data.name}
                    properties={data.properties}
                    description={data.description}
                    topic={data.topic}
                    onSave={setData}
                />
            </Card>
        }
        items={<Items items={items} onChange={setItems} />}
        actionButton={
            <Button
                onClick={handlePublish}
                text={
                    <div className="small">
                        <FontAwesomeIcon icon={faPaperPlane} />
                        <div className="line-height-1 font-weight-bold">Publish</div>
                    </div>
                }
                className="text-primary m-0 no-shadow"
            />
        }
        onExit={onExit}
    />;

    return !isInitialized ? renderInitializer() : renderEditor();
}
