import { ColorGradient, Color } from "@anderjason/color";
import { NumberUtil, Percent } from "@anderjason/util";
import { ManagedObject } from "skytree";
import { Point2 } from "../../../src/Point2";
import { Rotation } from "../../../src/Rotation";
import { EveryFrame } from "../_internal/EveryFrame";
import { ManagedCanvas } from "../_internal/ManagedCanvas";

export interface RotateAroundPointProps {
  parentElement: HTMLElement;
}

interface RotatingPoint {
  point: Point2;
  degreesPerFrame: number;
  color: Color;
  pulse: number;
}

export class RotateAroundPoint extends ManagedObject<RotateAroundPointProps> {
  onActivate() {
    const canvas = this.addManagedObject(
      new ManagedCanvas({
        parentElement: this.props.parentElement,
      })
    );

    const { width, height } = canvas.size.value;

    const gradient = ColorGradient.givenSteps([
      Color.givenHexString("#0099FF"),
      Color.givenHexString("#ff0099"),
    ]);

    const pointCount = 60;
    const points: RotatingPoint[] = [];
    for (let i = 0; i < pointCount; i++) {
      const speed = NumberUtil.randomNumberGivenRange(0, 1);
      points.push({
        point: Point2.givenXY(
          NumberUtil.randomNumberGivenRange(0, width),
          NumberUtil.randomNumberGivenRange(0, height)
        ),
        degreesPerFrame: NumberUtil.numberWithRangeMap(speed, 0, 1, 0.2, 0.6),
        color: gradient.toHclInterpolatedColor(
          Percent.givenFraction(Math.random(), 1)
        ),
        pulse: speed * 2,
      });
    }

    const center = Point2.givenXY(width / 2, height / 2);
    const frameDuration = 42;

    this.addManagedObject(
      new EveryFrame({
        callback: (frameNumber) => {
          const { context } = canvas;

          context.beginPath();
          context.clearRect(0, 0, width, height);

          context.beginPath();
          context.fillStyle = "#FFFFFF";
          context.moveTo(center.x, center.y);
          context.arc(center.x, center.y, 10, 0, 2 * Math.PI);
          context.fill();

          points.forEach((rotatingPoint) => {
            rotatingPoint.point = rotatingPoint.point.withRotationAroundPoint(
              center,
              Rotation.givenDegrees(rotatingPoint.degreesPerFrame)
            );

            const t = NumberUtil.numberWithRangeMap(
              Math.sin((frameNumber + rotatingPoint.pulse * 5) / frameDuration),
              -1,
              1,
              0.5,
              rotatingPoint.pulse * 0.6
            );

            const vector = center
              .toVector(rotatingPoint.point)
              .withMultipliedScalar(t);
            const point = center.withAddedVector(vector);

            context.beginPath();
            context.fillStyle = rotatingPoint.color.toHexString();
            context.moveTo(point.x, point.y);
            context.arc(point.x, point.y, 7, 0, 2 * Math.PI);
            context.fill();
          });
        },
      })
    );
  }
}
