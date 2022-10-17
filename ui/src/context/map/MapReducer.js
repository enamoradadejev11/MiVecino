const actionTypes = {
  SET_MAP: "SET_MAP",
};

export const mapActions = {
  setMap(payload) {
    return { type: actionTypes.SET_MAP, payload };
  },
};

export const mapReducer = (state, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_MAP: {
      return {
        ...state,
        isMapReady: true,
        map: payload,
      };
    }
    default:
      return state;
  }
};
