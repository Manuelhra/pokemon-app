import { IHttpClient } from '../../../shared/infrastructure/IHttpClient';
import { Pokemon } from '../../domain/Pokemon';
import type { IPokemonRepository } from '../../domain/repository/IPokemonRepository';
import type { PokemonDetailResponse, PokemonListResponse } from '../interfaces/PokemonListResponse';
import { PokemonMapper } from '../mappers/PokemonMapper';

export class PokemonRepository implements IPokemonRepository {
  #httpClient: IHttpClient;

  constructor(dependencies: {httpClient: IHttpClient}) {
    this.#httpClient = dependencies.httpClient;
  }

  public async getList(options: { page: number; limit: number; }): Promise<Pokemon[]> {
    const response = await this.#httpClient.get<PokemonListResponse>(`/pokemon?offset=${options.page * options.limit}&limit=${options.limit}`);

    const pokemonListPromises = response.results.map((item) => this.#httpClient.get<PokemonDetailResponse>(item.url));
    const pokemonList = await Promise.all(pokemonListPromises);

    return pokemonList.map((pokemonDetail) => PokemonMapper.mapApiPokemonToDomain(pokemonDetail));
  }

  public async getPokemon(pokemonId: string): Promise<Pokemon | undefined> {
    const response = await this.#httpClient.get<PokemonDetailResponse>(`/pokemon/${pokemonId}`);

    return PokemonMapper.mapApiPokemonToDomain(response);
  }

  public async getThousandPokemonList(): Promise<{id: string; name: string;}[]> {
    const response = await this.#httpClient.get<PokemonListResponse>('/pokemon?limit=1000');

    return response.results.map((item) => ({ id: item.url.split('/')[6], name: item.name }));
  }

  public async getPokemonListByIds(pokemonIds: string[]): Promise<Pokemon[]> {
    const pokemonListPromises = pokemonIds.map((pokemonId) => this.#httpClient.get<PokemonDetailResponse>(`/pokemon/${pokemonId}`));
    const pokemonList = await Promise.all(pokemonListPromises);

    return pokemonList.map((pokemonDetail) => PokemonMapper.mapApiPokemonToDomain(pokemonDetail));
  }
}
