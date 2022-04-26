const TeamPicker = ({ handleGlobalErrors, errorIndex }) => {
  // Context
  const { handleNewEventInfo } = useContext(NewEventContext);
  const { setModalComponent, setModal, offModal } = useContext(ModalContext);
  const { getTeams, teams } = useContext(TeamsContext);

  // State
  const [initialTeams, setInitialTeams] = useState(
    new Array(20).fill({
      name: "",
      players: new Array(3).fill(""),
      editable: true,
      removable: false,
    })
  );
  const [showOptionCard, setShowOptionCard] = useState(true);

  // Formik
  const validationSchema = Yup.object({
    teams: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .min(1, "Cannot be less than 2 characters")
          .max(24, "Cannot exceed 24 characters")
          .required("Required"),
      })
    ),
    createTeams: Yup.boolean().required(),
  });
  const initialValues = {
    teams: initialTeams,
    createTeams: false,
  };

  // Handlers
  const handleAddTeams = (selectedTeams = []) => {
    const newInitialTeams = selectedTeams
      .concat(
        new Array(20).fill({
          name: "",
          players: new Array(3).fill(""),
          editable: true,
          removable: false,
        })
      )
      .slice(0, 20);
    setInitialTeams(newInitialTeams);
  };

  const handlePickFromMyTeams = async (setFieldValue, values) => {
    setShowOptionCard(false);
    setModal("full");
    setModalComponent(
      <div className="h-5/8 w-full flex flex-col justify-center items-center">
        <CircularProgress variant="indeterminate" size={32} />
      </div>
    );
    // Check if teams haven't been fetched yet
    if (isEmpty(teams)) {
      const fetchedTeams = await getTeams();
      setModalComponent(
        <MyTeamsModal
          setFieldValue={setFieldValue}
          values={values}
          teams={fetchedTeams}
          handleAddTeams={handleAddTeams}
          offModal={offModal}
        />
      );
    } else {
      setModalComponent(
        <MyTeamsModal
          setFieldValue={setFieldValue}
          values={values}
          teams={teams}
          handleAddTeams={handleAddTeams}
          offModal={offModal}
        />
      );
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center p-1">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(props) => {
          return (
            <Form className="flex flex-col space-y-3" autoComplete="off">
              {showOptionCard ? (
                <div className="w-10/12 self-center bg-blacks-light shadow-xl rounded-r-lg px-2 py-6 flex flex-col justify-center items-center space-y-3 text-sm">
                  <span className="tracking-wide text-xs">
                    Add from your list of teams?
                  </span>
                  <div className="flex space-x-4 justify-center items-center">
                    <span
                      className="text-secondary-light font-medium text-xs py-0.5 px-1.5 bg-blacks-lighter shadow-lg"
                      onClick={handlePickFromMyTeams}
                    >
                      Yes
                    </span>
                    <span
                      className="text-white-light opacity-60 font-light text-2xs py-0.5 px-1.5 shadow-lg"
                      onClick={() => setShowOptionCard(false)}
                    >
                      no, I will manually add teams
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute left-0 self-start bg-blacks-light shadow-xl rounded-r-lg px-2 py-2 flex justify-center items-center space-x-2 text-xs">
                    <span className="tracking-wide">
                      You can add from your list of teams
                    </span>
                    <div className="flex space-x-6 justify-center items-center">
                      <span
                        className="text-secondary-light font-medium text-xs py-0.5 px-1.5 bg-blacks-lighter shadow-lg"
                        onClick={handlePickFromMyTeams}
                      >
                        Here
                      </span>
                    </div>
                    <span className="absolute left-0 top-full text-2xs opacity-50 font-light tracking-tight">
                      Note, currently filled teams below will reset
                    </span>
                  </div>
                  <div className="pt-14">
                    <InputsList
                      name="teams"
                      depth="nested"
                      nestedKey="name"
                      label="Team"
                      length={20}
                      initialValueSchema={{
                        name: "",
                        players: new Array(3).fill(""),
                        editable: true,
                        removable: false,
                      }}
                      type="text"
                      errorIndex={errorIndex}
                      handleErrors={handleGlobalErrors}
                      handleChange={handleNewEventInfo}
                      contextFieldName={"teams"}
                    />
                  </div>
                  <Switch
                    label="Create teams"
                    secondaryLabel={
                      props.values.createTeams ? (
                        <>Create {"&"} add to your list of teams</>
                      ) : null
                    }
                    checked={props.values.createTeams}
                    onChange={props.handleChange}
                    name="createTeams"
                    color="secondary"
                    size="small"
                    handleChange={handleNewEventInfo}
                    contextFieldName={"teams"}
                  />
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TeamPicker;
