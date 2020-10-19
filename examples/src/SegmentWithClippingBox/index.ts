import { Actor, ConditionalActivator } from "skytree";
import { Segment2 } from "../../../src/Segment2";
import { ManagedCanvas } from "../_internal/ManagedCanvas";
import { NumberUtil, Percent } from "@anderjason/util";
import { Box2 } from "../../../src/Box2";
import { Size2 } from "../../../src/Size2";
import { Point2 } from "../../../src/Point2";
import { InnerLine } from "./InnerLine";
import { Observable } from "@anderjason/observable";
import { ColorGradient, Color } from "@anderjason/color";
import { StepDelayBinding } from "./StepDelayBinding";
import { EveryFrame } from "@anderjason/web";

export class SegmentWithClippingBox extends Actor<void> {
  readonly parentElement = Observable.ofEmpty<HTMLElement>();
  readonly isVisible = Observable.ofEmpty<boolean>();

  onActivate() {
    const canvas = this.addActor(
      new ManagedCanvas({
        parentElement: this.parentElement,
      })
    );

    const speed = 7;
    let vx1: number = NumberUtil.randomNumberGivenRange(-1, 1) * speed;
    let vy1: number = NumberUtil.randomNumberGivenRange(-1, 1) * speed;
    let vx2: number = NumberUtil.randomNumberGivenRange(-1, 1) * speed;
    let vy2: number = NumberUtil.randomNumberGivenRange(-1, 1) * speed;

    const box = Observable.ofEmpty<Box2>();
    const segment = Observable.ofEmpty<Segment2>();

    this.cancelOnDeactivate(
      canvas.size.didChange.subscribe((size) => {
        if (size == null) {
          return;
        }

        box.setValue(
          Box2.givenCenterSize(
            Point2.givenXY(size.width / 2, size.height / 2),
            Size2.givenWidthHeight(size.width / 2, size.height / 2)
          )
        );

        segment.setValue(
          Segment2.givenXYPair(
            NumberUtil.randomNumberGivenRange(0, size.width),
            NumberUtil.randomNumberGivenRange(0, size.height),
            NumberUtil.randomNumberGivenRange(0, size.width),
            NumberUtil.randomNumberGivenRange(0, size.height)
          )
        );
      }, true)
    );

    const frameDuration = 150;

    const gradient = ColorGradient.givenSteps([
      Color.givenHexString("#9966ff"),
      Color.givenHexString("#0099FF"),
    ]);

    this.addActor(
      new ConditionalActivator({
        input: this.isVisible,
        fn: (v) => v,
        actor: new EveryFrame({
          callback: (frameNumber) => {
            const { context } = canvas;
            const { width, height } = canvas.size.value;

            const t = NumberUtil.numberWithRangeMap(
              Math.sin(frameNumber / frameDuration),
              -1,
              1,
              0.3,
              0.7
            );

            box.setValue(
              Box2.givenCenterSize(
                Point2.givenXY(width / 2, height / 2),
                Size2.givenWidthHeight(width * t, height * t)
              )
            );

            let x1 = segment.value.startPoint.x;
            let y1 = segment.value.startPoint.y;
            let x2 = segment.value.endPoint.x;
            let y2 = segment.value.endPoint.y;

            x1 += vx1;
            y1 += vy1;
            x2 += vx2;
            y2 += vy2;

            if (x1 >= width || x1 < 0) {
              x1 = NumberUtil.numberWithHardLimit(x1, 0, width);
              vx1 *= -1;
            }

            if (x2 >= width || x2 < 0) {
              x2 = NumberUtil.numberWithHardLimit(x2, 0, width);
              vx2 *= -1;
            }

            if (y1 >= height || y1 < 0) {
              y1 = NumberUtil.numberWithHardLimit(y1, 0, width);
              vy1 *= -1;
            }

            if (y2 >= height || y2 < 0) {
              y2 = NumberUtil.numberWithHardLimit(y2, 0, width);
              vy2 *= -1;
            }

            segment.setValue(Segment2.givenXYPair(x1, y1, x2, y2));

            context.clearRect(0, 0, width, height);

            context.beginPath();
            context.strokeStyle = "#9966ff";
            context.lineWidth = 2;
            context.strokeRect(
              box.value.toLeft(),
              box.value.toTop(),
              box.value.size.width,
              box.value.size.height
            );
          },
        }),
      })
    );

    for (let i = 0; i < 20; i++) {
      const delayedSegment = this.addActor(
        new StepDelayBinding({
          input: segment,
          delaySteps: i * 7,
        })
      );

      this.addActor(
        new InnerLine({
          box,
          segment: delayedSegment.output,
          canvas,
          drawOuter: i === 1,
          innerColor: gradient.toHclInterpolatedColor(
            Percent.givenFraction(i, 20)
          ),
        })
      );
    }
  }
}
