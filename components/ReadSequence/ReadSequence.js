import React, { useState } from 'react';
import styles from './ReadSequence.module.css';
const ReadSequence = (props) => {

    const [currentValue, updateValue] = useState(null);

    return (
        <div>
            <h2 className={"title is-4"}>Memory read sequence</h2>
                <span>Configure the access to memory.</span>
            <div className={styles.container}>
                <div style={{ margin: "10px" }}><b>Memory address to read</b></div>
                <div style={{ margin: "10px" }}>
                    <input style={{ margin: "10px" }} type={"number"} value={currentValue}
                        onChange={(event) => { updateValue(event.target.value) }}>
                    </input>
                </div>
                <div className={styles.buttonMargin}>
                    <button className={"button is-primary"} onClick={() => props.onAddSequenceValue(currentValue)}>Add</button>
                </div>
                <div className={styles.buttonMargin}>
                    <button className={"button is-primary"} onClick={props.onResetSequenceHandler}>Reset</button>
                </div>
            </div>
            <div className={styles.container + " " + styles.sequenceSection}>
                {props.sequence.map(x => <b>{x} ,</b>)}
            </div>
        </div>);
}

export default ReadSequence; 