import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons"

import ImageUploader from "../../../components/forms/ImageUploader";
import Button from "../../../components/ui/Button";

const CoverImage = styled.div`
    padding-top: 35%;
    background-image: url(${ props => props.bg});
    background-color: ${props => props.bgcolor};
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

const colors = [
    '#81D4FA', '#80DEEA', '#80CBC4', '#FFAB91', '#B39DDB', '#90CAF9', '#9FA8DA',
    '#EF9A9A', '#F48FB1', '#CE93D8'
];
const bgColor = colors[Math.floor(Math.random() * colors.length)];

const Cover = ({ url, showEditButton, onChange }) => {

    return <CoverImage bg={url} bgcolor={bgColor} className="rounded-top">
        {
            showEditButton ?
                <ImageUploader
                    lockAspectRatio
                    aspect={16/9}
                    buttonComponent={
                        <Button
                            className="blue-button p-3"
                            text={<FontAwesomeIcon icon={faCamera} />}
                        />
                    }
                    onComplete={onChange}
                /> : null
        }
    </CoverImage>;
};

export default Cover;