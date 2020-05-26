import React from 'react';

import { Card } from "../../../../components/ui";

import PropertiesEditor from "../../modules/editor/properties";

import Header from './header';
import Body from './body';
import Footer from './footer';

export default ({
  name, slug, curator,  description, properties, coverURL, topic,
  itemCount, timestampCreated, timestampLastEdited,
  compact, isTitleCard, isEditing, userCanEdit, hideUsername, hideTopbar,
  onEdit, onSave, onDelete, onExitEdit
}) => {

   const renderBody = (isTitleCard) => <Body
       name={name}
       description={description}
       curator={curator}
       coverURL={coverURL}
       topic={topic}
       itemCount={itemCount}
       compact={compact}
       timestampCreated={timestampCreated}
       timestampLastEdited={timestampLastEdited}
       isTitleCard={isTitleCard}
       hideUsername={hideUsername}
   />;

    return <Card p={compact ? 0 : 2} className="rounded">
        {
            !isEditing && !compact && !hideTopbar &&
            <Header
                slug={slug}
                curator={curator}
                userCanEdit={userCanEdit}
                isEditing={isEditing}
                onEdit={onEdit}
                onExitEdit={onExitEdit}
                onDelete={onDelete}
            />
        }
        {   isEditing ?
                <PropertiesEditor
                    name={name}
                    properties={properties}
                    description={description}
                    cover={coverURL}
                    topic={topic}
                    onSave={onSave}
                /> :
            isTitleCard ?
                renderBody(true) :
            <a className="d-block w-100 plain-link" href={`/${curator.username}/${slug}`}>
                { renderBody(false) }
            </a>
        }
        {/*{ !isEditing ?  <Footer/> : null }*/}
    </Card>;

};