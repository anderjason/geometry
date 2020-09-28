import { ManagedObject } from "skytree";

export interface EveryFrameProps {
  callback: (frameNumber: number) => void;
}

export class EveryFrame extends ManagedObject<EveryFrameProps> {
  onActivate() {
    let frameNumber: number = 0;

    const nextFrame = () => {
      if (this.isActive.value === false) {
        return;
      }

      requestAnimationFrame(nextFrame);

      frameNumber += 1;
      this.props.callback(frameNumber);
    };

    requestAnimationFrame(nextFrame);
  }
}
