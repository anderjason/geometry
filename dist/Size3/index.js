"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size3 = void 0;
class Size3 {
    constructor(width, height, depth) {
        this._width = width;
        this._height = height;
        this._depth = depth;
    }
    static givenWidthHeightDepth(width, height, depth) {
        return new Size3(width, height, depth);
    }
    static ofZero() {
        return new Size3(0, 0, 0);
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
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get depth() {
        return this._depth;
    }
    get isZero() {
        return this._width === 0 || this._height === 0 || this._depth === 0;
    }
    toClone() {
        return new Size3(this._width, this._height, this._depth);
    }
    toHalf() {
        if (this._half == null) {
            this._half = Size3.givenWidthHeightDepth(this._width / 2, this._height / 2, this._depth / 2);
        }
        return this._half;
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return (other._width == this._width &&
            other._height == this._height &&
            other._depth == this._depth);
    }
    withAvailableSize(availableSize, scaleMode) {
        if (availableSize == null) {
            throw new Error("availableSize is required");
        }
        if (availableSize.isZero || this.isZero) {
            return Size3.ofZero();
        }
        const scaleX = availableSize.width / this._width;
        const scaleY = availableSize.height / this._height;
        const scaleZ = availableSize.depth / this._depth;
        const scale = Math.min(scaleX, scaleY, scaleZ);
        if (scale < 1 && scaleMode === "expand") {
            // would shrink, but only expanding is allowed
            return this.toClone();
        }
        if (scale > 1 && scaleMode === "shrink") {
            // would expand, but only shrinking is allowed
            return this.toClone();
        }
        return Size3.givenWidthHeightDepth(this._width * scale, this._height * scale, this._depth * scale);
    }
    withAddedWidthHeightDepth(width, height, depth) {
        return Size3.givenWidthHeightDepth(this._width + width, this._height + height, this._depth + depth);
    }
    withAddedSize(other) {
        return Size3.givenWidthHeightDepth(this._width + other.width, this._height + other.height, this._depth + other.depth);
    }
}
exports.Size3 = Size3;
//# sourceMappingURL=index.js.map