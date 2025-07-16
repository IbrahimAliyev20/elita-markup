// components/Spinner.tsx
import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen dark:bg-darkBgHeader">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-neutral-600" />
    </div>
  );
};

export default Spinner;
