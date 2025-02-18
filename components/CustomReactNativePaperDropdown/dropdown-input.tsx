import { TextInput } from 'react-native-paper';
import { DropdownInputProps } from './types';

function DropdownInput(props: DropdownInputProps) {
  const {
    placeholder,
    label,
    rightIcon,
    selectedLabel,
    mode,
    disabled,
    error,
    style
  } = props;

  return (
    <TextInput
      placeholder={placeholder}
      label={label}
      value={selectedLabel}
      right={rightIcon}
      mode={mode}
      editable={false}
      disabled={disabled}
      error={error}
      style={style}
    />
  );
}

export default DropdownInput;
