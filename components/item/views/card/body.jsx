import React from "react";

import LinkPreview from "../../../../modules/editor/link/preview";
import { MediaPreview } from "../../../media";

export default ({ name, comment, url, media }) => <div>
    <h3>{name}</h3>
    { media ? <MediaPreview type={media.type} url={media.url} /> : null }
    <p className="my-2">{comment}</p>
    { url ? <LinkPreview url={url} /> : null}
</div>;
