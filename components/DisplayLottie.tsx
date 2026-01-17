import React from "react";
import Lottie from "react-lottie";

type DisplayLottieProps = {
  animationPath: string; // public path like "/lottie/coding.json"
};

const DisplayLottie = ({ animationPath }: DisplayLottieProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    path: animationPath, // ✅ use path, NOT require/import
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions as any} />;
};

export default DisplayLottie;
