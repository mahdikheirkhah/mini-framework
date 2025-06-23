// framework.js
class VNode {
  constructor(tag, attrs = {}, children = []) {
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
  }

  render() {
    const el = document.createElement(this.tag);
    for (const [key, value] of Object.entries(this.attrs)) {
      el.setAttribute(key, value);
    }
    this.children.forEach(child => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else {
        el.appendChild(child.render());
      }
    });
    return el;
  }
}

class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.subscribers = [];
  }
  
  getState() {
    return this.state;
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.subscribers.forEach(cb => cb(this.state));
  }
  
  subscribe(callback) {
    this.subscribers.push(callback);
  }
}

window.MyFramework = {
  VNode,
  Store
};