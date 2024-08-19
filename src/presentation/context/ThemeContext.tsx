import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import { Appearance, AppState, ColorSchemeName } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';
import IonIcons from 'react-native-vector-icons/Ionicons';


const IconComponent = (props: IconProps) => <IonIcons {...props} />;

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
  isDarkTheme: false,
  theme: LightTheme,
});

export const ThemeContextProvider = ({ children }: PropsWithChildren): React.JSX.Element => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>('light');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', _nextAppState => {
      const scheme = Appearance.getColorScheme();

      setColorScheme(scheme);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const isDarkTheme: boolean = colorScheme === 'dark';
  const theme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: IconComponent,
      }}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider value={{
          isDarkTheme,
          theme,
        }}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
