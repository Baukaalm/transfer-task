import * as types from "./constants";

const transfer = (
  state = {
    isTransfered: false,
  },
  action
) => {
  switch (action.type) {
    case types.TRANSFER_SUCCESS:
      return {
        ...state,
        isTransfered: action.payload,
      };

    default:
      return state;
  }
};

export default transfer;
