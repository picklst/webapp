import React, {useEffect, useState} from "react";
import shortid from "shortid";
import styled from '@emotion/styled'
import classNames from "classnames";

import Option from './option';
import {Button, Card} from "../../../ui";

const PollContainer = styled.div`
  padding: 0.75rem 0.5rem;
  background-color: #EEEEEE;
  border-radius: 0.5rem;
  margin: 0.75rem 0;
`;


export default ({ userVote, showResults, results, totalEntries, options, hasAnswer, onSelect, onShowResults }) => {

    const handleSelect = (id) => {
        onSelect(id);
    };

    const handleShowResults = () => {
        onShowResults();
    };

    const renderPollFooter = () =>
    <div className="py-2 mt-2">
        <Button
            brandAccent
            className="small"
            text="View Results"
            onClick={handleShowResults}
        />
    </div>;

    const renderResultsFooter = () =>
    <div className="py mt-2">
        <Button
            brandAccent
            className="small"
            text="Back to Poll"
            // onClick={() => setShowResults(false)}
        />
    </div>;


    const renderPoll = () =>
    <React.Fragment>
        <div className="row mb-2 mx-0">
            <div className="col-6 d-flex align-items-center px-2">
                <p className="small font-weight-bold mb-0">
                    { hasAnswer ? `Pick the correct option: ` : `Pick your choice` }
                </p>
            </div>
        </div>
        <div className={classNames({ "row m-0" : options.length < 5 })}>
            {
                options.map((i,index) =>
                <div className={classNames(
                       options.length < 5 && `p-2 ${options.length === 3 ? 'col-md-4 col-6' : 'col-6' }`,
                    )}
                >
                    <Option
                        key={shortid.generate()}
                        showVertical={options.length > 4}
                        index={index}
                        name={i.name}
                        media={i.media}
                        onSelect={() => handleSelect(i.id)}
                    />
                </div>
                )
            }
        </div>
        {!hasAnswer ? renderPollFooter() : null}
    </React.Fragment>;

    const getPollVotes = (id) => {
        let votes = 0;
        if(results && results.length > 0)
            votes = results.filter(i => i['id'] === id)[0]['votes'];
        return votes
    };


    const renderPollResults = () =>
    <React.Fragment>
        {   userVote &&
            <div className="p-2">
                <p className="small font-weight-bold mb-2">
                    You voted for
                </p>
                <Option showVertical {...userVote} />
            </div>
        }
        <div className="p-2">
            <p className="small font-weight-bold mb-2">
                { hasAnswer ? `Answer: ` : `Results: ` }
            </p>
            <div className={classNames({ "row m-0" : options.length < 5 })}>
            {
                results && options.map((i,index) =>
                    <Option
                        key={shortid.generate()}
                        showVertical
                        showResults={results}
                        percentage={(getPollVotes(i.id)/totalEntries)*100}
                        index={index}
                        name={i.name}
                        media={i.media}
                    />
                )
            }
            </div>
        </div>
        {renderResultsFooter()}
    </React.Fragment>;

    const renderAnswerResult = () => results &&
    <React.Fragment>
        <div className="d-flex align-items-center justify-content-center text-center p-2">
            <div>
                <h4>{ results.isCorrect ? `You are correct!` : `Oops! That's not the correct answer.`}</h4>
                <div><b>{results.correctOption && results.correctOption.name}</b> is the correct answer.</div>
            </div>
        </div>
    </React.Fragment>;

    return <PollContainer>
    {
        showResults ?
        hasAnswer ?  renderAnswerResult() : renderPollResults() : renderPoll()
    }
    </PollContainer>
}