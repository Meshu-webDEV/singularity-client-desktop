import { default as _CurrencyFormat } from 'react-currency-format';

const CurrencyFormat = ({ value, suffix }) => {
  return (
    <_CurrencyFormat
      value={value}
      displayType='text'
      thousandSeparator={true}
      suffix={suffix}
    />
  );
};

export default CurrencyFormat;
