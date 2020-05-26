import React from "react";
import classNames from "classnames";
import styled from '@emotion/styled'

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    min-height: ${({ showResults }) => showResults ? "45px" : "64px" };
    padding-bottom: ${({ showResults }) => showResults ? "5px" : "0" } ;
    background: ${props =>
        props.percentage ?
            `linear-gradient(to right, #26C6DA ${props.percentage}%, #B2EBF2 ${props.percentage}% 100%);`
        : 'white'
    };
    margin-bottom: ${({ showResults }) => showResults ? "5px" : "0" };
    box-shadow: ${({ showResults }) => showResults ? null : "1px 2px 8px rgba(0,0,0,0.2)"};
`;

export default ({
    name, media, percentage,
    showVertical,showResults,
    onSelect
}) => {

    const renderCardBody = () =>
    <div className={classNames("bg-white h-100  rounded shadow", media == null ? "d-flex align-items-center justify-content-center p-2" : null )}>
        {   media &&
            <div
                className="rounded-top"
                style={{
                    backgroundImage: `url("${media.url}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "15vh",
                    minHeight: "150px"
                }}
            />
        }
        <div className="d-flex align-items-center font-weight-bold line-height-1 p-2">{name}</div>
    </div>;

    const renderVerticalBody = () =>
    <Container showResults={showResults} percentage={percentage} className="h-100 rounded">
        {   media &&
            <div
                className="rounded-left"
                style={{
                    backgroundImage: `url("${media.url}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "15%",
                    height: !showResults ? "7.5vh" : "5.5vh",
                    minHeight: !showResults ? "60px" : "36px",
                    maxHeight: "90px"
                }}
            />
        }
        <div className="text-left line-height-1 p-2">
            <span className="font-weight-bold">{name}</span>
            {(showResults && percentage) ? <span className="small pl-1">({percentage}%)</span> : null}
        </div>
    </Container>;

    return <button
        title={showResults ? `${name} ${percentage ? `received ${percentage}% votes` : ''}` : `Pick ${name}`}
        className="plain-button p-0 h-100 w-100"
        children={showVertical ? renderVerticalBody() : renderCardBody()}
        onClick={onSelect}
    />;
}