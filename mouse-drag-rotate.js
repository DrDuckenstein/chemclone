AFRAME.registerComponent("mouse-drag-rotate", {
  schema: {
    speed: { default: 1 }
  },

  init: function () {
    this.ifMouseDown = false;
    this.previousMousePosition = { x: 0, y: 0 };

    this.el.addEventListener("mousedown", () => {
      this.ifMouseDown = true;
    });

    window.addEventListener("mouseup", () => {
      this.ifMouseDown = false;
    });

    window.addEventListener("mousemove", (event) => {
      if (!this.ifMouseDown) return;

      const deltaMove = {
        x: event.movementX || event.clientX - this.previousMousePosition.x,
        y: event.movementY || event.clientY - this.previousMousePosition.y
      };

      const rotation = this.el.getAttribute("rotation");
      rotation.y += deltaMove.x * 0.5;
      rotation.x += deltaMove.y * 0.5;

      this.el.setAttribute("rotation", rotation);

      this.previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    });
  }
});
