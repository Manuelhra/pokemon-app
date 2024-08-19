import { useQuery } from '@tanstack/react-query';
import { GetPokemonDetailUseCase } from '../../pokemon/application/use-cases/GetPokemonDetailUseCase';


export const usePokemonDetail = (pokemonId: string, getPokemonDetailUseCase: GetPokemonDetailUseCase) => {
return useQuery({
    queryKey: ['pokemonDetail', pokemonId],
    queryFn: () => getPokemonDetailUseCase.execute(pokemonId),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
};
