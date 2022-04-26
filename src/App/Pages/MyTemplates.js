import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";

// Components
import Header from "../../Components/layouts/Header";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import SecondaryCard from "../../Components/layouts/SecondaryCard";
import Button from "../../Components/actions/Button";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";
import FastInput from "../../Components/forms/FastInput";
import Hr from "../../Components/layouts/Hr";
import MarkdownInput from "../../Components/forms/MarkdownInput";
import TinySquare from "../../Components/layouts/TinySquare";
import GridList from "../../Components/layouts/GridList";
import ConfirmationModal from "../../Components/actions/ConfirmationModal";
import { default as SwitchInput } from "../../Components/forms/Switch";

// MUI
import { default as MuiSwitch } from "@material-ui/core/Switch";

// Context
import ModalContext from "../../Context/Modal/ModalContext";
import TemplatesContext from "../../Context/Templates/TemplatesContext";
import FormikTemplatesContext from "../../Context/Formik/FormikTemplatesContext";
import { useFormikContext } from "formik";

// Other
import { isEmpty, sortBy } from "lodash";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import currencies from "../../lib/currencies.json";

// Images
import Markdown from "../../Images/Markdown";
import TeamsFieldsArray from "../../Components/forms/TeamsFieldsArray";
import InputSlider from "../../Components/forms/InputSlider";
import PointsFields from "../../Components/forms/PointsFields";
import { PrizesForm } from "./NewEvent";
import ToastContext from "../../Context/Toast/ToastContext";
import { TEMPLATES_LOAD_TYPES } from "../../lib/constants";
import TemplateCard from "../../Components/layouts/TemplateCard";
import FadeAnimation from "../../Animations/FadeAnimation";
import DashboardContext from "../../Context/Dashboard/DashboardContext";

const _currencies = currencies.map((currency) => {
  return {
    name: currency.name,
    code: currency.code,
    symbol: currency.symbol,
  };
});

const MyTemplates = () => {
  //

  const match = useRouteMatch();
  const {
    getTemplateByUniqueid,
    deleteTemplateById,
    initialLoadMyTemplates,
    templates,
    shouldUpdate,
  } = useContext(TemplatesContext);

  const { pathname } = useLocation();

  useEffect(() => {
    if (!isEmpty(templates)) return;
    initialLoadMyTemplates();
  }, []);

  useEffect(() => {
    if (!shouldUpdate) return;
    console.log("should update!!");
    initialLoadMyTemplates();
  }, [shouldUpdate]);

  return (
    <Switch>
      <Route exact path={`${match.path}/new`}>
        <FormikTemplatesContext initial>
          <NewTemplate />
        </FormikTemplatesContext>
      </Route>
      <Route exact path={`${match.path}/:id`}>
        <Redirect to={`${pathname}/view`}></Redirect>
      </Route>
      <Route exact path={`${match.path}/:id/edit`}>
        <div>edit template</div>
      </Route>
      <Route exact path={`${match.path}/:id/view`}>
        <ViewTemplate
          templates={templates}
          deleteTemplate={deleteTemplateById}
          getTemplate={getTemplateByUniqueid}
        />
      </Route>
      <Route path="/">
        <RootMyTemplates />
      </Route>
    </Switch>
  );
};

const RootMyTemplates = () => {
  //

  const {
    templates,
    isLoading,
    loadMoreMyTemplates,
    deleteTemplateById,
    searchMyTemplates,
    pagination,
  } = useContext(TemplatesContext);

  const formikCtx = useFormikContext();

  //  State
  const [fetch_configs, setFetchConfigs] = useState({
    type: TEMPLATES_LOAD_TYPES.INITIAL,
    filters: {
      term: "",
    },
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errors, setErrors] = useState({
    searchTerm: "",
  });

  const history = useHistory();
  const location = useLocation();

  // Handlers
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadMoreMyTemplates(fetch_configs);
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
        type: !e.target.value
          ? TEMPLATES_LOAD_TYPES.INITIAL
          : TEMPLATES_LOAD_TYPES.SEARCH,
      };
    });
  };

  const handleSubmitSearch = async (e) => {
    if (!formikCtx.values.searchTerm)
      return setErrors((e) => {
        return {
          ...e,
          searchTerm: "Required",
        };
      });

    const _configs = {
      type: TEMPLATES_LOAD_TYPES.SEARCH,
      filters: {
        ...fetch_configs.filters,
        term: formikCtx.values.searchTerm,
      },
    };
    setFetchConfigs(_configs);
    formikCtx.setSubmitting(true);
    await searchMyTemplates(_configs);
    formikCtx.setSubmitting(false);
    console.log("Searching.. :");
    console.log(_configs);
  };

  // renderers
  const renderTemplates = () => {
    if (isEmpty(templates))
      return (
        <div className="w-full self-center">
          <div className="px-4 py-4 space-y-1 flex items-start flex-col flex-shrink-0">
            <div className="flex flex-col space-y-1 items-center text-whites-dark p-5 rounded-sm text-2xs whitespace-nowrap">
              <span className="opacity-70">You don't have any templates</span>
              <span className="opacity-70">
                Start by creating your first template{" "}
                <Link
                  to="/dashboard/my-templates/new"
                  className="font-medium text-success"
                >
                  here
                </Link>
              </span>
            </div>
          </div>
        </div>
      );

    return templates.map((template, i) => (
      <div className="pb-8 col-span-1" key={`${i}-${template.name}`}>
        <TemplateCard view="my-templates" template={template} />
      </div>
    ));
  };

  return (
    // <SecondaryCard title="Event templates" subtitle="View, Edit, Add & delete">
    //    </SecondaryCard>
    <FadeAnimation fadeIn>
      <div className="my-templates flex-grow flex flex-col space-y-8 w-full px-10">
        <div className="text-whites-light text-tiny font-bold pl-1">
          <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
            <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
            <span>My templates</span>
          </div>
        </div>

        {/* Search term - backend */}
        <div>
          <div className="search h-full -mt-4 flex space-x-2.5 justify-center items-center">
            <form className="w-full flex-grow flex space-x-2.5 justify-start items-center">
              <div className="flex max-w-2xs flex-grow flex-col space-y-1">
                <FastInput
                  className="items-center"
                  noLabel
                  bg="bg-grays-light"
                  name="searchTerm"
                  placeholder="Search by template name"
                  size="auto"
                  onChange={handleSearchTermChange}
                />
                {errors.searchTerm ? (
                  <div className="text-2xs pl-1 text-primary-dark">
                    {errors.searchTerm}
                  </div>
                ) : null}
              </div>
              <Button
                disabled={formikCtx.isSubmitting}
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
            </form>
            <div className="flex items-center py-2 ">
              <Button
                className="text-blacks-dark font-medium w-max text-sm py-2"
                text="Create a template"
                onClick={() => history.replace(`${location.pathname}/new`)}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        {/* Templates list */}

        {isLoading ? (
          <div className="loading text-2xs italic text-whites-dark py-14 font-light">
            <LoadingWithDots
              flow="row"
              size="0.65rem"
              color="primary"
              label={
                fetch_configs.type === TEMPLATES_LOAD_TYPES.SEARCH
                  ? "Searching"
                  : "Loading"
              }
            />
          </div>
        ) : (
          <>
            {!templates.length ? (
              <span className="no-templates text-xs text-whites-dark font-light italic self-center flex-grow h-full py-24 flex flex-col justify-center items-center space-y-2">
                <span>
                  You don't have any templates. Start by creating one.
                </span>

                <span>
                  Or explore the Templates repository to view other's templates{" "}
                  <Link
                    to="/templates"
                    className="font-bold text-secondary-light"
                  >
                    here
                  </Link>
                </span>
              </span>
            ) : (
              <div
                style={{ minHeight: "150px" }}
                className="templates-table text-whites-light flex flex-col justify-center"
              >
                <div className="w-full grid grid-cols-2 justify-center justify-items-center items-center xl:grid-cols-3">
                  {renderTemplates()}
                </div>
                {/* Load-more / Pagination */}
                <div className="flex flex-col space-y-1 items-center text-xs text-whites-light">
                  {pagination.hasMore && (
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
                  )}
                </div>
                <Hr className="w-4/5 bg-light-background self-center mt-2 opacity-5" />
              </div>
            )}
          </>
        )}
        {!isLoading && (
          <div className="flex justify-end items-center w-full flex-grow-0 py-2 ">
            <Button
              className="text-blacks-dark font-medium w-max text-sm py-2"
              text="Create a template"
              onClick={() => history.replace(`${location.pathname}/new`)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>
        )}
      </div>
    </FadeAnimation>
  );
};

export default MyTemplates;

const NewTemplate = () => {
  //

  const history = useHistory();

  const {
    values,
    handleChange,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    errors,
    isValid,
  } = useFormikContext();

  const { newTemplate } = useContext(TemplatesContext);
  const { setToast } = useContext(ToastContext);

  const [options, setOptions] = useState({
    rounds: false,
    points: false,
    description: false,
    teams: false,
    prizes: false,
  });

  // Handlers
  const handleCreateTemplate = async () => {
    console.log(isValidTemplate());
    if (!isValidTemplate())
      return setToast({
        variant: "error",
        message:
          "Error creating template. Make sure no field is left empty, or please check the fields for any corresponding error. ",
      });

    setSubmitting(true);
    await newTemplate(values, options);
    setSubmitting(false);
    history.replace("/dashboard/my-templates");
  };

  // Helpers
  const containsNothing = () =>
    !options.points &&
    !options.description &&
    !options.rounds &&
    !options.teams &&
    !options.prizes;

  const isValidTemplate = () => {
    let valid = true;
    // if contains nothing error
    if (containsNothing()) return false;
    // if template name is empty
    if (values.name === "") return false;

    // if desc. toggled, check errors.description. if err.desc exists then not valid
    if (options.description) valid = errors?.description ? false : true;
    // if rounds toggled, check errors.rounds
    if (options.rounds) valid = errors?.rounds ? false : true;
    // if points toggled, check errors.pointPerKill & errors.pointsDistribution[]
    if (options.points)
      valid = errors?.pointPerKill || errors?.pointsDistribution ? false : true;
    // if teams toggled, check errors.teams
    if (options.teams) valid = errors?.teams ? false : true;
    // if prizes toggled, check errors.prizepool & errors.prizepoolDistribution[]
    if (options.prizes)
      valid = errors?.prizepool || errors?.prizepoolDistribution ? false : true;

    return valid;
  };

  // renderers
  const renderActionButton = () => {
    if (containsNothing())
      return (
        <Button
          disabled={true}
          className="self-end opacity-50 italic text-xs py-2 text-whites-light leading-relaxed"
          text={<span className="font-light px-2">Empty template..</span>}
          variant="dark"
        />
      );

    if (isSubmitting)
      return (
        <Button
          disabled={true}
          className="self-end text-xs px-2.5 py-1 font-medium text-blacks-dark"
          text={
            <LoadingWithDots
              flow="row"
              label="creating"
              size="0.65rem"
              color="inherit"
            />
          }
          variant="success"
          icon={null}
        />
      );

    return (
      <Button
        onClick={handleCreateTemplate}
        className="self-end text-xs px-2.5 py-1 font-medium text-blacks-dark"
        text="Create"
        variant="success"
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
    );
  };

  return (
    <div className="w-full flex flex-col space-y-4 text-whites-light px-10">
      <div className="text-whites-light text-tiny font-bold pl-1">
        <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
          <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
          <span>Create new template</span>
        </div>
      </div>
      <div className="flex flex-col space-y-7 pb-4">
        <FastInput
          name="name"
          label="Template name *"
          type="text"
          size="large"
          autoFocus
        />

        <MarkdownInput
          maxChar={300}
          name="templateDescription"
          label="Template description *"
          secondaryLabel={
            <span className="flex space-x-1 justify-center items-center text-whites-light">
              <span>supports Markdown</span>{" "}
              <Markdown className="pt-0.5 w-4 h-3" />
            </span>
          }
        />

        <SwitchInput
          label="Visible"
          secondaryLabel={
            values.visible ? (
              <>
                Template can be used
                <span className="font-semibold"> by others</span>
              </>
            ) : (
              <>
                Template only usable
                <span className="font-semibold"> by you</span>
              </>
            )
          }
          checked={values.visible}
          onChange={handleChange}
          name="visible"
          color="secondary"
          size="small"
        />

        <div className="flex justify-center">
          <Hr className="bg-whites-dark opacity-10 w-4/6 my-3" />
        </div>
        {/* Options */}
        <div className="flex flex-col space-y-8 border-l-4 border-success rounded-tr-md rounded-br-md py-2 px-4 bg-grays-light shadow-md">
          <div className="text-xs tracking-tight text-whites-light">
            What will your <strong>event</strong> template contain?
          </div>
          <div className="flex flex-wrap justify-start items-center ">
            <div className="flex flex-col px-4 pb-1.5 space-y-1">
              <span className="text-xs">Description</span>
              <MuiSwitch
                color="secondary"
                checked={options.description}
                onChange={() => {
                  {
                    setOptions((o) => {
                      return { ...o, description: !o.description };
                    });
                  }
                }}
                size="small"
              />
            </div>
            <div className="flex flex-col px-4 pb-1.5 space-y-1">
              <span className="text-xs">Rounds</span>
              <MuiSwitch
                color="secondary"
                checked={options.rounds}
                onChange={() => {
                  setOptions((o) => {
                    return { ...o, rounds: !o.rounds };
                  });
                }}
                size="small"
              />
            </div>
            <div className="flex flex-col px-4 pb-1.5 space-y-1">
              <span className="text-xs">Points</span>
              <MuiSwitch
                color="secondary"
                checked={options.points}
                onChange={() => {
                  setOptions((o) => {
                    return { ...o, points: !o.points };
                  });
                }}
                size="small"
              />
            </div>
            <div className="flex flex-col px-4 pb-1.5 space-y-1">
              <span className="text-xs">Teams</span>
              <MuiSwitch
                color="secondary"
                checked={options.teams}
                onChange={() => {
                  setOptions((o) => {
                    return { ...o, teams: !o.teams };
                  });
                }}
                size="small"
              />
            </div>
            <div className="flex flex-col px-4 pb-1.5 space-y-1">
              <span className="text-xs">Prizes</span>
              <MuiSwitch
                color="secondary"
                checked={options.prizes}
                onChange={() => {
                  setOptions((o) => {
                    return { ...o, prizes: !o.prizes };
                  });
                }}
                size="small"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-6 pt-3">
          {containsNothing() && (
            <div className="flex justify-center items-center py-16 bg-grays-dark bg-opacity-20 w-full text-whites-dark">
              <span className="italic text-2xs text-center tracking-wide">
                Your template contains nothing...
              </span>
            </div>
          )}
          {options.description && (
            <div className="flex flex-col space-y-4 py-2 px-4 bg-grays-light rounded-md shadow-md ">
              <MarkdownInput
                name="description"
                label="Description, about & details"
                secondaryLabel={
                  <span className="flex space-x-1 justify-center items-center text-whites-light">
                    <span>supports Markdown</span>{" "}
                    <Markdown className="pt-0.5 w-4 h-3" />
                  </span>
                }
              />
            </div>
          )}
          {options.rounds && (
            <div className="flex flex-col space-y-4 py-2 px-4 bg-grays-light rounded-md shadow-md">
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
            </div>
          )}
          {options.points && (
            <div className="flex flex-col space-y-8 py-2 px-4 bg-grays-light rounded-md shadow-md">
              <div className="text-whites-light text-tiny font-bold pl-1">
                <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
                  <div className="w-4 h-4 rounded-sm bg-dark-background bg-opacity-60 shadow-sm" />
                  <span>Points distribution</span>
                </div>
              </div>
              <FastInput
                label="Points per kill"
                type="number"
                name="pointPerKill"
                min={0}
                size="small"
              />
              <div className="flex flex-col space-y-1">
                <label htmlFor="points distribution" className="pl-1 text-xs">
                  Distribution per placement
                </label>
                <PointsFields />
              </div>
            </div>
          )}
          {options.teams && (
            <div className="flex flex-col space-y-4 py-2 px-4 bg-grays-light rounded-md shadow-md">
              <div className="text-whites-light text-tiny font-bold pl-1">
                <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
                  <div className="w-4 h-4 rounded-sm bg-dark-background bg-opacity-60 shadow-sm" />
                  <span>Participating teams</span>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <TeamsFieldsArray pick={false} />
              </div>
            </div>
          )}
          {options.prizes && (
            <div className="flex flex-col space-y-4 py-2 px-4 bg-grays-light rounded-md shadow-md">
              <div className="text-whites-light text-tiny font-bold pl-1">
                <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
                  <div className="w-4 h-4 rounded-sm bg-dark-background bg-opacity-60 shadow-sm" />
                  <span>Prizepool distribution</span>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <PrizesForm cancelable={false} />
              </div>
            </div>
          )}
          <div className="self-end">{renderActionButton()}</div>
        </div>
      </div>
    </div>
  );
};

const ViewTemplate = ({ deleteTemplate, getTemplate }) => {
  //

  const { id } = useParams();
  const history = useHistory();

  const [template, setTemplate] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);
  const { setDashboardShouldUpdate } = useContext(DashboardContext);

  useEffect(() => {
    if (!id) return history.replace("/404");
    const _getTemplate = async () => {
      try {
        setIsLoading(true);
        const template = await getTemplate(id);
        setTemplate(template);
      } catch (error) {
        setTemplate({});
        return history.replace("/templates");
      } finally {
        setIsLoading(false);
      }
    };

    _getTemplate();
  }, [id]);

  // handlers
  const handleDeleteTemplate = (uniqueid, name) => {
    setModalComponent(
      <ConfirmationModal
        description={`Are you sure you want to delete ${name} template?`}
        confirmVariant="error"
        confirm={() =>
          deleteTemplate(uniqueid, name, true, setDashboardShouldUpdate)
        }
        cancel={offModal}
      />
    );
    setModalProps({
      title: `Delete template`,
      variant: "error",
      actions: null,
      secondary: null,
    });
    setModal("content");
  };

  if (!template) return <Redirect to="/dashboard/my-templates" />;

  return isLoading ? (
    <div className="flex flex-col pt-40 text-whites-dark text-xs">
      <LoadingWithDots label="Loading template" size="0.7rem" color="primary" />
    </div>
  ) : (
    <div className="template-view w-full flex flex-col flex-grow h-full space-y-6 text-whites-light text-sm px-6">
      <div className="template-info tracking-wide flex flex-col space-y-4">
        <div className="flex flex-col">
          <div className="text-2xs italic font-light text-whites-dark tracking-tight">
            Template name
          </div>
          <div className="font-semibold">{template.name}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-2xs italic font-light text-whites-dark tracking-tight">
            Template description
          </div>
          <div
            className="bg-dark-background pb-5 pt-2 px-2.5 rounded-md mt-1"
            style={{ minHeight: "120px" }}
          >
            <ReactMarkdown
              disallowedElements={["img"]}
              className="markdown mobile text-sm"
              remarkPlugins={[remarkGfm]}
            >
              {template.description}
            </ReactMarkdown>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-2xs italic font-light text-whites-dark tracking-tight">
            Template type
          </div>
          <div>
            {template.visible ? (
              <div>
                <span className="font-semibold">Public </span>
                <span className="text-3xs text-whites-dark opacity-75 font-light">
                  Visible and can be used by others.
                </span>
              </div>
            ) : (
              <div>
                <span className="font-semibold">Private </span>
                <span className="text-3xs text-whites-dark opacity-75 font-light">
                  Usable by only you.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="template-divider flex items-center pr-1.5 space-x-3.5 justify-center text-sm text-whites-light">
        <div className="flex items-center space-x-0.5">
          <TinySquare size="medium" className="bg-primary-dark" />
          <span className="whitespace-nowrap flex space-x-3 items-center justify-center">
            <span>Event configurations</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <Hr className="self-center w-full bg-primary-light text-primary-light" />
      </div>
      <div className="template-configs flex flex-col space-y-3.5 ">
        <div className="tracking-wide flex flex-col space-y-3">
          {template.template?.description && (
            <div className="flex flex-col">
              <div className="text-2xs italic text-whites-dark tracking-tight">
                Description
              </div>
              <div className="bg-dark-background pb-5 pt-2 px-2.5 rounded-md mt-1">
                <ReactMarkdown
                  disallowedElements={["img"]}
                  className="markdown mobile text-sm"
                  remarkPlugins={[remarkGfm]}
                >
                  {template.template.description}
                </ReactMarkdown>
              </div>
            </div>
          )}
          {template.template?.rounds && (
            <div className="flex flex-col space-y-1">
              <div className="text-2xs italic text-whites-dark tracking-tight">
                Rounds
              </div>
              <div className="font-semibold px-4 py-1.5 rounded-md bg-dark-background max-w-min">
                {template.template.rounds}
              </div>
            </div>
          )}
          {template.template?.pointPerKill && (
            <div className="flex flex-col space-y-1">
              <div className="text-2xs italic text-whites-dark tracking-tight">
                Points per kill
              </div>
              <div className="font-semibold px-4 py-1.5 rounded-md bg-dark-background max-w-min">
                {template.template.pointPerKill}
              </div>
            </div>
          )}
          {template.template?.pointsDistribution && (
            <div className="flex flex-col space-y-2">
              <div className="text-xs italic text-whites-dark tracking-tight">
                Points distribution
              </div>
              <div className="py-3.5 px-2 bg-dark-backgroundDark rounded-md">
                <GridList
                  items={template.template.pointsDistribution}
                  labeledItems
                  label="Place"
                  isOrdinal
                />
              </div>
            </div>
          )}
          {template.template?.teams && (
            <div className="flex flex-col space-y-2">
              <div className="text-xs italic text-whites-dark tracking-tight">
                Participating teams
              </div>
              <div className="py-3.5 px-2 bg-dark-backgroundDark rounded-md">
                <GridList
                  labeledItems
                  label="Team"
                  items={template.template.teams.map((t) => t.name)}
                />
              </div>
            </div>
          )}
          {template.template?.hasPrizepool && (
            <div className="flex flex-col space-y-2">
              <div className="text-xs italic text-whites-dark tracking-tight">
                Prizepool distribution
              </div>
              <div className="py-3.5 px-2 bg-dark-backgroundDark rounded-md">
                <div className="flex items-center space-x-3 mt-2 mb-4">
                  <span className="whitespace-nowrap overflow-x-scroll text-sm">
                    {template.template.prizepool}
                    {
                      _currencies.find(
                        (currency) =>
                          currency.code === template.template.prizepoolCurrency
                      ).symbol
                    }{" "}
                    Total prizepool
                  </span>
                  <Hr className="flex-grow bg-dark-backgroundDarker opacity-5" />
                </div>
                <GridList
                  items={template.template.prizepoolDistribution}
                  labeledItems
                  label="Place"
                  isOrdinal
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="template-actions flex-grow flex space-x-4 self-end items-end justify-center">
        <Button
          onClick={() =>
            history.replace(
              `/dashboard/new-event/?templateId=${template?.uniqueid}&templateName=${template?.name}`
            )
          }
          className="text-xs text-whites-light py-1 px-2.5"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          }
          text="Use template"
          variant="success"
        />
        <Button
          onClick={() => handleDeleteTemplate(template.uniqueid, template.name)}
          textOnly
          className="text-xs"
          text={<span className="text-primary-light pt-0.5">Delete</span>}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-primary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          }
          variant="error"
        />
      </div>
    </div>
  );
};
