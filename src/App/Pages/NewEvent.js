import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  useHistory,
  useRouteMatch,
  useParams,
  useLocation,
} from "react-router-dom";

// Components
import Header from "../../Components/layouts/Header";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import TeamsFieldsArray from "../../Components/forms/TeamsFieldsArray";
import FastInput from "../../Components/forms/FastInput";
import Datetime from "../../Components/forms/Datetime";
import InputSlider from "../../Components/forms/InputSlider";
import Switch from "../../Components/forms/Switch";
import PointsFields from "../../Components/forms/PointsFields";
import Button from "../../Components/actions/Button";
import PrizesFields from "../../Components/forms/PrizesFields";
import Select from "../../Components/forms/Select";
import RemainingPrizepool from "../../Components/forms/RemainingPrizepool";
import MarkdownInput from "../../Components/forms/MarkdownInput";
import LoadingBackdrop from "../../Components/layouts/LoadingBackdrop";

// MUI
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { datetimeTheme } from "../../lib/muiThemes";

// Context
import { useFormikContext } from "formik";
import NewEventContext from "../../Context/New-event/NewEventContext";
import ToastContext from "../../Context/Toast/ToastContext";

// Other
import currencies from "../../lib/currencies.json";
import { useScroll } from "react-use";

// Images
import Markdown from "../../Images/Markdown";
import Hr from "../../Components/layouts/Hr";
import FadeAnimation from "../../Animations/FadeAnimation";

// MUI Styling
const useStylesSummary = makeStyles(() => ({
  root: {
    backgroundColor: "#1E242B",
    padding: "none",
    color: "white",
  },
}));
const useStylesDetails = makeStyles(() => ({
  root: {
    backgroundColor: "#21282f",
    color: "white",
    padding: "28px 20px",
    justifyContent: "center",
  },
}));

const NewEvent = () => {
  let history = useHistory();
  let match = useRouteMatch();
  let location = useLocation();

  // Context
  const { setToast } = useContext(ToastContext);
  const { getTemplate, isTemplateSetup, resetState } =
    useContext(NewEventContext);
  const { initialValues, setValues, values, setFieldTouched } =
    useFormikContext();

  // Event template
  const templateId = useMemo(() => {
    return new URLSearchParams(location.search).get("templateId");
  }, [location.search]);
  const templateName = useMemo(() => {
    return new URLSearchParams(location.search).get("templateName");
  }, [location.search]);

  // Template fetch & setup state
  const [isSettingUpTemplate, setIsSettingUpTemplate] = useState(() =>
    templateId ? true : false
  );

  // Accordion open/close state
  const [accordionsState, setAccordionsState] = useState([
    true,
    true,
    true,
    true,
  ]);

  // Handlers

  // Accordion open/close handler
  const handleAccordionState = ({ currentTarget: { attributes } }) => {
    setAccordionsState((state) => {
      return state.map((state, index) => {
        if (index === parseInt(attributes["index"].value)) return !state;
        return state;
      });
    });
  };

  const handlePreviewEvent = () => {
    history.push(
      templateId
        ? `${match.path}/preview/?templateId=${templateId}`
        : `${match.path}/preview`
    );
    window.scrollTo(0, 0);
  };

  // MUI classes
  const classes = useStylesSummary();
  const classesDetails = useStylesDetails();

  // Template setup if existing
  useEffect(() => {
    const _GetTemplate = async () => {
      try {
        const { template } = await getTemplate(templateId);
        setValues({ ...values, ...template });
        setIsSettingUpTemplate(false);
        setToast({
          variant: "success",
          message: `New event setup with the template <span className='font-semibold'>${templateName}</span> has been initiated`,
        });
      } catch (error) {
        console.log(error);
        setIsSettingUpTemplate(false);
        setToast({
          variant: "error",
          message:
            "Apologies, there was an error setting up the template you wanted. Please try again or contact us.",
        });
      }
    };
    console.log("=== useEffect for template");
    console.log("is setting up template: ", isSettingUpTemplate);
    console.log("is template SET: ");
    if (!isSettingUpTemplate) return;
    if (isTemplateSetup) return;
    _GetTemplate();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const _resetNewEvent = () => {
      setValues(initialValues);
      resetState();
    };

    return () => location.pathname === "/dashboard" && _resetNewEvent();
  }, [location.pathname]);

  return (
    <FadeAnimation fadeIn>
      <div className="w-full flex-grow flex flex-col px-10">
        <LoadingBackdrop
          className="text-whites-light text-xs"
          size="1.75rem"
          open={isSettingUpTemplate && !isTemplateSetup}
          text="Initiating event template"
        />

        <div className="text-whites-light text-tiny font-bold pl-1">
          <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
            <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
            <span>Create new event</span>
          </div>
        </div>
        <div className="w-full flex-grow flex flex-col space-y-10 mt-5">
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            key={0}
            expanded={accordionsState[0]}
          >
            <AccordionSummary
              index={0}
              className={classes.root}
              onClick={handleAccordionState}
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="#fff"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              aria-controls="initial-info-content"
              id="initial-info-header"
            >
              <div className="text-sm font-light flex flex-nowrap flex-grow-0 justify-between px-2 w-full">
                <div className="self-start">Basic info</div>
                <div className="text-2xs tracking-tight flex-grow flex justify-center w-max">
                  <span className="opacity-60 font-light">
                    Event name, rounds, date {"&"} time..
                  </span>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classesDetails.root}>
              <BasicInfoForm />
            </AccordionDetails>
          </Accordion>
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            key={1}
            expanded={accordionsState[1]}
          >
            <AccordionSummary
              index={1}
              className={classes.root}
              onClick={handleAccordionState}
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="#fff"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              aria-controls="initial-info-content"
              id="initial-info-header"
            >
              <div className="text-sm font-light flex flex-nowrap flex-grow-0 justify-between px-2 w-full">
                <div className="self-start">Participated teams</div>
                <div className="text-2xs tracking-tight flex-grow flex justify-center w-max">
                  <span className="opacity-60 font-light">
                    Set participated teams..
                  </span>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classesDetails.root}>
              <TeamsForm />
            </AccordionDetails>
          </Accordion>
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            key={2}
            expanded={accordionsState[2]}
          >
            <AccordionSummary
              index={2}
              className={classes.root}
              onClick={handleAccordionState}
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="#fff"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              aria-controls="initial-info-content"
              id="initial-info-header"
            >
              <div className="text-sm font-light flex flex-nowrap flex-grow-0 justify-between px-2 w-full">
                <div className="self-start">Points distribution</div>
                <div className="text-2xs tracking-tight flex-grow flex justify-center w-max">
                  <span className="opacity-60 font-light">
                    Points per kill & distribution..
                  </span>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classesDetails.root}>
              <PointsForm />
            </AccordionDetails>
          </Accordion>
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            key={3}
            expanded={accordionsState[3]}
          >
            <AccordionSummary
              index={3}
              className={classes.root}
              onClick={handleAccordionState}
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="#fff"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              aria-controls="initial-info-content"
              id="initial-info-header"
            >
              <div className="text-sm font-light flex flex-nowrap flex-grow-0 justify-between px-2 w-full">
                <div className="self-start">Prizepool</div>
                <div className="text-2xs tracking-tight flex-grow flex justify-center w-max">
                  <span className="opacity-60 font-light">
                    Set a Prizepool & it's distribution..
                  </span>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classesDetails.root}>
              <PrizesForm />
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="w-full flex flex-col py-4 text-sm mt-5">
          <Hr className="w-full text-whites-dark opacity-10 my-4" />
          <Button
            className="self-end px-2.5 py-1"
            onClick={handlePreviewEvent}
            id="preview"
            text="Preview event"
            variant="success"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
      </div>
    </FadeAnimation>
  );
};

export default NewEvent;

const BasicInfoForm = () => {
  const { values, setFieldValue, handleChange } = useFormikContext();

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handlePickerClicked = () => {
    setIsPickerOpen((prev) => !prev);
  };
  return (
    <div className="w-full flex flex-col space-y-4">
      <FastInput size="large" label="Event name" name="name" />
      <MarkdownInput
        name="description"
        placeholder="Thoughts???"
        label="Description, about & details"
      />
      <ThemeProvider theme={datetimeTheme}>
        <Datetime
          className="text-sm"
          label="Date and time"
          disablePast={true}
          value={values.datetime}
          setFieldValue={setFieldValue}
          open={isPickerOpen}
          onOpen={handlePickerClicked}
          onClose={handlePickerClicked}
          color="secondary"
          name="datetime"
        />
      </ThemeProvider>

      <InputSlider
        marks={[
          { value: 1 },
          { value: 4 },
          { value: 6 },
          { value: 8 },
          { value: 12 },
          { value: 16 },
        ]}
        max={16}
        step={null}
        color="secondary"
        type="number"
        label="Rounds"
        name="rounds"
        placeholder="1"
        value={values.rounds}
        setFieldValue={setFieldValue}
      />

      <Switch
        label="Public event"
        secondaryLabel={
          values.isPublic ? (
            <>
              Event progress/info visible to{" "}
              <span className="font-semibold">everyone</span>
            </>
          ) : (
            <>
              Event progress/info visible only
              <span className="font-semibold"> by a link</span>
            </>
          )
        }
        checked={values.isPublic}
        onChange={handleChange}
        name="isPublic"
        color="secondary"
        size="small"
      />
    </div>
  );
};

const TeamsForm = () => {
  return (
    <div className="flex flex-col space-y-4 self-center">
      <TeamsFieldsArray />
    </div>
  );
};

const PointsForm = () => {
  return (
    <div className="flex flex-col space-y-4">
      <FastInput
        label="Points per kill"
        type="number"
        name="pointPerKill"
        min={0}
        size="small"
      />
      <div className="flex flex-col space-y-1">
        <label htmlFor="points distribution" className="pl-1 text-xs">
          Points distribution
        </label>
        <PointsFields />
      </div>
    </div>
  );
};

export const PrizesForm = ({ cancelable = true }) => {
  //

  const _currencies = currencies.map((currency) => {
    return {
      name: currency.name,
      code: currency.code,
      symbol: currency.symbol,
    };
  });

  const {
    values,
    initialValues,
    setFieldValue,
    setFieldTouched,
    setErrors,
    errors,
    setValues,
  } = useFormikContext();

  const [optionCard, setOptionCard] = useState(() => !values.hasPrizepool);
  const [symbol, setSymbol] = useState("$");

  // handlers
  const handleSelectCurrency = ({ target: { value } }) => {
    setSymbol(_currencies.find((currency) => currency.code === value).symbol);
    setFieldValue("prizepoolCurrency", value.toString());
  };

  const setHasPrizepool = () => {
    setFieldValue("hasPrizepool", true);
    setFieldTouched("prizepool", true);
    setOptionCard(false);
  };

  const setCancel = () => {
    delete errors.prizepool;
    delete errors.prizepoolDistribution;
    setValues({
      ...values,
      hasPrizepool: initialValues.hasPrizepool,
      prizepool: initialValues.prizepool,
      prizepoolDistribution: initialValues.prizepoolDistribution,
      remainingPrizepool: initialValues.remainingPrizepool,
      prizepoolCurrency: initialValues.prizepoolCurrency,
    });
    setErrors({ ...errors });
    setOptionCard(true);
  };

  useEffect(() => {
    setOptionCard(!values.hasPrizepool);
  }, [values.hasPrizepool]);

  if (optionCard)
    return (
      <div className="h-full w-full flex flex-col justify-center">
        <div className="w-10/12 self-center bg-blacks-light shadow-xl rounded-r-lg px-2 py-10 flex flex-col justify-center items-center space-y-3">
          <span className="tracking-wide text-xs">
            Set {"&"} distribute a prizepool?
          </span>
          <div className="flex space-x-4 justify-center items-center">
            <Button
              onClick={setHasPrizepool}
              text="Yes"
              variant="success"
              className="text-xs font-medium px-2.5 py-1"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col space-y-4">
      {cancelable && (
        <div
          onClick={setCancel}
          className="absolute cursor-pointer hover:text-whites-light hover:opacity-100 opacity-90 flex space-x-1 justify-center items-center top-11 right-4 text-2xs font-light text-whites-dark"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="">Cancel</span>
        </div>
      )}

      <FastInput
        label="Total prizepool"
        type="number"
        name="prizepool"
        size="large"
      />

      <Select
        symbol={symbol}
        name="prizepoolCurrency"
        className="pl-2 w-56 text-2xs"
        label="Currency"
        secondaryLabel="For UI/Visual representation only"
        native={true}
        options={_currencies}
        onChange={handleSelectCurrency}
      />
      <div className="pl-1 relative flex space-x-2 items-center">
        <RemainingPrizepool
          label="Remaining"
          prizepool={values.prizepool}
          distribute={values.prizepoolDistribution}
        />
      </div>
      <div className="flex flex-col space-y-1 pb-6">
        <label htmlFor="points distribution" className="pl-1 text-xs">
          Prizepool distribution
        </label>
        <PrizesFields />
      </div>
      {cancelable && (
        <div
          onClick={setCancel}
          className="absolute cursor-pointer hover:text-whites-light hover:opacity-100 opacity-90 flex space-x-1 justify-center items-center bottom-4 right-4 text-2xs font-light text-whites-dark"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="">Cancel</span>
        </div>
      )}
    </div>
  );
};
