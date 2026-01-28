export interface PokemonGridDTO {
    count: number,
    next: string | null
    previous: string | null,
    results: PokemonGridResult[]
}

interface PokemonGridResult {
    name: string,
    url: string
}

export interface PokemonDTO {
    id: number;
    name: string;
    abilities: Ability[];
    base_experience: number;
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    is_default: boolean;
    location_area_encounters: string;
    order: number;
    past_abilities: Ability[];
    past_types: TypeSlot[];
    species: Species;
    sprites: Sprites;
    stats: Stat[];
    types: TypeSlot[];
    weight: number;
    moves: Move[];
    cries: Cries;
}

export interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface Form {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: {
        name: string;
        url: string | null;
    };
}

export interface HeldItem {
    item: {
        name: string;
        url: string;
    };
    version_details: {
        rarity: number;
        version: {
            name: string;
            url: string;
        };
    }[];
}

export interface Species {
    name: string;
    url: string;
}

export interface Sprites {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
    other?: {
        dream_world?: {
            front_default: string | null;
            front_female: string | null;
        };
        "official-artwork"?: {
            front_default: string | null;
        };
    };
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface TypeSlot {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface Cries {
    latest: string | null;
    legacy: string | null;
}

export interface Move {
    move: {
        name: string;
        url: string;
    };
    version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: {
        name: string;
        url: string;
    };
    version_group: {
        name: string;
        url: string;
    };
}