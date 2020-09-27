"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
const Vector_1 = require("../Vector");
class Matrix {
    constructor(elements) {
        this.rows = elements;
    }
    static ofIdentity(size) {
        const rows = [];
        for (let i = 0; i < size; i++) {
            rows[i] = [];
            for (let j = 0; j < size; j++) {
                rows[i][j] = i === j ? 1 : 0;
            }
        }
        return new Matrix(rows);
    }
    static givenRows(rows) {
        const rowsCopy = [];
        // deep copy
        for (let row = 0; row < rows.length; row++) {
            rowsCopy[row] = [];
            for (let col = 0; col < rows[row].length; col++) {
                rowsCopy[row][col] = rows[row][col];
            }
        }
        return new Matrix(rowsCopy);
    }
    static givenRow(row) {
        const rows = [];
        for (let i = 0; i < row.length; i++) {
            rows.push([row[i]]);
        }
        return new Matrix(rows);
    }
    isSquare() {
        const cols = this.rows.length === 0 ? 0 : this.rows[0].length;
        return this.rows.length === cols;
    }
    isSingular() {
        return this.isSquare() && this.toDeterminant() === 0;
    }
    toDeterminant() {
        if (this.rows.length === 0) {
            return 1;
        }
        if (!this.isSquare()) {
            return null;
        }
        const rightTriangular = this.withRightTriangular();
        let result = rightTriangular.rows[0][0];
        for (let i = 1; i < rightTriangular.rows.length; i++) {
            result = result * rightTriangular.rows[i][i];
        }
        return result;
    }
    withClone() {
        return Matrix.givenRows(this.rows);
    }
    withRightTriangular() {
        if (this.rows.length === 0) {
            return new Matrix([]);
        }
        let clone = this.withClone();
        let row;
        for (let i = 0; i < this.rows.length; i++) {
            if (clone.rows[i][i] === 0) {
                for (let j = i + 1; j < this.rows.length; j++) {
                    if (clone.rows[j][i] !== 0) {
                        row = [];
                        for (let p = 0; p < this.rows[0].length; p++) {
                            row.push(clone.rows[i][p] + clone.rows[j][p]);
                        }
                        clone.rows[i] = row;
                        break;
                    }
                }
            }
            if (clone.rows[i][i] !== 0) {
                for (let j = i + 1; j < this.rows.length; j++) {
                    var multiplier = clone.rows[j][i] / clone.rows[i][i];
                    row = [];
                    for (let p = 0; p < this.rows[0].length; p++) {
                        row.push(p <= i ? 0 : clone.rows[j][p] - clone.rows[i][p] * multiplier);
                    }
                    clone.rows[j] = row;
                }
            }
        }
        return clone;
    }
    toOptionalValueGivenRowAndColumn(rowIndex, colIndex) {
        if (rowIndex < 0 ||
            rowIndex >= this.rows.length ||
            colIndex < 0 ||
            colIndex >= this.rows[0].length) {
            return undefined;
        }
        return this.rows[rowIndex][colIndex];
    }
    withMap(fn) {
        if (this.rows.length === 0) {
            return new Matrix([]);
        }
        let result2d = [];
        for (let row = 0; row < this.rows.length; row++) {
            result2d[row] = [];
            for (let col = 0; col < this.rows[0].length; col++) {
                result2d[row][col] = fn(this.rows[row][col], row, col);
            }
        }
        return Matrix.givenRows(result2d);
    }
    withMultipliedMatrix(matrix) {
        if (this.rows.length === 0) {
            throw new Error("Cannot multiply because there are no rows in this matrix");
        }
        if (this.rows[0].length !== matrix.rows.length) {
            throw new Error("Cannot multiply the specified matrices");
        }
        const M = matrix.rows;
        let i = this.rows.length;
        let nj = M[0].length;
        let j;
        let cols = this.rows[0].length;
        let c;
        let elements = [];
        let sum;
        while (i--) {
            j = nj;
            elements[i] = [];
            while (j--) {
                c = cols;
                sum = 0;
                while (c--) {
                    sum += this.rows[i][c] * M[c][j];
                }
                elements[i][j] = sum;
            }
        }
        return Matrix.givenRows(elements);
    }
    toColumnVector(columnIndex) {
        if (this.rows.length === 0) {
            return null;
        }
        if (columnIndex >= this.rows[0].length) {
            return null;
        }
        let col = [];
        for (let i = 0; i < this.rows.length; i++) {
            col.push(this.rows[i][columnIndex]);
        }
        return new Vector_1.Vector(col);
    }
    withAugumentedMatrix(other) {
        if (this.rows.length === 0) {
            return this.withClone();
        }
        if (this.rows.length !== other.rows.length) {
            return null;
        }
        const thisClone = this.withClone();
        const cols = thisClone.rows[0].length;
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < other.rows[0].length; j++) {
                thisClone.rows[i][cols + j] = other.rows[i][j];
            }
        }
        return thisClone;
    }
    withInverse() {
        if (this.rows.length === 0) {
            return null;
        }
        if (!this.isSquare() || this.isSingular()) {
            return null;
        }
        const n = this.rows.length;
        let i = n;
        let j;
        const M = this.withAugumentedMatrix(Matrix.ofIdentity(n)).withRightTriangular();
        const np = M.rows[0].length;
        let p;
        let elements;
        let divisor;
        let inverseElements = [];
        let newElement;
        while (i--) {
            elements = [];
            inverseElements[i] = [];
            divisor = M.rows[i][i];
            for (p = 0; p < np; p++) {
                newElement = M.rows[i][p] / divisor;
                elements.push(newElement);
                if (p >= n) {
                    inverseElements[i].push(newElement);
                }
            }
            M.rows[i] = elements;
            j = i;
            while (j--) {
                elements = [];
                for (p = 0; p < np; p++) {
                    elements.push(M.rows[j][p] - M.rows[i][p] * M.rows[j][i]);
                }
                M.rows[j] = elements;
            }
        }
        return Matrix.givenRows(inverseElements);
    }
}
exports.Matrix = Matrix;
//# sourceMappingURL=index.js.map