import React from 'react';
import shortid from 'shortid';


const SuggestionSelector = ({ options, focused, onSelect, valueField }) => {

    const renderSuggestionSelector = i =>
    <div onClick={() => onSelect(i[valueField])}>
        <div className="d-flex p-2">
            <div className="d-none d-sm-block" style={{ width: '4rem' }}>

            </div>
            <div style={{ width: 'auto' }}>
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
    </div>;

    return <div>
        <div
            className="d-none d-sm-block suggestion-list-wrapper bg-dark"
            role="listbox"
            tabIndex="0"
            aria-activedescendant={options[focused] ? options[focused].value : null}
        >
            { options && options.length > 0 ?
                options.map((i, index) =>
                    <div
                        key={shortid.generate()}
                        role="option"
                        className={focused === index ? 'focused' : null}
                        aria-selected={focused === index}
                    >
                        {renderSuggestionSelector(i)}
                    </div>
                ) : <div>No results</div>
            }
        </div>
        <div
            className="d-flex d-sm-none bg-dark p-1 position-fixed fixed-bottom suggestion-list-wrapper-mobile"
            style={{ zIndex: "6000" }}
            role="listbox"
            tabIndex="0"
            aria-activedescendant={options[focused].value}
        >
            { options && options.length > 0 ?
                options.map((i, index) =>
                    <div
                        key={shortid.generate()}
                        role="option"
                        className={focused === index ? 'focused' : null}
                        aria-selected={focused === index}
                    >
                        {renderSuggestionSelector(i)}
                    </div>
                ) : <div>No results</div>
            }
        </div>
    </div>;
};

export default SuggestionSelector;