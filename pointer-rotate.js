AFRAME.registerComponent("pointer-rotate", {
  schema: {
    speed: { default: 0.3 }
  },

  init: function () {
    const el = this.el;

    let active = false;
    let lastX = 0;

    window.addEventListener("pointerdown", (e) => {
      active = true;
      lastX = e.clientX;
    });

    window.addEventListener("pointerup", () => {
      active = false;
    });

    window.addEventListener("pointermove", (e) => {
      if (!active) return;

      const dx = e.clientX - lastX;
      lastX = e.clientX;

      const rot = el.getAttribute("rotation");
      rot.y += dx * this.data.speed;
      el.setAttribute("rotation", rot);
    });
  }
});
