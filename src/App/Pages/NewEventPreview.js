import { useContext, useEffect, useMemo } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

// Components
import Header from "../../Components/layouts/Header";
import Hr from "../../Components/layouts/Hr";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import Button from "../../Components/actions/Button";
import SecondaryCard from "../../Components/layouts/SecondaryCard";
import GridList from "../../Components/layouts/GridList";

// Context
import { useFormikContext } from "formik";

// Other
import { formatDate } from "../../lib/utils";
import currencies from "../../lib/currencies.json";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NewEventContext from "../../Context/New-event/NewEventContext";

const _currencies = currencies.map((currency) => {
  return {
    name: currency.name,
    code: currency.code,
    symbol: currency.symbol,
  };
});

const NewEventPreview = () => {
  const history = useHistory();
  const location = useLocation();

  // Event template
  const templateId = useMemo(() => {
    return new URLSearchParams(location.search).get("templateId");
  }, [location.search]);

  const { values, errors, isValid, setValues, initialValues } =
    useFormikContext();
  const { createEvent, resetState } = useContext(NewEventContext);

  const teams = values.teams.map((team) => team.name);

  // handlers
  const handleCreateEvent = () => {
    createEvent(values, errors, isValid, setValues, initialValues, templateId);
  };

  const handleGoBack = () => {
    window.scrollTo(0, 0);
    history.goBack();
  };

  return (
    <div className="flex-grow h-full w-full flex flex-col text-whites-light space-y-4 px-10">
      <div className="text-whites-light text-tiny font-bold pl-1">
        <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
          <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
          <span>Preview event & confirm</span>
        </div>
      </div>
      <div className="flex flex-col space-y-14 justify-center items-center">
        {/* Basic info */}
        <SecondaryCard
          title="basic info"
          primaryAction={
            <Button
              text="Edit"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              }
              onClick={handleGoBack}
              variant="dark"
            />
          }
        >
          <div className="flex flex-col space-y-2 text-sm">
            <div>
              <div className="w-full flex flex-col whitespace-nowrap">
                <span className="text-2xs opacity-75 leading-snug">
                  Event name
                </span>
                <div className="w-full flex items-center space-x-3">
                  <span className="pr-1">{values.name}</span>
                  <Hr className="w-full bg-dark-backgroundDarker opacity-5" />
                </div>
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col whitespace-nowrap">
                <span className="text-2xs opacity-75 leading-snug">
                  Event type
                </span>
                <div className="w-full flex items-center space-x-3">
                  <span>{values.isPublic ? "Public" : "Private"}</span>
                  <Hr className="w-full bg-dark-backgroundDarker opacity-5" />
                </div>
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col whitespace-nowrap">
                <span className="text-2xs opacity-75 leading-snug">
                  Event rounds
                </span>
                <div className="w-full flex items-center space-x-3">
                  <span>{values.rounds} rounds</span>
                  <Hr className="w-full bg-dark-backgroundDarker opacity-5" />
                </div>
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col whitespace-nowrap">
                <span className="text-2xs opacity-75 leading-snug">
                  Event date & time
                </span>
                <div className="w-full flex items-center space-x-3">
                  <span className="font-sans">
                    {formatDate(values.datetime)}
                  </span>
                  <Hr className="w-full bg-dark-backgroundDarker opacity-5" />
                </div>
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col whitespace-nowrap">
                <span className="text-2xs opacity-75 leading-snug mb-2">
                  Event description, about & details
                </span>
                <div className="w-full flex items-center space-x-3 rounded-lg bg-dark-background p-3">
                  {values.description ? (
                    <ReactMarkdown
                      disallowedElements={["img"]}
                      className="markdown mobile text-sm"
                      remarkPlugins={[remarkGfm]}
                    >
                      {values.description}
                    </ReactMarkdown>
                  ) : (
                    <span className="py-11 px-4 w-full flex justify-center items-center text-2xs text-whites-dark opacity-50 font-light italic">
                      No description..
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SecondaryCard>
        {/* Teams */}
        <SecondaryCard
          primaryAction={
            <Button
              text="Edit"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              }
              onClick={handleGoBack}
              variant="dark"
            />
          }
          title="participated teams"
        >
          <GridList items={teams} />
        </SecondaryCard>
        {/* Points */}
        <SecondaryCard
          title="points distribution"
          primaryAction={
            <Button
              onClick={handleGoBack}
              text="Edit"
              variant="dark"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              }
            />
          }
        >
          <div className="flex items-center space-x-3 mt-2 mb-7">
            <span className="whitespace-nowrap text-tiny flex space-x-4 items-center justify-center">
              <span className="rounded-md py-2 px-4 bg-dark-background text-2xs">
                {values.pointPerKill}
              </span>
              <span>Point per kill</span>
            </span>
            <Hr className="flex-grow bg-dark-backgroundDarker opacity-5" />
          </div>
          <GridList
            items={values.pointsDistribution}
            labeledItems
            label="Place"
            isOrdinal
          />
        </SecondaryCard>
      </div>
      {/* Prizepool */}
      {values.hasPrizepool ? (
        <SecondaryCard
          title="Prizepool & it's distribution"
          primaryAction={
            <Button
              text="Edit"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              }
              onClick={handleGoBack}
              variant="dark"
            />
          }
        >
          <div className="flex items-center space-x-3 mt-2 mb-4">
            <span className="whitespace-nowrap overflow-x-scroll text-sm">
              {values.prizepool}
              {
                _currencies.find(
                  (currency) => currency.code === values.prizepoolCurrency
                ).symbol
              }{" "}
              Total prizepool
            </span>
            <Hr className="flex-grow bg-dark-backgroundDarker opacity-5" />
          </div>
          <GridList
            items={values.prizepoolDistribution}
            labeledItems
            label="Finish"
            isOrdinal
          />
        </SecondaryCard>
      ) : (
        <SecondaryCard
          title="Prizepool & it's distribution"
          primaryAction={
            <Button
              text="Set"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              }
              onClick={handleGoBack}
              variant="dark"
            />
          }
        >
          <span className="py-11 px-4 w-full flex justify-center items-center text-2xs text-whites-dark opacity-70 font-light italic">
            No prizepool..
          </span>
        </SecondaryCard>
      )}
      <div className="flex items-center space-x-3 self-end py-4 text-sm">
        <Button
          className="text-xs text-whites-dark"
          onClick={handleGoBack}
          text="Back"
          textOnly
        />
        <Button
          onClick={handleCreateEvent}
          text="Create"
          variant="success"
          className="px-2.5 py-1"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
  );
};

export default NewEventPreview;
