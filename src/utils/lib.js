const subscribe =(eventClass, handler) => {
    let sugar = function (event) {
      handler(...event.detail);
    };
    document.addEventListener(eventClass.name, sugar, { passive: true });
    return {
      unsubscribe: function unsubscribe() {
        document.removeEventListener(eventClass.name, sugar);
      },
    };
  }
  
const publish = (event) => {
    let nativeEvent = new CustomEvent(event.constructor.name, {
        detail: event.args,
    });
    document.dispatchEvent(nativeEvent);
}

class AlertEvent {
    constructor(currentConfiguration) {
        this.args = [currentConfiguration];
    }
}

export {
  subscribe,
  publish,
  AlertEvent
}