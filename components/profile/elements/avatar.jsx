import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons"

import Button from "../../../components/ui/Button";
import ImageUploader from "../../../components/forms/ImageUploader";

const Wrapper = styled.div`
    position: absolute;
    width: 25vw;
    height: 25vw;
    max-width: 150px;
    max-height: 150px;
    bottom: 2vh;
`;

const Container = styled.div`
    height: 100%;
    position: relative;
    
    .list-media-uploader {
        bottom: 0.5rem;
        right: 0.5rem;
        position: absolute;
        cursor: pointer;
    }
`;

const AvatarImage = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    border-radius: 0.5rem;
    height: 100%;
`;


const Avatar = ({ url,  showEditButton, onChange }) => {

    return <Wrapper>
        <Container>
            <AvatarImage bg={url ? url : require('../../../images/assets/placeholders/avatar.webp')} />
            {
                showEditButton ?
                    <ImageUploader
                        lockAspectRatio
                        aspect={1}
                        buttonComponent={
                            <Button
                                className="blue-button p-3"
                                text={<FontAwesomeIcon icon={faCamera} />}
                            />
                        }
                        onComplete={onChange}
                    /> : null
            }
        </Container>
    </Wrapper>;
};

export default Avatar;