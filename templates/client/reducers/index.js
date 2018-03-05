const initialState = {
  page: "HOME",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_PAGE": {
      return {
        page: action.payload,
      };
    }
    default:
      return state;
  }
}
