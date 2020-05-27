import React, {useEffect, useState} from "react";
import shortid from "shortid";

import UserResult from './user';
import ListResult from './list';
import {Button, SwipeList} from "../../../ui";
import styled from '@emotion/styled'


const TypeSelectorContainer = styled.div`
    background: white;
    box-shadow: 0 6px 2px rgba(0,0,0,0.1);
    margin: 0.25rem 0;
    padding: 0.5rem 0;
    .active-type {
      font-weight: 600!important;
      color: orange;
    }
    button {
      font-weight: 300;
    }
`;

const ResultsContainer = styled.div`
  max-height: ${({isDropdown}) => isDropdown ? `400px` : `100vh` };
  overflow-y: auto;
`;

export default ({ results, hideTypeSelector, isDropdown }) => {
    const [type, setType] = useState('top');
    const [normalizedResults, setNormalizedResult] = useState(false);

    const normalizeResults = () => {
        const list = [...results.lists, ...results.users];
        list.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0));
        setNormalizedResult(list);
    };

    useEffect(() => normalizeResults(), [results]);

    const renderTopResults = () =>
    <div>{normalizedResults && normalizedResults.length > 0 ?
        normalizedResults.map(i =>
            i.user ? <UserResult key={shortid.generate()} user={i.user} /> :
                i.list ? <ListResult key={shortid.generate()} list={i.list} />
                    : null
        ) : null
    }</div>;


    const renderListResults = () =>
    <div>{results && results.lists && results.lists.length > 0 &&
        results.lists.map(i => <ListResult key={shortid.generate()} list={i.list}/>)
    }</div>;

    const renderUserResults = () =>
    <div>{results && results.users && results.users.length > 0 &&
        results.users.map(i => <UserResult key={shortid.generate()} user={i.user} />)
    }</div>;

    const typeSelectorButton = (name, value) =>
    <Button className={type===value ? "active-type" : null} text={name} onClick={() => setType(value)} />;

    return <ResultsContainer isDropdown={isDropdown}>
        {
           !hideTypeSelector &&
           <TypeSelectorContainer>
               <SwipeList
                   minWidth="auto"
                   // selectedIndex={typeSelected}
                   itemRole="option"
                   role="listbox"
                   items={[
                       typeSelectorButton('Top', "top"),
                       typeSelectorButton('Lists', "lists"),
                       typeSelectorButton('Users', "users"),
                       typeSelectorButton('Topics', "topics"),
                   ]}
               />
           </TypeSelectorContainer>
        }
        <div>
        {
                type === "lists" ? renderListResults() :
                    type === "users" ? renderUserResults() :
                        type === "topics" ? null :
                            renderTopResults()
            }
        </div>
    </ResultsContainer>
};