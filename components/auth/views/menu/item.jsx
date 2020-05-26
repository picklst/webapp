import React, {useState} from "react";
import styled from "@emotion/styled";

import { PopUp, Toggler } from "../../../ui";

const LabelWrap = styled.div`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
`;

const DescriptionWrap = styled.div`
  font-size: 0.8rem;
  color: #333;
  line-height: 1.2;
  padding: 0.3rem;
  margin-top: 0.25rem;
`;

const TextWrap = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  color: #333;
  padding: 0.3rem;
  margin-bottom: 0;
`;



export default ({
    icon, label, text, link, description, type
}) => {

    const renderItemBody =
    <React.Fragment>
        <div className="row m-0 w-100 py-2">
            <div className="col-8 d-flex align-items-center p-1">
                <div className="d-flex align-items-center text-left w-100">
                    {
                        icon &&
                        <div style={{ width: "36px", fontSize: "1.5rem" }} className="text-center mr-3">{icon}</div>
                    }
                    <LabelWrap>{label}</LabelWrap>
                </div>
            </div>
            <div className="col-4">
                {
                    type === "switch" ?
                        <Toggler small />
                        : null
                }
            </div>
        </div>
        {   text && <TextWrap>{text}</TextWrap> }
        {   description && <DescriptionWrap>{description}</DescriptionWrap> }
    </React.Fragment>;

    const [iframe, showIframe] = useState(false);

    const renderIframe = () =>
    <PopUp
        isOpen
        title={label}
        appElement=".app"
        onClose={() => showIframe(false)}
    >
        <div className="p-2">
            <iframe src={link} className="w-100" style={{ minHeight: "80vh", minWidth: "75vw" }} />
        </div>
    </PopUp>;

    return iframe ? renderIframe() :
        link ? <button className="plain-button w-100" onClick={() => showIframe(true)}>
        {renderItemBody}
    </button> : <React.Fragment>
        {renderItemBody}
    </React.Fragment>
}