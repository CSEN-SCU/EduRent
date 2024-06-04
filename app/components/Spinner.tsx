"use client";
import { Audio } from "react-loader-spinner";


const Spinner = () => {
  return (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="#862633"
      ariaLabel="loading"
    />
  );
};

export default Spinner;