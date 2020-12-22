import React from 'react';
import styles from './Configuration.module.css';
import Policy from '../Policy/Policy';
import ReplacementPolicy from '../ReplacementPolicy/ReplacementPolicy';
import PickList from '../../shared/Picklist/Picklist';
import InfoModal from '../InfoModal/InfoModal';

const Configuration = (props) => {

    return (
        <div className={styles.wholeSection}>
            <h2 className={"title is-4"}>Cache configuration</h2>
            <span>Configure the cache. Note that if "Associativity" is not of direct type, a replacement policy has to be set.</span>
            <div className={styles.container}>
                <div className={styles.configSection}>
                    <div>
                        <PickList name="nº of lines" options={[1, 2, 3, 4, 5, 6, 7, 8]}
                            onChangeHandler={props.onUpdateNumberOfLinesHandler}></PickList>
                    </div>
                    <div>
                        <PickList name="Words per line" options={[1, 2, 4, 8, 16]}
                            onChangeHandler={props.onUpdateWordsPerLineHandler}></PickList>
                    </div>
                </div>
                <div className={styles.configSection}>
                    <div>
                        <div style={{ margin: "10px" }}><b>Success access time</b></div>
                        <input style={{ margin: "10px" }} type={"number"} value={props.successAccessTime}
                            onChange={props.onSuccessTimeUpdateHandler}></input>
                    </div>
                    <div>
                        <div style={{ margin: "10px" }}><b>Failure access time</b></div>
                        <input style={{ margin: "10px" }} type={"number"} value={props.failureAccessTime}
                            onChange={props.onFailureTimeUpdateHandler}></input>
                    </div>
                </div>
                <div className={styles.configSectionRow}>
                    <Policy policyOptionHandler={props.policyChangeHandler} value={props.policy}></Policy>
                    {!props.isDirectMapped ?
                        <ReplacementPolicy replacementPolicyHandler={props.replacementPolicyHandler} value={props.replacementPolicy}></ReplacementPolicy> :
                        null
                    }
                </div>
                
            </div>
            {props.children}
        </div>
    );
}

export default Configuration;