import { useState } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const sendRequest = async (url, method, bodyForm, applyData) => {
    setIsLoading(true);
    setIsError(null);

    const response = await fetch(url, {
      method: method || "GET",
      body: bodyForm != null ? JSON.stringify(bodyForm) : null,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setIsError(true);
      setIsLoading(false);
    }

    const jsonBody = await response.json();
    applyData(jsonBody);
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  return { isLoading, isError, sendRequest };
}

export default useHttp;
