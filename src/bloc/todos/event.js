class Event {
  constructor() {
    // Prevent class from being instantiated (Abstract)
    // TS has abstract keyword
    if (new.target === Event) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }
}

export class Load extends Event {}
