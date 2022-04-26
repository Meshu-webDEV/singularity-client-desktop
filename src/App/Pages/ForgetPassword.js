import React, { useContext } from "react";

// Components
import FastInput from "../../Components/forms/FastInput";
import Button from "../../Components/actions/Button";
import Header from "../../Components/layouts/Header";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import SecondaryCard from "../../Components/layouts/SecondaryCard";

// Context
import { useFormikContext } from "formik";
import AuthContext from "../../Context/Auth/AuthContext";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";

const ForgetPassword = () => {
  //

  const { values, isSubmitting, setSubmitting } = useFormikContext();
  const { resetPassword } = useContext(AuthContext);

  // Handlers
  const handleOnRequestClicked = async () => {
    try {
      setSubmitting(true);
      await resetPassword(values);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <MobileBaseLayout
      header={<Header />}
      title="Reset Password"
      backLabel="Join"
      backPath="/join"
    >
      <div className="forget-password w-3/7">
        <SecondaryCard
          title="Password reset"
          subtitle="A new password will be Emailed to you."
          primaryAction={
            <Button
              className="px-2.5 py-1 text-sm"
              disabled={isSubmitting}
              text={
                isSubmitting ? (
                  <LoadingWithDots
                    label="Requesting"
                    flow="row"
                    size="0.65rem"
                    color="inherit"
                  />
                ) : (
                  "Request a reset"
                )
              }
              onClick={handleOnRequestClicked}
              variant="success"
              icon={
                isSubmitting ? null : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )
              }
            />
          }
        >
          <div className="flex flex-col space-y-5">
            <FastInput
              label="Registered Email"
              type="text"
              name="email"
              size="large"
            />
          </div>
        </SecondaryCard>
        <div className="py-2 pl-1 text-2xs opacity-90 text-whites-dark top-full">
          Note: Password reset can only be requested once per hour.
        </div>
      </div>
    </MobileBaseLayout>
  );
};

export default ForgetPassword;
