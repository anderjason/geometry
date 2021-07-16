import { DemoActor } from "@anderjason/example-tools";
import { Observable } from "@anderjason/observable";
import { NumberUtil } from "@anderjason/util";
import { ElementSizeWatcher, ManagedCanvas } from "@anderjason/web";
import { Vector2 } from "../../../src";
import { Point2 } from "../../../src/Point2";

export class VectorRotation extends DemoActor<void> {
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

    const speed = 7;
    const target = Observable.ofEmpty<Point2>();
    let vx: number = NumberUtil.randomNumberGivenRange(-1, 1) * speed;
    let vy: number = NumberUtil.randomNumberGivenRange(-1, 1) * speed;

    const center = Observable.ofEmpty<Point2>();

    this.cancelOnDeactivate(
      canvas.pixelSize.didChange.subscribe((size) => {
        if (size == null) {
          return;
        }

        center.setValue(Point2.givenXY(size.width / 2, size.height / 2));

        target.setValue(
          Point2.givenXY(
            NumberUtil.randomNumberGivenRange(0, size.width),
            NumberUtil.randomNumberGivenRange(0, size.height)
          )
        );
      }, true)
    );

    this.cancelOnDeactivate(
      canvas.addRenderer(0, (renderProps) => {
        if (target.value == null) {
          return;
        }

        const { context, pixelSize } = renderProps;

        const { width, height } = pixelSize;
        let { x, y } = target.value;

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

        const previousTarget = target.value;

        target.setValue(Point2.givenXY(x, y));
        context.clearRect(0, 0, width, height);

        context.fillStyle = "#FF00FF";
        context.beginPath();
        context.moveTo(target.value.x, target.value.y);
        context.arc(target.value.x, target.value.y, 10, 0, 2 * Math.PI);
        context.fill();

        context.fillStyle = "#FFFFFF";
        context.beginPath();
        context.moveTo(center.value.x, center.value.y);
        context.arc(center.value.x, center.value.y, 10, 0, 2 * Math.PI);
        context.fill();

        const oldVector = Vector2.givenPoints(center.value, previousTarget)
          .withNormalizedMagnitude()
          .withMultipliedScalar(200);

        const newVector = Vector2.givenPoints(center.value, target.value)
          .withNormalizedMagnitude()
          .withMultipliedScalar(100);

        const oldArrowPoint = center.value.withAddedVector(oldVector);
        context.strokeStyle = "#FF0000";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(center.value.x, center.value.y);
        context.lineTo(oldArrowPoint.x, oldArrowPoint.y);
        context.stroke();

        const arrowPoint = center.value.withAddedVector(newVector);
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(center.value.x, center.value.y);
        context.lineTo(arrowPoint.x, arrowPoint.y);
        context.stroke();

        context.textAlign = "left";
        context.fillStyle = "#FFFFFF";
        context.font = "20px monospace";

        context.fillText(
          oldVector.toAngle(newVector).toDegrees().toFixed(3),
          center.value.x,
          center.value.y + 100
        );

        context.fillText(
          oldVector.toSignedAngle(newVector).toDegrees().toFixed(3),
          center.value.x,
          center.value.y + 200
        );
      })
    );
  }
}
