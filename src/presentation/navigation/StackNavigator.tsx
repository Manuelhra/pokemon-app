import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/home/HomeScreen';
import { PokemonScreen } from '../screens/pokemon/PokemonScreen';
import { SearchScreen } from '../screens/search/SearchScreen';

type StackNavigatorProps = {};

export type StackNavigatorParamList = {
  home: undefined;
  pokemon: { pokemonId: string };
  search: undefined;
}

const Stack = createStackNavigator<StackNavigatorParamList>();

export const StackNavigator = ({}: StackNavigatorProps): React.JSX.Element => {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="home" component={HomeScreen} />
    <Stack.Screen name="pokemon" component={PokemonScreen} />
    <Stack.Screen name="search" component={SearchScreen} />
  </Stack.Navigator>
  );
};
