import React, {useEffect, useState} from "react";
import shortid from 'shortid';

import ItemRenderer from './item';
import {Button, Card} from "../../../ui";

import SectionRenderer from './section';
import TopBar from './topbar'

const PaneRenderer = ({ label, items, sections, panes, onExit }) => {
    const [isRenderingPane, setRenderingPane] = useState(false);

    return <div>
        {
            !isRenderingPane &&
            <React.Fragment>
                <TopBar title={label} onClickBack={onExit} />
                {
                    (sections && sections.length > 0) &&
                    sections.map((i) => <SectionRenderer key={shortid.generate()} {...i} />)
                }
                {
                    (items && items.length > 0) && items.map((i) =>
                        <Card p={2} className="my-2">
                            <ItemRenderer key={shortid.generate()} {...i} />
                        </Card>
                    )
                }
            </React.Fragment>
        }
        {
            <MenuRenderer
                label={label}
                panes={panes}
                onRender={() => setRenderingPane(true)}
                showTopBar={isRenderingPane}
                onExit={onExit}
            />
        }

    </div>

};

const MenuRenderer = ({ label, panes, onRender, showTopBar, onExit }) => {
    const [currentSection, setCurrentSection] = useState(null);

    return <React.Fragment>
        {
            currentSection !== null ?
            <React.Fragment>
            {
                panes.filter((i, index) => index === currentSection).map((i) =>
                    <PaneRenderer
                        key={shortid.generate()}
                        onExit={() => { setCurrentSection(null); }}
                        {...i}
                    />
                )
            }
            </React.Fragment> :
            <React.Fragment>
                { showTopBar && <TopBar title={label} onClickBack={onExit} /> }
                { (panes && panes.length > 0) &&
                    panes.map((i, index) =>
                        <Button
                            key={shortid.generate()}
                            className="plain-button bg-white my-2 mx-0 d-block w-100"
                            text={
                                <div className="d-flex  align-items-center p-md-3 p-2 text-left w-100">
                                    <span style={{ width: "36px", fontSize: "1.5rem" }} className="text-center">{i.icon}</span>
                                    <span style={{ width: "auto" }} className="pl-3">{i.label}</span>
                                </div>
                            }
                            onClick={() => {
                                if(i.type === "button" && typeof i.onClick === "function")
                                    i.onClick();
                                else {
                                    console.log('why');
                                    onRender();
                                    setCurrentSection(index)
                                }
                            }}
                        />
                    )
                }
            </React.Fragment>
        }
    </React.Fragment>;

};

export default MenuRenderer;