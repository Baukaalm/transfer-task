import * as types from "./constants";

export const sendTransfer = (bool) => (dispatch) => {
  dispatch({ type: types.TRANSFER_SUCCESS, payload: bool });
};
