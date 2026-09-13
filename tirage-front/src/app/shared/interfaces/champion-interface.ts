export interface Champion {
    id: string;
    key: string;
    name: string;
    image: {
        full: string;
        sprite: string;
    };
    title: string;
    blurb: string;
    stats: {
        "hp": number,
        "hpperlevel": number,
        "mp": number,
        "mpperlevel": number,
        "movespeed": number,
        "armor": number,
        "armorperlevel": number,
        "spellblock": number,
        "spellblockperlevel": number,
        "attackrange": number,
        "hpregen": number,
        "hpregenperlevel": number,
        "mpregen": number,
        "mpregenperlevel": number,
        "crit": number,
        "critperlevel": number,
        "attackdamage": number,
        "attackdamageperlevel": number,
        "attackspeedperlevel": number,
        "attackspeed": number
    },
    tags: [string],
    partype: string,
    info: {
        "attack": number,
        "defense": number,
        "magic": number,
        "difficulty": number
    },
}
