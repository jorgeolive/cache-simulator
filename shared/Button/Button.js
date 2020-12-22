import React from 'react';

const button = (props) => (
    <button onClick={props.onClickHandler} disabled={props.isDisabled} >
        {props.text}
    </button>);

export default button;