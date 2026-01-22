AFRAME.registerComponent("free-rotate", {
  schema: {
    speed: { default: 0.35 }
  },

  init: function () {
    const el = this.el;

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    // ---------- POINTER (mouse + touch drag) ----------
    window.addEventListener("pointerdown", (e) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    window.addEventListener("pointerup", () => {
      dragging = false;
    });

    window.addEventListener("pointermove", (e) => {
      if (!dragging) return;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      const rot = el.getAttribute("rotation");

      // Horizontal drag → Y axis
      rot.y += dx * this.data.speed;

      // Vertical drag → X axis
      rot.x += dy * this.data.speed;

      el.setAttribute("rotation", rot);
    });

    // ---------- GESTURE-HANDLER EVENTS ----------
    // One finger drag
    el.sceneEl.addEventListener("onefingermove", (e) => {
      const rot = el.getAttribute("rotation");
      rot.y += e.detail.positionChange.x * 0.1;
      rot.x += e.detail.positionChange.y * 0.1;
      el.setAttribute("rotation", rot);
    });

    // Two finger twist → Z axis
    el.sceneEl.addEventListener("twofingermove", (e) => {
      const rot = el.getAttribute("rotation");
      rot.z += e.detail.angleChange * 0.5;
      el.setAttribute("rotation", rot);
    });
  }
});
