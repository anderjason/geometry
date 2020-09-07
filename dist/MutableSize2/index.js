"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutableSize2 = void 0;
const Size2_1 = require("../Size2");
class MutableSize2 extends Size2_1.Size2 {
    static givenWidthHeight(width, height) {
        return new MutableSize2(width, height);
    }
    static givenSize2(size) {
        return new MutableSize2(size.width, size.height);
    }
    static ofZero() {
        return new MutableSize2(0, 0);
    }
    constructor(width, height) {
        super(width, height);
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    set width(value) {
        this._width = value;
        this._half = undefined;
    }
    set height(value) {
        this._height = value;
        this._half = undefined;
    }
    toClone() {
        return new MutableSize2(this.width, this.height);
    }
}
exports.MutableSize2 = MutableSize2;
//# sourceMappingURL=index.js.map