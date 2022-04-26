import { useEffect } from 'react';
import { useField, useFormikContext } from 'formik';

// Components
import InputItem from './InputItem';

// Other
import converter from 'number-to-words';

const InputsList = ({
  depth = 'flat',
  nestedKey = null,
  label,
  secondaryLabel,
  length = 3,
  type = 'text',
  isOrdinal = false,
  min,
  handleErrors,
  errorIndex,
  initialValueSchema,
  handleChange,
  contextFieldName,
  ...props
}) => {
  const [field, meta] = useField(props);
  const {
    isValid,
    values,
    isValidating,
    setFieldValue,
    errors,
    setFieldTouched,
  } = useFormikContext();

  const inputs = values.teams || new Array(length).fill('');

  useEffect(() => {
    if (typeof handleErrors === 'undefined') return;
    handleErrors(errorIndex, isValid, errors, field.name);
  }, [isValid, errors, isValidating]);

  useEffect(() => {
    setFieldTouched(field.name);
  }, []);

  useEffect(() => {
    if (typeof handleChange === 'undefined') return;
    handleChange(values, contextFieldName);
  }, [values]);

  if (depth === 'nested') {
    return (
      <div className={`grid grid-cols-3 gap-x-3 gap-y-2`}>
        {inputs.map((input, index) => {
          return (
            <InputItem
              editable={input.editable}
              removable={input.removable}
              handleRemove={setFieldValue}
              initialValueForRemove={initialValueSchema}
              initialFieldNameForRemove={field.name}
              label={`${label} ${index + 1}`}
              key={index}
              index={index}
              name={`${field.name}[${index}].${nestedKey}`}
              type={type}
              min={min}
            />
          );
        })}
      </div>
    );
  }

  if (depth === 'flat') {
    return (
      <div className='grid grid-cols-3 gap-x-5 gap-y-2'>
        {inputs.map((input, index) => {
          return (
            <InputItem
              editable={input.editable}
              removable={input.removable}
              handleRemove={setFieldValue}
              initialValueForRemove={initialValueSchema}
              initialFieldNameForRemove={field.name}
              label={`${
                isOrdinal
                  ? `${converter.toOrdinal(index + 1)} ${label}`
                  : `${label} ${index + 1}`
              }`}
              key={index}
              index={index}
              name={`${field.name}[${index}]`}
              type={type}
              min={min}
            />
          );
        })}
      </div>
    );
  }
};

export default InputsList;
