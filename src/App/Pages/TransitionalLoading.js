import React from "react";
import DashboardGridLayout from "../../Components/layouts/DashboardGridLayout";
import GridLayout from "../../Components/layouts/GridLayout";

// Components
import Header from "../../Components/layouts/Header";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";

const TransitionalLoading = ({ text }) => {
  return (
    <div className="bg-dark-background min-h-screen">
      <header className="header w-full m-0 sticky z-50 text-whites-light flex items-center justify-center">
        <Header isTransitional />
      </header>
      <div className="w-full relative h-screen -mt-28 flex flex-col flex-grow space-y-6 items-center justify-center px-4 py-4 text-2xs text-whites-light">
        <LoadingWithDots label={text} size="2rem" logo />
      </div>
    </div>
  );
};

export default TransitionalLoading;
