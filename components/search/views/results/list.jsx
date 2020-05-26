import React from "react";
import styled from '@emotion/styled'

const ListResultContainer = styled.a`
    display: flex;
    text-decoration: none;
    color: inherit!important;
    padding: 0.75rem;
    background: white;
    min-height: 60px;
    align-items: center;
    &:hover {
      text-decoration: none;
      background-color: #eee;
    }
    .col-3, .col {
      display: flex;
      align-items: center;
    }
    .col-3 {
      justify-content: center;
    }
`;

const ListName = styled.div`
  font-weight: 600;
  line-height: 1.1;
`;

const ListCurator = styled.div`
  line-height: 1.2;
  font-size: 0.8rem;
`;


export default ({ list }) =>
<ListResultContainer href={`/${list.curator.username}/${list.slug}`} onMouseDown={(e) => { e.preventDefault(); }}>
    <div className="row w-100 m-0">
        <div className="col-3">
        </div>
        <div className="col p-0">
            <div>
                <ListName>{list.name}</ListName>
                <ListCurator>by @{list.curator.username}</ListCurator>
            </div>
        </div>
    </div>
</ListResultContainer>;