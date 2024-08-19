import { Pokemon } from '../../domain/Pokemon';
import { IPokemonRepository } from '../../domain/repository/IPokemonRepository';

export class GetPokemonListUseCase {
  readonly #pokemonRepository: IPokemonRepository;

  constructor(dependencies: {pokemonRepository: IPokemonRepository}) {
    this.#pokemonRepository = dependencies.pokemonRepository;
  }

  public async execute({ page = 1, limit = 10 }: { page?: number; limit?: number; }): Promise<Pokemon[]> {
    return this.#pokemonRepository.getList({ page, limit });
  }
}
