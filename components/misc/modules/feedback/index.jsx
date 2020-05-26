import React, {useState} from 'react';
import shortid from "shortid";
import {Button, TextInput} from "../../../ui";

export default ({ onComplete }) => {

    const types = [
        {
            "value": "bug",
            "label": "Something went wrong",
            "description": "Let us know about a broken feature.",
            "selectionMessage": "We are sorry for what has happened. Please type in as much info and report it to us, so that we can fix it soon."
        },
        {
            "value": "request",
            "label": "Share Ideas & Request Features",
            "description": "Let us know if you have ideas that can make Picklst better.",
            "selectionMessage": "We are delighted that you also are also thinking of improving Picklst, just like we do. We would love to hear you out, and we will work on all that's possible!"
        },
        {
            "value": "feedback",
            "label": "Help us improve Picklst",
            "description": "Give feedback about your Picklst experience.",
            "selectionMessage": "We respect the time & effort you are taking to write in your valuable feedback about your experience here on Picklst. Your feedback definitely contributes to the future of this platform."
        },
    ];

    const [type, setType] = useState(false);
    const [typeSelected, setTypeSelected] = useState(false);
    const renderTypeSelector = () =>
    <div className="p-3">
        <div style={{ paddingBottom: '10vh' }} className="w-100">
            <h6 className="mb-3 text-primary">What kind of feedback would you like to give us today?</h6>
            {
                types.map(c =>
                    <div key={shortid.generate()} className="form-check my-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="feedback_type_selector"
                            id={`feedback_type_${c.value}`}
                            value={c.value}
                            checked={c.value === type}
                            onChange={() => setType(c.value)}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={`report_cat_${c.value}`}
                        >
                            <div className="font-weight-bold line-height-1 mb-2">{c.label}</div>
                            <div className="text-secondary small line-height-1">{c.description}</div>
                        </label>
                    </div>
                )
            }
            {
                type ?
                    <Button
                        onClick={() => setTypeSelected(true)}
                        text="Continue"
                        brandAccent
                        className="mt-2 mb-4"
                    /> : null
            }
        </div>
    </div>;


    const getText = () => {
        let text = ``;
        types.forEach((i) => {
            if(i.value === type)
                text = i['selectionMessage'];
        });
        return text
    };

    const [feedback, setFeedback] = useState('');
    const renderFeedbackForm = () =>
    <div className="p-3">
        <p>{getText()}</p>
        <TextInput
            label="Your Feedback"
            name="feedback_message"
            type="textarea"
            placeholder="Please include as much info as possible..."
            errorText="Please type down something so that we can take actions."
            onChange={setFeedback}
            value={feedback}
            alwaysShowLabel
            minimal
            showLimit={false}
            charLimit={500}
            isRequired
        />
        {
            feedback.length > 0 ?
            <Button
                text="Submit Feedback"
                className="orange-button my-2"
            /> : null
        }
    </div>;

    return <div className="d-flex align-items-center h-100">
    {
        !typeSelected ? renderTypeSelector() : renderFeedbackForm()
    }
    </div>;

}