AFRAME.registerComponent("mouse-rotate", {
  init: function () {
    const el = this.el;
    const sceneEl = el.sceneEl;

    sceneEl.addEventListener("render-target-loaded", () => {
      const canvas = sceneEl.canvas;

      let dragging = false;
      let lastX = 0;

      canvas.addEventListener("mousedown", (e) => {
        dragging = true;
        lastX = e.clientX;
      });

      window.addEventListener("mouseup", () => {
        dragging = false;
      });

      window.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const dx = e.clientX - lastX;
        lastX = e.clientX;

        const rot = el.getAttribute("rotation");
        rot.y += dx * 0.4;
        el.setAttribute("rotation", rot);
      });
    });
  }
});
