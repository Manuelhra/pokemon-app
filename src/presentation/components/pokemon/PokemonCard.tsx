import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { IPokemon } from '../../../pokemon/domain/IPokemon';
import { FadeInImage } from '../ui/FadeInImage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigatorParamList } from '../../navigation/StackNavigator';

type PokemonCardProps = {
  pokemon: IPokemon;
};

export const PokemonCard = ({pokemon}: PokemonCardProps): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();

  return (
    <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('pokemon', { pokemonId: pokemon.id })}>
      <Card style={[ styles.cardContainer ]}>
        <Text style={styles.name} variant="bodyLarge" lineBreakMode="middle">
          {pokemon.name}
          { '\n#' + pokemon.id }
        </Text>

        {/* Pokeball background image */}
        <View style={styles.pokeballContainer}>
        <Image
          source={require('../../../assets/pokeball-light.png')}
          style={styles.pokeball}
        />
        </View>

        {/* Pokemon Image */}
        <FadeInImage
          uri={pokemon.avatar}
          style={styles.pokemonImage}
        />

        {/* Types */}
        <Text style={[styles.name, styles.types]}>{pokemon.sprites[0]}</Text>
      </Card>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },
  types: {
    marginTop: 20,
  },
});
