import { Pokemon } from '../Pokemon';

export interface IPokemonRepository {
  getList(options: { page?: number; limit?: number; }): Promise<Pokemon[]>;
  getPokemon(pokemonId: string): Promise<Pokemon | undefined>;
  getThousandPokemonList(): Promise<{id: string; name: string}[]>;
  getPokemonListByIds(pokemonIds: string[]): Promise<Pokemon[]>;
}
