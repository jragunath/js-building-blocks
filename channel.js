class Channel {
  constructor() {
    this.subscribers = {};
  }

  subscribe(type, fn, context) {
    const func = typeof fn === 'function' ? fn : context[fn];

    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }

    this.subscribers[type].push({ fn: func, context: context || this });
  }

  unsubscribe(type, fn, context) {
    const subscribers = this.subscribers[type] || [];

    const filteredSubscribers = subscribers.filter(
      subscriber => subscriber.fn !== fn && subscriber.context !== context
    );

    this.subscribers[type] = filteredSubscribers;
  }

  publish(type, data) {
    const subscribers = this.subscribers[type] || [];
    subscribers.forEach(subscriber => {
      const { fn, context } = subscriber;
      fn.call(context, data);
    });
  }
}

export default new Channel();