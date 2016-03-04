export const Actions = {
    mouseMove(point) {
        return {
            type: 'MOUSE_MOVE',
            mouseX: point.x,
            mouseY: point.y
        };
    },

    mouseDown(event) {
        return {
            type: 'MOUSE_DOWN',
            isDragging: true,
            roadX: event.x,
            roadY: event.y
        }
    },

    mouseUp() {
        return {
            type: 'MOUSE_UP',
            isDragging: false
        }
    }
};