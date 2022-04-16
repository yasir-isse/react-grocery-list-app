import React, { useEffect } from "react";

const Alert = ({ success, text, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      //invoking without params becuase of the default params
      removeAlert();
    }, 3000);

    //added the list depenedency to create new timeout on every re-render
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <p className={`alert ${success ? "alert-success" : "alert-danger"}`}>
      {text}
    </p>
  );
};

export default Alert;
