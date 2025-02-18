import React, {useEffect} from 'react';
import { View, StyleSheet, TextStyle, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import { Dropdown } from '@/components/CustomReactNativePaperDropdown';

interface item {
  label: string;
  value: string;
}

type CustomDropdownListProps = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  mode?: "flat" | "outlined" | undefined;
  items: item[];
  defaultValue?: string;
  rules?: any;
  textInputStyle?: TextStyle;
  errorMessage?: string;
};

const CustomDropdownList: React.FC<CustomDropdownListProps> = ({
  control,
  name,
  label,
  placeholder,
  mode = "flat",
  items,
  defaultValue,
  rules,
  textInputStyle,
  errorMessage,
}) => {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            label={label}
            placeholder={placeholder}
            mode={mode}
            value={value}
            options={items}
            onSelect={(value) => {
              onChange(value);
            }}
            textInputStyle={textInputStyle}
          />
        )}
      />
      {errorMessage && <HelperText padding={"none"} type="error" visible={true}>{errorMessage}</HelperText>}
    </View>
  );
};

export default CustomDropdownList;