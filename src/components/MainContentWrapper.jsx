import React from "react";

const MainContentWrapper = ({ children }) => {
  return (
    <div
      className="
        ml-[20%] w-[80%] min-h-screen
        bg-white dark:bg-black
        text-gray-950 dark:text-gray-200
        border-l border-gray-300 dark:border-gray-700
        transition-all
      "
    >
      {children}
    </div>
  );
};

export default MainContentWrapper;
