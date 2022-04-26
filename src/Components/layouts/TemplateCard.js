import { sortBy } from "lodash";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ORG_APPLICATION_STATUS } from "../../lib/constants";
import Button from "../actions/Button";
import Hr from "./Hr";

const TemplateCard = ({ template, view = "templates" }) => {
  //

  const history = useHistory();

  const renderOptionsList = (options) => {
    const sortedOptions = sortBy(Object.entries(options), (o) => o[1]);

    return sortedOptions.reverse().map((o, i) => {
      if (o[1])
        return (
          <div key={i} className="flex space-x-1 items-center">
            <IncludedOptionIcon />
            <div className="font-medium tracking-wide text-3xs capitalize">
              {o[0]}
            </div>
          </div>
        );
      return (
        <div key={i} className="flex space-x-1 items-center">
          <NotIncludedOptionIcon />
          <div className="font-medium tracking-wide text-3xs capitalize opacity-90">
            {o[0]}
          </div>
        </div>
      );
    });
  };

  switch (view) {
    case "my-templates":
      return (
        <div className="relative bg-blacks-lighter shadow-sm flex-shrink-0 text-whites-light rounded-md w-60 xl:w-56 3xs:w-44 p-2.5 3xs:py-2 3xs:px-3 col-span-1 flex flex-col space-y-2.5">
          {/* View */}
          <Link
            to={`/dashboard/my-templates/${template.uniqueid}/view`}
            className="absolute top-1.5 right-1.5 text-3xs text-whites-dark flex space-x-1 justify-center items-center"
          >
            <span>view</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-2.5 w-2.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </Link>
          {/* Template name */}
          <div className="text-xs font-medium tracking-tight whitespace-nowrap overflow-hidden overflow-ellipsis w-9/12">
            {template.name}
          </div>
          {/* Horizontal line */}
          <Hr className="text-whites-light opacity-20 w-2/5" />
          {/* List of options */}
          <div className="flex flex-col space-y-1.5">
            {renderOptionsList(template.used_options)}
          </div>
          {/* Button */}
          <div className="pl-1 pt-2">
            <Button
              onClick={() =>
                history.push(
                  `/dashboard/new-event/?templateId=${template?.uniqueid}&templateName=${template?.name}`
                )
              }
              text="Use"
              variant="light"
              className="text-xs"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>
          {/* Footer */}
          <div className="flex justify-between items-center space-x-5 pt-4 flex-nowrap">
            {/* Creator */}
            {template.owner?.organization_status ===
            ORG_APPLICATION_STATUS.APPROVED ? (
              <Link
                to={`/organization/${template.owner?.organization?.uniqueid}`}
                style={{ width: "55%" }}
                className="flex space-x-1.5 items-center flex-shrink flex-grow"
              >
                {/* Avatar */}
                <img
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                  className="inline object-cover rounded-full text-3xs whitespace-nowrap min-w-max"
                  src={template.owner?.organization?.avatar}
                  alt="Organization logo"
                />
                {/* Name */}
                <div className="text-3xs font-medium tracking-wide overflow-hidden overflow-ellipsis">
                  {template.owner?.organization?.name}
                </div>
              </Link>
            ) : (
              <div
                style={{ width: "55%" }}
                className="flex space-x-1.5 items-center flex-shrink flex-grow"
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  className="inline object-cover rounded-full bg-whites-dark opacity-5"
                />
                {/* Name */}
                <div className="text-3xs font-light opacity-80 tracking-wide overflow-hidden overflow-ellipsis italic">
                  {template.owner?.displayName}
                </div>
              </div>
            )}

            {/* Used counter */}
            <div className=" text-whites-dark flex space-x-0.5 items-center flex-shrink overflow-ellipsis overflow-hidden max-w-max">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>

              <div className="text-3xs font-light italic whitespace-nowrap overflow-ellipsis overflow-hidden max-w-max">
                {template.used}
              </div>
            </div>
          </div>
        </div>
      );
    case "templates":
      return (
        <div className="relative bg-blacks-lighter shadow-sm flex-shrink-0 text-whites-light rounded-md w-60 xl:w-56 3xs:w-44 p-2.5 3xs:py-2 3xs:px-3 col-span-1 flex flex-col space-y-2.5">
          {/* View */}
          <Link
            to={`/templates/${template.uniqueid}`}
            className="absolute top-1.5 right-1.5 text-3xs text-whites-dark flex space-x-1 justify-center items-center"
          >
            <span>view</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-2.5 w-2.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </Link>
          {/* Template name */}
          <div className="text-xs font-medium tracking-tight whitespace-nowrap overflow-hidden overflow-ellipsis w-9/12">
            {template.name}
          </div>
          {/* Horizontal line */}
          <Hr className="text-whites-light opacity-20 w-2/5" />
          {/* List of options */}
          <div className="flex flex-col space-y-1.5">
            {renderOptionsList(template.used_options)}
          </div>
          {/* Button */}
          <div className="pl-1 pt-2">
            <Button
              onClick={() =>
                history.push(
                  `/dashboard/new-event/?templateId=${template?.uniqueid}&templateName=${template?.name}`
                )
              }
              text="Use"
              variant="light"
              className="text-xs"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>
          {/* Footer */}
          <div className="flex justify-between items-center space-x-5 pt-4 flex-nowrap">
            {/* Creator */}
            {template.owner?.organization_status ===
            ORG_APPLICATION_STATUS.APPROVED ? (
              <Link
                to={`/organization/${template.owner?.organization?.uniqueid}`}
                style={{ width: "55%" }}
                className="flex space-x-1.5 items-center flex-shrink flex-grow"
              >
                {/* Avatar */}
                <img
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                  className="inline object-cover rounded-full"
                  src={template.owner?.organization?.avatar}
                  alt="Organization logo"
                />
                {/* Name */}
                <div className="text-3xs font-medium tracking-wide overflow-hidden overflow-ellipsis">
                  {template.owner?.organization?.name}
                </div>
              </Link>
            ) : (
              <div
                style={{ width: "55%" }}
                className="flex space-x-1.5 items-center flex-shrink flex-grow"
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  className="inline object-cover rounded-full bg-whites-dark opacity-5"
                />
                {/* Name */}
                <div className="text-3xs font-light opacity-80 tracking-wide overflow-hidden overflow-ellipsis italic">
                  {template.owner?.displayName}
                </div>
              </div>
            )}

            {/* Used counter */}
            <div className=" text-whites-dark flex space-x-0.5 items-center flex-shrink overflow-ellipsis overflow-hidden max-w-max">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>

              <div className="text-3xs font-light italic whitespace-nowrap overflow-ellipsis overflow-hidden max-w-max">
                {template.used}
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default TemplateCard;

const IncludedOptionIcon = () => {
  return (
    <div className="w-4 h-4 rounded-full flex justify-center items-center bg-grays-dark shadow-md text-whites-light">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

const NotIncludedOptionIcon = () => {
  return (
    <div className="w-4 h-4 rounded-full flex justify-center items-center bg-grays-dark shadow-md text-primary-light">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};
