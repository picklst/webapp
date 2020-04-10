import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';
import {useRouter} from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPaperPlane, faSave, faEye } from "@fortawesome/free-solid-svg-icons";

import PublishList from "../../actions/functions/PublishList.ts";
import UpdateListAPI from "../../actions/api/updateList.ts";
import getListAPI from "../../actions/api/getList.ts";

import ListPropertiesManager from "./list/properties/manager";
import ListManager from "./list/manager";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Cards";


const generateItemObj = () => { return { key: shortid.generate() } };


const ListEditor = ({ slug, editMode, isNew, onExit }) => {
    const router = useRouter();

    const [isCreated, setCreated] = useState(!isNew);
    const [isInitialized, setInitialized] = useState(false);
    const [data, setData] = useState({});
    const [items, setItems] = useState([]);

    const [isQueried, setQueried] = useState(false);
    const [loadError, setError] = useState(false);
    useEffect(() => {
        if(editMode)
        {
            if(!isQueried) {
                getListAPI({
                    slug,
                    fields: [ "name", "description", "curator", "properties", "items" ]
                }).then(res => {
                    setQueried(true);
                    if (!Object.prototype.hasOwnProperty.call(res, 'errors')) {
                        setData(res);
                        setItems(res.items);
                        setInitialized(true);
                        setCreated(true);
                    }
                    else {
                        setError(true);
                    }
                });
            }
        }
       else if(!isInitialized)
       {
           setItems([generateItemObj()]);
           setData({
               title: ''
           });
           setInitialized(true);
       }
    });

    const handleSave = () => {
        items.forEach((i, index) => {
            i.position = index + 1
        });
        console.log(items);
        UpdateListAPI({
            name: data.name,
            slug: slug,
            description: data.description,
            tags: data.tags,
            properties: data.properties,
            items
        }).then(r => {
            // setQueried(false);
        })
    };

    const handlePublish = () => {
        items.forEach((i, index) => {
            i.position = index + 1
        });
        PublishList({
            name: data.name,
            description: data.description,
            tags: data.tags,
            properties: data.properties,
            items
        }).then(r => {
            router.push(`/${r.curator.username}/${r.slug}`)
        })
    };

    const handleCreate = (data) => {
        setCreated(true);
        if(!data.name || data.name.length < 1)
            data.name = 'Untitled List';
        setData(data);
    };

    const [cancelWarning, showCancelWarning] = useState(false);
    const renderTopbar = <div className="d-flex p-1">
        <div style={{ width: '45px' }} className="d-flex align-items-center justify-content-center">
            <button
                onClick={() => showCancelWarning(true)}
                className="plain-button text-dark"
            >
                <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
        </div>
        <div style={{ width: 'auto' }} className="d-flex align-items-center p-2">
            <div className="topbar-title">
                { editMode ? 'Edit your List' : 'Create your List' }
            </div>
        </div>
        {
            data !== {} && cancelWarning ?
                <div id="cancel-warning">
                    <div className="text-center">
                        <h4 className="mb-3 text-white">
                            { editMode ? 'Discard new changes' : 'Discard this List' }
                        </h4>
                        <Button
                            text="Cancel"
                            className="grey-button rounded-pill px-4 py-1 mr-2"
                            onClick={() => showCancelWarning(false)}
                        />
                        <Button
                            text="Discard"
                            className="red-button rounded-pill px-4 py-1 mr-2"
                            onClick={onExit}
                        />
                    </div>
                </div> : null
        }
    </div>;

    return isInitialized ?
        isCreated ?
           <div id="list-editor" className="bg-light">
               <div className="w-100">
                   <div id="list-creator-header" className="bg-white mb-0">
                       <div className="row m-0">
                           <div className="col-9 px-1">
                               {renderTopbar}
                           </div>
                           <div className="col-3 d-flex justify-content-end px-2 px-md-4">
                               {
                                   editMode ?
                                       <Button
                                           onClick={handleSave}
                                           text={
                                               <div>
                                                   <FontAwesomeIcon icon={faSave} />
                                                   <div className="small line-height-1 font-weight-bold">Save</div>
                                               </div>
                                           }
                                           className="text-primary plain-button p-0 m-0 no-shadow"
                                       />
                                   : <Button
                                           onClick={handlePublish}
                                           text={
                                               <div className="small">
                                                   <FontAwesomeIcon icon={faPaperPlane} />
                                                   <div className="line-height-1 font-weight-bold">Publish</div>
                                               </div>
                                           }
                                           className="text-primary plain-button p-0 m-0 no-shadow"
                                       />
                               }
                           </div>
                       </div>
                   </div>
                   <div className="container-lg p-0">
                       <div className="row m-0">
                           <div className="col-md-4 px-md-2 p-0">
                               <div className="position-sticky" style={{ top: '10vh' }}>
                                   <Card className="bg-white py-2 mb-2">
                                       <ListPropertiesManager
                                           isPreview
                                           name={data.name}
                                           properties={data.properties}
                                           onUpdate={handleCreate}
                                           comment={data.description}
                                       />
                                   </Card>
                               </div>
                           </div>
                           <div className={classNames("col-md-8 d-md-block p-0 mb-5")}>
                               <div className="p-lg-4 p-2">
                                   <ListManager
                                       isRankedListing={data.properties && data.properties.isRanked}
                                       items={items}
                                       onChange={(d) => setItems(d)}
                                   />
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           : <div id="list-creator">
                <div className="list-creator-container bg-white position-relative">
                    <div id="list-creator-header" className="bg-white">
                        {renderTopbar}
                    </div>
                    <ListPropertiesManager
                        isNew
                        onUpdate={handleCreate}
                        properties={data.properties}
                        name={data.name}
                     />
                    <div style={{ marginBottom: '5vh' }} />
                </div>
            </div>
        : null
};

ListEditor.propTypes = {
    slug: PropTypes.string,
    editMode: PropTypes.bool,
};

export default ListEditor;