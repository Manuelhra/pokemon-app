import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicatorComponent } from './ActivityIndicatorComponent';
import { ThemeContext } from '../../context/ThemeContext';

type FullScreenLoaderProps = {};

export const FullScreenLoader = ({}: FullScreenLoaderProps): React.JSX.Element => {
  const { theme: { colors }, isDarkTheme } = useContext(ThemeContext);
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <ActivityIndicatorComponent  size={50} color={ isDarkTheme ? 'white' : '#b9b5b5' } />
    </View>
  );
};

const getStyles = (colors: { background: string } ) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
