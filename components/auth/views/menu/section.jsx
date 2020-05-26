import React from "react";
import shortid from 'shortid';
import styled from "@emotion/styled";

import ItemRenderer from './item';
import { Card } from "../../../ui";

const LabelWrap = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.2;
`;


const SectionRenderer = ({ icon, label, items, sections, isChild }) => {

    const renderTitle =
    <div className="d-flex  align-items-center p-md-3 p-2 mb-2 text-left w-100">
        {
            icon &&
            <div style={{width: "36px", fontSize: "1.5rem"}} className="text-center mr-2">{icon}</div>
        }
            <LabelWrap>{label}</LabelWrap>
    </div>;

    return isChild ?
        <Card p={2} className="mb-3">
            {renderTitle}
            {
                (items && items.length > 0) && items.map((i) =>
                    <ItemRenderer key={shortid.generate()} {...i} />
                )
            }
        </Card> :
        <div>
            {renderTitle}
            {
                (sections && sections.length > 0) &&
                sections.map((i) =>
                    <SectionRenderer
                        key={shortid.generate()}
                        {...i}
                        isChild
                    />
                )
            }
            {
                (items && items.length > 0) && items.map((i) =>
                    <Card p={2} className="mb-3">
                        <ItemRenderer key={shortid.generate()} {...i} />
                    </Card>
                )
            }
        </div>
};

export default SectionRenderer;