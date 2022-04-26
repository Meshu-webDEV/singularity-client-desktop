import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Components
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import Button from "../../Components/actions/Button";
import Tabs from "../../Components/layouts/Tabs";

// Context
import EventsContext from "../../Context/Events/EventsContext";
import AuthContext from "../../Context/Auth/AuthContext";

// Other
import { formatDate, fromDate } from "../../lib/utils";
import { EXPLORE_LOAD_TYPES } from "../../lib/constants";
import sortArray from "sort-array";

// Images
import Header from "../../Components/layouts/Header";
import SecondaryCard from "../../Components/layouts/SecondaryCard";
import { ThemeProvider } from "@material-ui/styles";
import { denseDatetimeTheme } from "../../lib/muiThemes";
import { Fade } from "@material-ui/core";
import Hr from "../../Components/layouts/Hr";
import Datetime from "../../Components/forms/Datetime";
import { useFormikContext } from "formik";
import TinySquare from "../../Components/layouts/TinySquare";
import FastInput from "../../Components/forms/FastInput";
import EventCard from "../../Components/layouts/EventCard";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";
import ToastContext from "../../Context/Toast/ToastContext";
import { useMemo } from "react";
import GridLayout from "../../Components/layouts/GridLayout";

const Events = () => {
  //

  const {
    initialLoadExploreEvents,
    searchExploreEvents,
    applyFiltersExplore,
    loadMoreEvents,
    events,
    isLoading,
    pagination,
  } = useContext(EventsContext);

  const location = useLocation();
  const { setToast } = useContext(ToastContext);
  const formikCtx = useFormikContext();

  //  State

  const urlSearchQuery = useMemo(
    () => new URLSearchParams(location.search).get("q"),
    [location.search]
  );
  const urlStatusQuery = useMemo(
    () => new URLSearchParams(location.search).get("status"),
    [location.search]
  );
  const [fetch_configs, setFetchConfigs] = useState({
    type: EXPLORE_LOAD_TYPES.INITIAL,
    filters: {
      term: "",
      gte: null,
      lte: null,
      status: [],
    },
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errors, setErrors] = useState({
    searchTerm: "",
    datetime: "",
    status: "",
  });

  const determineStatusText = (status) => {
    if (status === 0) return "Ongoing";
    if (status === 1) return "Upcoming";
    if (status === 2) return "Completed";
  };

  // handlers
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    setHasLoadedOnce(true);
    await loadMoreEvents(fetch_configs);
    setIsLoadingMore(false);
  };

  const handleSearchTermChange = (e) => {
    formikCtx.setFieldValue("searchTerm", e.target.value);
    setErrors((e) => {
      return {
        ...e,
        searchTerm: "",
      };
    });
    setFetchConfigs((load) => {
      return {
        ...load,
        type:
          !e.target.value && !isFiltering
            ? EXPLORE_LOAD_TYPES.INITIAL
            : EXPLORE_LOAD_TYPES.FILTERED,
      };
    });
  };

  // Datetime handlers
  const handleGteChange = (gte) => {
    setFetchConfigs((load) => {
      return {
        ...load,
        filters: {
          ...load.filters,
          gte: gte,
        },
      };
    });
  };

  const handleLteChange = (lte) => {
    setFetchConfigs((load) => {
      return {
        ...load,
        filters: {
          ...load.filters,
          lte: lte,
        },
      };
    });
  };

  const handleEmptyDatetime = () => {
    setFetchConfigs((load) => {
      return {
        ...load,
        filters: {
          ...load.filters,
          gte: null,
          lte: null,
        },
      };
    });
  };

  // Status handlers
  const handleStatusChange = (status) => {
    setFetchConfigs((load) => {
      return {
        ...load,
        filters: {
          ...load.filters,
          status: status,
        },
      };
    });
  };

  const handleEmptyStatus = () => {
    setFetchConfigs((load) => {
      return {
        ...load,
        filters: {
          ...load.filters,
          status: null,
        },
      };
    });
  };

  // Submit Search
  const handleSubmitSearch = async (e) => {
    if (!formikCtx.values.searchTerm)
      return setErrors((e) => {
        return {
          ...e,
          searchTerm: "Required",
        };
      });

    const _configs = {
      type: EXPLORE_LOAD_TYPES.SEARCH,
      filters: { ...fetch_configs.filters, term: formikCtx.values.searchTerm },
    };
    setFetchConfigs(_configs);
    await searchExploreEvents(_configs);
    console.log("Searching.. :");
    console.log(_configs);
  };

  // Submit Apply filters
  const handleSubmitFilters = async (e) => {
    // TODO: Validate filters, i think only event status
    const _configs = {
      ...fetch_configs,
      type: EXPLORE_LOAD_TYPES.FILTERED,
    };
    setFetchConfigs(_configs);
    await applyFiltersExplore(_configs);
    console.log("Filtering.. :");
    console.log(_configs);
  };

  // Renderers
  const renderEvents = () => {
    if (!events.length)
      return (
        <span className="text-2xs py-4 text-whites-dark font-light italic">
          No events found...
        </span>
      );

    return events.map((e, i) => <EventCard key={i} view="explore" {...e} />);
  };

  useEffect(() => {
    if (!events.length && !urlSearchQuery && !urlStatusQuery)
      return initialLoadExploreEvents();

    console.log("not initial load");

    const _searchEvents = async () => {
      const _configs = {
        type: EXPLORE_LOAD_TYPES.SEARCH,
        filters: {
          ...fetch_configs.filters,
          status: [],
          term: urlSearchQuery,
        },
      };
      console.log("Query");
      console.log(urlSearchQuery);
      formikCtx.setFieldValue("searchTerm", urlSearchQuery);
      formikCtx.setFieldValue("status", parseInt(urlStatusQuery));
      setFetchConfigs(_configs);
      await searchExploreEvents(_configs);
    };

    const _statusEvents = async () => {
      const _configs = {
        type: EXPLORE_LOAD_TYPES.FILTERED,
        filters: {
          term: "",
          gte: null,
          lte: null,
          status: [parseInt(urlStatusQuery)],
        },
      };

      console.log("Status");
      console.log(urlStatusQuery);

      formikCtx.setValues(formikCtx.initialValues);
      formikCtx.setFieldValue("status", parseInt(urlStatusQuery));
      setFetchConfigs(_configs);
      await searchExploreEvents(_configs);
    };

    if (urlStatusQuery) _statusEvents();
    if (urlSearchQuery) _searchEvents();
  }, [location.pathname, location.search]);

  return (
    <GridLayout header={<Header />}>
      <div className="explore-events relative flex flex-col space-y-8 w-full px-6 text-whites-light">
        <div className="text-whites-light text-tiny font-bold pl-1">
          <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center xl:text-base">
            <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
            <span>Explore events</span>
          </div>
        </div>

        {/* Search term - backend */}
        <div className="flex space-x-2.5 justify-start items-center">
          <form className="w-full flex space-x-2.5 justify-start items-center">
            <div className="flex flex-col space-y-1">
              <FastInput
                className="items-center"
                noLabel
                bg="bg-grays-dark"
                name="searchTerm"
                placeholder="Search by event name"
                size="large"
                onChange={handleSearchTermChange}
              />
              {errors.searchTerm ? (
                <div className="text-2xs pl-1 text-primary-dark">
                  {errors.searchTerm}
                </div>
              ) : null}
            </div>
            <Button
              onClick={handleSubmitSearch}
              type="submit"
              className="text-sm text-whites-light py-2"
              variant="light"
              text="Search"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 opacity-80 transform -rotate-90/"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              }
            />
            {!isFiltering && (
              <span
                onClick={() => {
                  setFetchConfigs((load) => {
                    return { ...load, type: EXPLORE_LOAD_TYPES.FILTERED };
                  });
                  setIsFiltering(true);
                }}
                className="text-whites-dark cursor-pointer hover:text-whites-light"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
              </span>
            )}
          </form>
        </div>

        {/* Filtering - backend */}
        {isFiltering && (
          <div className="flex flex-col flex-grow w-full space-y-1.5">
            <SecondaryCard
              secondaryAction={
                <Button
                  onClick={(e) => {
                    setFetchConfigs((load) => {
                      return {
                        ...load,
                        type: !e.target.value
                          ? EXPLORE_LOAD_TYPES.INITIAL
                          : EXPLORE_LOAD_TYPES.FILTERED,
                      };
                    });
                    setIsFiltering(false);
                  }}
                  className="text-2xs font-light opacity-70 pr-2"
                  text="Discard"
                  textOnly
                  variant="light"
                />
              }
              primaryAction={
                <Button
                  onClick={handleSubmitFilters}
                  className="text-2xs border border-blacks-dark border-opacity-25"
                  variant="light"
                  text="Apply filters"
                  icon={
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
                  }
                />
              }
            >
              <div className="relative flex flex-col space-y-2.5 justify-center text-whites-light">
                {/* Title */}
                <div className="flex items-center space-x-1 text-2xs italic text-whites-dark tracking-wide opacity-70">
                  <span>search by date, event status OR both</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {/* X */}
                <span
                  onClick={() => setIsFiltering(false)}
                  className="absolute z-10 -top-3.5 -right-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>

                <Tabs
                  dense
                  currentTab={0}
                  tabs={[
                    {
                      label: "Date & Time",
                      component: (
                        <DatetimeFilter
                          handleGteChange={handleGteChange}
                          handleLteChange={handleLteChange}
                          handleEmptyDatetime={handleEmptyDatetime}
                          fetch_configs={fetch_configs}
                        />
                      ),
                    },
                    {
                      label: "Status",
                      component: (
                        <StatusFilter
                          handleStatusChange={handleStatusChange}
                          handleEmptyStatus={handleEmptyStatus}
                          fetch_configs={fetch_configs}
                        />
                      ),
                    },
                    {
                      label: "Both",
                      component: (
                        <BothDatetimeStatusFilter
                          handleGteChange={handleGteChange}
                          handleLteChange={handleLteChange}
                          handleEmptyDatetime={handleEmptyDatetime}
                          handleStatusChange={handleStatusChange}
                          handleEmptyStatus={handleEmptyStatus}
                          fetch_configs={fetch_configs}
                        />
                      ),
                    },
                  ]}
                />
              </div>
            </SecondaryCard>
            {/* Tags */}
            <div className="flex space-x-2 text-whites-dark text-2xs w-full pb-2">
              <div className="text-2xs pl-1 text-whites-light">Filters: </div>
              {/* Dates */}
              {fetch_configs.filters.gte && (
                <div className="flex items-center space-x-0.5 bg-dark-backgroundDarker rounded-full px-1.5 py-0.5">
                  <span className="whitespace-nowrap px-0.5">dates: </span>
                  <span className="font-sans">
                    {formatDate(fetch_configs.filters.gte, false)}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2.5 w-2.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-sans">
                    {formatDate(fetch_configs.filters.lte, false)}
                  </span>
                </div>
              )}

              {/* Status */}
              {fetch_configs.filters.status?.length &&
              fetch_configs.filters.status ? (
                <div className="flex items-center space-x-0.5 bg-dark-backgroundDarker rounded-full px-1.5 py-0.5">
                  <span>status:</span>
                  {fetch_configs.filters.status?.length &&
                  fetch_configs.filters.status ? (
                    <div className="flex space-x-0.5 lowercase">
                      {fetch_configs.filters.status.map((s, i, a) => (
                        <div key={s}>
                          {determineStatusText(s)}
                          {i + 1 !== a.length && ", "}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="lowercase">All</span>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* Events list */}
        <Hr className="w-4/5 text-whites-dark self-center opacity-10" />
        <div className="flex flex-grow flex-col justify-items-center w-full space-y-4 justify-start items-center px-10 xl:px-4 xl:grid xl:gap-4 xl:grid-cols-2 xl:justify-center xl:items-center">
          {isLoading ? (
            <div className="text-xs leading-loose text-whites-dark flex-grow flex w-full justify-center items-center">
              <LoadingWithDots
                flow="col"
                label={
                  fetch_configs.type === EXPLORE_LOAD_TYPES.SEARCH
                    ? "Searching"
                    : "Loading"
                }
                color="primary"
                size="1.35rem"
              />
            </div>
          ) : (
            renderEvents()
          )}
        </div>

        {/* Load-more / Pagination */}
        <div className="flex flex-col space-y-1 items-center text-xs text-whites-light">
          {pagination.hasMore && !isLoading ? (
            <>
              <Button
                disabled={isLoadingMore}
                onClick={handleLoadMore}
                variant="light"
                icon={
                  isLoadingMore ? null : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )
                }
                text={
                  isLoadingMore ? (
                    <LoadingWithDots
                      label="Loading"
                      flow="row"
                      size="0.6rem"
                      color="inherit"
                    />
                  ) : (
                    "Load more"
                  )
                }
              />
              <span className="text-2xs font-light text-whites-dark tracking-tight">
                {pagination.remaining} remaining
              </span>
            </>
          ) : (
            !isLoadingMore &&
            !isLoading &&
            hasLoadedOnce && (
              <span className="text-2xs tracking-wide font-light pt-4 pb-3 text-whites-dark opacity-50 italic">
                got nothing more ..👀
              </span>
            )
          )}
        </div>
      </div>
    </GridLayout>
  );
};

export default Events;

const StatusFilter = ({
  handleStatusChange,
  handleEmptyStatus,
  fetch_configs,
}) => {
  //

  const formikCtx = useFormikContext();

  // Handlers
  const handleSetFilterStatus = (status) => {
    const isSelected = formikCtx.values.status.includes(status);

    if (!isSelected) {
      return formikCtx.setFieldValue("status", [
        ...formikCtx.values.status,
        status,
      ]);
    }

    const newFilterStatus = formikCtx.values.status.filter((s) => s != status);
    return formikCtx.setFieldValue("status", newFilterStatus);
  };

  useEffect(() => {
    handleStatusChange(formikCtx.values.status);

    return () => handleEmptyStatus();
  }, [formikCtx.values.status]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="text-xs font-light text-whites-light flex items-center">
        <TinySquare
          size="tiny"
          className="bg-whites-dark bg-opacity-20 opacity-75"
        />
        <span>Select event status</span>
      </div>
      <div className="relative flex items-center space-x-2 justify-evenly">
        <div
          onClick={() => handleSetFilterStatus(0)}
          className={`py-1 px-2.5 cursor-pointer ${
            formikCtx.values.status.includes(0)
              ? "bg-dark-backgroundDarker shadow-md"
              : "bg-dark-backgroundDark opacity-70"
          } rounded-full text-2xs flex space-x-1 items-center`}
        >
          <span>Ongoing</span>
          {formikCtx.values.status.includes(0) && (
            <div className="w-2 h-2 bg-secondary-light rounded-full" />
          )}
        </div>
        <div
          onClick={() => handleSetFilterStatus(1)}
          className={`py-1 px-2.5 cursor-pointer ${
            +formikCtx.values.status.includes(1)
              ? "bg-dark-backgroundDarker shadow-md"
              : "bg-dark-backgroundDark opacity-70"
          } rounded-full text-2xs flex space-x-1 items-center`}
        >
          <span>Upcoming</span>
          {formikCtx.values.status.includes(1) && (
            <div className="w-2 h-2 bg-secondary-light rounded-full" />
          )}
        </div>
        <div
          onClick={() => handleSetFilterStatus(2)}
          className={`py-1 px-2.5 cursor-pointer ${
            formikCtx.values.status.includes(2)
              ? "bg-dark-backgroundDarker shadow-md"
              : "bg-dark-backgroundDark opacity-70"
          } rounded-full text-2xs flex space-x-1 items-center`}
        >
          <span>Completed</span>
          {formikCtx.values.status.includes(2) && (
            <div className="w-2 h-2 bg-secondary-light rounded-full" />
          )}
        </div>
        <div className="absolute top-full pt-1 transform left-6">
          {!fetch_configs.filters.status ||
          !fetch_configs.filters.status?.length ? (
            <div className="text-2xs pl-1 text-primary-dark">Required</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const DatetimeFilter = ({
  handleGteChange,
  handleLteChange,
  handleEmptyDatetime,
  fetch_configs,
}) => {
  //

  const [pickersOpen, setPickersOpen] = useState({ gte: false, lte: false });

  const formikCtx = useFormikContext();

  // Handlers

  const handlePickerOpen = (picker, open) => {
    setPickersOpen({ ...pickersOpen, [picker]: open });
  };

  useEffect(() => {
    handleGteChange(formikCtx.values.gte);
    handleLteChange(formikCtx.values.lte);

    return () => handleEmptyDatetime();
  }, [formikCtx.values.gte, formikCtx.values.lte]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="text-xs font-light text-whites-light flex items-center">
        Set a date range
      </div>
      <div className="flex items-center space-x-2 justify-evenly">
        <div className="flex flex-col justify-center items-center">
          <span className="text-2xs font-light text-whites-dark">From</span>
          <ThemeProvider theme={denseDatetimeTheme}>
            <div className="text-xs">
              <Datetime
                format="MM/DD/YYYY"
                withTime={false}
                icon={false}
                value={formikCtx.values.gte}
                setFieldValue={formikCtx.setFieldValue}
                open={pickersOpen.gte}
                onOpen={() => handlePickerOpen("gte", true)}
                onClose={() => handlePickerOpen("gte", false)}
                color="secondary"
                name="gte"
                disablePast={false}
              />
            </div>
          </ThemeProvider>
        </div>
        <div className="text-primary-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-2xs font-light text-whites-dark">To</span>
          <ThemeProvider theme={denseDatetimeTheme}>
            <div className="text-xs">
              <Datetime
                format="MM/DD/YYYY"
                withTime={false}
                icon={false}
                value={formikCtx.values.lte}
                setFieldValue={formikCtx.setFieldValue}
                open={pickersOpen.lte}
                onOpen={() => handlePickerOpen("lte", true)}
                onClose={() => handlePickerOpen("lte", false)}
                color="secondary"
                name="lte"
                className="whitespace-nowrap"
                disablePast={false}
                minDate={new Date(fetch_configs.filters.gte)}
                minDateMessage={`Out of range`}
              />
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

const BothDatetimeStatusFilter = ({
  handleStatusChange,
  handleEmptyStatus,
  handleGteChange,
  handleLteChange,
  handleEmptyDatetime,
  fetch_configs,
}) => {
  //

  const formikCtx = useFormikContext();

  const [pickersOpen, setPickersOpen] = useState({ gte: false, lte: false });

  // Handlers
  const handlePickerOpen = (picker, open) => {
    setPickersOpen({ ...pickersOpen, [picker]: open });
  };

  const handleSetFilterStatus = (status) => {
    const isSelected = formikCtx.values.status.includes(status);

    if (!isSelected)
      return formikCtx.setFieldValue("status", [
        ...formikCtx.values.status,
        status,
      ]);

    const newFilterStatus = formikCtx.values.status.filter((s) => s != status);
    return formikCtx.setFieldValue("status", newFilterStatus);
  };

  useEffect(() => {
    handleGteChange(formikCtx.values.gte);
    handleLteChange(formikCtx.values.lte);
    handleStatusChange(formikCtx.values.status);

    return () => {
      handleEmptyDatetime();
      handleEmptyStatus();
    };
  }, [formikCtx.values.status, formikCtx.values.gte, formikCtx.values.lte]);

  return (
    <div className="flex flex-col space-y-7">
      <div className="flex flex-col space-y-2">
        <div className="text-xs font-light text-whites-light flex items-center">
          Set a date range
        </div>
        <div className="flex items-center space-x-2 justify-evenly">
          <div className="flex flex-col justify-center items-center">
            <span className="text-2xs font-light text-whites-dark">From</span>
            <ThemeProvider theme={denseDatetimeTheme}>
              <div className="text-xs">
                <Datetime
                  format="MM/DD/YYYY"
                  withTime={false}
                  icon={false}
                  value={formikCtx.values.gte}
                  setFieldValue={formikCtx.setFieldValue}
                  open={pickersOpen.gte}
                  onOpen={() => handlePickerOpen("gte", true)}
                  onClose={() => handlePickerOpen("gte", false)}
                  color="secondary"
                  name="gte"
                  disablePast={false}
                />
              </div>
            </ThemeProvider>
          </div>
          <div className="text-primary-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-2xs font-light text-whites-dark">To</span>
            <ThemeProvider theme={denseDatetimeTheme}>
              <div className="text-xs">
                <Datetime
                  className="whitespace-nowrap"
                  format="MM/DD/YYYY"
                  withTime={false}
                  icon={false}
                  value={formikCtx.values.lte}
                  setFieldValue={formikCtx.setFieldValue}
                  open={pickersOpen.lte}
                  onOpen={() => handlePickerOpen("lte", true)}
                  onClose={() => handlePickerOpen("lte", false)}
                  color="secondary"
                  name="lte"
                  minDate={new Date(fetch_configs.filters.gte)}
                  minDateMessage={`Out of range`}
                  disablePast={false}
                />
              </div>
            </ThemeProvider>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-xs font-light text-whites-light flex items-center">
          Choose event status
        </div>
        <div className="relative flex items-center space-x-2 justify-evenly">
          <div
            onClick={() => handleSetFilterStatus(0)}
            className={`py-1 px-2.5 cursor-pointer ${
              formikCtx.values.status.includes(0)
                ? "bg-dark-backgroundDarker shadow-md"
                : "bg-dark-backgroundDark opacity-70"
            } rounded-full text-2xs flex space-x-1 items-center`}
          >
            <span>Ongoing</span>
            {formikCtx.values.status.includes(0) && (
              <div className="w-2 h-2 bg-secondary-light rounded-full" />
            )}
          </div>
          <div
            onClick={() => handleSetFilterStatus(1)}
            className={`py-1 px-2.5 cursor-pointer ${
              +formikCtx.values.status.includes(1)
                ? "bg-dark-backgroundDarker shadow-md"
                : "bg-dark-backgroundDark opacity-70"
            } rounded-full text-2xs flex space-x-1 items-center`}
          >
            <span>Upcoming</span>
            {formikCtx.values.status.includes(1) && (
              <div className="w-2 h-2 bg-secondary-light rounded-full" />
            )}
          </div>
          <div
            onClick={() => handleSetFilterStatus(2)}
            className={`py-1 px-2.5 cursor-pointer ${
              formikCtx.values.status.includes(2)
                ? "bg-dark-backgroundDarker shadow-md"
                : "bg-dark-backgroundDark opacity-70"
            } rounded-full text-2xs flex space-x-1 items-center`}
          >
            <span>Completed</span>
            {formikCtx.values.status.includes(2) && (
              <div className="w-2 h-2 bg-secondary-light rounded-full" />
            )}
          </div>
          <div className="absolute top-full pt-1 transform left-6">
            {!fetch_configs.filters.status ||
            !fetch_configs.filters.status?.length ? (
              <div className="text-2xs pl-1 text-primary-dark">Required</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
