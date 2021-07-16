import { DemoActor } from "@anderjason/example-tools";
import { ElementSizeWatcher, ManagedCanvas } from "@anderjason/web";
import { NumberUtil } from "skytree/node_modules/@anderjason/util";
import { Box2, Ray2, Rotation, Size2, Vector2 } from "../../../src";
import { Point2 } from "../../../src/Point2";

function raysGivenReferenceAndFieldOfView(reference: Ray2, fieldOfViewDegrees: number, count: number): Ray2[] {
  if (count < 2) {
    throw new Error("Count must be at least 2");
  }

  let interval = fieldOfViewDegrees / (count - 1);
  let rotation = Rotation.givenDegrees(0 - (fieldOfViewDegrees / 2));

  const result: Ray2[] = [];
  for (let i = 0; i < count; i++) {
    const rayDirection = reference.direction.withRotation(rotation, "clockwise");
    const ray = new Ray2(reference.origin, rayDirection);

    rotation = Rotation.givenDegrees(rotation.toDegrees() + interval);

    result.push(ray);
  }

  return result;
}

export class FieldOfViewDemo extends DemoActor<void> {
  onActivate() {
    const parentSize = this.addActor(
      new ElementSizeWatcher({
        element: this.parentElement,
      })
    );

    const canvas = this.addActor(
      new ManagedCanvas({
        parentElement: this.parentElement,
        displaySize: parentSize.output,
        renderEveryFrame: true,
      })
    );

    let boundingBox: Box2;
    const boxCount = 10;
    let boxes: Box2[] = [];
    let origin: Point2;
    const speed = 1;
    let vx: number = NumberUtil.randomNumberGivenRange(-1, 1) * speed;
    let vy: number = NumberUtil.randomNumberGivenRange(-1, 1) * speed;

    this.cancelOnDeactivate(
      canvas.pixelSize.didChange.subscribe((size) => {
        if (size == null) {
          return;
        }

        const { width, height } = size;

        for (let i = 0; i < boxCount; i++) {
          const point = Point2.givenXY(
            NumberUtil.randomNumberGivenRange(0, width),
            NumberUtil.randomNumberGivenRange(0, height)
          );
          const size = Size2.givenWidthHeight(
            NumberUtil.randomNumberGivenRange(50, 200),
            NumberUtil.randomNumberGivenRange(50, 200)
          );

          boxes.push(Box2.givenCenterSize(point, size));
        }

        origin = Point2.givenXY(width / 2, height / 2);
        boundingBox = Box2.givenTopLeftSize(
          Point2.ofZero(),
          Size2.givenWidthHeight(width, height)
        );
      }, true)
    );

    let frameNumber = 1;

    this.cancelOnDeactivate(
      canvas.addRenderer(0, (renderProps) => {
        const { context, pixelSize } = renderProps;

        if (pixelSize == null) {
          return;
        }

        frameNumber += 1;

        const { width, height } = pixelSize;

        context.lineWidth = 2;

        context.beginPath();
        context.fillStyle = "#17161E";
        context.fillRect(0, 0, width, height);

        let { x, y } = origin;

        x += vx;
        y += vy;

        if (x >= width || x < 0) {
          x = NumberUtil.numberWithHardLimit(x, 0, width);
          vx *= -1;
        }

        if (y >= height || y < 0) {
          y = NumberUtil.numberWithHardLimit(y, 0, height);
          vy *= -1;
        }

        origin = Point2.givenXY(x, y);

        const direction = Vector2.givenMagnitudeAndRotation(
          1,
          Rotation.givenRadians(frameNumber * 0.005)
        );
        const referenceRay = new Ray2(origin, direction);

        const spreadRays = raysGivenReferenceAndFieldOfView(referenceRay, 35, 8);
        spreadRays.forEach(ray => {
          const segment = ray.toSegmentGivenBoundingBox(boundingBox);
          context.beginPath();
          context.strokeStyle = "#0000FF";
          context.moveTo(segment.startX, segment.startY);
          context.lineTo(segment.endX, segment.endY);
          context.stroke();
          context.closePath();  
        })

        context.beginPath();
        context.fillStyle = "#FFFFFF";
        context.moveTo(origin.x, origin.y);
        context.arc(origin.x, origin.y, 10, 0, 2 * Math.PI);
        context.fill();

        const referenceSegment = referenceRay.toSegmentGivenBoundingBox(boundingBox);
        
        context.beginPath();
        context.strokeStyle = "#FFFFFF";
        context.moveTo(referenceSegment.startX, referenceSegment.startY);
        context.lineTo(referenceSegment.endX, referenceSegment.endY);
        context.stroke();
        context.closePath();
      })
    );
  }
}
