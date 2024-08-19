import React, { useContext } from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

type PokemonBallBgProps = {
  style?: StyleProp<ImageStyle>;
};

export const PokemonBallBg = ({ style: customStyle }: PokemonBallBgProps): React.JSX.Element => {
  const { isDarkTheme }  = useContext(ThemeContext);

  const pokemonBallImg = isDarkTheme ? require('../../../assets/pokeball-dark.png') : require('../../../assets/pokeball-light.png');

  return (
    <Image
      source={pokemonBallImg}
      style={[styles.container, customStyle]}

    />
  );
};


const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    opacity: 0.3,
  },
});
