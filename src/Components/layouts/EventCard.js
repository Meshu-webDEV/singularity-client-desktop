import React from "react";
import { Link } from "react-router-dom";

// Components
import CurrencyFormat from "./CurrencyFormat";

// Other
import { formatDate, fromDate } from "../../lib/utils";
import LiveIndicator from "./LiveIndicator";
import Hr from "./Hr";
import { ORG_APPLICATION_STATUS } from "../../lib/constants";
const EventCard = ({
  placeholder = false,
  view = "dashboard",
  rounded = "lg",
  uniqueid,
  name,
  datetime,
  rounds,
  currentRound,
  status,
  isPublic,
  hasPrizepool,
  prizepool,
  prizepoolCurrency,
  owner,
}) => {
  // Helpers
  const displayEventType = (isPublic) => (isPublic ? "Public" : "Private");
  // prettier-ignore
  const displayEventHasPrizepool = hasPrizepool => hasPrizepool ? prizepool : false;
  const getEventStatus = (status) => {
    if (status === 0) return "ongoing";
    if (status === 1) return "upcoming";
    if (status === 2) return "completed";
  };

  const renderOwnerLink = (owner) => {
    if (owner.organization_status === ORG_APPLICATION_STATUS.APPROVED)
      return (
        <>
          <div className="w-full pt-2">
            <Hr className="text-whites-dark opacity-10 w-full" />
          </div>
          <div className="flex flex-col space-y-1 pt-2">
            <div className="text-3xs font-light uppercase opacity-70">
              Organizer
            </div>
            <Link
              to={`/organization/${owner?.organization?.uniqueid}`}
              className="flex -space-x-1 max-w-min items-center rounded-sm bg-dark-backgroundDark shadow-sm opacity-90 filter hover:brightness-110 hover:shadow-lg hover:opacity-100"
            >
              <div
                style={{ maxWidth: "200px" }}
                className="uppercase text-2xs flex-shrink whitespace-nowrap bg-dark-backgroundDark shadow-sm pt-1 pb-0.5 rounded-md pl-4 pr-4 overflow-hidden overflow-ellipsis"
              >
                {owner.organization.name}
              </div>
              <div className="pr-3.5 pb-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </div>
            </Link>
          </div>
        </>
      );

    return (
      <>
        <div className="w-full pt-2">
          <Hr className="text-whites-dark opacity-10 w-full" />
        </div>
        <div className="flex flex-col space-y-1 pt-2">
          <div className="text-2xs font-medium uppercase">Organizer</div>
          <div className="flex -space-x-1 max-w-min items-center">
            <div
              style={{ maxWidth: "140px" }}
              className="rounded-sm uppercase text-2xs flex-shrink whitespace-nowrap pl-2.5 pr-4 overflow-hidden overflow-ellipsis italic opacity-90"
            >
              {owner.username}
            </div>
          </div>
        </div>
      </>
    );
  };

  switch (view) {
    case "dashboard":
      return (
        <DashboardCardView
          placeholder={placeholder}
          uniqueid={uniqueid}
          datetime={datetime}
          name={name}
          rounds={rounds}
          currentRound={currentRound}
          status={status}
          hasPrizepool={hasPrizepool}
          prizepool={prizepool}
          prizepoolCurrency={prizepoolCurrency}
          isPublic={isPublic}
          displayEventType={displayEventType}
          displayEventHasPrizepool={displayEventHasPrizepool}
          getEventStatus={getEventStatus}
          rounded={rounded}
        />
      );
    case "explore":
      return (
        <ExploreCardView
          uniqueid={uniqueid}
          datetime={datetime}
          name={name}
          rounds={rounds}
          currentRound={currentRound}
          status={status}
          hasPrizepool={hasPrizepool}
          prizepool={prizepool}
          prizepoolCurrency={prizepoolCurrency}
          isPublic={isPublic}
          displayEventType={displayEventType}
          displayEventHasPrizepool={displayEventHasPrizepool}
          getEventStatus={getEventStatus}
          owner={owner}
          renderOwnerLink={renderOwnerLink}
          rounded={rounded}
        />
      );
    case "organization":
      return (
        <OrganizationView
          uniqueid={uniqueid}
          datetime={datetime}
          name={name}
          rounds={rounds}
          currentRound={currentRound}
          status={status}
          hasPrizepool={hasPrizepool}
          prizepool={prizepool}
          prizepoolCurrency={prizepoolCurrency}
          isPublic={isPublic}
          displayEventType={displayEventType}
          displayEventHasPrizepool={displayEventHasPrizepool}
          getEventStatus={getEventStatus}
          owner={owner}
          rounded={rounded}
        />
      );
    default:
      break;
  }
};

export default EventCard;

const DashboardCardView = ({
  placeholder,
  uniqueid,
  name,
  datetime,
  rounds,
  currentRound,
  status,
  isPublic,
  hasPrizepool,
  prizepool,
  prizepoolCurrency,
  displayEventType,
  displayEventHasPrizepool,
  getEventStatus,
  rounded,
}) => {
  if (placeholder)
    return (
      <div className="px-4 py-4 space-y-1 flex items-start flex-col flex-shrink-0">
        <div className="flex flex-col space-y-1 items-center text-whites-dark p-5 rounded-sm text-2xs whitespace-nowrap">
          <span className="opacity-70">You don't have any events yet</span>
          <span className="opacity-70">
            Start by creating your first event{" "}
            <Link
              to="/dashboard/new-event"
              className="font-medium text-success"
            >
              here
            </Link>
          </span>
        </div>
      </div>
    );

  switch (getEventStatus(status)) {
    case "ongoing":
      return (
        <Link
          key={uniqueid}
          to={`/${uniqueid}`}
          className="filter hover:brightness-110 hover:shadow-xl"
        >
          <div
            className={`indicator-ongoing px-4 w-74 py-6 relative shadow-md flex items-start flex-col flex-shrink-0 rounded-tr-${rounded} rounded-b-${rounded} bg-gradient-to-br bg-grays-light 2xl:w-80`}
          >
            <div className="w-full flex justify-between">
              <span className="items-center text-xs font-medium flex space-x-1  text-success tracking-tighter">
                <LiveIndicator />
              </span>
            </div>

            <div className="flex w-full flex-col space-y-2 justify-start">
              <span className="text-lg w-56 overflow-ellipsis overflow-hidden whitespace-nowrap font-medium  text-whites-light">
                {name}
              </span>
              <div className="w-full flex justify-between">
                <div className="flex flex-col flex-shrink-0 space-y-1 justify-start text-2xs">
                  <span className="flex space-x-0.5 items-center">
                    <div>
                      <span className="opacity-90">Total rounds - </span>
                      <span className="font-medium">{rounds}</span>
                    </div>
                    <span className="font-sans pb-0.5">/</span>
                    <div>
                      <span className="opacity-90">Current round - </span>
                      <span className="font-medium ">{currentRound + 1}</span>
                    </div>
                  </span>
                  <span>
                    <span className="opacity-90">Event type - </span>
                    <span className="font-medium">
                      {displayEventType(isPublic)}
                    </span>
                  </span>
                  <span>
                    <span className="opacity-90">Prizepool - </span>
                    <span className="font-medium">
                      {displayEventHasPrizepool(hasPrizepool) ? (
                        <CurrencyFormat
                          value={prizepool}
                          suffix={` ${prizepoolCurrency}`}
                        />
                      ) : (
                        <span className="tracking-tight italic font-light opacity-50 text-2xs">
                          Not set..
                        </span>
                      )}
                    </span>
                  </span>
                </div>
                <div className="flex justify-end items-end text-2xs  text-whites-dark opacity-80 tracking-tight font-sans">
                  <div className="max-w-min">{formatDate(datetime)}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    case "upcoming":
      return (
        <Link
          key={uniqueid}
          to={`/${uniqueid}`}
          className="filter hover:brightness-110 hover:shadow-xl"
        >
          <div
            className={`indicator-upcoming px-4 w-74 py-6 border-whites-light border-opacity-40 relative shadow-md flex items-start flex-col flex-shrink-0 bg-gradient-to-br rounded-tr-${rounded} rounded-b-${rounded} bg-blacks-lighter 2xl:w-80`}
          >
            <div className="w-full flex justify-between">
              <span className="items-center text-2xs font-normal flex space-x-1  text-whites-dark opacity-80 tracking-tight">
                Upcoming..
              </span>
              <span className="items-center flex space-x-1 text-2xs font-light  text-whites-dark opacity-80 tracking-tight">
                {fromDate(datetime)}
              </span>
            </div>

            <div className="flex w-full flex-col space-y-2 justify-start">
              <span className="text-lg w-56 overflow-ellipsis overflow-hidden whitespace-nowrap font-medium  text-whites-light">
                {name}
              </span>
              <div className="w-full flex justify-between">
                <div className="flex flex-col flex-shrink-0 space-y-1 justify-start text-2xs">
                  <span className="flex space-x-0.5 items-center">
                    <div>
                      <span className="opacity-90">Total rounds - </span>
                      <span className="font-medium">{rounds}</span>
                    </div>
                    <span className="font-sans pb-0.5">/</span>
                    <div>
                      <span className="opacity-90">Current round - </span>
                      <span className="font-medium ">{currentRound}</span>
                    </div>
                  </span>
                  <span>
                    <span className="opacity-90">Event type - </span>
                    <span className="font-medium">
                      {displayEventType(isPublic)}
                    </span>
                  </span>
                  <span>
                    <span className="opacity-90">Prizepool - </span>
                    <span className="font-medium">
                      {displayEventHasPrizepool(hasPrizepool) ? (
                        <CurrencyFormat
                          value={prizepool}
                          suffix={` ${prizepoolCurrency}`}
                        />
                      ) : (
                        <span className="tracking-tight italic font-light opacity-50 text-2xs">
                          Not set..
                        </span>
                      )}
                    </span>
                  </span>
                </div>
                <div className="flex justify-end items-end text-2xs  text-whites-dark opacity-80 tracking-tight font-sans">
                  <div className="max-w-min">{formatDate(datetime)}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    case "completed":
      return (
        <Link
          key={uniqueid}
          to={`/${uniqueid}`}
          className="filter hover:brightness-110 hover:shadow-xl"
        >
          <div
            className={`indicator-completed px-4 w-74 py-6 border-whites-dark relative shadow-md flex items-start flex-col flex-shrink-0 bg-gradient-to-br rounded-tr-${rounded} rounded-b-${rounded} bg-blacks-lighter opacity-70 2xl:w-80`}
          >
            <div className="w-full flex justify-between">
              <span className="items-center text-2xs font-normal flex space-x-1  text-whites-dark opacity-80 tracking-tighter">
                Completed..
              </span>
              <span className="items-center text-2xs font-light flex space-x-1  text-whites-dark opacity-80 tracking-tight">
                {fromDate(datetime)}
              </span>
            </div>

            <div className="flex w-full flex-col space-y-2 justify-start">
              <span className="text-lg w-56 overflow-ellipsis overflow-hidden whitespace-nowrap font-medium  text-whites-light">
                {name}
              </span>
              <div className="w-full flex justify-between">
                <div className="flex flex-col flex-shrink-0 space-y-1 justify-start text-2xs">
                  <span className="flex space-x-0.5 items-center">
                    <div>
                      <span className="opacity-90">Total rounds - </span>
                      <span className="font-medium">{rounds}</span>
                    </div>
                    <span className="font-sans pb-0.5">/</span>
                    <div>
                      <span className="opacity-90">Current round - </span>
                      <span className="font-medium ">{currentRound}</span>
                    </div>
                  </span>
                  <span>
                    <span className="opacity-90">Event type - </span>
                    <span className="font-medium">
                      {displayEventType(isPublic)}
                    </span>
                  </span>
                  <span>
                    <span className="opacity-90">Prizepool - </span>
                    <span className="font-medium">
                      {displayEventHasPrizepool(hasPrizepool) ? (
                        <CurrencyFormat
                          value={prizepool}
                          suffix={` ${prizepoolCurrency}`}
                        />
                      ) : (
                        <span className="tracking-tight italic font-light opacity-50 text-2xs">
                          Not set..
                        </span>
                      )}
                    </span>
                  </span>
                </div>
                <div className="flex justify-end items-end text-2xs  text-whites-dark opacity-80 tracking-tight font-sans">
                  <div className="max-w-min">{formatDate(datetime)}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    default:
      break;
  }
};

const ExploreCardView = ({
  uniqueid,
  name,
  datetime,
  rounds,
  currentRound,
  status,
  isPublic,
  hasPrizepool,
  prizepool,
  prizepoolCurrency,
  displayEventType,
  displayEventHasPrizepool,
  getEventStatus,
  owner,
  renderOwnerLink,
  rounded,
}) => {
  switch (getEventStatus(status)) {
    case "ongoing":
      return (
        <Link
          className="w-full flex justify-center items-center filter hover:brightness-110 hover:shadow-xl"
          key={uniqueid}
          to={`/${uniqueid}`}
        >
          <div
            className={`indicator-ongoing px-4 flex-grow py-4 relative shadow-md flex items-start flex-col flex-shrink-0 rounded-tr-${rounded} rounded-b-${rounded} bg-gradient-to-br bg-grays-light`}
          >
            <div className="w-full flex justify-between">
              <span className="items-center text-xs font-medium flex space-x-1  text-success tracking-tighter">
                <LiveIndicator />
              </span>
            </div>

            <div className="flex w-full flex-col space-y-2 justify-start">
              <span className="text-lg w-56 overflow-ellipsis overflow-hidden whitespace-nowrap font-medium  text-whites-light">
                {name}
              </span>
              <div className="w-full flex justify-between">
                <div className="flex flex-col flex-shrink-0 space-y-1 justify-start text-2xs">
                  <span className="flex space-x-0.5 items-center">
                    <div>
                      <span className="opacity-90">Total rounds - </span>
                      <span className="font-medium">{rounds}</span>
                    </div>
                    <span className="font-sans pb-0.5">/</span>
                    <div>
                      <span className="opacity-90">Current round - </span>
                      <span className="font-medium ">{currentRound + 1}</span>
                    </div>
                  </span>
                  <span>
                    <span className="opacity-90">Event type - </span>
                    <span className="font-medium">
                      {displayEventType(isPublic)}
                    </span>
                  </span>
                  <span>
                    <span className="opacity-90">Prizepool - </span>
                    <span className="font-medium">
                      {displayEventHasPrizepool(hasPrizepool) ? (
                        <CurrencyFormat
                          value={prizepool}
                          suffix={` ${prizepoolCurrency}`}
                        />
                      ) : (
                        <span className="tracking-tight italic font-light opacity-50 text-2xs">
                          Not set..
                        </span>
                      )}
                    </span>
                  </span>
                  {renderOwnerLink(owner)}
                </div>
                <div className="flex justify-end items-end text-2xs  text-whites-dark opacity-80 tracking-tight font-sans">
                  <div className="max-w-min">{formatDate(datetime)}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    case "upcoming":
      return (
        <Link
          className="w-full flex justify-center items-center filter hover:brightness-110 hover:shadow-xl"
          key={uniqueid}
          to={`/${uniqueid}`}
        >
          <div
            className={`indicator-upcoming px-4 flex-grow py-4 border-whites-light border-opacity-40 relative shadow-md flex items-start flex-col flex-shrink-0 bg-gradient-to-br rounded-tr-${rounded} rounded-b-${rounded}  bg-blacks-lighter`}
          >
            <div className="w-full flex justify-between">
              <span className="items-center text-2xs font-normal flex space-x-1  text-whites-dark opacity-80 tracking-tight">
                Upcoming..
              </span>
              <span className="items-center flex space-x-1 text-2xs font-light  text-whites-dark opacity-80 tracking-tight">
                {fromDate(datetime)}
              </span>
            </div>

            <div className="flex w-full flex-col space-y-2 justify-start">
              <span className="text-lg w-56 overflow-ellipsis overflow-hidden whitespace-nowrap font-medium  text-whites-light">
                {name}
              </span>
              <div className="w-full flex justify-between">
                <div className="flex flex-col flex-shrink-0 space-y-1 justify-start text-2xs">
                  <span className="flex space-x-0.5 items-center">
                    <div>
                      <span className="opacity-90">Total rounds - </span>
                      <span className="font-medium">{rounds}</span>
                    </div>
                    <span className="font-sans pb-0.5">/</span>
                    <div>
                      <span className="opacity-90">Current round - </span>
                      <span className="font-medium ">{currentRound}</span>
                    </div>
                  </span>
                  <span>
                    <span className="opacity-90">Event type - </span>
                    <span className="font-medium">
                      {displayEventType(isPublic)}
                    </span>
                  </span>
                  <span>
                    <span className="opacity-90">Prizepool - </span>
                    <span className="font-medium">
                      {displayEventHasPrizepool(hasPrizepool) ? (
                        <CurrencyFormat
                          value={prizepool}
                          suffix={` ${prizepoolCurrency}`}
                        />
                      ) : (
                        <span className="tracking-tight italic font-light opacity-50 text-2xs">
                          Not set..
                        </span>
                      )}
                    </span>
                  </span>
                  {renderOwnerLink(owner)}
                </div>
                <div className="flex justify-end items-end text-2xs  text-whites-dark opacity-80 tracking-tight font-sans">
                  <div className="max-w-min">{formatDate(datetime)}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    case "completed":
      return (
        <Link
          className="w-full flex justify-center items-center filter hover:brightness-110 hover:shadow-xl"
          key={uniqueid}
          to={`/${uniqueid}`}
        >
          <div
            className={`indicator-completed px-4 flex-grow py-4 border-whites-dark relative shadow-md flex items-start flex-col flex-shrink-0 bg-gradient-to-br rounded-tr-${rounded} rounded-b-${rounded} bg-blacks-lighter opacity-70`}
          >
            <div className="w-full flex justify-between">
              <span className="items-center text-2xs font-normal flex space-x-1  text-whites-dark opacity-80 tracking-tighter">
                Completed..
              </span>
              <span className="items-center text-2xs font-light flex space-x-1  text-whites-dark opacity-80 tracking-tight">
                {fromDate(datetime)}
              </span>
            </div>

            <div className="flex w-full flex-col space-y-2 justify-start">
              <span className="text-lg w-56 overflow-ellipsis overflow-hidden whitespace-nowrap font-medium  text-whites-light">
                {name}
              </span>
              <div className="w-full flex justify-between">
                <div className="flex flex-col flex-shrink-0 space-y-1 justify-start text-2xs">
                  <span className="flex space-x-0.5 items-center">
                    <div>
                      <span className="opacity-90">Total rounds - </span>
                      <span className="font-medium">{rounds}</span>
                    </div>
                    <span className="font-sans pb-0.5">/</span>
                    <div>
                      <span className="opacity-90">Current round - </span>
                      <span className="font-medium ">{currentRound}</span>
                    </div>
                  </span>
                  <span>
                    <span className="opacity-90">Event type - </span>
                    <span className="font-medium">
                      {displayEventType(isPublic)}
                    </span>
                  </span>
                  <span>
                    <span className="opacity-90">Prizepool - </span>
                    <span className="font-medium">
                      {displayEventHasPrizepool(hasPrizepool) ? (
                        <CurrencyFormat
                          value={prizepool}
                          suffix={` ${prizepoolCurrency}`}
                        />
                      ) : (
                        <span className="tracking-tight italic font-light opacity-50 text-2xs">
                          Not set..
                        </span>
                      )}
                    </span>
                  </span>
                  {renderOwnerLink(owner)}
                </div>
                <div className="flex justify-end items-end text-2xs  text-whites-dark opacity-80 tracking-tight font-sans">
                  <div className="max-w-min">{formatDate(datetime)}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    default:
      break;
  }
};

const OrganizationView = ({
  uniqueid,
  name,
  datetime,
  rounds,
  currentRound,
  status,
  isPublic,
  hasPrizepool,
  prizepool,
  prizepoolCurrency,
  displayEventType,
  displayEventHasPrizepool,
  getEventStatus,
  rounded,
}) => {
  switch (getEventStatus(status)) {
    case "ongoing":
      return (
        <Link
          className="flex-grow w-full flex justify-center items-center filter hover:brightness-110 hover:shadow-xl"
          key={uniqueid}
          to={`/${uniqueid}`}
        >
          <div
            className={`px-5 flex-grow py-4 relative shadow-sm flex items-start flex-col flex-shrink-0 rounded-tr-${rounded} rounded-b-${rounded} bg-gradient-to-br from-success to-secondary-dark`}
          >
            <div className="w-full flex justify-between">
              <span className="items-center text-xs font-medium flex space-x-1  text-blacks-dark tracking-tighter">
                <LiveIndicator indicatorColor="bg-blacks-dark" />
              </span>
            </div>

            <div className="flex w-full flex-col space-y-2 justify-start">
              <span className="text-lg w-56 overflow-ellipsis overflow-hidden whitespace-nowrap font-medium  text-whites-light">
                {name}
              </span>
              <div className="w-full flex justify-between">
                <div className="flex flex-col flex-shrink-0 space-y-1 justify-start text-2xs">
                  <span className="flex space-x-0.5 items-center">
                    <div>
                      <span className="opacity-90">Total rounds - </span>
                      <span className="font-medium">{rounds}</span>
                    </div>
                    <span className="font-sans pb-0.5">/</span>
                    <div>
                      <span className="opacity-90">Current round - </span>
                      <span className="font-medium ">{currentRound + 1}</span>
                    </div>
                  </span>
                  <span>
                    <span className="opacity-90">Event type - </span>
                    <span className="font-medium">
                      {displayEventType(isPublic)}
                    </span>
                  </span>
                  <span>
                    <span className="opacity-90">Prizepool - </span>
                    <span className="font-medium">
                      {displayEventHasPrizepool(hasPrizepool) ? (
                        <CurrencyFormat
                          value={prizepool}
                          suffix={` ${prizepoolCurrency}`}
                        />
                      ) : (
                        <span className="tracking-tight italic font-light opacity-50 text-2xs">
                          Not set..
                        </span>
                      )}
                    </span>
                  </span>
                </div>
                <div className="flex justify-end items-end text-2xs  text-whites-dark tracking-tight font-sans">
                  <div className="max-w-min">{formatDate(datetime)}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    case "upcoming":
      return (
        <Link
          className="flex-grow w-full flex justify-center items-center filter hover:brightness-110 hover:shadow-xl"
          key={uniqueid}
          to={`/${uniqueid}`}
        >
          <div
            className={`indicator-upcoming px-4 flex-grow py-6 border-whites-light border-opacity-40 relative shadow-md flex items-start flex-col flex-shrink-0 bg-gradient-to-br rounded-tr-${rounded} rounded-b-${rounded}  bg-blacks-lighter`}
          >
            <div className="w-full flex justify-between">
              <span className="items-center text-2xs font-normal flex space-x-1  text-whites-dark opacity-80 tracking-tight">
                Upcoming..
              </span>
              <span className="items-center flex space-x-1 text-2xs font-light  text-whites-dark opacity-80 tracking-tight">
                {fromDate(datetime)}
              </span>
            </div>

            <div className="flex w-full flex-col space-y-2 justify-start">
              <span className="text-lg w-56 overflow-ellipsis overflow-hidden whitespace-nowrap font-medium  text-whites-light">
                {name}
              </span>
              <div className="w-full flex justify-between">
                <div className="flex flex-col flex-shrink-0 space-y-1 justify-start text-2xs">
                  <span className="flex space-x-0.5 items-center">
                    <div>
                      <span className="opacity-90">Total rounds - </span>
                      <span className="font-medium">{rounds}</span>
                    </div>
                    <span className="font-sans pb-0.5">/</span>
                    <div>
                      <span className="opacity-90">Current round - </span>
                      <span className="font-medium ">{currentRound}</span>
                    </div>
                  </span>
                  <span>
                    <span className="opacity-90">Event type - </span>
                    <span className="font-medium">
                      {displayEventType(isPublic)}
                    </span>
                  </span>
                  <span>
                    <span className="opacity-90">Prizepool - </span>
                    <span className="font-medium">
                      {displayEventHasPrizepool(hasPrizepool) ? (
                        <CurrencyFormat
                          value={prizepool}
                          suffix={` ${prizepoolCurrency}`}
                        />
                      ) : (
                        <span className="tracking-tight italic font-light opacity-50 text-2xs">
                          Not set..
                        </span>
                      )}
                    </span>
                  </span>
                </div>
                <div className="flex justify-end items-end text-2xs  text-whites-dark opacity-80 tracking-tight font-sans">
                  <div className="max-w-min">{formatDate(datetime)}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    case "completed":
      return (
        <Link
          className="flex-grow w-full flex justify-center items-center filter hover:brightness-110 hover:shadow-xl"
          key={uniqueid}
          to={`/${uniqueid}`}
        >
          <div
            className={`indicator-completed px-4 flex-grow py-6 border-whites-dark relative shadow-md flex items-start flex-col flex-shrink-0 bg-gradient-to-br rounded-tr-${rounded} rounded-b-${rounded} bg-blacks-lighter  opacity-70`}
          >
            <div className="w-full flex justify-between">
              <span className="items-center text-2xs font-normal flex space-x-1  text-whites-dark opacity-80 tracking-tighter">
                Completed..
              </span>
              <span className="items-center text-2xs font-light flex space-x-1  text-whites-dark opacity-80 tracking-tight">
                {fromDate(datetime)}
              </span>
            </div>

            <div className="flex w-full flex-col space-y-2 justify-start">
              <span className="text-lg w-56 overflow-ellipsis overflow-hidden whitespace-nowrap font-medium  text-whites-light">
                {name}
              </span>
              <div className="w-full flex justify-between">
                <div className="flex flex-col flex-shrink-0 space-y-1 justify-start text-2xs">
                  <span className="flex space-x-0.5 items-center">
                    <div>
                      <span className="opacity-90">Total rounds - </span>
                      <span className="font-medium">{rounds}</span>
                    </div>
                    <span className="font-sans pb-0.5">/</span>
                    <div>
                      <span className="opacity-90">Current round - </span>
                      <span className="font-medium ">{currentRound}</span>
                    </div>
                  </span>
                  <span>
                    <span className="opacity-90">Event type - </span>
                    <span className="font-medium">
                      {displayEventType(isPublic)}
                    </span>
                  </span>
                  <span>
                    <span className="opacity-90">Prizepool - </span>
                    <span className="font-medium">
                      {displayEventHasPrizepool(hasPrizepool) ? (
                        <CurrencyFormat
                          value={prizepool}
                          suffix={` ${prizepoolCurrency}`}
                        />
                      ) : (
                        <span className="tracking-tight italic font-light opacity-50 text-2xs">
                          Not set..
                        </span>
                      )}
                    </span>
                  </span>
                </div>
                <div className="flex justify-end items-end text-2xs  text-whites-dark opacity-80 tracking-tight font-sans">
                  <div className="max-w-min">{formatDate(datetime)}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    default:
      break;
  }
};
