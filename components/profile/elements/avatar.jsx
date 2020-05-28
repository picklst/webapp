import React from 'react';
import styled from '@emotion/styled'

import { Button } from "../../../components/ui";
import ImageUploader from "../../../components/forms/ImageUploader";

const Wrapper = styled.div`
    width:  ${(props) => props.size ? props.size : '25vw' };
    height: ${(props) => props.size ? props.size : '25vw' };
    max-width: 150px;
    max-height: 150px;
    bottom: 2vh;
`;

const Container = styled.div`
    height: 100%;
    
    .list-media-uploader {
        bottom: 0.5rem;
        right: 0.5rem;
        position: absolute;
        cursor: pointer;
    }
`;

const AvatarImage = styled.div`
    background-image: url(${(props) => props.bg ? props.bg : require('../../../images/assets/placeholders/avatar.webp')});
    background-size: cover;
    border-radius: ${(props) => props.rounded ? '100vw' : '0.5rem' };
    height: 100%;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
`;


const Avatar = ({ url, size, rounded, className, showEditButton, onChange }) => {

    return <Wrapper className={className} size={size}>
        <Container>
            <AvatarImage rounded={rounded} bg={url} />
            {showEditButton &&
                <ImageUploader
                    lockAspectRatio
                    aspect={1}
                    className="list-media-uploader"
                    buttonComponent={<Button className="p-2" text={<i className="gg-image" />}/>}
                    onComplete={onChange}
                />
            }
        </Container>
    </Wrapper>;
};

export default Avatar;