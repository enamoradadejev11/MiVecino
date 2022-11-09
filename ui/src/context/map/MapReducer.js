const actionTypes = {
  SET_MAP: "SET_MAP",
  SET_MARKERS: "SET_MARKERS",
  SET_ADDRESS_MAP: "SET_ADDRESS_MAP",
  SET_ADDRESS_MARKERS: "SET_ADDRESS_MARKERS",
};

export const mapActions = {
  setMap(payload) {
    return { type: actionTypes.SET_MAP, payload };
  },
  setMarkers(payload) {
    return { type: actionTypes.SET_MARKERS, payload };
  },
  setAddressMap(payload) {
    return { type: actionTypes.SET_ADDRESS_MAP, payload };
  },
  setAddressMarkers(payload) {
    return { type: actionTypes.SET_ADDRESS_MARKERS, payload };
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
    case actionTypes.SET_MARKERS: {
      return {
        ...state,
        markers: payload,
      };
    }
    case actionTypes.SET_ADDRESS_MAP: {
      return {
        ...state,
        isAddressMapReady: true,
        addressMap: payload,
      };
    }
    case actionTypes.SET_ADDRESS_MARKERS: {
      return {
        ...state,
        addressMarkers: payload,
      };
    }
    default:
      return state;
  }
};
