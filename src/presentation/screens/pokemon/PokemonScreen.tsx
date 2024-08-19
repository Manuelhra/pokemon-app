import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigatorParamList } from '../../navigation/StackNavigator';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { getPokemonDetailUseCase } from '../../../pokemon/infrastructure/dependency-injection/container';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { Chip, Text } from 'react-native-paper';
import { Formatter } from '../../../config/helpers/capitalize';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../context/ThemeContext';

type PokemonScreenProps = {};

export const PokemonScreen = ({}: PokemonScreenProps): React.JSX.Element => {
  const { top } = useSafeAreaInsets();
  const { isDarkTheme } = useContext(ThemeContext);
  const { params } = useRoute<RouteProp<StackNavigatorParamList, 'pokemon'>>();
  const { data: pokemonDetailValueObject, isLoading } = usePokemonDetail(params.pokemonId, getPokemonDetailUseCase);

  if (isLoading || !pokemonDetailValueObject) {
    return <FullScreenLoader />;
  }

  const pokemonDetail = pokemonDetailValueObject.toPrimitives;
  const styles = getStyles(top);
  const pokemonBallImg = isDarkTheme ? require('../../../assets/pokeball-dark.png') : require('../../../assets/pokeball-light.png');

  return (
<ScrollView
  style={styles.scrollView}
  bounces={ false }
  showsVerticalScrollIndicator={ false }>
  <View style={ styles.headerContainer }>
    <Text
      style={styles.pokemonName}>
      { Formatter.capitalize(pokemonDetail.name) + '\n' }#{ pokemonDetail.id }
    </Text>

    <Image source={ pokemonBallImg } style={ styles.pokeball } />

    <FadeInImage uri={ pokemonDetail.avatar } style={ styles.pokemonImage } />
  </View>

  <View
    style={styles.spritesContainer}>
    { pokemonDetail.sprites.map( sprite => (
      <Chip
        key={ sprite }
        mode="outlined"
        selectedColor="white"
        style={styles.chip}>
        { sprite }
      </Chip>
    ) ) }
  </View>

  <FlatList
    data={ pokemonDetail.types }
    horizontal
    keyExtractor={ item => item }
    showsHorizontalScrollIndicator={ false }
    centerContent
    style={styles.typesContainer}
    renderItem={ ( { item } ) => (
      <FadeInImage
        uri={ item }
        style={styles.fadeInImage}
      />
    ) }
  />


  <View style={styles.lastView} />
</ScrollView>
  );
};


const getStyles = (top: number) => StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
    top: top + 5,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  spritesContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
  },
  chip: {
    marginLeft: 10,
  },
  typesContainer: {
    marginTop: 20,
    height: 100,
  },
  fadeInImage: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  lastView: {
    height: 100,
  },
});
