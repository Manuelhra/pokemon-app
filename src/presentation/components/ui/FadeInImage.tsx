import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';

import {useAnimation} from '../../hooks/useAnimation';

type FadeInImageProps = {
  uri: string;
  style?: StyleProp<ImageStyle>;
};

export const FadeInImage = ({
  uri,
  style,
}: FadeInImageProps): React.JSX.Element => {
  const {animatedOpacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const isDisposed = React.useRef<boolean>(false);

  useEffect(() => {
    return () => {
      isDisposed.current = true;
    };
  }, []);

  const onLoadEnd = (): void => {
    if (isDisposed.current) {return;}
      fadeIn({duration: 300});
      setIsLoading(false);
  };

  const styles = getStyles(animatedOpacity);

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          color={'gray'}
          size={30}
        />
      )}

      <Animated.Image
        source={{uri}}
        style={[style, styles.animatedImage]}
        onLoadEnd={onLoadEnd}
      />
    </View>
  );
};

const getStyles = (animatedOpacity: Animated.Value) => StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
  },
  animatedImage: {
    opacity: animatedOpacity,
    resizeMode: 'contain',
  },
});
