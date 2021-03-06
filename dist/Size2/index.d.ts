export declare type ScaleMode = "flexible" | "expand" | "shrink";
export declare type ScaleFit = "cover" | "contain";
export interface ScaledSize2 {
    size: Size2;
    scale: number;
}
export declare class Size2 {
    protected _width: number;
    protected _height: number;
    static givenWidthHeight(width: number, height: number): Size2;
    static ofZero(): Size2;
    static isEqual(a: Size2, b: Size2): boolean;
    protected _half: Size2;
    protected constructor(width: number, height: number);
    get width(): number;
    get height(): number;
    get isZero(): boolean;
    toHalf(): Size2;
    isEqual(other: Size2): boolean;
    toScale(availableSize: Size2, scaleMode: ScaleMode, scaleFit?: ScaleFit): number;
    toScaledSize(availableSize: Size2, scaleMode: ScaleMode, scaleFit?: ScaleFit): ScaledSize2;
    withAddedSize(other: Size2): Size2;
    withSubtractedSize(other: Size2): Size2;
    withScale(scale: number): Size2;
}
