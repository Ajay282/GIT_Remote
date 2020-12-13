import { createStore } from "redux";
import { rootReducer } from "src/store/reducer/root-reducer";

export const store = createStore(rootReducer);