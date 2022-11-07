const actionTypes = {
  SET_USER_LOCATION: "SET_USER_LOCATION",
  SET_PLACES: "SET_PLACES",
  SET_LOADING_PLACES: "SET_LOADING_PLACES",
  SET_PLACE_SELECTED: "SET_PLACE_SELECTED",
  SET_ADDRESS: "SET_ADDRESS",
  SET_ADDRESSES: "SET_ADDRESSES",
  SET_LOADING_ADDRESSES: "SET_LOADING_ADDRESSES",
  SET_ADDRESS_SELECTED: "SET_ADDRESS_SELECTED",
};

export const placesActions = {
  setUserLocation(payload) {
    return { type: actionTypes.SET_USER_LOCATION, payload };
  },
  setPlaces(payload) {
    return { type: actionTypes.SET_PLACES, payload };
  },
  setPlaceSelected(payload) {
    return { type: actionTypes.SET_PLACE_SELECTED, payload };
  },
  setLoadingPlaces() {
    return { type: actionTypes.SET_LOADING_PLACES };
  },
  setAddress(payload) {
    return { type: actionTypes.SET_ADDRESS, payload };
  },
  setAddresses(payload) {
    return { type: actionTypes.SET_ADDRESSES, payload };
  },
  setLoadingAddresses() {
    return { type: actionTypes.SET_LOADING_ADDRESSES };
  },
  setAddressSelected(payload) {
    return { type: actionTypes.SET_ADDRESS_SELECTED, payload };
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
    case actionTypes.SET_PLACES: {
      return {
        ...state,
        isLoadingPlaces: false,
        places: payload,
      };
    }
    case actionTypes.SET_PLACE_SELECTED: {
      return {
        ...state,
        placeSelected: payload,
      };
    }
    case actionTypes.SET_LOADING_PLACES: {
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };
    }
    case actionTypes.SET_ADDRESS: {
      return {
        ...state,
        isLoadingAddress: false,
        userLocation: payload,
      };
    }
    case actionTypes.SET_ADDRESSES: {
      return {
        ...state,
        isLoadingAddresses: false,
        addresses: payload,
      };
    }
    case actionTypes.SET_LOADING_ADDRESSES: {
      return {
        ...state,
        isLoadingAddresses: true,
        places: [],
      };
    }
    case actionTypes.SET_ADDRESS_SELECTED: {
      return {
        ...state,
        addressSelected: payload,
      };
    }
    default:
      return state;
  }
};
