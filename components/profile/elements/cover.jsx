import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"

import ImageUploader from "../../../components/forms/ImageUploader";
import Button from "../../../components/ui/Button";

const CoverImage = styled.div`
    padding-top: 35%;
    background-image: url(${ props => props.bg});
    background-size: cover;
    background-position: center;
    position: relative;
    .list-media-uploader {
        bottom: 0.5rem;
        right: 0.5rem;
        position: absolute;
        cursor: pointer;
    }
`;

const Cover = ({ url, showEditButton, onChange }) => {

    return <CoverImage bg={url} className="rounded-top">
        {
            showEditButton ?
                <ImageUploader
                    lockAspectRatio
                    aspect={16/9}
                    buttonComponent={
                        <Button
                            className="small-button blue-button"
                            text={<FontAwesomeIcon icon={faPencilAlt} />}
                        />
                    }
                    onComplete={onChange}
                /> : null
        }
    </CoverImage>;
};

export default Cover;