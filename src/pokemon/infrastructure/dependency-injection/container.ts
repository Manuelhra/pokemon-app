import { AxiosHttpClient } from '../../../shared/infrastructure/AxiosHttpClient';
import { GetPokemonDetailUseCase } from '../../application/use-cases/GetPokemonDetailUseCase';
import { GetPokemonListByIds } from '../../application/use-cases/GetPokemonListByIds';
import { GetPokemonListUseCase } from '../../application/use-cases/GetPokemonListUseCase';
import { GetThousandPokemonList } from '../../application/use-cases/GetThousandPokemonList';
import { PokemonRepository } from '../repository/PokemonRepository';

const httpClient = new AxiosHttpClient({ options: { baseurl: 'https://pokeapi.co/api/v2' } });
const pokemonRepository = new PokemonRepository({ httpClient });

export const getPokemonListUseCase = new GetPokemonListUseCase({ pokemonRepository });
export const getPokemonDetailUseCase = new GetPokemonDetailUseCase({ pokemonRepository });
export const getThousandPokemonList = new GetThousandPokemonList({ pokemonRepository });
export const getPokemonListByIds = new GetPokemonListByIds({ pokemonRepository });
