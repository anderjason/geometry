import { ObservableArray } from "@anderjason/observable";
import { RotateAroundPointDemo } from "./RotateAroundPointDemo";
import { SegmentWithClippingBox } from "./SegmentWithClippingBox";
import { VectorRotation } from "./VectorRotation";
import { ExampleDefinition, ExamplesHome } from "@anderjason/example-tools";

const definitions = ObservableArray.givenValues<ExampleDefinition>([
  {
    title: "Rotate around point",
    actor: new RotateAroundPointDemo({}),
  },
  {
    title: "Segment with clipping box",
    actor: new SegmentWithClippingBox(),
  },
  {
    title: "Vector rotation",
    actor: new VectorRotation(),
  },
]);

const main = new ExamplesHome({
  title: "Geometry",
  definitions,
});
main.activate();
