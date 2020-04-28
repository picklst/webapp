import React from 'react';

import Card from "../../../../components/ui/Cards";

import Header from './header';
import Body from './body';
import Footer from './footer';

export default ({
  name, slug, curator, itemCount, properties,
  createdTimestamp, lastEditTimestamp,
  isTitleCard, userCanEdit
}) => {

   const renderBody = (isTitleCard) => <Body
       name={name}
       itemCount={itemCount}
       createdTimestamp={createdTimestamp}
       lastEditTimestamp={lastEditTimestamp}
       isTitleCard={isTitleCard}
   />;

    return <Card p={0}>
        <Header
            slug={slug}
            curator={curator}
            lastEditTimestamp={lastEditTimestamp}
            createdTimestamp={createdTimestamp}
            userCanEdit={userCanEdit}
        />
        <div className="px-3">
        {   isTitleCard ?
            renderBody(true) :
            <a className="d-block w-100 plain-link" href={`/${curator.username}/${slug}`}>
                { renderBody(false) }
            </a>
        }
        </div>
        <Footer/>
    </Card>;

};