"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ray2 = void 0;
const Segment2_1 = require("../Segment2");
class Ray2 {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction.withNormalizedMagnitude();
    }
    toSegmentGivenBoundingBox(box) {
        // TODO need a different technique to support really large or distant bounding boxes
        const largeSegment = Segment2_1.Segment2.givenPoints(this.origin, this.origin.withAddedVector(this.direction.withMultipliedScalar(1000000)));
        const clipped = largeSegment.withClippingBox(box);
        return clipped;
    }
    toDistanceGivenBox(box) {
        if (box.isPointInside(this.origin)) {
            return 0;
        }
        // Based on code from https://github.com/stackgl/ray-aabb-intersection
        // TODO cleanup
        const dims = 2;
        let lo = -Infinity;
        let hi = +Infinity;
        const aabb = [
            [box.toLeft(), box.toTop()],
            [box.toRight(), box.toBottom()],
        ];
        const ro = [this.origin.x, this.origin.y];
        const rd = [this.direction.x, this.direction.y];
        for (let i = 0; i < dims; i++) {
            let dimLo = (aabb[0][i] - ro[i]) / rd[i];
            let dimHi = (aabb[1][i] - ro[i]) / rd[i];
            if (dimLo > dimHi) {
                const tmp = dimLo;
                dimLo = dimHi;
                dimHi = tmp;
            }
            if (dimHi < lo || dimLo > hi) {
                return undefined;
            }
            if (dimLo > lo) {
                lo = dimLo;
            }
            if (dimHi < hi) {
                hi = dimHi;
            }
        }
        if (lo < 0) {
            return undefined;
        }
        if (lo > hi) {
            return undefined;
        }
        return lo;
    }
}
exports.Ray2 = Ray2;
//# sourceMappingURL=index.js.map