import { Size2 } from "../Size2";
export declare class MutableSize2 extends Size2 {
    static givenWidthHeight(width: number, height: number): MutableSize2;
    static givenSize2(size: Size2): MutableSize2;
    static ofZero(): MutableSize2;
    private constructor();
    get width(): number;
    get height(): number;
    set width(value: number);
    set height(value: number);
    toClone(): MutableSize2;
}
