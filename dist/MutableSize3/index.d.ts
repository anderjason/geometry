import { Size3 } from "../Size3";
export declare class MutableSize3 extends Size3 {
    static givenWidthHeightDepth(width: number, height: number, depth: number): MutableSize3;
    static givenSize3(size: Size3): MutableSize3;
    static ofZero(): MutableSize3;
    private constructor();
    get width(): number;
    get height(): number;
    get depth(): number;
    set width(value: number);
    set height(value: number);
    set depth(value: number);
    toClone(): MutableSize3;
}
