import { RefreshCcw } from 'lucide-react';
import React from 'react';


interface RefreshButtonProps {
  onClick: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-neutral-500 underline">
      <RefreshCcw size="12" />
      <span>새로고침</span>
    </button>
  );
};

export default RefreshButton;
