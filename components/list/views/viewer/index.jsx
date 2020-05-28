import React, {useState} from "react";
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import {Waypoint} from "react-waypoint";
import styled from '@emotion/styled'

import {ItemCard} from "../../../item";
import ModeSelector from "./ModeSelector";
import {Button, Card} from "../../../ui";
import {usePreferenceState} from "../../../../states";

const TopbarContainer = styled.div`
  position: sticky;
  top: ${({top}) => top!== null && top > 0 ? `${top}px` : 0};
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 2px 3px 10px rgba(0,0,0,0.2);
  margin-top: 1rem;
  z-index: 700;
`;

export default ({
    slug, items, listProperties,
    isEditing, userCanEdit, canLoadMore, hideTopbar, sidebar, mobileBar,
    onDelete, requireUpdate, onLoadMore
}) => {
    const [mode, setMode] = useState('card');
    const [currentItem, setCurrentItem] = useState(false);

    const [hideDistractions, setHideDistractions] = usePreferenceState('hideDistractions');
    const [space, setSpacing] = usePreferenceState('topbarHeight');

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 768px)'});
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const renderItemCard = (id, i, index) =>
    <ItemCard
        key={id}
        slug={slug}
        className={mode !== "grid" && mode !== "slides" ? "my-2 my-md-3" : "mb-1 h-100"}

        id={id}
        index={index}
        totalItems={items.length}

        name={i.name}
        comment={i.comment}
        url={i.url}
        media={i.media}
        poll={i.poll}
        votes={i.votes}

        viewType={mode}
        contributor={i.contributor}
        showRank={listProperties && listProperties.isRanked}
        userCanEdit={userCanEdit}
        isEditing={isEditing && (currentItem ? currentItem === id : index === 0)}
        isVotable={listProperties.isVotable}

        showSaveButton
        allowSave
        onEdit={setCurrentItem}
        showEditButton={isEditing}
        showMoveButtons={isEditing}

        requireUpdate={requireUpdate}

        onDelete={onDelete}
    />;

    const renderAsCards = () =>
    <div>
        {items && items.map(({id, item: i}, index) => renderItemCard(id, i, index) )}
        {   canLoadMore &&
            <Waypoint onEnter={onLoadMore}><div style={{ height: '15vh' }} /></Waypoint>
        }
    </div>;

    const renderAsGrid = () =>
    <div className="row m-0">
        {items && items.map(({id, item: i}, index) =>
            <div className="col-6 col-md-4 p-1">
                {renderItemCard(id, i, index)}
            </div>
        )}
    </div>;

    const [currItem, setItem] = useState(0);
    const renderAsSlides = () =>
    <div>
        {renderItemCard(items[currItem].id, items[currItem].item, currItem)}
    </div>;

    const renderSlideControllers = () =>
    <div className="row mx-0 py-2 px-1">
        <div className="col-4 px-0 -flex align-items-center">
        {
            currItem > 0 &&
            <Button
                className="px-3 py-2"
                title="View Previous"
                text={<div><i className="gg-chevron-double-left" /></div>}
                onClick={() => setItem(currItem - 1)}
            />
        }
        </div>
        <div className="col-4 d-flex align-items-center justify-content-center">{currItem+1}/{items.length}</div>
        <div className="col-4 px-0 d-flex align-items-center justify-content-end">
            {
                currItem + 1 < items.length &&
                <Button
                    className="px-3 py-2"
                    title="View Next"
                    text={<div><i className="gg-chevron-double-right" /></div>}
                    onClick={() => setItem(currItem + 1)}
                />
            }
        </div>
    </div>;

    const renderViewerBar =
    <TopbarContainer top={space} className="row mx-0 mb-2">
        <div className="col-8 d-flex align-items-center px-2">
        </div>
        <div className="col-4 p-2 d-flex align-items-center justify-content-end px-2">
            { isDesktopOrLaptop &&
                <Button
                title={`${hideDistractions ? 'Turn off' : "Turn on" } distraction free mode`}
                className={classNames({"text-primary":hideDistractions}, "p-1 h-100")}
                text={<img
                style={{ width: "28px" }}
                alt={`${hideDistractions ? 'Turn off' : "Turn on" } distraction free mode`}
                src={
                        hideDistractions ? require('../../../../images/icons/distraction-unrestricted.png') :
                            require('../../../../images/icons/distraction-restricted.png')
                    }
                />}
                onClick={() => setHideDistractions(!hideDistractions)}
                />
            }
            <ModeSelector value={mode} onChange={setMode} />
        </div>
    </TopbarContainer>;

    const isLargeScreen = useMediaQuery({
        query: '(min-width: 992px)'
    });

    return <div>
        {!hideTopbar && renderViewerBar}
        { (mode === "compact" || mode === "card") &&
            <div className="row m-0">
                <div className="col p-0">{renderAsCards()}</div>
                {(sidebar && !hideDistractions && isLargeScreen) &&
                    <div className="col-lg-4 py-3 px-2">{ !hideDistractions && sidebar}</div>
                }
            </div>
        }
        { mode === "grid" &&
            <div>
                <div className="row m-0">
                    <div className="col px-0">{renderAsGrid()}</div>
                    {(sidebar && !hideDistractions && isLargeScreen) &&
                        <div className="col-md-3 px-2">{!hideDistractions && sidebar}</div>
                    }
                </div>
            </div>
        }
        {
            mode === "slides" &&
            <div className="row m-0">
                <div className="col px-0">
                    <Card p={0} className="mt-3">
                        {renderAsSlides()}
                        {renderSlideControllers()}
                    </Card>
                </div>
                {(!hideDistractions && isLargeScreen) &&
                    <div className="col-md-4 py-3 pl-4 pr-0">
                        {sidebar}
                    </div>
                }
            </div>
        }
        {
            isMobile && mobileBar
        }
    </div>

}