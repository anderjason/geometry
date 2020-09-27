export declare class Rotation {
    static givenRadians(radians: number): Rotation;
    static givenDegrees(degrees: number): Rotation;
    static isEqual(a: Rotation, b: Rotation): boolean;
    readonly radians: number;
    private constructor();
    isEqual(other: Rotation): boolean;
    toDegrees(): number;
}
