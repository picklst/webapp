import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import ListPropertiesManager from "./list/properties/manager";
import ListManager from "./list/manager";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Cards";

const generateItemObj = () => { return { itemID: shortid.generate() } };


const ListEditor = ({ slug, editMode, isNew }) => {
    const [isCreated, setCreated] = useState(!isNew);
    const [isInitialized, setInitialized] = useState(false);
    const [data, setData] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
       if(!isInitialized)
       {
           setItems([generateItemObj()]);
           setData({
               title: ''
           });
           setInitialized(true);
       }
    });

    const handlePublish = () => {
        console.log(items);
    };

    const handleCreate = (data) => {
        setCreated(true);
        if(data.name.length < 1)
            data.name = 'Untitled List';
        setData(data);
    };

    const [cancelWarning, showCancelWarning] = useState(false);
    const renderTopbar = <div className="d-flex p-1">
        <div style={{ width: '45px' }} className="d-flex align-items-center justify-content-center">
            <button onClick={() => showCancelWarning(true)} className="plain-button text-dark">
                <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
        </div>
        <div style={{ width: 'auto' }} className="d-flex align-items-center p-2">
            <div className="topbar-title">Create your List</div>
        </div>
        {
            data !== {} && cancelWarning ?
                <div id="cancel-warning">
                    <div className="text-center">
                        <h4 className="mb-3">Discard this list?</h4>
                        <Button
                            text="Cancel"
                            className="grey-button rounded-pill px-4 py-1 mr-2"
                            onClick={() => showCancelWarning(false)}
                        />
                        <Button
                            text="Discard"
                            className="red-button rounded-pill px-4 py-1 mr-2"
                            onClick={() => showCancelWarning(false)}
                        />
                    </div>
                </div> : null
        }
    </div>;

    return isInitialized ?
        !isCreated ?
           <div id="list-editor" className="bg-light">
               <div className="w-100">
                   <div id="list-creator-header" className="bg-white mb-0">
                       <div className="row m-0">
                           <div className="col-9 px-1">
                               {renderTopbar}
                           </div>
                           <div className="col-3 d-flex justify-content-end px-2 px-md-4">
                               <Button
                                   onClick={handlePublish}
                                   text={
                                       <div className="small">
                                           <FontAwesomeIcon icon={faPaperPlane} />
                                           <div className="line-height-1 font-weight-bold">Publish</div>
                                       </div>
                                   }
                                   className="text-primary plain-button p-0 m-0 no-shadow"
                               />
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
                        onUpdate={handleCreate}
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