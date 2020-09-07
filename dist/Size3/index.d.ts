import { ScaleMode } from "../Size2";
export declare class Size3 {
    static givenWidthHeightDepth(width: number, height: number, depth: number): Size3;
    static ofZero(): Size3;
    static isEqual(a: Size3, b: Size3): boolean;
    protected _width: number;
    protected _height: number;
    protected _depth: number;
    protected _half: Size3;
    protected constructor(width: number, height: number, depth: number);
    get width(): number;
    get height(): number;
    get depth(): number;
    get isZero(): boolean;
    toClone(): Size3;
    toHalf(): Size3;
    isEqual(other: Size3): boolean;
    withAvailableSize(availableSize: Size3, scaleMode: ScaleMode): Size3;
    withAddedWidthHeightDepth(width: number, height: number, depth: number): Size3;
    withAddedSize(other: Size3): Size3;
}
