import { Test } from "@anderjason/tests";
import { Matrix } from ".";

Test.define("Matrix can be created", () => {
  const matrix = Matrix.givenRows([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]);

  const actual = matrix.rows;
  const expected = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ];

  Test.assertIsDeepEqual(actual, expected);
});

Test.define("Matrix can create an identity", () => {
  const matrix = Matrix.ofIdentity(4);
  const actual = matrix.rows;

  const expected = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  Test.assertIsDeepEqual(actual, expected);
});

Test.define("Matrix can calculate right triangular", () => {
  const matrix = Matrix.givenRows([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]);

  const actual = matrix.withRightTriangular().rows;
  const expected = [
    [1, 2, 3, 4],
    [0, -4, -8, -12],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  Test.assertIsDeepEqual(actual, expected);
});

Test.define("Matrix can calculate determinant", () => {
  const matrix = Matrix.givenRows([
    [6, 1, 1],
    [4, -2, 5],
    [2, 8, 7],
  ]);

  const actual = Math.round(matrix.toDeterminant());
  const expected = -306;

  Test.assert(actual === expected);
});

// Test.define("Matrix can calculate inverse", () => {
//   const matrix = Matrix.givenRows([
//     [4, 7],
//     [2, 6],
//   ]);

//   // round the values to the nearest tenth for testing
//   const actual = matrix
//     .withInverse()
//     .rows.map((row) => row.map((v) => Math.round(v * 10) / 10));

//   const expected = [
//     [0.6, -0.7],
//     [-0.2, 0.4],
//   ];

//   console.log(actual);
//   Test.assertIsDeepEqual(actual, expected);
// });

Test.define("Matrix can get a column", () => {
  const matrix = Matrix.givenRows([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]);

  const actual = matrix.toColumnVector(0).elements;
  const expected = [1, 5, 9, 13];

  Test.assertIsDeepEqual(actual, expected);
});
