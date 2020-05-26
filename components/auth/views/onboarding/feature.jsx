import React from "react";
import shortid from "shortid";
import styled from "@emotion/styled";

import {Button} from "../../../ui";

const whyPickList = require('../../../pages/data/why_picklst');

const WelcomeTitle = styled.h2`
    font-weight: 800;
    line-height: 1;
    text-transform: uppercase;
    padding: 0.5rem;
`;

const TaglineText = styled.h6`
    padding: 0 0.5rem;
    line-height: 1;
    color: #6200EA;
    margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  font-size: 0.8rem;
  color: #666;
  padding: 0 0.5rem;
  line-height: 1.15;
  margin-bottom: 0;
  display: flex;
  align-items: center;
`;

export default ({ onProceed }) => {


    return <div className="p-2 mb-1">
        <WelcomeTitle>Introducing Picklst.</WelcomeTitle>
        <TaglineText>A Friendlier way to <div className="d-inline-block font-weight-bold">Discover & Share Lists.</div></TaglineText>
        { whyPickList.map(i =>
            <div key={shortid.generate()} className="d-flex p-1 mx-0 mb-2">
                <div className="d-flex justify-content-center align-items-center" style={{ minWidth: '45px' }}>
                    {   i.icon &&
                        <img style={{ height: '45px' }} alt="icon" src={require('../../../../images/assets/illustrations/'+i.icon)} />
                    }
                </div>
                <FeatureText>{i.title}</FeatureText>
            </div>
        )}
        <Button
            brandAccent
            text="Next"
            className="my-2 mx-0 w-100"
            onClick={onProceed}
        />
    </div>;

}