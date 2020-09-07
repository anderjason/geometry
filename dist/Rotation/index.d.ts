export declare class Rotation {
    static ofZero(): Rotation;
    static ofFull(): Rotation;
    static givenRadians(radians: number): Rotation;
    static givenDegrees(degrees: number): Rotation;
    private _radians;
    private constructor();
    get isZero(): boolean;
    toRadians(): number;
    toDegrees(): number;
}
