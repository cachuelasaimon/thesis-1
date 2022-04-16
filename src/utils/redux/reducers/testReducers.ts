import { TEST_ACTIONS } from "../types";

const initial_state = {
  test: null,
};

function testReducer(state = initial_state, action: any) {
  switch (action) {
    case TEST_ACTIONS.TEST:
      return {
        ...state,
        test: "done",
      };
    default:
      return {
        ...state,
      };
  }
}

export default testReducer;
