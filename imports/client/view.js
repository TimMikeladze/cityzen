export const View = class View {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.registerEvents();
        this.resize();
    }

    resize() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }

    registerEvents() {
        window.addEventListener('resize', event => {
            this.resize();
        });
    }
};