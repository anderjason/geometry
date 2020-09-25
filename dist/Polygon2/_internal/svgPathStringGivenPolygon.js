"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.svgPathStringGivenPolygon = void 0;
const util_1 = require("@anderjason/util");
function svgPathStringGivenPolygon(polygon, radius) {
    let pathCoords = polygon.points;
    const path = [];
    // Reset indexes, so there are no gaps
    pathCoords = pathCoords.slice();
    for (let i = 0; i < pathCoords.length; i++) {
        // 1. Get current coord and the next two (startpoint, cornerpoint, endpoint) to calculate rounded curve
        const c2Index = i + 1 > pathCoords.length - 1 ? (i + 1) % pathCoords.length : i + 1;
        const c3Index = i + 2 > pathCoords.length - 1 ? (i + 2) % pathCoords.length : i + 2;
        const c1 = pathCoords[i];
        const c2 = pathCoords[c2Index];
        const c3 = pathCoords[c3Index];
        let thisRadius = radius;
        // 2. For each 3 coords, enter two new path commands: Line to start of curve, bezier curve around corner.
        // Calculate curvePoint c1 -> c2
        const c1c2Distance = Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
        const c2c3Distance = Math.sqrt(Math.pow(c2.x - c3.x, 2) + Math.pow(c2.y - c3.y, 2));
        const minDistance = Math.min(c1c2Distance, c2c3Distance);
        const threshold = 30;
        if (minDistance < threshold) {
            thisRadius = util_1.NumberUtil.numberWithRangeMap(minDistance, 0, threshold, 0, radius);
        }
        const c1c2DistanceRatio = (c1c2Distance - thisRadius) / c1c2Distance;
        const c1c2CurvePoint = [
            ((1 - c1c2DistanceRatio) * c1.x + c1c2DistanceRatio * c2.x).toFixed(1),
            ((1 - c1c2DistanceRatio) * c1.y + c1c2DistanceRatio * c2.y).toFixed(1),
        ];
        // Calculate curvePoint c2 -> c3
        const c2c3DistanceRatio = thisRadius / c2c3Distance;
        const c2c3CurvePoint = [
            ((1 - c2c3DistanceRatio) * c2.x + c2c3DistanceRatio * c3.x).toFixed(1),
            ((1 - c2c3DistanceRatio) * c2.y + c2c3DistanceRatio * c3.y).toFixed(1),
        ];
        // If at last coord of polygon, also save that as starting point
        if (i === pathCoords.length - 1) {
            path.unshift("M" + c2c3CurvePoint.join(","));
        }
        // Line to start of curve (L endcoord)
        path.push("L" + c1c2CurvePoint.join(","));
        // Bezier line around curve (Q controlcoord endcoord)
        path.push("Q" + c2.x + "," + c2.y + "," + c2c3CurvePoint.join(","));
    }
    path.push("Z");
    return path.join(" ");
}
exports.svgPathStringGivenPolygon = svgPathStringGivenPolygon;
//# sourceMappingURL=svgPathStringGivenPolygon.js.map