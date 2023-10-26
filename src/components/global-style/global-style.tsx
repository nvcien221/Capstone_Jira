import React, { Fragment, PropsWithChildren } from "react";
import "./global-style.scss";


function GlobalStyle(props: PropsWithChildren) {
  const { children } = props;
  return <Fragment>{children}</Fragment>;
}

export default GlobalStyle;