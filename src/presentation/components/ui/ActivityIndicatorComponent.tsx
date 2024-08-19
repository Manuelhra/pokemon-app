import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type ActivityIndicatorComponentProps = {
  style?: StyleProp<ViewStyle>;
  size?: number;
  color?: string;
}

export const ActivityIndicatorComponent = ({ style, size = 30, color = '#b9b5b5' }: ActivityIndicatorComponentProps): React.JSX.Element => {
  return (
    <View style={[styles.activityIndicator]}>
      <ActivityIndicator style={style} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    justifyContent: 'center',
    height: 150,
  },
});
