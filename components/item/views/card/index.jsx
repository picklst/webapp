import React, {useEffect, useState} from "react";
import classNames from "classnames";

import { Card } from "../../../ui";
import { ListItemVoteBar } from '../../../list';

import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import {MediaPreview} from "../../../media";

export default ({
    id, slug, index, contributor, totalItems,
    name, comment, url, media,  poll, votes,
    className, viewType,
    showRank, userCanEdit, isVotable, hideOptionMenu,
    header,
    onClick, onEdit, onDelete
}) => {

    const renderHeader = header ? header :
    <Header
        id={id}
        index={index}
        totalItems={totalItems}
        slug={slug}
        name={name}
        contributor={contributor}
        userCanEdit={userCanEdit}
        viewType={viewType}
        showRank={showRank}
        hideOptionMenu={hideOptionMenu}
        onEdit={onEdit}
        onDelete={onDelete}
    />;

    const renderGridView = () =>
    <div>
        {renderHeader}
        {media && <MediaPreview type={media.type} url={media.url} />}
    </div>;

    const renderCompactView = () =>
    <div className="row p-2 m-0">
        {media && <div className="col-3 px-0">
            <MediaPreview type={media.type} url={media.url} />
        </div>}
        <div className="col px-1">
            {renderHeader}
            <Body comment={comment} />
        </div>
    </div>;

    const renderCardView = () =>
    <div className="p-3">
        {renderHeader}
        <Body id={id} comment={comment} media={media} url={url} poll={poll} />
    </div>;

    const footerRef = React.useRef();
    const [space, setSpacing] = useState('8vh');
    useEffect(() => {
        if(footerRef && footerRef.current)
            setSpacing(footerRef.current.clientHeight);
    }, [footerRef]);

    return <Card onClick={onClick} className={classNames(className, "position-relative")} p={0}>
        {
            viewType === "grid" ? renderGridView() :
            viewType === "compact" ? renderCompactView() :
            renderCardView()
        }
        <div style={{ height: space }} />
        <div ref={footerRef} className="position-absolute bottom-0 w-100">
            { (viewType !== "grid"  && isVotable) && <ListItemVoteBar slug={slug} itemID={id} />}
            { viewType !== "grid" && <Footer id={id} votes={votes} />}
        </div>
    </Card>
}

