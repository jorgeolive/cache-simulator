import React from 'react';
import CacheSnapshot from '../CacheSnapshot/CacheSnapshot';
import styles from './SnapshotCarousel.module.css';

const SnapshotCarousel = (props) => {
    return (
        <div>
            {props.cache.snapshots.length > 1 ?  
            <div className={styles.container_row}>
                <h4 className={styles.sequenceSection}>{props.cache.getStats(props.successTime, props.failureTime)}</h4>
            </div> : null
            }
            <button className={"button is-primary " + styles.buttonMargin} onClick={props.onRunHandler}>Simulate</button>
            <div className={styles.container_row}></div>
            <div className={styles.container_row}>
                {props.cache.snapshots.map(x => {
                    return <div className={styles.sequenceSection}>
                        <div className={styles.snapshotHeader}><b>{x.hitAddress == undefined ? "Initial state" : "Address #" + x.hitAddress}</b></div>
                        <CacheSnapshot lines={x.snapshot.lineMap} totalLines={props.cache.numberOfLines}></CacheSnapshot>
                    </div>
                })}
            </div>
        </div>
    );
}

export default SnapshotCarousel;