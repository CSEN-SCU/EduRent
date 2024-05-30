"use client";
import { IoClose } from "react-icons/io5";

interface CloseButtonProps {
  onClick: () => void;
  size: number;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, size }) => {
  return <IoClose size={size} onClick={onClick} />;
};

export default CloseButton;
