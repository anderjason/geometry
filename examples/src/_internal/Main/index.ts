import { Observable } from "@anderjason/observable";
import { ElementStyle } from "@anderjason/web";
import { ManagedObject, ExclusiveInitializer } from "skytree";
import { SegmentWithClippingBox } from "../../SegmentWithClippingBox";
import { RotateAroundPoint } from "../../RotateAroundPoint";

const exampleNames: string[] = ["segmentWithClippingBox", "rotateAroundPoint"];

export class Main extends ManagedObject<void> {
  onActivate() {
    const currentExample = Observable.givenValue(exampleNames[1]);

    const wrapper = this.addManagedObject(
      WrapperStyle.toManagedElement({
        tagName: "div",
        parentElement: document.body,
      })
    );

    const content = this.addManagedObject(
      ContentStyle.toManagedElement({
        tagName: "div",
        parentElement: wrapper.element,
      })
    );

    this.addManagedObject(
      new ExclusiveInitializer({
        input: currentExample,
        fn: (exampleName) => {
          switch (exampleName) {
            case "segmentWithClippingBox":
              return new SegmentWithClippingBox({
                parentElement: content.element,
              });
            case "rotateAroundPoint":
              return new RotateAroundPoint({
                parentElement: content.element,
              });

            default:
              break;
          }
        },
      })
    );
  }
}

const WrapperStyle = ElementStyle.givenDefinition({
  css: `
    display: grid;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    grid-template-columns: 1fr 100vh;
    grid-template-areas:
      "sidebar content";
  `,
});

const ContentStyle = ElementStyle.givenDefinition({
  css: `
    grid-area: content;
    display: flex;
    overflow: hidden;
    position: relative;
    background: #17161E;
  `,
});
