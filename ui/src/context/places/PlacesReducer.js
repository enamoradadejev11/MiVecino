const actionTypes = {
  SET_USER_LOCATION: "SET_USER_LOCATION",
};

export const placesActions = {
  setUserLocation(payload) {
    return { type: actionTypes.SET_USER_LOCATION, payload };
  },
};

export const placesReducer = (state, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_USER_LOCATION: {
      return {
        ...state,
        isLoading: false,
        userLocation: payload,
      };
    }
    default:
      return state;
  }
};
