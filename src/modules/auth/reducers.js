import * as types from './constants';

const user = (
    state = {
        amount: 50000,
        threshold: 10000,
        name: "Черный",
        surname: "Властелин"

    },
    action
) => {
    switch (action.type) {
        case types.USER_UPDATE:
            return {
                ...state,
                amount: action.payload
            };

        default:
            return state;
    }
};

export default user;
