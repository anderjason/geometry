"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
const Matrix_1 = require("../Matrix");
class Vector {
    constructor(elements) {
        this.elements = Array.from(elements);
    }
    withMultipliedMatrix(matrix) {
        const thisAsMatrix = Matrix_1.Matrix.givenRow(this.elements);
        return matrix.withMultipliedMatrix(thisAsMatrix).toColumnVector(0);
    }
}
exports.Vector = Vector;
//# sourceMappingURL=index.js.map