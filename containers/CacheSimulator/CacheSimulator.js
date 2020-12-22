import React, { useState } from 'react';
import Configuration from '../../components/Configuration/Configuration';
import InitialCacheConfiguration from '../../components/InitialCacheConfiguration/InitialCacheConfiguration';
import ReadSequence from '../../components/ReadSequence/ReadSequence';
import { Snapshot } from '../../models/Snapshot';
import { Cache } from '../../models/Cache';
import { CacheLine } from '../../models/CacheLine';
import SnapshotCarousel from '../../components/SnapshotCarousel/SnapshotCarousel';
import styles from './CacheSimulator.module.css';
import InfoModal from '../../components/InfoModal/InfoModal';

const CacheSimulator = (props) => {

    const [configuration, updateConfiguration] = useState(
        {
            cache: new Cache(),
            successAccessTime: null,
            failureAccessTime: null,
            currentLineNumber: 0,
            currentBlockNumber: 0,
            currentLabelNumber: 0,
            accessSequence: []
        });

    const isDirectMapped = () => configuration.cache.policy === "Direct-mapped";
    const isAssociative = () => configuration.cache.policy === "Fully associative";

    const onAddInitialCacheLineHandler = () => {

        console.log(configuration.cache.policy);
        
        if (!configuration.cache.initialized) {
            configuration.cache.initialize();
            configuration.cache.snapshots = [{ snapshot: Snapshot.createEmpty(configuration.cache), hitAddress: null }];
        }

        const cache = configuration.cache;
            const wordsPerLine = cache.wordsPerLine;
            const totalCacheLines = cache.numberOfLines;

        if (isDirectMapped()) {

            const cacheTarget = new CacheLine(configuration.currentBlockNumber, configuration.currentBlockNumber % totalCacheLines, Math.floor(configuration.currentBlockNumber / totalCacheLines), configuration.currentBlockNumber * wordsPerLine, configuration.currentBlockNumber * wordsPerLine + wordsPerLine - 1, false);
            configuration.cache.snapshots[0].snapshot.replaceLine(cacheTarget);

        } else if( isAssociative()) {
            const cacheTarget = new CacheLine(configuration.currentBlockNumber, configuration.currentLineNumber, Math.floor(configuration.currentBlockNumber / totalCacheLines), configuration.currentBlockNumber * wordsPerLine, configuration.currentBlockNumber * wordsPerLine + wordsPerLine - 1, false);
            configuration.cache.snapshots[0].snapshot.replaceLine(cacheTarget);    
        }

        updateConfiguration(oldState => ({ ...oldState, cache: cache.deepClone() }));

    }

    const onResetHandler = () => updateConfiguration(oldState => ({ ...oldState, cache: oldState.cache.resetSnapshots(), accessSequence: [] }));
    const onRunHandler = () => { execute(); }

    const onUpdateBlockNumber = (event) => updateConfiguration(oldState => ({ ...oldState, currentBlockNumber: event.target.valueAsNumber }));
    const onUpdateCacheLine = (event) => updateConfiguration(oldState => ({ ...oldState, currentLineNumber: event.target.valueAsNumber }));
    const onAddSequenceValue = (value) => updateConfiguration(oldState => ({ ...oldState, accessSequence: [...oldState.accessSequence, value] }));

    const policyChangeHandler = (event) => updateConfiguration(oldState => ({ ...oldState, cache: oldState.cache.setPolicy(event.target.value) }));
    const replacementPolicyHandler = (event) => updateConfiguration(oldState => ({ ...oldState, cache: oldState.cache.setReplacementPolicy(event.target.value) }));
    const onUpdateNumberOfLinesHandler = (event) => updateConfiguration(oldState => ({ ...oldState, cache: oldState.cache.setNumberOfLines(Number.parseInt(event.target.value)) }));
    const onUpdateWordsPerLineHandler = (event) => updateConfiguration(oldState => ({ ...oldState, cache: oldState.cache.setWordsPerLine(Number.parseInt(event.target.value)) }));

    const onSuccessTimeUpdateHandler = (event) => updateConfiguration(oldState => ({ ...oldState, successAccessTime: event.target.valueAsNumber }));
    const onFailureTimeUpdateHandler = (event) => updateConfiguration(oldState => ({ ...oldState, failureAccessTime: event.target.valueAsNumber }));

    const execute = () => {
        configuration.accessSequence.forEach(x => configuration.cache.registerRead(x));
        updateConfiguration(oldState => ({ ...oldState, cache: configuration.cache.deepClone() }));
    }

    return (
        <React.Fragment>
            <div className={styles.container}>
                <Configuration policyChangeHandler={policyChangeHandler} replacementPolicyHandler={replacementPolicyHandler}
                    onUpdateNumberOfLinesHandler={onUpdateNumberOfLinesHandler} onUpdateWordsPerLineHandler={onUpdateWordsPerLineHandler}
                    onSuccessTimeUpdateHandler={onSuccessTimeUpdateHandler} onFailureTimeUpdateHandler={onFailureTimeUpdateHandler} isDirectMapped={isDirectMapped()}>
                    <ReadSequence onAddSequenceValue={onAddSequenceValue} sequence={configuration.accessSequence} onResetSequenceHandler={onResetHandler}></ReadSequence>
                </Configuration>
                {configuration.cache.isConfigured ?
                    <InitialCacheConfiguration
                        onResetHandler={onResetHandler} onAddLineHandler={onAddInitialCacheLineHandler} onUpdateBlockNumber={onUpdateBlockNumber} onUpdateCacheLine={onUpdateCacheLine}
                        isDirectMapped={isDirectMapped()} lines={configuration.cache.snapshots[0] != null ? configuration.cache.snapshots[0].snapshot.lineMap : new Map()} totalLines={configuration.cache.numberOfLines} wordsPerLine={configuration.cache.wordsPerLine} configuration={configuration}>
                    </InitialCacheConfiguration>
                    : null
                }

            </div>
            <div className={styles.container_row}>
                <SnapshotCarousel onRunHandler={onRunHandler} cache={configuration.cache} successTime={configuration.successAccessTime} failureTime={configuration.failureAccessTime}></SnapshotCarousel>
            </div>
        </React.Fragment>
    );
}

export default CacheSimulator;