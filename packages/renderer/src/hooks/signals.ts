import { Accessor, Setter, Signal, createSignal } from "solid-js"

export class SimpleSignal<T> {
  private getter: Accessor<T | undefined>
  private setter: Setter<T | undefined>

  constructor(signal: Signal<T | undefined>) {
    this.getter = signal[0]
    this.setter = signal[1]
  }

  get value(): T | undefined {
    return this.getter()
  }

  set value(newValue: T | undefined) {
    this.setter(() => newValue)
  }

  get valueOrDie(): T {
    const value = this.getter()

    if (value === undefined) throw new Error('Value is undefined.')

    return value
  }

  get isUndefined(): boolean {
    return this.getter() === undefined
  }
}

export const useSignal = <T>(initialValue?: T): SimpleSignal<T> => new SimpleSignal<T>(createSignal<T | undefined>(initialValue))
