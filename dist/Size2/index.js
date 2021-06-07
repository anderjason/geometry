"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size2 = void 0;
class Size2 {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    static givenWidthHeight(width, height) {
        return new Size2(width, height);
    }
    static ofZero() {
        return new Size2(0, 0);
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
    get isZero() {
        return this._width === 0 || this._height === 0;
    }
    toHalf() {
        if (this._half == null) {
            this._half = Size2.givenWidthHeight(this._width / 2, this._height / 2);
        }
        return this._half;
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        if (!(other instanceof Size2)) {
            return false;
        }
        return other._width == this._width && other._height == this._height;
    }
    toScale(availableSize, scaleMode, scaleFit = "contain") {
        if (availableSize == null) {
            throw new Error("availableSize is required");
        }
        if (availableSize.isZero || this.isZero) {
            return 0;
        }
        const scaleX = availableSize.width / this._width;
        const scaleY = availableSize.height / this._height;
        let scale;
        switch (scaleFit) {
            case "contain":
                scale = Math.min(scaleX, scaleY);
                break;
            case "cover":
                scale = Math.max(scaleX, scaleY);
                break;
            default:
                throw new Error(`Unsupported scaleFit (expected "cover" or "contain" but got '${scaleFit}')`);
        }
        if (scale < 1 && scaleMode === "expand") {
            // would shrink, but only expanding is allowed
            return 1;
        }
        if (scale > 1 && scaleMode === "shrink") {
            // would expand, but only shrinking is allowed
            return 1;
        }
        return scale;
    }
    toScaledSize(availableSize, scaleMode, scaleFit = "contain") {
        const scale = this.toScale(availableSize, scaleMode, scaleFit);
        return {
            size: Size2.givenWidthHeight(this._width * scale, this._height * scale),
            scale,
        };
    }
    withAddedSize(other) {
        return Size2.givenWidthHeight(this._width + other.width, this._height + other.height);
    }
    withSubtractedSize(other) {
        return Size2.givenWidthHeight(this._width - other.width, this._height - other.height);
    }
    withScale(scale) {
        return Size2.givenWidthHeight(this._width * scale, this._height * scale);
    }
}
exports.Size2 = Size2;
//# sourceMappingURL=index.js.map