"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutableSize3 = void 0;
const Size3_1 = require("../Size3");
class MutableSize3 extends Size3_1.Size3 {
    static givenWidthHeightDepth(width, height, depth) {
        return new MutableSize3(width, height, depth);
    }
    static givenSize3(size) {
        return new MutableSize3(size.width, size.height, size.depth);
    }
    static ofZero() {
        return new MutableSize3(0, 0, 0);
    }
    constructor(width, height, depth) {
        super(width, height, depth);
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
    set width(value) {
        this._width = value;
        this._half = undefined;
    }
    set height(value) {
        this._height = value;
        this._half = undefined;
    }
    set depth(value) {
        this._depth = value;
        this._half = undefined;
    }
    toClone() {
        return new MutableSize3(this.width, this.height, this.depth);
    }
}
exports.MutableSize3 = MutableSize3;
//# sourceMappingURL=index.js.map