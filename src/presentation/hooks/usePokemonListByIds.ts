import { useQuery } from '@tanstack/react-query';

import { GetPokemonListByIds } from '../../pokemon/application/use-cases/GetPokemonListByIds';

export const usePokemonListByIds = (pokemonIds: string[], getPokemonListByIds: GetPokemonListByIds) => {
  return useQuery({
    queryKey: ['pokemonListByIds', pokemonIds],
    queryFn: () => getPokemonListByIds.execute(pokemonIds),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
