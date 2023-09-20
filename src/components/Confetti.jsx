import React from "react";
import { useWindowSize } from "react";
import Confetti from "react-confetti";
import { useState, useRef, useEffect } from "react";


export default () => {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
};
