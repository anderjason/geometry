"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box2 = void 0;
const Point2_1 = require("../Point2");
const Size2_1 = require("../Size2");
class Box2 {
    constructor(center, size) {
        this._center = center;
        this._size = size;
    }
    static givenDomRect(domRect) {
        return Box2.givenTopLeftSize(Point2_1.Point2.givenXY(domRect.left, domRect.top), Size2_1.Size2.givenWidthHeight(domRect.width, domRect.height));
    }
    static givenCenterSize(center, size) {
        return new Box2(center, size);
    }
    static givenOppositeCorners(pointA, pointB) {
        const minX = Math.min(pointA.x, pointB.x);
        const minY = Math.min(pointA.y, pointB.y);
        const maxX = Math.max(pointA.x, pointB.x);
        const maxY = Math.max(pointA.y, pointB.y);
        const size = Size2_1.Size2.givenWidthHeight(maxX - minX, maxY - minY);
        const center = Point2_1.Point2.givenXY(minX + size.width / 2, minY + size.height / 2);
        return this.givenCenterSize(center, size);
    }
    static givenTopLeftSize(topLeft, size) {
        const center = Point2_1.Point2.givenXY(topLeft.x + size.width / 2, topLeft.y + size.height / 2);
        return this.givenCenterSize(center, size);
    }
    static givenContainedPoints(points) {
        const allX = points.map((point) => point.x);
        const allY = points.map((point) => point.y);
        const minX = Math.min(...allX);
        const minY = Math.min(...allY);
        const maxX = Math.max(...allX);
        const maxY = Math.max(...allY);
        return Box2.givenOppositeCorners(Point2_1.Point2.givenXY(minX, minY), Point2_1.Point2.givenXY(maxX, maxY));
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
            point.y <= this.toBottom());
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof Box2)) {
            return false;
        }
        return (other._center.isEqual(this._center) && other._size.isEqual(this._size));
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
    toLeftTop() {
        return Point2_1.Point2.givenXY(this.toLeft(), this.toTop());
    }
    toCenterTop() {
        return Point2_1.Point2.givenXY(this._center.x, this.toTop());
    }
    toRightTop() {
        return Point2_1.Point2.givenXY(this.toRight(), this.toTop());
    }
    toLeftCenter() {
        return Point2_1.Point2.givenXY(this.toLeft(), this._center.y);
    }
    toRightCenter() {
        return Point2_1.Point2.givenXY(this.toRight(), this._center.y);
    }
    toLeftBottom() {
        return Point2_1.Point2.givenXY(this.toLeft(), this.toBottom());
    }
    toCenterBottom() {
        return Point2_1.Point2.givenXY(this._center.x, this.toBottom());
    }
    toRightBottom() {
        return Point2_1.Point2.givenXY(this.toRight(), this.toBottom());
    }
    withBoundingBox(boundingBox, scaleMode, anchor) {
        const newSize = this._size.withAvailableSize(boundingBox._size, scaleMode);
        let centerX;
        switch (anchor) {
            case "leftTop":
            case "leftCenter":
            case "leftBottom":
                centerX = boundingBox.toLeft() + newSize.toHalf().width;
                break;
            case "centerTop":
            case "center":
            case "centerBottom":
                centerX = boundingBox._center.x;
                break;
            case "rightTop":
            case "rightCenter":
            case "rightBottom":
                centerX = boundingBox.toRight() - newSize.toHalf().width;
                break;
        }
        let centerY;
        switch (anchor) {
            case "leftTop":
            case "centerTop":
            case "rightTop":
                centerY = boundingBox.toTop() + newSize.toHalf().height;
                break;
            case "leftCenter":
            case "center":
            case "rightCenter":
                centerY = boundingBox._center.y;
                break;
            case "leftBottom":
            case "centerBottom":
            case "rightBottom":
                centerY = boundingBox.toBottom() - newSize.toHalf().height;
                break;
        }
        return Box2.givenCenterSize(Point2_1.Point2.givenXY(centerX, centerY), newSize);
    }
    withAddedSize(size, anchor) {
        return this.withAddedWidthHeight(size.width, size.height, anchor);
    }
    withAddedWidthHeight(width, height, anchor) {
        const newSize = this._size.withAddedWidthHeight(width, height);
        let centerX;
        switch (anchor) {
            case "leftTop":
            case "leftCenter":
            case "leftBottom":
                centerX = this.toLeft() + newSize.toHalf().width;
                break;
            case "centerTop":
            case "center":
            case "centerBottom":
                centerX = this._center.x;
                break;
            case "rightTop":
            case "rightCenter":
            case "rightBottom":
                centerX = this.toRight() - newSize.toHalf().width;
                break;
        }
        let centerY;
        switch (anchor) {
            case "leftTop":
            case "centerTop":
            case "rightTop":
                centerY = this.toTop() + newSize.toHalf().height;
                break;
            case "leftCenter":
            case "center":
            case "rightCenter":
                centerY = this._center.y;
                break;
            case "leftBottom":
            case "centerBottom":
            case "rightBottom":
                centerY = this.toBottom() - newSize.toHalf().height;
                break;
        }
        return Box2.givenCenterSize(Point2_1.Point2.givenXY(centerX, centerY), newSize);
    }
}
exports.Box2 = Box2;
//# sourceMappingURL=index.js.map