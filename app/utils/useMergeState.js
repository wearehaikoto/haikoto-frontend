import React from "react";

function useMergeState(initialState) {
    const [state, setState] = React.useState(initialState);
    const setMergedState = (newState) => {
        return setState(prevState => Object.assign({}, prevState, newState));
    }
    return [state, setMergedState];
}

export default useMergeState;