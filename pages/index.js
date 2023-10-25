import React from "react";

// INTERNAL IMPORTS
import { useStateContext } from "../Context";

const index = () => {
  const { TOKEN_ICO } = useStateContext()
  return <div><h1>{TOKEN_ICO}</h1></div>;
};

export default index;
