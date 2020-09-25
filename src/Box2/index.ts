import { Point2 } from "../Point2";
import { Size2, ScaleMode } from "../Size2";

export type Anchor2 =
  | "leftTop"
  | "centerTop"
  | "rightTop"
  | "leftCenter"
  | "center"
  | "rightCenter"
  | "leftBottom"
  | "centerBottom"
  | "rightBottom";

export class Box2 {
  static givenDomRect(domRect: DOMRect): Box2 {
    return Box2.givenTopLeftSize(
      Point2.givenXY(domRect.left, domRect.top),
      Size2.givenWidthHeight(domRect.width, domRect.height)
    );
  }

  static givenCenterSize(center: Point2, size: Size2): Box2 {
    return new Box2(center, size);
  }

  static givenOppositeCorners(pointA: Point2, pointB: Point2): Box2 {
    const minX = Math.min(pointA.x, pointB.x);
    const minY = Math.min(pointA.y, pointB.y);

    const maxX = Math.max(pointA.x, pointB.x);
    const maxY = Math.max(pointA.y, pointB.y);

    const size = Size2.givenWidthHeight(maxX - minX, maxY - minY);
    const center = Point2.givenXY(
      minX + size.width / 2,
      minY + size.height / 2
    );

    return this.givenCenterSize(center, size);
  }

  static givenTopLeftSize(topLeft: Point2, size: Size2): Box2 {
    const center = Point2.givenXY(
      topLeft.x + size.width / 2,
      topLeft.y + size.height / 2
    );

    return this.givenCenterSize(center, size);
  }

  static givenContainedPoints(points: Point2[]): Box2 {
    const allX = points.map((point) => point.x);
    const allY = points.map((point) => point.y);

    const minX = Math.min(...allX);
    const minY = Math.min(...allY);

    const maxX = Math.max(...allX);
    const maxY = Math.max(...allY);

    return Box2.givenOppositeCorners(
      Point2.givenXY(minX, minY),
      Point2.givenXY(maxX, maxY)
    );
  }

  static isEqual(a: Box2, b: Box2): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  private _center: Point2;
  private _size: Size2;

  private constructor(center: Point2, size: Size2) {
    this._center = center;
    this._size = size;
  }

  get center(): Point2 {
    return this._center;
  }

  get size(): Size2 {
    return this._size;
  }

  isPointInside(point: Point2): boolean {
    return (
      point.x >= this.toLeft() &&
      point.x <= this.toRight() &&
      point.y >= this.toTop() &&
      point.y <= this.toBottom()
    );
  }

  isEqual(other: Box2): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Box2)) {
      return false;
    }

    return (
      other._center.isEqual(this._center) && other._size.isEqual(this._size)
    );
  }

  toTop(): number {
    return this._center.y - this._size.height / 2;
  }

  toLeft(): number {
    return this._center.x - this._size.width / 2;
  }

  toRight(): number {
    return this._center.x + this._size.width / 2;
  }

  toBottom(): number {
    return this._center.y + this._size.height / 2;
  }

  toLeftTop(): Point2 {
    return Point2.givenXY(this.toLeft(), this.toTop());
  }

  toCenterTop(): Point2 {
    return Point2.givenXY(this._center.x, this.toTop());
  }

  toRightTop(): Point2 {
    return Point2.givenXY(this.toRight(), this.toTop());
  }

  toLeftCenter(): Point2 {
    return Point2.givenXY(this.toLeft(), this._center.y);
  }

  toRightCenter(): Point2 {
    return Point2.givenXY(this.toRight(), this._center.y);
  }

  toLeftBottom(): Point2 {
    return Point2.givenXY(this.toLeft(), this.toBottom());
  }

  toCenterBottom(): Point2 {
    return Point2.givenXY(this._center.x, this.toBottom());
  }

  toRightBottom(): Point2 {
    return Point2.givenXY(this.toRight(), this.toBottom());
  }

  withBoundingBox(
    boundingBox: Box2,
    scaleMode: ScaleMode,
    anchor: Anchor2
  ): Box2 {
    const newSize = this._size.withAvailableSize(boundingBox._size, scaleMode);

    let centerX: number;
    switch (anchor) {
      case "leftTop":
      case "leftCenter":
      case "leftBottom":
        centerX = boundingBox.toLeft() + newSize.toHalf().width;
        break;
      case "centerTop":
      case "center":
      case "centerBottom":
        centerX = boundingBox._center.x;
        break;
      case "rightTop":
      case "rightCenter":
      case "rightBottom":
        centerX = boundingBox.toRight() - newSize.toHalf().width;
        break;
    }

    let centerY: number;
    switch (anchor) {
      case "leftTop":
      case "centerTop":
      case "rightTop":
        centerY = boundingBox.toTop() + newSize.toHalf().height;
        break;
      case "leftCenter":
      case "center":
      case "rightCenter":
        centerY = boundingBox._center.y;
        break;
      case "leftBottom":
      case "centerBottom":
      case "rightBottom":
        centerY = boundingBox.toBottom() - newSize.toHalf().height;
        break;
    }

    return Box2.givenCenterSize(Point2.givenXY(centerX, centerY), newSize);
  }

  withAddedSize(size: Size2, anchor: Anchor2): Box2 {
    return this.withAddedWidthHeight(size.width, size.height, anchor);
  }

  withAddedWidthHeight(width: number, height: number, anchor: Anchor2): Box2 {
    const newSize = this._size.withAddedWidthHeight(width, height);

    let centerX: number;
    switch (anchor) {
      case "leftTop":
      case "leftCenter":
      case "leftBottom":
        centerX = this.toLeft() + newSize.toHalf().width;
        break;
      case "centerTop":
      case "center":
      case "centerBottom":
        centerX = this._center.x;
        break;
      case "rightTop":
      case "rightCenter":
      case "rightBottom":
        centerX = this.toRight() - newSize.toHalf().width;
        break;
    }

    let centerY: number;
    switch (anchor) {
      case "leftTop":
      case "centerTop":
      case "rightTop":
        centerY = this.toTop() + newSize.toHalf().height;
        break;
      case "leftCenter":
      case "center":
      case "rightCenter":
        centerY = this._center.y;
        break;
      case "leftBottom":
      case "centerBottom":
      case "rightBottom":
        centerY = this.toBottom() - newSize.toHalf().height;
        break;
    }

    return Box2.givenCenterSize(Point2.givenXY(centerX, centerY), newSize);
  }
}
