import { ColorGradient, Color } from "@anderjason/color";
import { Observable } from "@anderjason/observable";
import { NumberUtil, Percent } from "@anderjason/util";
import { EveryFrame } from "@anderjason/web";
import { Actor, ConditionalActivator } from "skytree";
import { Point2 } from "../../../src/Point2";
import { Rotation } from "../../../src/Rotation";
import { ManagedCanvas } from "../_internal/ManagedCanvas";

export interface RotateAroundPointDemoProps {}

interface RotatingPoint {
  point: Point2;
  degreesPerFrame: number;
  color: Color;
  pulse: number;
}

export class RotateAroundPointDemo extends Actor<RotateAroundPointDemoProps> {
  readonly parentElement = Observable.ofEmpty<HTMLElement>();
  readonly isVisible = Observable.ofEmpty<boolean>();

  onActivate() {
    const canvas = this.addActor(
      new ManagedCanvas({
        parentElement: this.parentElement,
      })
    );

    this.cancelOnDeactivate(
      this.parentElement.didChange.subscribe((pe) => {
        console.log(pe);
      }, true)
    );

    const gradient = ColorGradient.givenSteps([
      Color.givenHexString("#0099FF"),
      Color.givenHexString("#ff0099"),
    ]);

    let points: RotatingPoint[] = [];
    let center: Point2;

    this.cancelOnDeactivate(
      canvas.size.didChange.subscribe((size) => {
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

    this.addActor(
      new ConditionalActivator({
        input: this.isVisible,
        fn: (v) => v,
        actor: new EveryFrame({
          callback: (frameNumber) => {
            console.log("render");
            const { context } = canvas;
            if (canvas.size.value == null) {
              return;
            }

            const { width, height } = canvas.size.value;

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
          },
        }),
      })
    );
  }
}
