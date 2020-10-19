import { Size2 } from "@anderjason/geometry";
import { Actor } from "skytree";
import { ManagedElement, ScreenSize } from "@anderjason/web";
import { Observable, ReadOnlyObservable } from "@anderjason/observable";

export interface ManagedCanvasProps {
  parentElement: Observable<HTMLElement>;
}

export class ManagedCanvas extends Actor<ManagedCanvasProps> {
  private _size = Observable.ofEmpty<Size2>(Size2.isEqual);
  readonly size = ReadOnlyObservable.givenObservable(this._size);

  private _canvas: ManagedElement<HTMLCanvasElement>;
  private _context: CanvasRenderingContext2D;

  get context(): CanvasRenderingContext2D {
    return this._context;
  }

  get element(): HTMLCanvasElement {
    return this._canvas.element;
  }

  onActivate() {
    this._canvas = this.addActor(
      ManagedElement.givenDefinition({
        tagName: "canvas",
        parentElement: this.props.parentElement,
      })
    );
    this._context = this._canvas.element.getContext("2d")!;

    const devicePixelRatio = window.devicePixelRatio || 1;

    this.cancelOnDeactivate(
      ScreenSize.instance.availableSize.didChange.subscribe((size) => {
        if (size == null) {
          return;
        }

        if (this.props.parentElement.value == null) {
          return;
        }

        const bounds = this.props.parentElement.value.getBoundingClientRect();
        const newSize = Size2.givenWidthHeight(
          bounds.width * devicePixelRatio,
          bounds.height * devicePixelRatio
        );

        this._canvas.element.width = newSize.width;
        this._canvas.element.height = newSize.height;
        this._canvas.style.width = `${bounds.width}px`;
        this._canvas.style.height = `${bounds.height}px`;

        this._size.setValue(newSize);
      }, true)
    );
  }
}
