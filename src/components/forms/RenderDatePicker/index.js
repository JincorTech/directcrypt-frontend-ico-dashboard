import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateFormat = 'YYYY-MM-DD';
const DisplayDateFormat = '    YYYY-MM-DD';

const RenderInput = (props) => {
  const { input, meta, ...restProps } = props;
  const { value, onChange } = input;

  const handleChange = (value) => {
    onChange(value.format(DateFormat));
  };

  return (
    <DatePicker
      selected={value ? moment(value, DateFormat) : null}
      dateFormat={DisplayDateFormat}
      onChange={handleChange}
      minDate={moment('1900-01-01', DateFormat)}
      maxDate={moment('2018-01-01', DateFormat)}
      openToDate={moment('1990-01-01', DateFormat)}
      showYearDropdown
      showMonthDropdown
      placeholderText="    Choose your date of birth..."
      {...restProps}
      />
  );
};

export default RenderInput;
