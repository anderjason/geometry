"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box3 = void 0;
const Size3_1 = require("../Size3");
const Point3_1 = require("../Point3");
class Box3 {
    constructor(center, size) {
        this._center = center;
        this._size = size;
    }
    static givenCenterSize(center, size) {
        return new Box3(center, size);
    }
    static givenOppositeCorners(pointA, pointB) {
        const minX = Math.min(pointA.x, pointB.x);
        const minY = Math.min(pointA.y, pointB.y);
        const minZ = Math.min(pointA.z, pointB.z);
        const maxX = Math.max(pointA.x, pointB.x);
        const maxY = Math.max(pointA.y, pointB.y);
        const maxZ = Math.max(pointA.z, pointB.z);
        const size = Size3_1.Size3.givenWidthHeightDepth(maxX - minX, maxY - minY, maxZ - minZ);
        const center = Point3_1.Point3.givenXYZ(minX + size.width / 2, minY + size.height / 2, minZ + size.depth / 2);
        return this.givenCenterSize(center, size);
    }
    static givenContainedPoints(points) {
        const allX = points.map((point) => point.x);
        const allY = points.map((point) => point.y);
        const allZ = points.map((point) => point.z);
        const minX = Math.min(...allX);
        const minY = Math.min(...allY);
        const minZ = Math.min(...allZ);
        const maxX = Math.max(...allX);
        const maxY = Math.max(...allY);
        const maxZ = Math.max(...allZ);
        return Box3.givenOppositeCorners(Point3_1.Point3.givenXYZ(minX, minY, minZ), Point3_1.Point3.givenXYZ(maxX, maxY, maxZ));
    }
    static isEqual(a, b) {
        if (a == null && b == null) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        return a.isEqual(b);
    }
    get center() {
        return this._center;
    }
    get size() {
        return this._size;
    }
    isPointInside(point) {
        return (point.x >= this.toLeft() &&
            point.x <= this.toRight() &&
            point.y >= this.toTop() &&
            point.y <= this.toBottom() &&
            point.z <= this.toFront() &&
            point.z >= this.toBack());
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof Box3)) {
            return false;
        }
        return (other._center.isEqual(this._center) && other._size.isEqual(this._size));
    }
    toClone() {
        return new Box3(this._center.toClone(), this._size.toClone());
    }
    toTop() {
        return this._center.y - this._size.height / 2;
    }
    toLeft() {
        return this._center.x - this._size.width / 2;
    }
    toRight() {
        return this._center.x + this._size.width / 2;
    }
    toBottom() {
        return this._center.y + this._size.height / 2;
    }
    toFront() {
        return this._center.z + this._size.depth / 2;
    }
    toBack() {
        return this._center.z - this._size.depth / 2;
    }
    toLeftTopFront() {
        return Point3_1.Point3.givenXYZ(this.toLeft(), this.toTop(), this.toFront());
    }
    toCenterTopFront() {
        return Point3_1.Point3.givenXYZ(this._center.x, this.toTop(), this.toFront());
    }
    toRightTopFront() {
        return Point3_1.Point3.givenXYZ(this.toRight(), this.toTop(), this.toFront());
    }
    toLeftCenterFront() {
        return Point3_1.Point3.givenXYZ(this.toLeft(), this._center.y, this.toFront());
    }
    toFrontCenter() {
        return Point3_1.Point3.givenXYZ(this._center.x, this._center.y, this.toFront());
    }
    toRightCenterFront() {
        return Point3_1.Point3.givenXYZ(this.toRight(), this._center.y, this.toFront());
    }
    toLeftBottomFront() {
        return Point3_1.Point3.givenXYZ(this.toLeft(), this.toBottom(), this.toFront());
    }
    toCenterBottomFront() {
        return Point3_1.Point3.givenXYZ(this._center.x, this.toBottom(), this.toFront());
    }
    toRightBottomFront() {
        return Point3_1.Point3.givenXYZ(this.toRight(), this.toBottom(), this.toFront());
    }
    // ---
    toLeftTopCenter() {
        return Point3_1.Point3.givenXYZ(this.toLeft(), this.toTop(), this._center.z);
    }
    toTopCenter() {
        return Point3_1.Point3.givenXYZ(this._center.x, this.toTop(), this._center.z);
    }
    toRightTopCenter() {
        return Point3_1.Point3.givenXYZ(this.toRight(), this.toTop(), this._center.z);
    }
    toLeftCenter() {
        return Point3_1.Point3.givenXYZ(this.toLeft(), this._center.y, this._center.z);
    }
    toRightCenter() {
        return Point3_1.Point3.givenXYZ(this.toRight(), this._center.y, this._center.z);
    }
    toLeftBottomCenter() {
        return Point3_1.Point3.givenXYZ(this.toLeft(), this.toBottom(), this._center.z);
    }
    toBottomCenter() {
        return Point3_1.Point3.givenXYZ(this._center.x, this.toBottom(), this._center.z);
    }
    toRightBottomCenter() {
        return Point3_1.Point3.givenXYZ(this.toRight(), this.toBottom(), this._center.z);
    }
    // ----
    toLeftTopBack() {
        return Point3_1.Point3.givenXYZ(this.toLeft(), this.toTop(), this.toBack());
    }
    toCenterTopBack() {
        return Point3_1.Point3.givenXYZ(this._center.x, this.toTop(), this.toBack());
    }
    toRightTopBack() {
        return Point3_1.Point3.givenXYZ(this.toRight(), this.toTop(), this.toBack());
    }
    toLeftCenterBack() {
        return Point3_1.Point3.givenXYZ(this.toLeft(), this._center.y, this.toBack());
    }
    toBackCenter() {
        return Point3_1.Point3.givenXYZ(this._center.x, this._center.y, this.toBack());
    }
    toRightCenterBack() {
        return Point3_1.Point3.givenXYZ(this.toRight(), this._center.y, this.toBack());
    }
    toLeftBottomBack() {
        return Point3_1.Point3.givenXYZ(this.toLeft(), this.toBottom(), this.toBack());
    }
    toCenterBottomBack() {
        return Point3_1.Point3.givenXYZ(this._center.x, this.toBottom(), this.toBack());
    }
    toRightBottomBack() {
        return Point3_1.Point3.givenXYZ(this.toRight(), this.toBottom(), this.toBack());
    }
    withBoundingBox(boundingBox, scaleMode, anchor) {
        const newSize = this._size.withAvailableSize(boundingBox._size, scaleMode);
        let centerX;
        switch (anchor) {
            case "leftTopFront":
            case "leftTopCenter":
            case "leftTopBack":
            case "leftCenterFront":
            case "leftCenter":
            case "leftCenterBack":
            case "leftBottomFront":
            case "leftBottomCenter":
            case "leftBottomBack":
                centerX = boundingBox.toLeft() + newSize.toHalf().width;
                break;
            case "centerTopFront":
            case "topCenter":
            case "centerTopBack":
            case "frontCenter":
            case "center":
            case "backCenter":
            case "centerBottomFront":
            case "bottomCenter":
            case "centerBottomBack":
                centerX = boundingBox._center.x;
                break;
            case "rightTopFront":
            case "rightTopCenter":
            case "rightTopBack":
            case "rightCenterFront":
            case "rightCenter":
            case "rightCenterBack":
            case "rightBottomFront":
            case "rightBottomCenter":
            case "rightBottomBack":
                centerX = boundingBox.toRight() - newSize.toHalf().width;
                break;
        }
        let centerY;
        switch (anchor) {
            case "leftTopFront":
            case "centerTopFront":
            case "rightTopFront":
            case "leftTopCenter":
            case "topCenter":
            case "rightTopCenter":
            case "leftTopBack":
            case "centerTopBack":
            case "rightTopBack":
                centerY = boundingBox.toTop() + newSize.toHalf().height;
                break;
            case "leftCenterFront":
            case "frontCenter":
            case "rightCenterFront":
            case "leftCenter":
            case "center":
            case "rightCenter":
            case "leftCenterBack":
            case "backCenter":
            case "rightCenterBack":
                centerY = boundingBox._center.y;
                break;
            case "leftBottomFront":
            case "centerBottomFront":
            case "rightBottomFront":
            case "leftBottomCenter":
            case "bottomCenter":
            case "rightBottomCenter":
            case "leftBottomBack":
            case "centerBottomBack":
            case "rightBottomBack":
                centerY = boundingBox.toBottom() - newSize.toHalf().height;
                break;
        }
        let centerZ;
        switch (anchor) {
            case "leftTopFront":
            case "centerTopFront":
            case "rightTopFront":
            case "leftCenterFront":
            case "frontCenter":
            case "rightCenterFront":
            case "leftBottomFront":
            case "centerBottomFront":
            case "rightBottomFront":
                centerZ = boundingBox.toFront() - newSize.toHalf().depth;
                break;
            case "leftTopCenter":
            case "topCenter":
            case "rightTopCenter":
            case "leftCenter":
            case "center":
            case "rightCenter":
            case "leftBottomCenter":
            case "bottomCenter":
            case "rightBottomCenter":
                centerZ = boundingBox._center.z;
                break;
            case "leftTopBack":
            case "centerTopBack":
            case "rightTopBack":
            case "leftCenterBack":
            case "backCenter":
            case "rightCenterBack":
            case "leftBottomBack":
            case "centerBottomBack":
            case "rightBottomBack":
                centerZ = boundingBox.toBack() + newSize.toHalf().depth;
                break;
        }
        return Box3.givenCenterSize(Point3_1.Point3.givenXYZ(centerX, centerY, centerZ), newSize);
    }
    withAddedSize(size, anchor) {
        return this.withAddedWidthHeightDepth(size.width, size.height, size.depth, anchor);
    }
    withAddedWidthHeightDepth(width, height, depth, anchor) {
        const newSize = this._size.withAddedWidthHeightDepth(width, height, depth);
        let centerX;
        switch (anchor) {
            case "leftTopFront":
            case "leftTopCenter":
            case "leftTopBack":
            case "leftCenterFront":
            case "leftCenter":
            case "leftCenterBack":
            case "leftBottomFront":
            case "leftBottomCenter":
            case "leftBottomBack":
                centerX = this.toLeft() + newSize.toHalf().width;
                break;
            case "centerTopFront":
            case "topCenter":
            case "centerTopBack":
            case "frontCenter":
            case "center":
            case "backCenter":
            case "centerBottomFront":
            case "bottomCenter":
            case "centerBottomBack":
                centerX = this._center.x;
                break;
            case "rightTopFront":
            case "rightTopCenter":
            case "rightTopBack":
            case "rightCenterFront":
            case "rightCenter":
            case "rightCenterBack":
            case "rightBottomFront":
            case "rightBottomCenter":
            case "rightBottomBack":
                centerX = this.toRight() - newSize.toHalf().width;
                break;
        }
        let centerY;
        switch (anchor) {
            case "leftTopFront":
            case "centerTopFront":
            case "rightTopFront":
            case "leftTopCenter":
            case "topCenter":
            case "rightTopCenter":
            case "leftTopBack":
            case "centerTopBack":
            case "rightTopBack":
                centerY = this.toTop() + newSize.toHalf().height;
                break;
            case "leftCenterFront":
            case "frontCenter":
            case "rightCenterFront":
            case "leftCenter":
            case "center":
            case "rightCenter":
            case "leftCenterBack":
            case "backCenter":
            case "rightCenterBack":
                centerY = this._center.y;
                break;
            case "leftBottomFront":
            case "centerBottomFront":
            case "rightBottomFront":
            case "leftBottomCenter":
            case "bottomCenter":
            case "rightBottomCenter":
            case "leftBottomBack":
            case "centerBottomBack":
            case "rightBottomBack":
                centerY = this.toBottom() - newSize.toHalf().height;
                break;
        }
        let centerZ;
        switch (anchor) {
            case "leftTopFront":
            case "centerTopFront":
            case "rightTopFront":
            case "leftCenterFront":
            case "frontCenter":
            case "rightCenterFront":
            case "leftBottomFront":
            case "centerBottomFront":
            case "rightBottomFront":
                centerZ = this.toFront() - newSize.toHalf().depth;
                break;
            case "leftTopCenter":
            case "topCenter":
            case "rightTopCenter":
            case "leftCenter":
            case "center":
            case "rightCenter":
            case "leftBottomCenter":
            case "bottomCenter":
            case "rightBottomCenter":
                centerZ = this._center.z;
                break;
            case "leftTopBack":
            case "centerTopBack":
            case "rightTopBack":
            case "leftCenterBack":
            case "backCenter":
            case "rightCenterBack":
            case "leftBottomBack":
            case "centerBottomBack":
            case "rightBottomBack":
                centerZ = this.toBack() + newSize.toHalf().depth;
                break;
        }
        return Box3.givenCenterSize(Point3_1.Point3.givenXYZ(centerX, centerY, centerZ), newSize);
    }
}
exports.Box3 = Box3;
//# sourceMappingURL=index.js.map