import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform } from "react-native";
import 'react-native-reanimated';
import {
  lightColors,
  createTheme,
  ThemeProvider as RNEThemeProvider,
} from "@rneui/themed";
import { useColorScheme } from '@/components/useColorScheme';
import { FONTS } from '../constants/fonts';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
 
  const [fontsLoaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    [FONTS.POPPINS_BLACK]: require('../assets/fonts/Poppins-Black.ttf'),
    [FONTS.POPPINS_BLACK_ITALIC]: require('../assets/fonts/Poppins-BlackItalic.ttf'),
    [FONTS.POPPINS_BOLD]: require('../assets/fonts/Poppins-Bold.ttf'),
    [FONTS.POPPINS_BOLD_ITALIC]: require('../assets/fonts/Poppins-BoldItalic.ttf'),
    [FONTS.POPPINS_EXTRA_BOLD]: require('../assets/fonts/Poppins-ExtraBold.ttf'),
    [FONTS.POPPINS_EXTRA_BOLD_ITALIC]: require('../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    [FONTS.POPPINS_EXTRA_LIGHT]: require('../assets/fonts/Poppins-ExtraLight.ttf'),
    [FONTS.POPPINS_EXTRA_LIGHT_ITALIC]: require('../assets/fonts/Poppins-ExtraLightItalic.ttf'),
    [FONTS.POPPINS_ITALIC]: require('../assets/fonts/Poppins-Italic.ttf'),
    [FONTS.POPPINS_LIGHT]: require('../assets/fonts/Poppins-Light.ttf'),
    [FONTS.POPPINS_LIGHT_ITALIC]: require('../assets/fonts/Poppins-LightItalic.ttf'),
    [FONTS.POPPINS_MEDIUM]: require('../assets/fonts/Poppins-Medium.ttf'),
    [FONTS.POPPINS_MEDIUM_ITALIC]: require('../assets/fonts/Poppins-MediumItalic.ttf'),
    [FONTS.POPPINS_REGULAR]: require('../assets/fonts/Poppins-Regular.ttf'),
    [FONTS.POPPINS_SEMI_BOLD]: require('../assets/fonts/Poppins-SemiBold.ttf'),
    [FONTS.POPPINS_SEMI_BOLD_ITALIC]: require('../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    [FONTS.POPPINS_THIN]: require('../assets/fonts/Poppins-Thin.ttf'),
    [FONTS.POPPINS_THIN_ITALIC]: require('../assets/fonts/Poppins-ThinItalic.ttf'),
    [FONTS.SPACEMONO_REGULAR]: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RNEThemeProvider theme={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(login)" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
      </RNEThemeProvider>
      
    </ThemeProvider>
  );
}
