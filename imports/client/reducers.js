const reactiveState = new ReactiveDict('redux-state');

const appReducer = function appReducer(state, action) {
    state = state || reactiveState;

    switch (action.type) {
        case 'MOUSE_MOVE':
            state.set('mouseX', action.mouseX);
            state.set('mouseY', action.mouseY);
            return state;
        case 'MOUSE_DOWN':
            state.set('isDragging', action.isDragging);
            return state;
        case 'MOUSE_UP':
            state.set('isDragging', action.isDragging);
            return state;
        default:
            return state;
    }
};

export { appReducer };