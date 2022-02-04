export default interface SelectDropdownProps {
  onChange(value: string): void;
  values: string[];
  defaultValue: string;
  label: string;
}
