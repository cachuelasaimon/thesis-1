import { all, call, takeLatest } from "redux-saga/effects";
import { TEST_ACTIONS } from "../types";

export function* doSomthn() {
  try {
    yield console.log("Browweewewe");
  } catch (err) {
    console.log(err);
  }
}
export function* placeholderFunc() {
  yield takeLatest(TEST_ACTIONS.TEST, doSomthn);
}

export default function* Saga() {
  yield all([call(placeholderFunc)]);
}
