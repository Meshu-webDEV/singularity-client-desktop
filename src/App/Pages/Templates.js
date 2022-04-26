import { useContext, useEffect, useState } from "react";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";

// Components
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import Button from "../../Components/actions/Button";
import Tabs from "../../Components/layouts/Tabs";

// Context
import EventsContext from "../../Context/Events/EventsContext";
import AuthContext from "../../Context/Auth/AuthContext";

// Other
import {
  ORG_APPLICATION_STATUS,
  TEMPLATES_LOAD_TYPES,
} from "../../lib/constants";
import currencies from "../../lib/currencies.json";

// Images
import Header from "../../Components/layouts/Header";
import SecondaryCard from "../../Components/layouts/SecondaryCard";
import Hr from "../../Components/layouts/Hr";
import { useFormikContext } from "formik";
import TinySquare from "../../Components/layouts/TinySquare";
import FastInput from "../../Components/forms/FastInput";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";
import ToastContext from "../../Context/Toast/ToastContext";
import { useMemo } from "react";
import TemplatesContext from "../../Context/Templates/TemplatesContext";
import { sortBy } from "lodash";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import GridList from "../../Components/layouts/GridList";
import CopyToClipboard from "../../Components/actions/CopyToClipboard";
import GridLayout from "../../Components/layouts/GridLayout";
import TemplateCard from "../../Components/layouts/TemplateCard";
import ButtonLink from "../../Components/actions/ButtonLink";

const _currencies = currencies.map((currency) => {
  return {
    name: currency.name,
    code: currency.code,
    symbol: currency.symbol,
  };
});

const Templates = () => {
  //

  const match = useRouteMatch();

  const { templates, getTemplateByUniqueid } = useContext(TemplatesContext);

  return (
    <GridLayout header={<Header />}>
      <Switch>
        <Route exact path={`${match.path}/:id`}>
          <ViewTemplate
            templates={templates}
            deleteTemplate={() => null}
            getTemplate={getTemplateByUniqueid}
          />
        </Route>
        <Route path="/">
          <RootTemplates />
        </Route>
      </Switch>
    </GridLayout>
  );

  // return <RootTemplates />;
};

export default Templates;

const RootTemplates = () => {
  const { setToast } = useContext(ToastContext);
  const {
    templates,
    initialLoadTemplates,
    isLoading,
    loadMoreTemplates,
    searchTemplates,
    pagination,
  } = useContext(TemplatesContext);
  const formikCtx = useFormikContext();

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

  // Handlers
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadMoreTemplates(fetch_configs);
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
    await searchTemplates(_configs);
    formikCtx.setSubmitting(false);
    console.log("Searching.. :");
    console.log(_configs);
  };

  // Renderers

  const renderTemplates = () => {
    if (!templates.length)
      return (
        <span className="text-2xs text-whites-dark font-light italic col-span-full py-16">
          No templates found...
        </span>
      );

    return templates.map((template, i) => (
      <div className="pb-8 col-span-1" key={`${i}-${template.name}`}>
        <TemplateCard view="templates" template={template} />
      </div>
    ));
  };

  useEffect(() => {
    if (templates.length) return;
    initialLoadTemplates();
  }, []);

  return (
    <div className="templates-repo flex flex-col space-y-5 relative space-y-8 w-full px-6 text-whites-light">
      <div className="text-whites-light text-tiny font-bold pl-1">
        <div className="header text-base text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
          <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
          <span>Templates repository</span>
        </div>
      </div>

      {/* Search term - backend */}
      <div className="flex space-x-2.5 justify-start items-center pt-1">
        <form className="w-full flex space-x-2.5 justify-start items-center">
          <div className="flex flex-col space-y-1">
            <FastInput
              className="items-center"
              noLabel
              bg="bg-grays-dark"
              name="searchTerm"
              placeholder="Search by template name"
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
            disabled={formikCtx.isSubmitting}
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
      </div>
      <Hr className="text-whites-dark w-95 opacity-10 self-center" />
      <div>
        {isLoading ? (
          <div className="text-2xs italic text-whites-dark py-14 font-light">
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
          <div className="flex flex-col space-y-2">
            <div className="w-full grid grid-cols-2 justify-center justify-items-center items-center xl:grid-cols-3">
              {renderTemplates()}
            </div>
            {/* Load-more / Pagination */}
            <div className="flex flex-col space-y-1 items-center text-xs text-whites-light pt-8">
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
          </div>
        )}
      </div>
    </div>
  );
};

const ViewTemplate = ({ getTemplate }) => {
  //

  const { id } = useParams();
  const history = useHistory();

  const [template, setTemplate] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col pt-40 text-whites-dark text-xs">
          <LoadingWithDots
            label="Loading template"
            size="0.7rem"
            color="primary"
          />
        </div>
      ) : (
        <div className="relative w-full h-full">
          {/* Back */}
          <div
            onClick={() => history.goBack()}
            className="absolute cursor-pointer hover:text-whites-light bottom-full left-0 flex space-x-2 justify-center items-center text-whites-light text-sm transform -translate-y-1/2"
          >
            <div className="w-7 h-7 bg-dark-backgroundDarker rounded-full shadow-md flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-whites-dark hover:text-current">
              Back to templates
            </span>
          </div>
          <div className="templates-repo flex flex-col space-y-5 relative space-y-8 w-full px-6 text-whites-light">
            <div className="text-whites-light text-tiny font-bold pl-1">
              <div className="header text-base text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
                <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
                <span>{template.name}</span>
              </div>
            </div>

            <SecondaryCard
              title="Template details"
              primaryAction={
                <Button
                  onClick={() =>
                    history.push(
                      `/dashboard/new-event/?templateId=${template?.uniqueid}&templateName=${template?.name}`
                    )
                  }
                  className="text-xs text-whites-light px-2.5 py-1"
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
              }
            >
              <div className="flex flex-col space-y-6 text-whites-light text-xs">
                {/* Share template */}
                <div className="absolute text-3xs text-whites-dark top-3 right-3">
                  <CopyToClipboard
                    text={`${window.location.origin}/templates/${template.uniqueid}`}
                    acknowledgment="Template link copied!"
                  >
                    <div className="flex p space-x-0.5 items-center text-2xs">
                      <span className="opacity-80 shadow-md w-max flex-grow-0 flex space-x-1 justify-center items-center">
                        <span>Share</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-2.5 w-2.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </CopyToClipboard>
                </div>
                <div className="tracking-wide flex flex-col space-y-4">
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
                      className="bg-dark-backgroundDark pb-5 pt-2 px-2.5 rounded-md mt-1"
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
                </div>
                <div className="flex items-center pr-1.5 space-x-3.5 justify-center text-xs text-whites-light">
                  <div className="flex items-center space-x-0.5">
                    <TinySquare size="tiny" className="bg-primary-dark" />
                    <span className="whitespace-nowrap">
                      Template's event configurations
                    </span>{" "}
                  </div>
                  <Hr className="self-center w-full bg-primary-light text-primary-light opacity-50" />
                </div>
                <div className="flex flex-col space-y-3.5">
                  <div className="tracking-wide flex flex-col space-y-6">
                    {template.template?.description && (
                      <div className="flex flex-col">
                        <div className="text-2xs italic text-whites-dark tracking-tight">
                          Description
                        </div>
                        <div className="bg-dark-backgroundDark pb-5 pt-2 px-2.5 rounded-md mt-1">
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
                                    currency.code ===
                                    template.template.prizepoolCurrency
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
              </div>
            </SecondaryCard>
          </div>
        </div>
      )}
    </>
  );
};
