import {StyleSheet} from "react-native";

export  const globalStyles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentWrapper: {
        paddingHorizontal: 10
    }
})

export const globalColors = {
    brand: '#e7020a',
    secondary: '#01643a',
    gray: {
        100 : '#f3f4f6',
        200 : '#e5e7eb',
        300 : '#d1d5db',
        400 : '#9ca3af',
        500 : '#6b7280',
        600 : '#4b5563',
        700 : '#374151',
        800 : '#1f2937',
        900 : '#111827',
    },
    red: {
        DEFAULT: '#e7020a', //600
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#e7020a',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
    },
    emerald: {
        DEFAULT: '#01643a', //800
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#01643a',
        900: '#064e3b',
    }
}

export const globalThemes = {
    colorsPrimary: {colors: {primary: '#FF2156'}}
}



