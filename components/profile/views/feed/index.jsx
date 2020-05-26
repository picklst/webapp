import React from 'react';
import {useRouter} from "next/router";
import shortid from 'shortid';
import styled from '@emotion/styled'
import { Waypoint } from 'react-waypoint';

import { ListCard } from "../../../list";
import EmptyFeed from './empty';

const FeedWrapper = styled.div`
  margin: 5vh 0 15vh 0;
  max-width: 600px;
`;

export default ({ username, listData, onLoadMore, canLoadMore, onDelete }) => {
    const router = useRouter();

    const handleEdit = (i) => {
        router.push(`/${username}/${i.slug}/edit`);
    };

    return <React.Fragment>
    {
        listData && listData.length > 0 ?
        <FeedWrapper>
        { listData.map((i,index) =>
            <div key={shortid.generate()} className="mb-2">
                <ListCard  onDelete={() => onDelete(index)} onEdit={() => handleEdit(i)} {...i} />
            </div>
        )}
        </FeedWrapper> : <EmptyFeed username={username} />
    }
    {   canLoadMore ?
        <Waypoint onEnter={onLoadMore}>
            <div style={{ height: '15vh' }} />
        </Waypoint> : null
    }
    </React.Fragment>


};