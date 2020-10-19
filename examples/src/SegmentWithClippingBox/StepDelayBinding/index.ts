import { Observable, ReadOnlyObservable } from "@anderjason/observable";
import { Actor } from "skytree";

export interface StepDelayBindingProps<T> {
  input: Observable<T>;
  delaySteps: number;
}

export class StepDelayBinding<T> extends Actor<StepDelayBindingProps<T>> {
  private _output = Observable.ofEmpty<T>();
  readonly output = ReadOnlyObservable.givenObservable(this._output);

  onActivate() {
    const values: T[] = [];

    this.cancelOnDeactivate(
      this.props.input.didChange.subscribe((input) => {
        values.push(input);

        if (values.length > this.props.delaySteps) {
          this._output.setValue(values.shift());
        }
      }, true)
    );
  }
}
