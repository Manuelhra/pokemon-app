import React, { useContext, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';

import { globalTheme } from '../../../config/theme/global-theme';
import { ActivityIndicatorComponent } from '../../components/ui/ActivityIndicatorComponent';
import { ThemeContext } from '../../context/ThemeContext';
import { PokemonCard } from '../../components/pokemon/PokemonCard';
import { useThousandPokemonList } from '../../hooks/useThousandPokemonList';
import { getPokemonListByIds, getThousandPokemonList } from '../../../pokemon/infrastructure/dependency-injection/container';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { usePokemonListByIds } from '../../hooks/usePokemonListByIds';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

type SearchScreenProps = {};

export const SearchScreen = ({}: SearchScreenProps): React.JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const { isLoading, data: pokemonIdNameList = [] } = useThousandPokemonList(getThousandPokemonList);
  const [term, setTerm] = useState('');
  const [debouncedValue] = useDebouncedValue(term, 500);

  const pokemonIdList = useMemo(() => {
    if (debouncedValue.length === 0) {return [];}
    if (debouncedValue.length < 3) {return [];}

    return pokemonIdNameList.filter((pokemon) => pokemon.name.includes(debouncedValue.toLocaleLowerCase()));
  }, [debouncedValue, pokemonIdNameList]);

  const { isLoading: isLoadingPokemonList, data: pokemonValueObjectList = [] } = usePokemonListByIds(pokemonIdList.map((item) => item.id), getPokemonListByIds);
  const pokemonList = pokemonValueObjectList.map((pokemonValueObject) => pokemonValueObject.toPrimitives);

  const styles = getStyles(top);

  if (isLoading) {
    <FullScreenLoader />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Pokemon"
        mode="flat"
        autoCorrect={false}
        autoFocus
        value={term}
        onChange={(e) => setTerm(e.nativeEvent.text)}
      />

      { isLoadingPokemonList && <ActivityIndicatorComponent  style={styles.activityIndicator}  color={theme.colors.primary} /> }

      <FlatList
        data={pokemonList}
        keyExtractor={(pokemon, idx) => `${pokemon.id}-${idx}`}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        ListFooterComponent={<View style={styles.footerComponent} />}
      />
    </View>
  );
};

const getStyles = (top: number) => StyleSheet.create({
  container: {
    ...globalTheme.globalMargin,
    paddingTop: top,
  },
  activityIndicator:  {
    paddingTop: 20,
  },
  flatList: {
    marginTop: 20,
  },
  footerComponent: {
    height: 100,
  },
});
