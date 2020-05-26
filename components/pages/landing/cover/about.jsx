import React, {useState} from "react";
import shortid from 'shortid';
import classNames from "classnames";
import styled from '@emotion/styled'

const whyLists = require('../../data/why_lists');
const whyPickList = require('../../data/why_picklst');
const coreValues = require('../../data/our_values');

const SectionHeading = styled.button`
  font-size: calc(1rem + 0.15vw);
  display: inline-block;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  margin: 0.2rem 0.5rem;
  background-color: transparent!important;
  color: white;
  border: 1px solid white;
  &.active{
      background-color: white!important;
      color: black;
  }
`;

const Rank = styled.div`
  font-size: calc(1rem + 2vw);
  font-weight: 600;
  line-height: 1;
  padding-right: 0.35rem;
  min-width: 60px
`;

const FeatureTextWrap = styled.div`
    h6 {
      font-size: calc(1rem + 0.2vw);
      margin-bottom: 0.35rem;
    }
    p {
      font-size: 0.9rem;
      line-height: 1.3;
    }
`;

const FeatureCard = ({ index, title, description }) =>
<div className="col-6 d-flex justify-content-start mx-0 p-1 p-md-2">
    <Rank className="text-center">
        {index+1}
    </Rank>
    <div className="p-0">
        <FeatureTextWrap>
            <h6>{title}</h6>
            <p>{description}</p>
        </FeatureTextWrap>
    </div>
</div>;

export default ({}) => {

    const renderWhyList =
    <div className="row mx-0 my-2">
        {whyLists.map((i, index) => <FeatureCard key={shortid.generate()}  index={index} title={i.title} description={i.description} />)}
    </div>;

    const renderWhyPicklst =
    <div className="row mx-0 my-2">
        {whyPickList.map((i, index) => <FeatureCard key={shortid.generate()} index={index} title={i.title} description={i.description} />)}
    </div>;

    const renderCoreValues =
        <div className="row mx-0 my-2">
            {coreValues.map((i, index) => <FeatureCard key={shortid.generate()} index={index} title={i.title} description={i.description} />)}
        </div>;

    const [currentSection, setSection] = useState(1);

    return <React.Fragment>
        <div className="d-flex">
            <SectionHeading
                onClick={() => setSection(1)}
                className={classNames(currentSection === 1 ? "active" : null , "plain-button")}
            >
                Why Lists?
            </SectionHeading>
            <SectionHeading
                onClick={() => setSection(2)}
                className={classNames(currentSection === 2 ? "active" : null , "plain-button")}
            >
                Why Picklst?
            </SectionHeading>
            <SectionHeading
                onClick={() => setSection(3)}
                className={classNames(currentSection === 3 ? "active" : null , "plain-button")}
            >
                Core Values
            </SectionHeading>
        </div>
        {
            currentSection === 1 ?
                renderWhyList
            : currentSection === 2 ?
                renderWhyPicklst
            : currentSection === 3 ?
                renderCoreValues
            : null
        }
    </React.Fragment>;
}