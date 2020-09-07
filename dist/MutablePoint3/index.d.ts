import { Point3 } from "../Point3";
export declare class MutablePoint3 extends Point3 {
    static givenXYZ(x: number, y: number, z: number): MutablePoint3;
    static givenPoint3(point: Point3): MutablePoint3;
    static ofZero(): MutablePoint3;
    private constructor();
    get x(): number;
    get y(): number;
    get z(): number;
    set x(value: number);
    set y(value: number);
    set z(value: number);
    toClone(): MutablePoint3;
    isEqual(other: MutablePoint3): boolean;
}
