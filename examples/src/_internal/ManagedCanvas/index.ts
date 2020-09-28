import { Size2 } from "../../../../src/Size2";
import { ManagedObject } from "skytree";
import { ManagedElement, ScreenSize } from "@anderjason/web";
import { Observable, ReadOnlyObservable } from "@anderjason/observable";

export interface ManagedCanvasProps {
  parentElement: HTMLElement;
}

export class ManagedCanvas extends ManagedObject<ManagedCanvasProps> {
  private _size = Observable.ofEmpty<Size2>(Size2.isEqual);
  readonly size = ReadOnlyObservable.givenObservable(this._size);

  private _context: CanvasRenderingContext2D;

  get context(): CanvasRenderingContext2D {
    return this._context;
  }

  onActivate() {
    const canvas = this.addManagedObject(
      ManagedElement.givenDefinition({
        tagName: "canvas",
        parentElement: this.props.parentElement,
      })
    );

    this._context = canvas.element.getContext("2d")!;

    const devicePixelRatio = window.devicePixelRatio || 1;

    this.cancelOnDeactivate(
      ScreenSize.instance.availableSize.didChange.subscribe((size) => {
        if (size == null) {
          return;
        }

        const bounds = this.props.parentElement.getBoundingClientRect();
        const newSize = Size2.givenWidthHeight(
          bounds.width * devicePixelRatio,
          bounds.height * devicePixelRatio
        );

        canvas.element.width = newSize.width;
        canvas.element.height = newSize.height;
        canvas.style.width = `${bounds.width}px`;
        canvas.style.height = `${bounds.height}px`;

        this._size.setValue(newSize);
      }, true)
    );
  }
}
