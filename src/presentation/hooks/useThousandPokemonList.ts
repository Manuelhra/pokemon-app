import { useQuery } from '@tanstack/react-query';

import { GetThousandPokemonList } from '../../pokemon/application/use-cases/GetThousandPokemonList';

export const useThousandPokemonList = (getThousandPokemonList: GetThousandPokemonList) => {
  return useQuery({
    queryKey: ['pokemonList', 'all'],
    queryFn: () => getThousandPokemonList.execute(),
  });
};
