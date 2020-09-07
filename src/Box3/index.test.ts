import { Test } from "@anderjason/tests";
import { StringUtil } from "@anderjason/util";
import { Box3, Anchor3 } from ".";
import { Point3 } from "../Point3";
import { Size3 } from "../Size3";

const anchors: Anchor3[] = [
  "leftTopFront",
  "centerTopFront",
  "rightTopFront",
  "leftCenterFront",
  "frontCenter",
  "rightCenterFront",
  "leftBottomFront",
  "centerBottomFront",
  "rightBottomFront",
  "leftTopCenter",
  "topCenter",
  "rightTopCenter",
  "leftCenter",
  "center",
  "rightCenter",
  "leftBottomCenter",
  "bottomCenter",
  "rightBottomCenter",
  "leftTopBack",
  "centerTopBack",
  "rightTopBack",
  "leftCenterBack",
  "backCenter",
  "rightCenterBack",
  "leftBottomBack",
  "centerBottomBack",
  "rightBottomBack",
];

Test.define("Box3 can be created from a set of contained points", () => {
  const points = [
    Point3.givenXYZ(100, 100, 100),
    Point3.givenXYZ(300, 250, 50),
    Point3.givenXYZ(400, 300, 19),
    Point3.givenXYZ(50, 400, 592),
    Point3.givenXYZ(125, 70, 300),
  ];

  const actual = Box3.givenContainedPoints(points);
  const expected = Box3.givenOppositeCorners(
    Point3.givenXYZ(50, 70, 19),
    Point3.givenXYZ(400, 400, 592)
  );

  Test.assert(actual.isEqual(expected));
});

Test.define(
  "Box3 can be adjusted to fit a larger bounding box with all anchors",
  () => {
    const expectedSize = Size3.givenWidthHeightDepth(500, 1000, 750);

    const boundingBox = Box3.givenCenterSize(
      Point3.ofZero(),
      Size3.givenWidthHeightDepth(1000, 1000, 1000)
    );

    const original = Box3.givenCenterSize(
      Point3.givenXYZ(100, 100, 100),
      Size3.givenWidthHeightDepth(20, 40, 30)
    );

    anchors.forEach((anchor) => {
      const actual = original.withBoundingBox(boundingBox, "flexible", anchor);

      const functionName =
        "to" + StringUtil.stringWithCase(anchor, "PascalCase");

      if (functionName === "toCenter") {
        return; // skip
      }

      Test.assert(actual != null, "actual is null");
      Test.assert(boundingBox != null, "boundingBox is null");

      const actualFn = (actual as any)[functionName] as Function;
      const boundingFn = (boundingBox as any)[functionName] as Function;

      Test.assert(
        typeof actualFn === "function",
        `actualFn '${functionName}' is not a function`
      );
      Test.assert(
        typeof boundingFn === "function",
        `boundingFn '${functionName}' is not a function`
      );

      const actualValue = actualFn.apply(actual) as Point3;
      const boundingValue = boundingFn.apply(actual) as Point3;

      Test.assert(actualValue != null, "actualValue is null");
      Test.assert(boundingValue != null, "boundingValue is null");

      Test.assert(
        actualValue.isEqual(boundingValue),
        `Anchor ${anchor} box does not match`
      );

      Test.assert(actual.size.isEqual(expectedSize));
    });
  }
);

Test.define(
  "Box3 can be adjusted to fit a smaller bounding box with all anchors",
  () => {
    const expectedSize = Size3.givenWidthHeightDepth(5, 10, 7.5);

    const boundingBox = Box3.givenCenterSize(
      Point3.ofZero(),
      Size3.givenWidthHeightDepth(10, 10, 10)
    );

    const original = Box3.givenCenterSize(
      Point3.givenXYZ(100, 100, 100),
      Size3.givenWidthHeightDepth(20, 40, 30)
    );

    anchors.forEach((anchor) => {
      const actual: Box3 = original.withBoundingBox(
        boundingBox,
        "flexible",
        anchor
      );

      const functionName =
        "to" + StringUtil.stringWithCase(anchor, "PascalCase");

      if (functionName === "toCenter") {
        return; // skip
      }

      Test.assert(actual != null, "actual is null");
      Test.assert(boundingBox != null, "boundingBox is null");

      const actualFn = (actual as any)[functionName] as Function;
      const boundingFn = (boundingBox as any)[functionName] as Function;

      Test.assert(
        typeof actualFn === "function",
        `actualFn '${functionName}' is not a function`
      );
      Test.assert(
        typeof boundingFn === "function",
        `boundingFn '${functionName}' is not a function`
      );

      const actualValue = actualFn.apply(actual) as Point3;
      const boundingValue = boundingFn.apply(actual) as Point3;

      Test.assert(actualValue != null, "actualValue is null");
      Test.assert(boundingValue != null, "boundingValue is null");

      Test.assert(actual.size.isEqual(expectedSize));
    });
  }
);
