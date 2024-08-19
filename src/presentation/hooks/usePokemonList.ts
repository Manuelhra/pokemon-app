import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { GetPokemonListUseCase } from '../../pokemon/application/use-cases/GetPokemonListUseCase';

export const usePokemonList = (options: { page?: number; limit?: number; }, getPokemonListUseCase: GetPokemonListUseCase) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: ['pokemonList', 'infinite', 'pokemonDetail'],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const pokemonList = await getPokemonListUseCase.execute({ page: pageParam });
      pokemonList.forEach((pokemonValueObject) => {
        const pokemon = pokemonValueObject.toPrimitives;

        queryClient.setQueryData(['pokemonDetail', pokemon.id], pokemonValueObject);
      });

      return pokemonList;
    },
    getNextPageParam: (_lastPages, allPages) => allPages.length,
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
};
