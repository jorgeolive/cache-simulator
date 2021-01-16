
import { CacheLine } from './CacheLine';
import { Snapshot } from './Snapshot';


export class Cache {
    constructor() {
        this.numberOfLines = 0;
        this.wordsPerLine = 0;
        this.policy = "";
        this.replacementPolicy = "";
        this.snapshots = [];
        this.initialized = false;
        this.lineWriteSequence = [];
        this.lineReadSequence = [];
    }

    deepClone = () => {
        const cache = new Cache();
        cache.numberOfLines = this.numberOfLines;
        cache.wordsPerLine = this.wordsPerLine;
        cache.policy = this.policy;
        cache.replacementPolicy = this.replacementPolicy;
        cache.snapshots = this.snapshots.map(x => ({ ...x, snapshot: x.snapshot.clone() }));
        cache.initialized = this.initialized;
        cache.lineReadSequence = this.lineReadSequence;
        cache.lineWriteSequence = this.lineWriteSequence;

        return cache;
    }

    setNumberOfLines = (number) => {
        this.numberOfLines = number;
        this.initialize();
        return this;
    }

    setWordsPerLine = (number) => {
        this.wordsPerLine = number;
        this.initialize();
        return this;
    }

    setPolicy = (policy) => {
        this.policy = policy;
        this.initialize();
        return this;
    }

    setReplacementPolicy = (policy) => {
        this.replacementPolicy = policy;
        this.initialize();
        return this;
    }

    resetSnapshots = () => {
        this.initialize();
        return this;
    }

    initialize = () => {
        this.snapshots = [{ snapshot: Snapshot.createEmpty(this), hitAddress: null }];
        this.initialized = true;
        this.lineReadSequence = [];
        for(let index = 0; index < this.numberOfLines; index++){
            this.lineReadSequence.push(index);
        }
    }

    isConfigured = () => this.numberOfLines !== undefined && this.wordsPerLine !== undefined && this.policy !== undefined;

    registerRead(address) {
        if (this.snapshots[this.snapshots.length - 1].snapshot.hasAddress(Number.parseInt(address))) {

            
                const lastSnapshotCloned = this.snapshots[this.snapshots.length - 1].snapshot.clone();
                Array.from(lastSnapshotCloned.lineMap.values()).filter(x => x != null).forEach(x => { x.isHit = false; x.isSuccess = false; });
    
                const clonedHitLine = lastSnapshotCloned.getCacheLineByAddress(Number.parseInt(address)).clone();
                clonedHitLine.isHit = true;
                clonedHitLine.isSuccess = true;
    
                lastSnapshotCloned.replaceLine(clonedHitLine);
    
                this.snapshots.push({ snapshot: lastSnapshotCloned, hitAddress: address, isSuccess: true });

                if(this.policy === 'Fully associative' && this.replacementPolicy === 'Least recently used') {
                    const index = this.lineReadSequence.indexOf(clonedHitLine.line);
                    if (index > -1) {
                        this.lineReadSequence.splice(index, 1);
                    }          
                    this.lineReadSequence.push(clonedHitLine.line);
                }

        } else {

            switch (this.policy) {
                case "Direct-mapped":

                    var newLine = new CacheLine(
                        Math.floor(address / this.wordsPerLine), Math.floor(address / this.wordsPerLine) % this.numberOfLines,
                        Math.floor(Math.floor(address / this.wordsPerLine) / this.numberOfLines),
                        Math.floor(address / this.wordsPerLine) * this.wordsPerLine,
                        Math.floor(address / this.wordsPerLine) * this.wordsPerLine + this.wordsPerLine - 1,
                        true, false);

                    const lastSnapshotCloned = this.snapshots[this.snapshots.length - 1].snapshot.clone();
                    Array.from(lastSnapshotCloned.lineMap.values()).filter(x => x !== undefined).forEach(x => { x.isHit = false; x.isSuccess = false; });

                    lastSnapshotCloned.replaceLine(newLine);
                    this.snapshots.push({ snapshot: lastSnapshotCloned, hitAddress: address, isSuccess: false });

                    break;

                case 'Fully associative':
                    if (this.replacementPolicy == 'FIFO') {

                        const lastSnapshotCloned = this.snapshots[this.snapshots.length - 1].snapshot.clone();
                        console.log("not found. procesing adr ", address);
                        console.log('this.lineWriteSequence[this.lineWriteSequence.length -1] ', this.lineWriteSequence[this.lineWriteSequence.length -1]);
                        console.log('lastSnapshotCloned.hasAnyEmptyLine() ',lastSnapshotCloned.hasAnyEmptyLine());

                        const lineNumber = lastSnapshotCloned.hasAnyEmptyLine() ? lastSnapshotCloned.getFirstEmptyLineNumber() : this.lineWriteSequence.shift();
                        console.log('lineNumber ',lineNumber);
                        var newLine = new CacheLine(
                            Math.floor(address / this.wordsPerLine), lineNumber,Math.floor(address / this.wordsPerLine) % this.numberOfLines,
                            
                            Math.floor(address / this.wordsPerLine) * this.wordsPerLine,
                            Math.floor(address / this.wordsPerLine) * this.wordsPerLine + this.wordsPerLine - 1,
                            true, false);

                        Array.from(lastSnapshotCloned.lineMap.values()).filter(x => x !== undefined).forEach(x => { x.isHit = false; x.isSuccess = false; });
                        lastSnapshotCloned.replaceLine(newLine);
                        this.snapshots.push({ snapshot: lastSnapshotCloned, hitAddress: address, isSuccess: false });

                        this.lineWriteSequence.push(lineNumber);

                        return;
                    }

                    if (this.replacementPolicy == 'Least recently used') {

                        const lastSnapshotCloned = this.snapshots[this.snapshots.length - 1].snapshot.clone();
                        const lineNumber = lastSnapshotCloned.hasAnyEmptyLine() ? lastSnapshotCloned.getFirstEmptyLineNumber() : this.lineReadSequence.shift();

                        var newLine = new CacheLine(
                            Math.floor(address / this.wordsPerLine), 
                            lineNumber ,Math.floor(address / this.wordsPerLine) % this.numberOfLines,
                            Math.floor(address / this.wordsPerLine) * this.wordsPerLine,
                            Math.floor(address / this.wordsPerLine) * this.wordsPerLine + this.wordsPerLine - 1,
                            true, false);

                        Array.from(lastSnapshotCloned.lineMap.values()).filter(x => x !== undefined).forEach(x => { x.isHit = false; x.isSuccess = false; });
                        lastSnapshotCloned.replaceLine(newLine);
                        this.snapshots.push({ snapshot: lastSnapshotCloned, hitAddress: address, isSuccess: false });

                        this.lineReadSequence.push(lineNumber);

                        return;
                    }

                default: return;
            }
        }
    }

    getStats = (successReadTime, failureReadTime) => {

        if (this.snapshots.length > 1) {
            if (successReadTime == undefined || failureReadTime == undefined) {
                return;
            }

            let avgAccessTime = 0;
            this.snapshots.forEach((x, index) => {
                if (index !== 0) {
                    x.isSuccess
                        ? avgAccessTime += successReadTime
                        : avgAccessTime += failureReadTime;
                }
            });

            return `Average access time: ${(avgAccessTime / (this.snapshots.length - 1))} SuccessRate: ${this.getSuccessRate()}`
        }
        return;
    }

    getSuccessRate() {
        let failures = 0;
        let rate = 0;

        if (this.snapshots.length > 0) {
            this.snapshots.forEach((x, index) => {
                if (!x.isSuccess && index !== 0) {
                    failures++;
                }
            });

            rate = (this.snapshots.length - 1 - failures) / (this.snapshots.length - 1);
        }

        return rate;
    }
}
