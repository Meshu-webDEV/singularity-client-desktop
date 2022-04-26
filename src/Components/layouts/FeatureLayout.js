import React from "react";
import Blob from "../../Images/Blob";
import Space from "../../Images/Space";
import Carousel from "../actions/Carousel";

const FeatureLayout = ({
  dir,
  feature = {
    secondaryTitle: "",
    title: "",
    sub: "",
    description: [],
    images: [],
    images_padding: "",
  },
}) => {
  if (dir === "rtl")
    return (
      <div className="h-screen relative flex-grow w-full self-center flex justify-center items-center">
        {/* space */}
        <div className="space absolute transform right-full translate-x-2/3 scale-90 xl:scale-100">
          <Space />
        </div>
        {/* blob */}
        <div className="blob absolute transform left-full -translate-x-2/3 scale-80 xl:scale-100">
          <Blob />
        </div>
        <div className="feature-grid z-50 grid grid-cols-12 gap-4 w-6/7 self-center">
          <div
            className={`screens col-start-1 col-span-5 text-whites-light ${
              feature.images_padding && feature.images_padding
            }`}
          >
            <div className="block">
              <Carousel images={feature.images} />
            </div>
          </div>
          <div className="feature col-start-8 col-span-6 h-3/4 flex flex-col space-y-4 justify-center ">
            <div className="title flex items-end">
              <h1 className="leading-none relative -ml-8 text-whites-light text-6xl font-bold xl:text-8xl">
                {feature.title}
                {feature.secondaryTitle && (
                  <div className="absolute transform text-sm left-2 -translate-y-1.5 font-light text-whites-dark">
                    {feature.secondaryTitle}
                  </div>
                )}
              </h1>

              {feature.sub ? (
                <div className="text-primary-light text-4xl font-black">
                  {feature.sub}
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full mb-2.5 bg-primary-light xl:w-5 xl:h-5" />
              )}
            </div>
            <div
              className={`description flex flex-col space-y-3 text-whites-light text-tiny xl:text-base ${
                feature.secondaryTitle && "pt-2"
              }`}
            >
              {feature.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  if (dir === "ltr")
    return (
      <div className="h-screen relative flex-grow w-full self-center flex justify-center items-center">
        {/* space */}
        <div className="space absolute transform scale-x-flip left-full -translate-x-2/3 scale-80 xl:scale-100">
          <Space />
        </div>
        {/* blob */}
        <div className="blob absolute transform scale-x-flip right-full translate-x-5/8 scale-90 xl:scale-100">
          <Blob />
        </div>
        <div className="feature-grid z-50 grid grid-cols-12 gap-4 w-6/7 self-center">
          <div className="feature col-start-1 col-span-5 h-3/4 flex flex-col space-y-4 justify-center xl:col-span-6">
            <div className="title flex items-end">
              {feature.sub ? (
                <div className="text-primary-light -mr-1 text-4xl font-black">
                  {feature.sub}
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full mb-2.5 bg-primary-light xl:w-5 xl:h-5" />
              )}
              <h1 className="leading-none relative -mr-8 ml-1 text-whites-light text-6xl font-bold xl:text-8xl">
                {feature.title}
                {feature.secondaryTitle && (
                  <div className="absolute transform text-sm right-18 -translate-y-1.5 font-light text-whites-dark">
                    {feature.secondaryTitle}
                  </div>
                )}
              </h1>
            </div>
            <div
              className={`description flex flex-col space-y-3 text-whites-light text-tiny xl:text-base ${
                feature.secondaryTitle && "pt-2"
              }`}
            >
              {feature.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div
            className={`screens col-start-8 col-span-6 text-whites-light ${
              feature.images_padding && feature.images_padding
            }`}
          >
            <div className="block">
              <Carousel images={feature.images} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default FeatureLayout;
