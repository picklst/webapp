import React from 'react';
import styled from '@emotion/styled'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const PreviewContainer = styled.div`
  .react-transform-component{
    width: 100%;
  }
  .react-transform-element{
    width: 100%;
  }
`;

export default ({ type, url, altText, showDeleteButton, onDelete }) => {

    const renderPreview =
    <div className="position-relative w-100 m-0">
    {showDeleteButton &&
        <button
            onClick={onDelete}
            className="position-absolute top-0 right-0 text-white bg-danger p-2 m-1 rounded plain-button"
        >
            <i className="gg-trash" />
        </button>
    }
    {
        type === 'image' &&
        <img
            src={url}
            alt={altText ? altText : 'image-preview'}
            style={{ width: '100%' }}
        />
    }
    </div>;

    return <PreviewContainer>
        <TransformWrapper
            pan={{
                disabled: true
            }}
            options={{
                disabled: showDeleteButton,
                maxScale: 2,
                limitToBounds: true,
                limitToWrapper: true,
            }}
        >
            <TransformComponent>
            {renderPreview}
            </TransformComponent>
        </TransformWrapper>
    </PreviewContainer>;
};