import { Point2 } from "../Point2";
export declare class MutablePoint2 extends Point2 {
    static givenXY(x: number, y: number): MutablePoint2;
    static givenPoint2(point: Point2): MutablePoint2;
    static ofZero(): MutablePoint2;
    private constructor();
    get x(): number;
    get y(): number;
    set x(value: number);
    set y(value: number);
    toClone(): MutablePoint2;
}
