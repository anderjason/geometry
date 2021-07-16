import { Color, ColorGradient } from "@anderjason/color";
import { DemoActor } from "@anderjason/example-tools";
import { NumberUtil, Percent } from "@anderjason/util";
import { ElementSizeWatcher, ManagedCanvas } from "@anderjason/web";
import { Point2 } from "../../../src/Point2";
import { Rotation } from "../../../src/Rotation";

export interface RotateAroundPointDemoProps {}

interface RotatingPoint {
  point: Point2;
  degreesPerFrame: number;
  color: Color;
  pulse: number;
}

export class RotateAroundPointDemo extends DemoActor<RotateAroundPointDemoProps> {
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

    const gradient = ColorGradient.givenSteps([
      Color.givenHexString("#0099FF"),
      Color.givenHexString("#ff0099"),
    ]);

    let points: RotatingPoint[] = [];
    let center: Point2;

    this.cancelOnDeactivate(
      canvas.pixelSize.didChange.subscribe((size) => {
        if (size == null) {
          return;
        }

        const { width, height } = size;

        const pointCount = 15;
        points = [];

        for (let i = 0; i < pointCount; i++) {
          const speed = NumberUtil.randomNumberGivenRange(0, 1);
          points.push({
            point: Point2.givenXY(
              NumberUtil.randomNumberGivenRange(0, width),
              NumberUtil.randomNumberGivenRange(0, height)
            ),
            degreesPerFrame: NumberUtil.numberWithRangeMap(
              speed,
              0,
              1,
              0.2,
              0.6
            ),
            color: gradient.toHclInterpolatedColor(
              Percent.givenFraction(Math.random(), 1)
            ),
            pulse: speed * 2,
          });
        }

        center = Point2.givenXY(width / 2, height / 2);
      }, true)
    );

    const frameDuration = 42;
    let frameNumber = 0;

    this.cancelOnDeactivate(
      canvas.addRenderer(0, (renderProps) => {
        const { context, pixelSize } = renderProps;

        if (pixelSize == null) {
          return;
        }

        frameNumber += 1;

        const { width, height } = pixelSize;

        context.beginPath();
        context.fillStyle = "#17161E";
        context.fillRect(0, 0, width, height);

        context.beginPath();
        context.fillStyle = "#FFFFFF";
        context.moveTo(center.x, center.y);
        context.arc(center.x, center.y, 10, 0, 2 * Math.PI);
        context.fill();

        let i = 0;

        points.forEach((rotatingPoint, idx) => {
          rotatingPoint.point = rotatingPoint.point.withRotationAroundPoint(
            center,
            Rotation.givenDegrees(rotatingPoint.degreesPerFrame)
          );

          const c = NumberUtil.numberWithRangeMap(
            Math.sin((frameNumber + rotatingPoint.pulse) / frameDuration),
            -1,
            1,
            0,
            1
          );

          const vector = center.toVector(rotatingPoint.point);

          const point = center.withAddedVector(vector);

          context.beginPath();
          const color = gradient.toHclInterpolatedColor(
            Percent.givenFraction(c, 1)
          );
          context.fillStyle = color.toHexString();
          context.moveTo(point.x, point.y);
          context.arc(point.x, point.y, 7, 0, 2 * Math.PI);
          context.fill();
        });
      })
    );
  }
}
