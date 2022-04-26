import React from "react";
import { toOrdinal } from "number-to-words/numberToWords";
import { capitalize } from "lodash";

const GridList = ({
  items = [],
  labeledItems = false,
  label = "",
  isOrdinal = false,
}) => {
  return (
    <div className="grid grid-cols-4 gap-x-3.5 gap-y-4 text-2xs font-medium mb-1">
      {items.map((item, index) => (
        <GridItem
          key={index}
          index={index}
          item={item}
          labeledItems={labeledItems}
          label={label}
          isOrdinal={isOrdinal}
        />
      ))}
    </div>
  );
};

export default GridList;

const GridItem = ({
  index,
  item,
  labeledItems = false,
  label = "",
  isOrdinal = false,
}) => {
  switch (labeledItems) {
    case true:
      if (isOrdinal)
        return (
          <div className="flex flex-col space-y-1">
            <span className="text-2xs font-light opacity-90 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {capitalize(toOrdinal(index + 1))} {label}
            </span>
            <div className="bg-dark-background p-x-1.5 py-3 rounded-md text-center overflow-hidden overflow-ellipsis">
              {item}
            </div>
          </div>
        );
      return (
        <div className="flex flex-col space-y-1">
          <span className="text-2xs font-light opacity-90 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {label} {index + 1}
          </span>
          <div className="bg-dark-background p-x-1.5 py-3 rounded-md text-center overflow-hidden overflow-ellipsis">
            {item}
          </div>
        </div>
      );
    case false:
      return (
        <div className="bg-dark-background p-x-1.5 py-3 rounded-md text-center overflow-hidden overflow-ellipsis">
          {item}
        </div>
      );

    default:
      break;
  }

  return (
    <div className="bg-dark-background p-x-1.5 py-3 rounded-md text-center overflow-hidden overflow-ellipsis">
      {item}
    </div>
  );
};
