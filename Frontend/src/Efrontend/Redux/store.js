import { createStore } from "redux";
import rootReducer from "./reducers"; // ✅ Make sure reducers are correctly imported

const store = createStore(rootReducer);

export default store;
