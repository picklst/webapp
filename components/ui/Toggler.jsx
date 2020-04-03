import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';
import Switch from "react-switch";


const Toggler = ({
    text, state: st = false,
    onChange, small = false,
    className: classes
}) => {
    const id = shortid.generate();
    const [state, setState] = useState(st);

    const handleChange = (s) =>
    {
        setState(s);
        if(typeof  onChange === "function")
            onChange(s);
    };

    return <div className={classNames("d-flex align-items-center", classes)}>
        <div style={{ width: '80%' }}>
            <label htmlFor={id}>{text}</label>
        </div>
        <div style={{ width: '20%' }} className="d-flex justify-content-end">
            <Switch
                onChange={handleChange}
                checked={state}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={small ? 20 : 30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={small ? 16 : 20}
                width={small ? 32 : 48}
                id={id}
            />
        </div>
    </div>
};

Toggler.propTypes = {
  text: PropTypes.node,
  state: PropTypes.bool,
  small: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default Toggler;