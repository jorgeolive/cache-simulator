


export class CacheLine {

    constructor(block, line, label, addressRangeLow, addressRangeHigh, isHit, isSuccess) {
        this.label = label;
        this.block = block;
        this.line = line;
        this.addressRangeLow = addressRangeLow;
        this.addressRangeHigh = addressRangeHigh;
        this.isHit = isHit ?? false;
        this.isSuccess = isSuccess;
    }  

    containsAddress = (address) => address >= this.addressRangeLow && address <= this.addressRangeHigh; 


    clone = () => new CacheLine(this.block, this.line, this.label, this.addressRangeLow, this.addressRangeHigh, this.isHit,this.isSuccess);
}