export const Actions = {
    mouseMove(point) {
        return {
            type: 'MOUSE_MOVE',
            mouseX: point.x,
            mouseY: point.y
        };
    },

    mouseDown() {
        return {
            type: 'MOUSE_DOWN',
            isDragging: true
        }
    },

    mouseUp() {
        return {
            type: 'MOUSE_UP',
            isDragging: false
        }
    }
};