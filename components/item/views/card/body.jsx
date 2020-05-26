import React from "react";
import styled from "@emotion/styled";

import { LinkPreviewCard } from "../../../link";
import { MediaPreview } from "../../../media";

import { PollCard } from "../../../poll";

const CommentPreview = styled.div`
  font-size: 1rem;
  line-height: 1.25;
  margin: 0.5rem 0;
`;

export default ({ id, comment, url, media, poll }) => {
    const userRegex = /([@][\w-\d|.]+)/g;
    const hashRegex = /([#][\w-\d|.]+)/g;

    const getCommentForRender = () => {
        let value = comment.replace(hashRegex, `<a href="/tag/$&">$&</a>`);
        value = value.replace(userRegex,`<a href="/$&">$&</a>`);
        return value;
    };

    return <div className="mt-3">
    { media &&
        <div className="my-3 px-0">
            <MediaPreview type={media.type} url={media.url} />
        </div>
    }
    { comment && <CommentPreview dangerouslySetInnerHTML={{ __html: getCommentForRender() }} />}
    { url &&
        <div className="my-3 px-0">
            <LinkPreviewCard url={url} />
        </div>
    }
    { poll &&
        <div className="my-3 px-0">
            <PollCard itemID={id} data={poll} />
        </div>
    }
    </div>
};
