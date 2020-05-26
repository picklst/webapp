import React from "react";
import shortid from "shortid";
import styled from '@emotion/styled'

import {Avatar} from "../../profile/elements";

const OptionContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  background: ${({isFocused}) => isFocused && `rgba(244,255,129,0.3)`};
`;

export default ({ options, focused, onSelect, valueField }) => {

    return <div className="bg-white">
    {
        options && options.length > 0 ?
            options.map((i, index) =>
                <OptionContainer
                    key={shortid.generate()}
                    role="option"
                    isFocused={focused === index}
                    aria-selected={focused === index}
                    onClick={() => onSelect(i[valueField])}
                >
                    <div className="d-flex align-items-center justify-content-center" style={{ width: '4rem' }}>
                        <Avatar url={i.avatarURL} rounded size="3rem" />
                    </div>
                    <div className="d-flex align-items-center" style={{ width: 'auto' }}>
                        <div>
                            <div className="font-weight-bold d-block d-sm-none">
                                {  i.name && i.name.length > 0 ?
                                    `${i.name.substring(0, 35)}${i.name.length > 35 ? '...'  : ''}` :
                                    `${i[valueField].substring(0, 35)}${i.value.length > 35 ? '...' : ''}`
                                }
                            </div>
                            <div className="font-weight-bold d-sm-block d-none">
                                {i.name && i.name.length > 0 ? i.name : i[valueField]}
                            </div>
                            <div className="small">{i[valueField]}</div>
                        </div>
                    </div>
                </OptionContainer>
            ) : <div>No results</div>
    }
    </div>
}