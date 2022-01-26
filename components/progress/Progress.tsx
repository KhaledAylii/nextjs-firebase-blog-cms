import { useEffect, useState } from "react";

export const Progress = () => {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const int = setInterval(() => {
      if (dots.length >= 3) {
        setDots("");
      } else {
        setDots((prevState) => `${prevState}.`);
      }
    }, 500);
    return () => {
      clearInterval(int);
    };
  }, []);
  return <>{dots}</>;
};
