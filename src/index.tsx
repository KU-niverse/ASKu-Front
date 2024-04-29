import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// @ts-expect-error TS(6142): Module './App' was resolved to 'C:/Users/User/Desk... Remove this comment to see the full error message
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga4";
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

// 구글 애널리틱스 초기화
// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
}

const queryClient = new QueryClient();  // QueryClient 인스턴스 생성

// @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <React.StrictMode>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <QueryClientProvider client={queryClient}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <RecoilRoot>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
reportWebVitals();
