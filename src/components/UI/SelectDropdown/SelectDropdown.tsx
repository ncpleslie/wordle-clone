import { useState } from "react";
import useUniqueId from "../../../hooks/unique-id.hook";
import SelectDropdownProps from "../../../props/select-dropdown.props";

const SelectDropdown = (props: SelectDropdownProps) => {
  const [dropdownValue, setDropdownValue] = useState(props.defaultValue);
  const id = `dropdown-${useUniqueId()}`;

  const handleOnDropdownChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDropdownValue(value);
    props.onChange(value);
  };

  return (
    <div className="flex flex-row justify-between shadow rounded-lg border border-gray-50">
      <label className="w-full p-2" htmlFor={id}>
        {props.label}
      </label>
      <select
        disabled={props.values.length <= 1}
        id={id}
        className="shadow-xl w-20 p-2 rounded-lg border border-gray-50 cursor-pointer 
        disabled:shadow disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed"
        value={dropdownValue}
        onChange={handleOnDropdownChanged}
      >
        {props.values.map((value) => (
          <option key={`${value}-${id}`} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
