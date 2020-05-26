import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {Toggler} from "../../../ui";

export default ({ value, options, isEditing, onChange }) => {
    const [quizMode, setQuizMode] = useState(value ? !!value : false);

    useEffect(() => {
        if(quizMode === false) onChange(null);
        else onChange(value ? value : options[0].id);
    }, [quizMode]);

    const getValues = () => {
        const selOptions =[];
        options.forEach(i => {
            selOptions.push({
                value: i['id'],
                label: i['name']
            });
        });
        return selOptions
    };

    const getAnswer = () => options && options.filter(i => i.id === value)[0];

    const renderEditor = () => {
        const ans = getAnswer();
        const val = ans ? { value: ans['id'], label: ans['name'] } : {};
        return options && options.length > 1 ?
            <div className="bg-white rounded p-2 mb-2">
                <Toggler
                    small
                    text="Quiz Mode"
                    state={quizMode}
                    onChange={setQuizMode}
                />
                {
                    quizMode &&
                    <React.Fragment>
                        <div className="small px-1 mb-1">Correct Option</div>
                        <Select
                            options={getValues()}
                            defaultValue={val}
                            onChange={(data) => { onChange(data.value) }}
                        />
                    </React.Fragment>
                }
            </div> : null
    };

    const renderAnswer = () => {
        const ans = getAnswer();
        return ans ?
            <div className="text-light mb-2 px-2">
                <b>Answer</b>: {ans.name}
            </div> : null;
    };

    return isEditing ? renderEditor() : renderAnswer();

}