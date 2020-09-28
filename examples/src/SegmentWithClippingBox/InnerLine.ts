import { Color } from "@anderjason/color";
import { Observable, ObservableBase } from "@anderjason/observable";
import { ManagedObject } from "skytree";
import { Box2, Segment2 } from "../../../src";
import { ManagedCanvas } from "../_internal/ManagedCanvas";

export interface InnerLineProps {
  canvas: ManagedCanvas;
  box: Observable<Box2>;
  segment: ObservableBase<Segment2>;
  drawOuter: boolean;
  innerColor: Color;
}

export class InnerLine extends ManagedObject<InnerLineProps> {
  onActivate() {
    this.cancelOnDeactivate(
      this.props.segment.didChange.subscribe((segment) => {
        const { context } = this.props.canvas;

        if (this.props.drawOuter == true) {
          context.strokeStyle = this.props.innerColor.toHexString();
          context.lineWidth = 2;
          context.beginPath();
          context.moveTo(segment.startPoint.x, segment.startPoint.y);
          context.lineTo(segment.endPoint.x, segment.endPoint.y);
          context.stroke();
        }

        const clippedSegment = segment.withClippingBox(this.props.box.value);

        if (clippedSegment != null) {
          if (this.props.drawOuter == true) {
            context.strokeStyle = "#FFFFFF";
          } else {
            context.strokeStyle = this.props.innerColor.toHexString();
          }
          context.lineWidth = 3;
          context.beginPath();
          context.moveTo(
            clippedSegment.startPoint.x,
            clippedSegment.startPoint.y
          );
          context.lineTo(clippedSegment.endPoint.x, clippedSegment.endPoint.y);
          context.stroke();

          if (this.props.drawOuter == true) {
            context.fillStyle = "#FFFFFF";
            context.moveTo(
              clippedSegment.startPoint.x,
              clippedSegment.startPoint.y
            );
            context.arc(
              clippedSegment.startPoint.x,
              clippedSegment.startPoint.y,
              7,
              0,
              2 * Math.PI
            );

            context.moveTo(
              clippedSegment.endPoint.x,
              clippedSegment.endPoint.y
            );
            context.arc(
              clippedSegment.endPoint.x,
              clippedSegment.endPoint.y,
              7,
              0,
              2 * Math.PI
            );
          }

          context.fill();
        }
      })
    );
  }
}
