import { useEffect, useState } from "react";

export const Progress = () => {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const int = setTimeout(() => {
      if (dots.length >= 4) {
        setDots(".");
      } else {
        setDots((prevState) => `${prevState}.`);
      }
    }, 500);
    return () => {
      clearTimeout(int);
    };
  }, [dots, setDots]);
  return <>{dots}</>;
};
