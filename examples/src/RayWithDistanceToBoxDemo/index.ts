import { DemoActor } from "@anderjason/example-tools";
import { ElementSizeWatcher, ManagedCanvas } from "@anderjason/web";
import { NumberUtil } from "skytree/node_modules/@anderjason/util";
import { Box2, Ray2, Rotation, Segment2, Size2, Vector2 } from "../../../src";
import { Point2 } from "../../../src/Point2";

export class RayWithDistanceToBoxDemo extends DemoActor<void> {
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
          Rotation.givenRadians(frameNumber * 0.01)
        );
        const ray = new Ray2(origin, direction);

        let nearestBox: Box2;
        let shortestDistance: number;

        boxes.forEach((box) => {
          const distance = ray.toDistanceGivenBox(box);
          if (distance != null) {
            if (shortestDistance == null || distance < shortestDistance) {
              nearestBox = box;
              shortestDistance = distance;
            }
          }
        });

        boxes.forEach((box) => {
          context.beginPath();
          context.strokeStyle = "#999999";
          const left = box.toLeft();
          const top = box.toTop();
          const right = box.toRight();
          const bottom = box.toBottom();

          if (nearestBox == box) {
            context.fillStyle = "#0000FF";
          }

          context.moveTo(left, top);
          context.lineTo(right, top);
          context.lineTo(right, bottom);
          context.lineTo(left, bottom);
          context.lineTo(left, top);
          context.stroke();

          if (nearestBox == box) {
            context.fill();
          }

          context.closePath();
        });

        context.textAlign = "center";
        context.fillStyle = "#FFFFFF";
        context.font = "20px monospace";

        if (shortestDistance != null) {
          const segmentToBox = Segment2.givenPoints(
            origin,
            origin.withAddedVector(
              direction
                .withNormalizedMagnitude()
                .withMultipliedScalar(shortestDistance)
            )
          );
          context.beginPath();
          context.strokeStyle = "#0000FF";
          context.moveTo(segmentToBox.startX, segmentToBox.startY);
          context.lineTo(segmentToBox.endX, segmentToBox.endY);
          context.stroke();
          context.closePath();

          context.fillText(
            String(Math.round(shortestDistance)),
            origin.x,
            origin.y + 40
          );
        } else {
          const segmentToEdge = ray.toSegmentGivenBoundingBox(boundingBox);
          context.beginPath();
          context.strokeStyle = "#FF0000";
          context.moveTo(segmentToEdge.startX, segmentToEdge.startY);
          context.lineTo(segmentToEdge.endX, segmentToEdge.endY);
          context.stroke();
          context.closePath();
        }

        context.beginPath();
        context.fillStyle = "#FFFFFF";
        context.moveTo(origin.x, origin.y);
        context.arc(origin.x, origin.y, 10, 0, 2 * Math.PI);
        context.fill();

        const directionSegment = Segment2.givenPoints(
          origin,
          origin.withAddedVector(
            direction.withNormalizedMagnitude().withMultipliedScalar(35)
          )
        );
        context.beginPath();
        context.strokeStyle = "#FFFFFF";
        context.moveTo(directionSegment.startX, directionSegment.startY);
        context.lineTo(directionSegment.endX, directionSegment.endY);
        context.stroke();
        context.closePath();
      })
    );
  }
}
