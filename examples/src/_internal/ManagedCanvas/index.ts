import { Size2 } from "@anderjason/geometry";
import { Actor } from "skytree";
import { ManagedElement } from "@anderjason/web";
import { Observable, ObservableBase } from "@anderjason/observable";

export interface ManagedCanvasProps {
  parentElement: Observable<HTMLElement>;
  size: ObservableBase<Size2>;
}

export class ManagedCanvas extends Actor<ManagedCanvasProps> {
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
      this.props.size.didChange.subscribe((size) => {
        if (size == null) {
          return;
        }

        if (this.props.parentElement.value == null) {
          return;
        }

        const newSize = Size2.givenWidthHeight(
          size.width * devicePixelRatio,
          size.height * devicePixelRatio
        );

        this._canvas.element.width = newSize.width;
        this._canvas.element.height = newSize.height;
        this._canvas.style.width = `${size.width}px`;
        this._canvas.style.height = `${size.height}px`;
      }, true)
    );
  }
}
