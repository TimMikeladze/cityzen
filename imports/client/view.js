import { store } from '../../imports/client/store';
import { Actions } from '../../imports/client/actions';
import { Point } from '../../imports/client/types/point';

const renderCursor = () => {
    const mouseX = store.getState().get('mouseX');
    const mouseY = store.getState().get('mouseY');
    const isCursorDragging = store.getState().get('isDragging');

    View.context.fillStyle = isCursorDragging ? 'rgba(20,200,80,0.5)' : 'rgba(0,80,250,0.3)';
    View.context.arc(mouseX, mouseY, 10, 0, 2 * Math.PI);
    View.context.fill();
};

const handleChange = () => {
    View.clear();
    renderCursor();
};

export const View = {
    initialize(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.resize();
        this.registerEvents();
        this.subscribe();
    },

    resize() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    },

    clear() {
        this.canvas.width = this.canvas.width;
    },

    registerEvents() {
        window.addEventListener('resize', event => {
            this.resize();
        });

        window.addEventListener('mousemove', event => {
            store.dispatch(Actions.mouseMove(new Point(event.x, event.y)));
        });

        window.addEventListener('mousedown', event => {
            store.dispatch(Actions.mouseDown());
        });

        window.addEventListener('mouseup', event => {
            store.dispatch(Actions.mouseUp());
        });
    },

    subscribe() {
        this._unsubscribe = store.subscribe(handleChange);
    }
};