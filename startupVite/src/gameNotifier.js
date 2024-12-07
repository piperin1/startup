const GameEvent = {
  Feed: 'gameFeed',
  Pet: 'gamePet',
  System:'system',
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class GameEventNotifier {
  events = [];
  handlers = [];
  eventQueue = []; // Queue for events

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      console.log('WebSocket connected.');
      this.eventQueue.forEach((queuedEvent) => this.socket.send(JSON.stringify(queuedEvent))); // Send queued events
      this.eventQueue = []; // Clear queue
      this.receiveEvent(new EventMessage('MyPet', GameEvent.System, { msg: 'connected' }));
    };
    this.socket.onclose = (event) => {
      console.error('WebSocket disconnected. Code:', event.code, 'Reason:', event.reason);
      this.receiveEvent(new EventMessage('MyPet', GameEvent.System, { msg: 'disconnected' }));
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
  
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(event));
      console.log('Broadcasting Event:', event);
    } else if (this.socket.readyState === WebSocket.CONNECTING) {
      console.warn('WebSocket still connecting. Queueing event.');
      this.eventQueue.push(event);
    } else {
      console.error('WebSocket not ready. Queueing event and attempting reconnect.');
      this.eventQueue.push(event);
      if (this.socket.readyState !== WebSocket.CLOSING) {
        this.reconnect();
      }
    }
  }
  

  

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.events.forEach((e) => {
      this.handlers.forEach((handler) => {
        handler(e);
      });
    });
  }
}

const GameNotifier = new GameEventNotifier();
export { GameEvent, GameNotifier };
