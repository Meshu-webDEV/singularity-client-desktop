import { FastField, FieldArray, useField, useFormikContext } from "formik";
import { isEmpty, isEqual, unionWith, uniqWith } from "lodash";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import ModalContext from "../../Context/Modal/ModalContext";
import ToastContext from "../../Context/Toast/ToastContext";
import TinySquare from "../layouts/TinySquare";

import Checkbox from "@material-ui/core/Checkbox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import TeamsContext from "../../Context/Teams/TeamsContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import LoadingWithDots from "../layouts/LoadingWithDots";
import Button from "../actions/Button";
import { nanoid } from "nanoid";

const TeamsFieldsArray = ({ pick = true }) => {
  //

  // Context
  const { values, setValues, initialValues, isSubmitting, setSubmitting } =
    useFormikContext();
  const formikContext = useFormikContext();
  const { setToast } = useContext(ToastContext);
  const { setModalComponent, setModal, offModal, setModalProps } =
    useContext(ModalContext);
  const { getTeams, teams } = useContext(TeamsContext);

  const [fieldsLength, setFieldsLength] = useState(20);
  const [_, meta] = useField("teams");

  // handlers
  const handleRemoveField = (index, remove, preRemoveFieldsLength) => {
    if (preRemoveFieldsLength === 1)
      return setToast({
        variant: "error",
        message: "Participated teams cannot be empty",
      });
    setFieldsLength(preRemoveFieldsLength - 1);
    remove(index);
  };

  const handleAddField = (value, push, preAddFieldsLength) => {
    if (preAddFieldsLength === 20)
      return setToast({
        variant: "error",
        message: "Participated teams cannot exceed 20",
      });
    setFieldsLength(preAddFieldsLength + 1);
    push({
      uniqueid: nanoid(),
      name: "",
      creatable: true,
      players: [],
    });
  };

  const handleRemoveTeam = (ks) => {
    setValues({
      ...values,
      teams: [
        ...values.teams.map((team) => {
          if (team.uniqueid != ks) return team;
          return {
            uniqueid: nanoid(),
            name: "",
            creatable: true,
            players: [],
          };
        }),
      ],
    });
  };

  // helpers
  const isError = (touched, errors, index) => {
    if (
      isEmpty(touched) ||
      isEmpty(touched.teams) ||
      isEmpty(touched.teams[index])
    )
      return;
    if (
      isEmpty(errors) ||
      isEmpty(errors.teams) ||
      isEmpty(errors.teams[index])
    )
      return;

    if (touched.teams[index].name && errors.teams[index].name) {
      return (
        <span className="text-2xs tracking-tight text-primary-light">
          {errors.teams[index].name}
        </span>
      );
    }

    return null;
  };

  useEffect(() => {
    const { setFieldTouched } = formikContext;
    setFieldTouched("teams");
  }, []);

  return (
    <div className="relative flex flex-col space-y-3">
      <div className={` grid grid-cols-3 gap-x-4 gap-y-2`}>
        <FieldArray name="teams">
          {(props) => {
            const { push, remove, form } = props;
            const {
              values: { teams },
              errors,
              touched,
            } = form;
            return teams.map((team, index) => {
              return (
                <div key={index} style={{ maxWidth: "140px" }}>
                  <label
                    className="pl-1 py-0.5 text-2xs text-whites-light opacity-80 tracking-wide"
                    htmlFor={`team ${index + 1}`}
                  >
                    Team {index + 1}
                  </label>
                  <div className="flex justify-center space-x-1">
                    <div className="flex flex-col flex-grow">
                      <FastField
                        autoComplete="off"
                        className="w-full h-8 py-1.5 px-2 text-xs  focus:ring-transparent  bg-dark-background rounded-md   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-info placeholder-whites-dark placeholder-opacity-10"
                        type="text"
                        name={`teams[${index}].name`}
                      />
                      {/* {true ? (
                        <FastField
                          autoComplete='off'
                          className='w-full h-8 py-1.5 px-2 text-xs  focus:ring-transparent  bg-dark-background rounded-md   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-info placeholder-whites-dark placeholder-opacity-10'
                          type='text'
                          name={`teams[${index}].name`}
                        />
                      ) : (
                        <div className='w-full flex-grow h-8 py-1.5 px-2 text-xs  focus:ring-transparent  bg-dark-backgroundDark rounded-tr-md rounded-br-md shadow-tinycard border-l-2 border-whites-light border-opacity-10  focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-info placeholder-whites-dark placeholder-opacity-10 flex justify-between items-center'>
                          <span className='italic whitespace-nowrap w-16 overflow-hidden overflow-ellipsis'>
                            {team.name}
                          </span>
                          <span onClick={() => handleRemoveTeam(team.uniqueid)}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-3.5 w-3.5 text-primary-light'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </span>
                        </div>
                      )} */}
                    </div>
                    {index === teams.length - 1 && (
                      <div className="flex flex-col justify-start">
                        <span
                          className="shadow-lg px-0.5 text-xs font-semibold tracking-tighter whitespace-nowrap"
                          onClick={() =>
                            handleAddField({ name: "" }, push, teams.length)
                          }
                        >
                          +
                        </span>
                        <span
                          className="shadow-lg px-0.5 text-xs font-semibold tracking-tighter whitespace-nowrap"
                          onClick={() =>
                            handleRemoveField(index, remove, teams.length)
                          }
                        >
                          -
                        </span>
                      </div>
                    )}
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

export default TeamsFieldsArray;
