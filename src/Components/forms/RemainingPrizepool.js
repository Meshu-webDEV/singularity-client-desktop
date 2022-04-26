import { useContext, useEffect, useMemo, useState } from "react";
import { FastField, useField, useFormikContext } from "formik";

// Other
import isPositive from "is-positive";
import TinySquare from "../layouts/TinySquare";
import ToastContext from "../../Context/Toast/ToastContext";

const RemainingPrizepool = ({
  noLabel = false,
  label,
  secondaryLabel,
  className,
  prizepool = 0,
  distribute = [],
}) => {
  //

  const [warned, setWarned] = useState(0);
  const { setToast } = useContext(ToastContext);

  const remainingBorderIndicator = () => {
    if (distributedSummed === 0) return "border-success";
    if (!isPositive(distributedSummed)) return "border-primary-light";
    if (distributedSummed <= prizepool / 4) return "border-secondPlace";
    if (distributedSummed <= prizepool / 2) return "border-thirdPlace";
    if (distributedSummed === prizepool) return "border-primary-light";
    if (distributedSummed > prizepool) return "border-primary-light";

    return "border-thirdPlace";
  };
  const remainingBackgroundIndicator = () => {
    if (distributedSummed === 0) return "bg-success";
    if (!isPositive(distributedSummed)) return "bg-primary-light";
    if (distributedSummed <= prizepool / 4) return "bg-secondPlace";
    if (distributedSummed <= prizepool / 2) return "bg-thirdPlace";
    if (distributedSummed === prizepool) return "bg-primary-light";
    if (distributedSummed > prizepool) return "bg-primary-light";

    return "bg-thirdPlace";
  };

  const distributedSummed = useMemo(
    () => distribute.reduce((sum, value) => sum + value),
    [distribute, prizepool]
  );

  const remaining = useMemo(() => {
    if (typeof distributedSummed === "string") return "-";
    if (!isPositive(distributedSummed)) return "-";
    return prizepool - distributedSummed;
  }, [distribute, prizepool]);

  useEffect(() => {
    if (typeof remaining !== "number") return;

    if (remaining < 0) {
      setWarned((p) => p + 1);
      if (warned > 1) return;
      return setToast({
        variant: "warning",
        message:
          "Careful.. The distribution have exceeded the total prizepool you set!",
      });
    }
  }, [remaining]);

  return (
    <div className={`flex flex-col text-whites-light space-y-1 ${className}`}>
      <div className="w-full flex">
        <label className="text-xs flex items-center space-x-1">
          <TinySquare size="tiny" className={remainingBackgroundIndicator()} />
          {label}
        </label>
        <span className="text-2xs font-light tracking-tight opacity-60 p-1">
          {secondaryLabel}
        </span>
      </div>
      <div
        className={`w-28 overflow-hidden flex-grow h-8 py-1.5 px-2 text-xs bg-dark-backgroundDark rounded-tr-md rounded-br-md shadow-lg border-l-4 border-t-0 border-b-0 border-r-0 ${remainingBorderIndicator()} flex justify-between items-center`}
      >
        {remaining}
      </div>
    </div>
  );
};

export default RemainingPrizepool;
