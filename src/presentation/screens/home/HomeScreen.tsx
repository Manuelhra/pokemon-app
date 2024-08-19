import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePokemonList } from '../../hooks/usePokemonList';
import { getPokemonListUseCase } from '../../../pokemon/infrastructure/dependency-injection/container';
import { PokemonBallBg } from '../../components/ui/PokemonBallBg';
import { globalTheme } from '../../../config/theme/global-theme';
import { PokemonCard } from '../../components/pokemon/PokemonCard';
import { ActivityIndicatorComponent } from '../../components/ui/ActivityIndicatorComponent';
import { ThemeContext } from '../../context/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigatorParamList } from '../../navigation/StackNavigator';

type HomeScreenProps = {};

export const HomeScreen = ({}: HomeScreenProps): React.JSX.Element => {
  const { top } = useSafeAreaInsets();
  const { data, fetchNextPage } = usePokemonList({ page: 0 }, getPokemonListUseCase);
  const { isDarkTheme, theme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<StackNavigatorParamList, 'home'>>();


  const styles = getStyles(top, theme.colors);
  const pokemonList = !data ? [] : data.pages.flat().map((pokemon) => pokemon.toPrimitives);

  return (
    <View style={globalTheme.globalMargin}>
      <PokemonBallBg  style={styles.imgPosition} />

      <FlatList
        data={pokemonList}
        keyExtractor={(pokemon, idx) => `${pokemon.id}-${idx}`}
        numColumns={2}
        ListHeaderComponent={<Text variant="displayMedium">Pokedex</Text>}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        ListFooterComponent={<ActivityIndicatorComponent />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

      <FAB
        icon={'search'}
        style={[globalTheme.fab, styles.fab]}
        mode="elevated"
        color={isDarkTheme ? 'white' : 'black'}
        label="Search"
        onPress={() => navigation.navigate('search')}
      />
    </View>
  );
};


const getStyles = (top: number, colors: { primary: string; }) => StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
  flatList: {
    paddingTop: top + 20,
  },
  fab: {
    backgroundColor: colors.primary,
  },
});
