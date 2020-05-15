export class Mask {
    public name: string;
    public numberWash: number;
    public maxWashingMask: number;
    public isOver: boolean;

    constructor(name?: string, numberWash?: number, maxWashingMask?: number, isOver?: boolean) {
        this.name = name;
        this.numberWash = numberWash;
        this.maxWashingMask = maxWashingMask;
        this.isOver = isOver;
    }
}
