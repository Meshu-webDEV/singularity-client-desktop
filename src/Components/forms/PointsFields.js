import { FastField, FieldArray, useField } from "formik";
import { isEmpty } from "lodash";
import { toOrdinal } from "number-to-words/numberToWords";
import React from "react";

const PointsFields = () => {
  //

  // helpers
  const isError = (touched, errors, index) => {
    if (isEmpty(touched.pointsDistribution)) return;

    if (isEmpty(errors.pointsDistribution)) return;

    if (typeof touched.pointsDistribution[index] === undefined) return;

    if (typeof errors.pointsDistribution[index] === undefined) return;

    return (
      <span className="text-2xs tracking-tight text-primary-light">
        {errors.pointsDistribution[index]}
      </span>
    );
  };

  return (
    <div className="relative flex flex-col space-y-3">
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        <FieldArray name="teams">
          {(props) => {
            const {
              form: {
                values: { pointsDistribution },
                errors,
                touched,
              },
            } = props;
            return pointsDistribution.map((point, index) => {
              return (
                <div key={index} style={{ maxWidth: "140px" }}>
                  <label
                    className="text-2xs text-whites-light opacity-80  tracking-wide"
                    htmlFor={`team ${index + 1}`}
                  >
                    {toOrdinal(index + 1)} Placed
                  </label>
                  <div className="flex justify-center space-x-1">
                    <div className="flex flex-col flex-grow">
                      <FastField
                        autoComplete="off"
                        className="w-full h-8 py-1.5 px-2 text-xs dark:focus:ring-transparent dark:bg-dark-background rounded-md  dark:focus:ring-offset-transparent-dark border-transparent dark:focus:border-opacity-60 dark:focus:border-info placeholder-whites-dark placeholder-opacity-10"
                        type="number"
                        min={0}
                        name={`pointsDistribution[${index}]`}
                      />
                    </div>
                  </div>
                  {isError(touched, errors, index)}
                </div>
              );
            });
          }}
        </FieldArray>
      </div>
    </div>
  );
};

export default PointsFields;
