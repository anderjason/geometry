export declare class Rotation {
    private static _zero;
    static ofZero(): Rotation;
    static givenRadians(radians: number): Rotation;
    static givenDegrees(degrees: number): Rotation;
    static isEqual(a: Rotation, b: Rotation): boolean;
    readonly radians: number;
    private constructor();
    get isZero(): boolean;
    isEqual(other: Rotation): boolean;
    toDegrees(): number;
}
