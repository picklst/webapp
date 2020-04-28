import React from "react";

import LinkPreview from "../../../../modules/editor/link/preview";
import { MediaPreview } from "../../../media";

export default ({ comment, url, media }) =>
<div>
    { media ? <MediaPreview type={media.type} url={media.url} /> : null }
    { comment ? <p className="mx-2 my-4">{comment}</p> : null }
    { url ? <LinkPreview url={url} /> : null}
</div>;
