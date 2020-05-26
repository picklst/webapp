import React from "react";
import styled from '@emotion/styled';

import Action from './actions';
import { UserBadge } from "../../../profile";

const RankInfo = styled.div`
  margin-right: 0.5rem;
  padding: ${({isGrid}) => isGrid ? `0.20rem 0.25rem` : `0.25rem 0.35rem`};
  line-height: 1;
  background: #0091EA;
  color: white;
  border-radius: 5px;
  min-width: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const NameText = styled.div`
  display: inline;
  font-size: 1.2rem;
  line-height: 1.2;
  font-weight: 600;
`;

const ItemHeader = ({
    id, slug, index, name, contributor, totalItems,
    showRank, viewType, userCanEdit, hideOptionMenu = false,
    onEdit, onDelete
}) =>
viewType === "grid" ?
<h6 className="px-2 py-2 mb-0">
    {showRank && <div className="d-inline"><RankInfo isGrid>{index+1}</RankInfo></div>}
    {name}
</h6> :
<div className="row mx-0">
    <div className="col-10 d-flex align-items-center p-0">
        <h6 className="mb-0 d-inline d-md-flex align-items-center">
            {showRank && <div className="d-inline"><RankInfo>{index+1}</RankInfo></div>}
            <NameText>{name}</NameText>
        </h6>
    </div>
    <div className="col-2 d-flex justify-content-end align-items-start px-0">
        {   !hideOptionMenu &&
            <Action
                id={id}
                slug={slug}
                index={index}
                totalItems={totalItems}
                userCanEdit={userCanEdit}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        }
    </div>
    {contributor &&
        <div className="col-12 px-0 mt-1 d-flex small align-items-center">
            <UserBadge
                {...contributor}
                hideAvatar
                prefixText="added by"
            />
        </div>
    }
</div>;

export default ItemHeader;