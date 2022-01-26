import React, { useState, useEffect } from "react";
import { DivProps } from "../../helpers/types";

export const FlashingCursor: React.FC<DivProps & { cursorSize: number }> = ({
  children,
  cursorSize = 3,
  ...props
}) => {
  const [showCursor, setShowCursor] = useState<boolean>(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowCursor(!showCursor);
    }, 800);
    return () => clearInterval(intervalId);
  }, [showCursor]);
  return (
    <>
      <div
        {...props}
        style={{
          borderRight: `${showCursor ? "0px" : `${cursorSize}px`} solid
          `,
          marginRight: `${showCursor ? "0px" : `-${cursorSize}px`}`,
          display: "block",
          width: "fit-content",
        }}
      >
        {children}
      </div>
    </>
  );
};
