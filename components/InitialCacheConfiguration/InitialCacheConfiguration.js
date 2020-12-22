import React from 'react';
import CacheSnapshot from '../CacheSnapshot/CacheSnapshot';
import styles from './InitialCacheConfiguration.module.css';


const InitialCacheConfiguration = (props) => {

    return (

        <div className={styles.container}>
            <div className={styles.wholeSection}>
                <h2 className={"title is-5"}>Initial cache state</h2>
                <span>If the cache already has a content, add it here.</span>
                <div className={styles.container}>

                    <div className={styles.configSection}>
                        <div><b>Block nº</b></div>
                        <input type={"number"} value={props.currentBlockNumber}
                            onChange={props.onUpdateBlockNumber}></input>
                    </div>
                    {!props.isDirectMapped ?
                        <div className={styles.configSection}>
                            <div><b>Cache line nº</b></div>
                            <input type={"number"} value={props.currentLineNumber}
                                onChange={props.onUpdateCacheLine}></input>
                        </div> :
                        null
                    }
                </div>
                <div className={styles.configSectionRow + " buttons"}>
                    <div className={styles.buttonMargin}>
                        <button className={"button is-primary"} onClick={props.onAddLineHandler}>Upsert Line</button>
                    </div>
                    <div className={styles.buttonMargin}>
                        <button className={"button is-primary"} onClick={props.onResetHandler}>Reset</button>
                    </div>
                </div>
                <div className={styles.initialCacheWrapper}>
                    {
                        Array.from(props.lines.keys()).length > 0 ?
                            <CacheSnapshot isInitialState={true} wordsPerLine={props.wordsPerLine} totalLines={props.totalLines} lines={props.lines}></CacheSnapshot>
                            : null
                    }
                </div>
            </div>

        </div>
    );

}

export default InitialCacheConfiguration;