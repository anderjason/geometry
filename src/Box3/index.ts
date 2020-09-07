import { Size3 } from "../Size3";
import { Point3 } from "../Point3";
import { ScaleMode } from "../Size2";
import { StringUtil } from "@anderjason/util";

export type Anchor3 =
  | "leftTopFront"
  | "centerTopFront"
  | "rightTopFront"
  | "leftCenterFront"
  | "frontCenter"
  | "rightCenterFront"
  | "leftBottomFront"
  | "centerBottomFront"
  | "rightBottomFront"
  | "leftTopCenter"
  | "topCenter"
  | "rightTopCenter"
  | "leftCenter"
  | "center"
  | "rightCenter"
  | "leftBottomCenter"
  | "bottomCenter"
  | "rightBottomCenter"
  | "leftTopBack"
  | "centerTopBack"
  | "rightTopBack"
  | "leftCenterBack"
  | "backCenter"
  | "rightCenterBack"
  | "leftBottomBack"
  | "centerBottomBack"
  | "rightBottomBack";

export class Box3 {
  static givenCenterSize(center: Point3, size: Size3): Box3 {
    return new Box3(center, size);
  }

  static givenOppositeCorners(pointA: Point3, pointB: Point3): Box3 {
    const minX = Math.min(pointA.x, pointB.x);
    const minY = Math.min(pointA.y, pointB.y);
    const minZ = Math.min(pointA.z, pointB.z);

    const maxX = Math.max(pointA.x, pointB.x);
    const maxY = Math.max(pointA.y, pointB.y);
    const maxZ = Math.max(pointA.z, pointB.z);

    const size = Size3.givenWidthHeightDepth(
      maxX - minX,
      maxY - minY,
      maxZ - minZ
    );

    const center = Point3.givenXYZ(
      minX + size.width / 2,
      minY + size.height / 2,
      minZ + size.depth / 2
    );

    return this.givenCenterSize(center, size);
  }

  static givenContainedPoints(points: Point3[]): Box3 {
    const allX = points.map((point) => point.x);
    const allY = points.map((point) => point.y);
    const allZ = points.map((point) => point.z);

    const minX = Math.min(...allX);
    const minY = Math.min(...allY);
    const minZ = Math.min(...allZ);

    const maxX = Math.max(...allX);
    const maxY = Math.max(...allY);
    const maxZ = Math.max(...allZ);

    return Box3.givenOppositeCorners(
      Point3.givenXYZ(minX, minY, minZ),
      Point3.givenXYZ(maxX, maxY, maxZ)
    );
  }

  static isEqual(a: Box3, b: Box3): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  private _center: Point3;
  private _size: Size3;

  private constructor(center: Point3, size: Size3) {
    this._center = center;
    this._size = size;
  }

  get center(): Point3 {
    return this._center;
  }

  get size(): Size3 {
    return this._size;
  }

  isPointInside(point: Point3): boolean {
    return (
      point.x >= this.toLeft() &&
      point.x <= this.toRight() &&
      point.y >= this.toTop() &&
      point.y <= this.toBottom() &&
      point.z <= this.toFront() &&
      point.z >= this.toBack()
    );
  }

  isEqual(other: Box3): boolean {
    if (other == null) {
      return false;
    }

    if (!(other instanceof Box3)) {
      return false;
    }

    return (
      other._center.isEqual(this._center) && other._size.isEqual(this._size)
    );
  }

  toClone(): Box3 {
    return new Box3(this._center.toClone(), this._size.toClone());
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

  toFront(): number {
    return this._center.z + this._size.depth / 2;
  }

  toBack(): number {
    return this._center.z - this._size.depth / 2;
  }

  toLeftTopFront(): Point3 {
    return Point3.givenXYZ(this.toLeft(), this.toTop(), this.toFront());
  }

  toCenterTopFront(): Point3 {
    return Point3.givenXYZ(this._center.x, this.toTop(), this.toFront());
  }

  toRightTopFront(): Point3 {
    return Point3.givenXYZ(this.toRight(), this.toTop(), this.toFront());
  }

  toLeftCenterFront(): Point3 {
    return Point3.givenXYZ(this.toLeft(), this._center.y, this.toFront());
  }

  toFrontCenter(): Point3 {
    return Point3.givenXYZ(this._center.x, this._center.y, this.toFront());
  }

  toRightCenterFront(): Point3 {
    return Point3.givenXYZ(this.toRight(), this._center.y, this.toFront());
  }

  toLeftBottomFront(): Point3 {
    return Point3.givenXYZ(this.toLeft(), this.toBottom(), this.toFront());
  }

  toCenterBottomFront(): Point3 {
    return Point3.givenXYZ(this._center.x, this.toBottom(), this.toFront());
  }

  toRightBottomFront(): Point3 {
    return Point3.givenXYZ(this.toRight(), this.toBottom(), this.toFront());
  }

  // ---

  toLeftTopCenter(): Point3 {
    return Point3.givenXYZ(this.toLeft(), this.toTop(), this._center.z);
  }

  toTopCenter(): Point3 {
    return Point3.givenXYZ(this._center.x, this.toTop(), this._center.z);
  }

  toRightTopCenter(): Point3 {
    return Point3.givenXYZ(this.toRight(), this.toTop(), this._center.z);
  }

  toLeftCenter(): Point3 {
    return Point3.givenXYZ(this.toLeft(), this._center.y, this._center.z);
  }

  toRightCenter(): Point3 {
    return Point3.givenXYZ(this.toRight(), this._center.y, this._center.z);
  }

  toLeftBottomCenter(): Point3 {
    return Point3.givenXYZ(this.toLeft(), this.toBottom(), this._center.z);
  }

  toBottomCenter(): Point3 {
    return Point3.givenXYZ(this._center.x, this.toBottom(), this._center.z);
  }

  toRightBottomCenter(): Point3 {
    return Point3.givenXYZ(this.toRight(), this.toBottom(), this._center.z);
  }

  // ----

  toLeftTopBack(): Point3 {
    return Point3.givenXYZ(this.toLeft(), this.toTop(), this.toBack());
  }

  toCenterTopBack(): Point3 {
    return Point3.givenXYZ(this._center.x, this.toTop(), this.toBack());
  }

  toRightTopBack(): Point3 {
    return Point3.givenXYZ(this.toRight(), this.toTop(), this.toBack());
  }

  toLeftCenterBack(): Point3 {
    return Point3.givenXYZ(this.toLeft(), this._center.y, this.toBack());
  }

  toBackCenter(): Point3 {
    return Point3.givenXYZ(this._center.x, this._center.y, this.toBack());
  }

  toRightCenterBack(): Point3 {
    return Point3.givenXYZ(this.toRight(), this._center.y, this.toBack());
  }

  toLeftBottomBack(): Point3 {
    return Point3.givenXYZ(this.toLeft(), this.toBottom(), this.toBack());
  }

  toCenterBottomBack(): Point3 {
    return Point3.givenXYZ(this._center.x, this.toBottom(), this.toBack());
  }

  toRightBottomBack(): Point3 {
    return Point3.givenXYZ(this.toRight(), this.toBottom(), this.toBack());
  }

  withBoundingBox(
    boundingBox: Box3,
    scaleMode: ScaleMode,
    anchor: Anchor3
  ): Box3 {
    const newSize = this._size.withAvailableSize(boundingBox._size, scaleMode);

    let centerX: number;
    switch (anchor) {
      case "leftTopFront":
      case "leftTopCenter":
      case "leftTopBack":
      case "leftCenterFront":
      case "leftCenter":
      case "leftCenterBack":
      case "leftBottomFront":
      case "leftBottomCenter":
      case "leftBottomBack":
        centerX = boundingBox.toLeft() + newSize.toHalf().width;
        break;
      case "centerTopFront":
      case "topCenter":
      case "centerTopBack":
      case "frontCenter":
      case "center":
      case "backCenter":
      case "centerBottomFront":
      case "bottomCenter":
      case "centerBottomBack":
        centerX = boundingBox._center.x;
        break;
      case "rightTopFront":
      case "rightTopCenter":
      case "rightTopBack":
      case "rightCenterFront":
      case "rightCenter":
      case "rightCenterBack":
      case "rightBottomFront":
      case "rightBottomCenter":
      case "rightBottomBack":
        centerX = boundingBox.toRight() - newSize.toHalf().width;
        break;
    }

    let centerY: number;
    switch (anchor) {
      case "leftTopFront":
      case "centerTopFront":
      case "rightTopFront":
      case "leftTopCenter":
      case "topCenter":
      case "rightTopCenter":
      case "leftTopBack":
      case "centerTopBack":
      case "rightTopBack":
        centerY = boundingBox.toTop() + newSize.toHalf().height;
        break;
      case "leftCenterFront":
      case "frontCenter":
      case "rightCenterFront":
      case "leftCenter":
      case "center":
      case "rightCenter":
      case "leftCenterBack":
      case "backCenter":
      case "rightCenterBack":
        centerY = boundingBox._center.y;
        break;
      case "leftBottomFront":
      case "centerBottomFront":
      case "rightBottomFront":
      case "leftBottomCenter":
      case "bottomCenter":
      case "rightBottomCenter":
      case "leftBottomBack":
      case "centerBottomBack":
      case "rightBottomBack":
        centerY = boundingBox.toBottom() - newSize.toHalf().height;
        break;
    }

    let centerZ: number;
    switch (anchor) {
      case "leftTopFront":
      case "centerTopFront":
      case "rightTopFront":
      case "leftCenterFront":
      case "frontCenter":
      case "rightCenterFront":
      case "leftBottomFront":
      case "centerBottomFront":
      case "rightBottomFront":
        centerZ = boundingBox.toFront() - newSize.toHalf().depth;
        break;
      case "leftTopCenter":
      case "topCenter":
      case "rightTopCenter":
      case "leftCenter":
      case "center":
      case "rightCenter":
      case "leftBottomCenter":
      case "bottomCenter":
      case "rightBottomCenter":
        centerZ = boundingBox._center.z;
        break;
      case "leftTopBack":
      case "centerTopBack":
      case "rightTopBack":
      case "leftCenterBack":
      case "backCenter":
      case "rightCenterBack":
      case "leftBottomBack":
      case "centerBottomBack":
      case "rightBottomBack":
        centerZ = boundingBox.toBack() + newSize.toHalf().depth;
        break;
    }

    return Box3.givenCenterSize(
      Point3.givenXYZ(centerX, centerY, centerZ),
      newSize
    );
  }

  withAddedSize(size: Size3, anchor: Anchor3): Box3 {
    return this.withAddedWidthHeightDepth(
      size.width,
      size.height,
      size.depth,
      anchor
    );
  }

  withAddedWidthHeightDepth(
    width: number,
    height: number,
    depth: number,
    anchor: Anchor3
  ): Box3 {
    const newSize = this._size.withAddedWidthHeightDepth(width, height, depth);

    let centerX: number;
    switch (anchor) {
      case "leftTopFront":
      case "leftTopCenter":
      case "leftTopBack":
      case "leftCenterFront":
      case "leftCenter":
      case "leftCenterBack":
      case "leftBottomFront":
      case "leftBottomCenter":
      case "leftBottomBack":
        centerX = this.toLeft() + newSize.toHalf().width;
        break;
      case "centerTopFront":
      case "topCenter":
      case "centerTopBack":
      case "frontCenter":
      case "center":
      case "backCenter":
      case "centerBottomFront":
      case "bottomCenter":
      case "centerBottomBack":
        centerX = this._center.x;
        break;
      case "rightTopFront":
      case "rightTopCenter":
      case "rightTopBack":
      case "rightCenterFront":
      case "rightCenter":
      case "rightCenterBack":
      case "rightBottomFront":
      case "rightBottomCenter":
      case "rightBottomBack":
        centerX = this.toRight() - newSize.toHalf().width;
        break;
    }

    let centerY: number;
    switch (anchor) {
      case "leftTopFront":
      case "centerTopFront":
      case "rightTopFront":
      case "leftTopCenter":
      case "topCenter":
      case "rightTopCenter":
      case "leftTopBack":
      case "centerTopBack":
      case "rightTopBack":
        centerY = this.toTop() + newSize.toHalf().height;
        break;
      case "leftCenterFront":
      case "frontCenter":
      case "rightCenterFront":
      case "leftCenter":
      case "center":
      case "rightCenter":
      case "leftCenterBack":
      case "backCenter":
      case "rightCenterBack":
        centerY = this._center.y;
        break;
      case "leftBottomFront":
      case "centerBottomFront":
      case "rightBottomFront":
      case "leftBottomCenter":
      case "bottomCenter":
      case "rightBottomCenter":
      case "leftBottomBack":
      case "centerBottomBack":
      case "rightBottomBack":
        centerY = this.toBottom() - newSize.toHalf().height;
        break;
    }

    let centerZ: number;
    switch (anchor) {
      case "leftTopFront":
      case "centerTopFront":
      case "rightTopFront":
      case "leftCenterFront":
      case "frontCenter":
      case "rightCenterFront":
      case "leftBottomFront":
      case "centerBottomFront":
      case "rightBottomFront":
        centerZ = this.toFront() - newSize.toHalf().depth;
        break;
      case "leftTopCenter":
      case "topCenter":
      case "rightTopCenter":
      case "leftCenter":
      case "center":
      case "rightCenter":
      case "leftBottomCenter":
      case "bottomCenter":
      case "rightBottomCenter":
        centerZ = this._center.z;
        break;
      case "leftTopBack":
      case "centerTopBack":
      case "rightTopBack":
      case "leftCenterBack":
      case "backCenter":
      case "rightCenterBack":
      case "leftBottomBack":
      case "centerBottomBack":
      case "rightBottomBack":
        centerZ = this.toBack() + newSize.toHalf().depth;
        break;
    }

    return Box3.givenCenterSize(
      Point3.givenXYZ(centerX, centerY, centerZ),
      newSize
    );
  }
}
