import {useRef} from 'react';
import {Animated, Easing} from 'react-native';

export const useAnimation = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTopPosition = useRef(new Animated.Value(0)).current;

  const fadeIn = ({
    toValue = 1,
    duration = 500,
    easing = Easing.linear,
    cb = () => {},
  }) => {
    Animated.timing(animatedOpacity, {
      toValue,
      duration,
      easing,
      useNativeDriver: true,
    }).start(cb);
  };

  const fadeOut = ({toValue = 0, duration = 300}) => {
    Animated.timing(animatedOpacity, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const startMovingTopPosition = ({
    initialPosition = 0,
    toValue = 0,
    duration = 500,
    easing = Easing.linear,
    cb = () => {},
  }) => {
    animatedTopPosition.setValue(initialPosition);
    Animated.timing(animatedTopPosition, {
      toValue,
      duration,
      easing,
      useNativeDriver: true,
    }).start(cb);
  };

  return {
    animatedOpacity,
    animatedTopPosition,
    fadeIn,
    fadeOut,
    startMovingTopPosition,
  };
};
