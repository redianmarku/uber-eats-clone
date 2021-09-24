import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";
import RootNavigation from "./Navigation";
import configureStore from "./redux/store";

const store = configureStore();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <RootNavigation />
    </ReduxProvider>
  );
}
