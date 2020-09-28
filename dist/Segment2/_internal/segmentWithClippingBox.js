"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.segmentWithClippingBox = void 0;
const __1 = require("..");
const Point2_1 = require("../../Point2");
const mask = [0, 1, 2, 2, 4, 0, 4, 4, 8, 1, 0, 2, 8, 1, 8, 0];
const tab1 = [4, 3, 0, 3, 1, 4, 0, 3, 2, 2, 4, 2, 1, 1, 0, 4];
const tab2 = [4, 0, 1, 1, 2, 4, 2, 2, 3, 0, 4, 1, 3, 0, 3, 4];
function pointCross(a, b) {
    return new Vector(a.y - b.y, b.x - a.x, a.x * b.y - a.y * b.x);
}
function cross(u, v) {
    const z = u.x * v.y - u.y * v.x;
    return Point2_1.Point2.givenXY((u.y * v.z - u.z * v.y) / z, (u.z * v.x - u.x * v.z) / z);
}
function dot(u, v) {
    return u.x * v.x + u.y * v.y + u.z * v.z;
}
class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class Clip {
    constructor(a, b) {
        if (a.x < b.x) {
            this.x_min = a.x;
            this.x_max = b.x;
        }
        else {
            this.x_min = b.x;
            this.x_max = a.x;
        }
        if (a.y < b.y) {
            this.y_min = a.y;
            this.y_max = b.y;
        }
        else {
            this.y_min = b.y;
            this.y_max = a.y;
        }
        this.x = [
            new Vector(this.x_min, this.y_min, 1),
            new Vector(this.x_max, this.y_min, 1),
            new Vector(this.x_max, this.y_max, 1),
            new Vector(this.x_min, this.y_max, 1),
        ];
        this.e = [
            new Vector(0, 1, -this.y_min),
            new Vector(1, 0, -this.x_max),
            new Vector(0, 1, -this.y_max),
            new Vector(1, 0, -this.x_min),
        ];
    }
    code(pt) {
        let c = 0;
        if (pt.x < this.x_min) {
            c = 8;
        }
        else if (pt.x > this.x_max) {
            c = 2;
        }
        if (pt.y < this.y_min) {
            c |= 1;
        }
        else if (pt.y > this.y_max) {
            c |= 4;
        }
        return c;
    }
    clipLine(input) {
        const xA = input.startPoint;
        const xB = input.endPoint;
        const codeA = this.code(xA);
        const codeB = this.code(xB);
        if ((codeA | codeB) === 0) {
            return input; // both points inside
        }
        if ((codeA & codeB) !== 0) {
            return undefined; // both points outside
        }
        const p = pointCross(xA, xB);
        let c = 0;
        for (let k = 0; k < 4; k += 1) {
            if (dot(p, this.x[k]) <= 0) {
                c |= 1 << k;
            }
        }
        if (c === 0 || c === 15) {
            return undefined;
        }
        const i = tab1[c];
        const j = tab2[c];
        if (codeA !== 0 && codeB !== 0) {
            const newXA = cross(p, this.e[i]);
            const newXB = cross(p, this.e[j]);
            return __1.Segment2.givenPoints(newXA, newXB);
        }
        if (codeA === 0) {
            let newXB = null;
            if ((codeB & mask[c]) === 0) {
                newXB = cross(p, this.e[i]);
            }
            else {
                newXB = cross(p, this.e[j]);
            }
            return __1.Segment2.givenPoints(xA, newXB);
        }
        if (codeB === 0) {
            let newXA = null;
            if ((codeA & mask[c]) === 0) {
                newXA = cross(p, this.e[i]);
            }
            else {
                newXA = cross(p, this.e[j]);
            }
            return __1.Segment2.givenPoints(newXA, xB);
        }
    }
}
function segmentWithClippingBox(segment, clipRegion) {
    const clipLeftTop = clipRegion.toLeftTop();
    const clipRightBottom = clipRegion.toRightBottom();
    const clip = new Clip(clipLeftTop, clipRightBottom);
    return clip.clipLine(segment);
}
exports.segmentWithClippingBox = segmentWithClippingBox;
//# sourceMappingURL=segmentWithClippingBox.js.map