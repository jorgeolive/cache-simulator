import React from 'react';
import styles from './picklist.module.css';

const pickList = (props) => {
    return (
        <div>
            <div className={styles.border}>
                <label>{props.name}</label>
            </div>
            <div className={styles.border}>
                <select name={props.name} id={props.name} onChange={props.onChangeHandler} value={props.value} >
                    {props.options.map(x => <option value={x}>{x}</option>)}
                </select>
            </div>
        </div>);
};

export default pickList;