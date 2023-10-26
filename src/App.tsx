/** set-up routing */
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

/** style global */
import GlobalStyle from "./components/global-style/global-style";

/** set-up redux */
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/config-store";

// app để config dự án
export function App() {
  return (
    <ReduxProvider store={store}>
      <GlobalStyle>
        <RouterProvider router={router}></RouterProvider>
      </GlobalStyle>
    </ReduxProvider>
  );
}
