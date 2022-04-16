import { TEST_ACTIONS } from "utils/redux/types";

export const testAction = () => ({
  type: TEST_ACTIONS.TEST,
  payload: { name: "name", content: "etits" },
});
