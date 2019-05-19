const createHtmlMediaElementMock = () => {
  if (global.window && global.window.HTMLMediaElement) {
    global.window.HTMLMediaElement.prototype.play = () => { };
    global.window.HTMLMediaElement.prototype.pause = () => { };
    global.window.HTMLMediaElement.prototype.load = () => { };
  }
};

global.beforeEach(() => {
  createHtmlMediaElementMock();
});
