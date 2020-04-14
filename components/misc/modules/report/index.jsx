import React, {useState} from 'react';
import styled from 'styled-components';
import Button from "../../../ui/Button";
import TextInput from "../../../forms/TextInput";

export default ({ slug, username, onComplete }) => {

    const [reason, setReason] = useState(false);
    const [reasonSelected, setReasonSelected] = useState(false);

    const [remark, setRemark] = useState('');
    const [isSubmitted, setSubmitted] = useState(false);

    const categories = [
        {
            "value": "humiliation",
            "label": "It humiliates me, someone I know or entity I represent",
            "examples": "altered images, degrading or mocking comments"
        },
        {
            "value": "hurts_interests_beliefs",
            "label": "It goes against my views",
            "examples": "makes fun or shares misinformation on my personal values, religion, politics or other beliefs"
        },
        {
            "value": "fake_deceit_hoax",
            "label": "It's fake, deceitful or hoax",
            "examples": "fake or deceitful news, a hoax disapproved by a reputable source"
        },
        {
            "value": "copyright",
            "label": "It infringes the copyright(s) I or entity I represent own",
            "examples": "usage of image, video, or other intellectual property without permission"
        },
        {
            "value": "violence_abuse",
            "label": "It advocates violence or abuse",
            "examples": "graphic injury, self-inflicted harm, animal abuse or torture, suicidal texts"
        },
        {
            "value": "explicit",
            "label": "It's Sexually Explicit",
            "examples": "nudity, sexual acts, people soliciting sex"
        },
        {
            "value": "other",
            "label": "I don't think it should be on Picklst",
        },
    ];

    const renderReasonSelector = () =>
    <div style={{ paddingBottom: '10vh' }} className="w-100">
        <h5 className="mb-3">What's wrong with this?</h5>
        {
            categories.map(c =>
                <div className="form-check my-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="report_cat_selector"
                        id={`report_cat_${c.value}`}
                        value={c.value}
                        checked={c.value === reason}
                        onChange={() => setReason(c.value)}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={`report_cat_${c.value}`}
                    >
                        <div className="font-weight-bold line-height-1 mb-2">{c.label}</div>
                        <div className="text-secondary small line-height-1">Examples: {c.examples}</div>
                    </label>
                </div>
            )
        }
        {
            reason ?
                <Button
                    onClick={() => setReasonSelected(true)}
                    text="Continue"
                    className="blue-button mt-2 mb-4"
                /> : null
        }
    </div>;

    const renderRemarksForm = () =>
    <div className="w-100">
        <h5 className="mb-2">Why did you feel so? <div className="small">(Optional)</div></h5>
        <TextInput
            label="Your Remarks"
            name="report_remark"
            type="textarea"
            placeholder="Enter your remarks, you may freely include links to websites or images etc."
            onChange={setRemark}
            value={remark}
            minimal
            charLimit={500}
            showLimit
        />
        <Button
            onClick={() => setSubmitted(true)}
            text="Submit Report"
            className="orange-button my-2"
        />
    </div>;

    const renderSubmittedReport = () =>
    <div className="text-center w-100 py-4">
        <h2>Reported</h2>
        <h5 className="mx-3">Thanks for reporting this to us!</h5>
        <p className="small mb-2">
            We take your report seriously, and we shall review it and take appropriate action shortly.
            Once we have reviewed, you will receive a notification on the same.
            Together with you, we work towards making Picklst a safe, respecting, and
            productive community for everyone.
        </p>
        <Button
            onClick={onComplete}
            text="Take Me Back"
            className="grey-button mt-2"
        />
    </div>;

    return <div className="d-flex align-items-center h-100">
    {
        !reason || !reasonSelected ?
            renderReasonSelector()
        : !isSubmitted ?
            renderRemarksForm()
        : renderSubmittedReport()
    }
    </div>

};