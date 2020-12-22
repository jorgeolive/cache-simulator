
import {CacheLine} from './CacheLine';
import {Cache} from './Cache';

export class Snapshot {

    constructor(cache) {
        this.cache = cache;
        this.lineMap = new Map(); // Map<CacheLine>
    }
   
    numberOfLines = () => this.lineMap.keys().length; 

    hasAnyEmptyLine = () => [...this.lineMap.keys()].some(x => this.lineMap.get(x) == null);

    getFirstEmptyLineNumber = () => {
        if(this.hasAnyEmptyLine())
         return [...this.lineMap.keys()].find(x => this.lineMap.get(x) == null);

        throw Error("Cache has no empty line");
    }

    getLine = (lineNumber) => this.lineMap.get(lineNumber);
    hasAddress = (addr) => {
         const result = Array.from(this.lineMap.values()).filter(x => x != null).find(x => x.addressRangeHigh >= addr && x.addressRangeLow <= addr);
         return result != null;
        };

    getCacheLineByAddress = (addr) => Array.from(this.lineMap.values()).filter(x => x !== undefined).find(x => x.addressRangeHigh >= addr && x.addressRangeLow <= addr);

    clone = () => {
        const map = new Map();
        Array.from(this.lineMap.keys()).forEach(x => { map.set(x, this.lineMap.get(x)?.clone()); });
        const newSnapshot = new Snapshot(this.cache);
        newSnapshot.lineMap = map;
        return newSnapshot;
    }

    replaceLine = (cacheLine) => {
        Array.from(this.lineMap.keys()).forEach(x => {
            if (cacheLine.line === x) {
                this.lineMap.set(x, cacheLine.clone());
            }
        });
    }

    addEmptyLine = (number) => {
        this.lineMap.set(number, null);
    }

    addLine = (cacheLine) => {
        if (this.numberOfLines <= cacheLine.line) {
            throw Error("cacheLine is greater than the cache size");
        }
        //TODO VALIDAR TAMB width de palabras

        if (this.lineMap.has(cacheLine.line)) {
            this.lineMap.delete(cacheLine.line);
        }

        this.lineMap.set(cacheLine.id, cacheLine.clone());
    }

    static createEmpty = (cache) => {
        const snapshot = new Snapshot(cache);

        for(let i= 0; i<cache.numberOfLines; i++){
            snapshot.addEmptyLine(i);
        }

        return snapshot;
    }
}

