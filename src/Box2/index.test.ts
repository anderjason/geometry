import { Test } from "@anderjason/tests";
import { StringUtil } from "@anderjason/util";
import { Box2, Anchor2 } from ".";
import { Point2 } from "../Point2";
import { Size2 } from "../Size2";

const anchors: Anchor2[] = [
  "leftTop",
  "centerTop",
  "rightTop",
  "leftCenter",
  "center",
  "rightCenter",
  "leftBottom",
  "centerBottom",
  "rightBottom",
];

Test.define("Box2 can be created from a set of contained points", () => {
  const points = [
    Point2.givenXY(100, 100),
    Point2.givenXY(300, 250),
    Point2.givenXY(400, 300),
    Point2.givenXY(50, 400),
    Point2.givenXY(125, 70),
  ];

  const actual = Box2.givenContainedPoints(points);
  const expected = Box2.givenOppositeCorners(
    Point2.givenXY(50, 70),
    Point2.givenXY(400, 400)
  );

  Test.assert(actual.isEqual(expected));
});

Test.define(
  "Box2 can be adjusted to fit a larger bounding box with all anchors",
  () => {
    const largerExpectedSize = Size2.givenWidthHeight(500, 1000);

    const boundingBox = Box2.givenTopLeftSize(
      Point2.ofZero(),
      Size2.givenWidthHeight(1000, 1000)
    );

    const original = Box2.givenCenterSize(
      Point2.givenXY(100, 100),
      Size2.givenWidthHeight(20, 40)
    );

    anchors.forEach((anchor) => {
      const actual = original.withBoundingBox(boundingBox, "flexible", anchor);

      let functionName = "to" + StringUtil.stringWithCase(anchor, "PascalCase");

      if (functionName === "toCenter") {
        return; // skip
      }

      Test.assert(actual != null, "actual is null");
      Test.assert(boundingBox != null, "boundingBox is null");

      const actualFn = (actual as any)[functionName];
      const boundingFn = (boundingBox as any)[functionName];

      Test.assert(
        typeof actualFn === "function",
        `actualFn '${functionName}' is not a function`
      );
      Test.assert(
        typeof boundingFn === "function",
        `boundingFn '${functionName}' is not a function`
      );

      const actualValue = actualFn.apply(actual) as Point2;
      const boundingValue = boundingFn.apply(actual) as Point2;

      Test.assert(actualValue != null, "actualValue is null");
      Test.assert(boundingValue != null, "boundingValue is null");

      Test.assert(
        actualValue.isEqual(boundingValue),
        `Anchor ${anchor} box does not match`
      );

      Test.assert(actual.size.isEqual(largerExpectedSize));
    });
  }
);

Test.define(
  "Box2 can be adjusted to fit a smaller bounding box with all anchors",
  () => {
    const original = Box2.givenCenterSize(
      Point2.givenXY(100, 100),
      Size2.givenWidthHeight(20, 40)
    );

    const expectedSize = Size2.givenWidthHeight(5, 10);

    const boundingBox = Box2.givenTopLeftSize(
      Point2.ofZero(),
      Size2.givenWidthHeight(10, 10)
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

      const actualValue = actualFn.apply(actual) as Point2;
      const boundingValue = boundingFn.apply(actual) as Point2;

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
