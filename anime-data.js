
/* =========================================
   KATRO ANIME DATABASE - CLEAN VERSION
   Official anime covers via AniList
   English titles
========================================= */

const KATRO_ANIME = {};

const ANIME_NAMES = [
    "One Piece",
    "Solo Leveling",
    "Demon Slayer",
    "Naruto",
    "Bleach",
    "Jujutsu Kaisen",
    "Attack on Titan",
    "My Hero Academia",
    "Dragon Ball",
    "Black Clover",
    "Hunter x Hunter",
    "Death Note",
    "One Punch Man",
    "Tokyo Ghoul",
    "Blue Lock",
    "Chainsaw Man",
    "Spy x Family",
    "Haikyuu!!",
    "Vinland Saga",
    "Mob Psycho 100",
    "JoJo's Bizarre Adventure",
    "Code Geass",
    "Steins;Gate",
    "Re:Zero",
    "Sword Art Online",
    "Overlord",
    "Dr. Stone",
    "Fire Force",
    "Tokyo Revengers",
    "Parasyte",
    "Akame ga Kill!",
    "Assassination Classroom",
    "Classroom of the Elite",
    "Noragami",
    "Erased",
    "Your Lie in April",
    "Made in Abyss",
    "Monster",
    "Cyberpunk: Edgerunners",
    "Frieren: Beyond Journey's End",
    "The Apothecary Diaries",
    "Oshi no Ko",
    "Kaiju No. 8",
    "Wind Breaker",
    "Dandadan",
    "Record of Ragnarok",
    "Baki",
    "Kengan Ashura",
    "Detective Conan",
    "Yu-Gi-Oh!",
    "Digimon",
    "Pokémon",
    "Slam Dunk",
    "Kuroko's Basketball",
    "The Seven Deadly Sins",
    "Fairy Tail",
    "Magi",
    "Gintama",
    "Soul Eater",
    "Blue Exorcist",
    "Food Wars",
    "The Promised Neverland"
];

/* =========================================
   CREATE DATABASE
========================================= */

ANIME_NAMES.forEach(function(name) {
    KATRO_ANIME[name] = {
        title: name,
        arabic: name,
        cover: "",
        anilistId: null,
        totalEpisodes: 0,
        seasons: [
            {
                id: "s1",
                name: "Season 1",
                episodes: 0,
                cover: ""
            }
        ]
    };
});

/* Solo Leveling known seasons */
KATRO_ANIME["Solo Leveling"].seasons = [
    {
        id: "s1",
        name: "Season 1",
        episodes: 12,
        watchId: "solo"
    },
    {
        id: "s2",
        name: "Season 2",
        episodes: 13,
        watchId: "solo-s2"
    }
];
KATRO_ANIME["Solo Leveling"].totalEpisodes = 25;

/* Naruto */
KATRO_ANIME["Naruto"].seasons = [
    {
        id: "s1",
        name: "Naruto",
        episodes: 220,
        watchId: "Naruto"
    },
    {
        id: "s2",
        name: "Naruto Shippuden",
        episodes: 500,
        watchId: "Naruto Shippuden"
    }
];
KATRO_ANIME["Naruto"].totalEpisodes = 720;

/* =========================================
   DATABASE FUNCTIONS
========================================= */

function getAnime(name) {
    return KATRO_ANIME[name] || null;
}

function getAnimeNames() {
    return Object.keys(KATRO_ANIME);
}

/* =========================================
   ANILIST OFFICIAL COVER DATA
========================================= */

(function() {

    const API = "https://graphql.anilist.co";
    const CACHE_KEY = "KATRO_ANIME_DATA_V6";
    const CACHE_TIME = 24 * 60 * 60 * 1000;

    const ALIASES = {
        "Demon Slayer": "Kimetsu no Yaiba",
        "Attack on Titan": "Shingeki no Kyojin",
        "Haikyuu!!": "Haikyu",
        "Frieren: Beyond Journey's End": "Sousou no Frieren",
        "The Apothecary Diaries": "Kusuriya no Hitorigoto",
        "Pokémon": "Pokemon",
        "Parasyte": "Kiseijuu",
        "Hunter x Hunter": "Hunter x Hunter"
    };

    function normalize(text) {
        return String(text || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, "");
    }

    function matchAnime(name, media) {
        const wanted = normalize(name);
        const titles = [
            media.title?.english,
            media.title?.romaji,
            media.title?.native,
            ...(media.synonyms || [])
        ];

        return titles.some(function(title) {
            return normalize(title) === wanted;
        });
    }

    function applyData(data) {
        Object.keys(data).forEach(function(name) {
            const anime = getAnime(name);
            const item = data[name];

            if (!anime || !item) return;

            anime.cover = item.cover || anime.cover;
            anime.anilistId = item.id || null;

            if (item.episodes > 0) {
                anime.totalEpisodes = item.episodes;

                if (
                    anime.seasons.length === 1 &&
                    anime.seasons[0].episodes === 0
                ) {
                    anime.seasons[0].episodes = item.episodes;
                }
            }
        });

        document.dispatchEvent(
            new Event("KATRO_DATA_UPDATED")
        );
    }

    async function searchAnime(name) {
        const queryName = ALIASES[name] || name;

        const query = `
        query {
            Page(perPage: 10) {
                media(
                    search: ${JSON.stringify(queryName)}
                    type: ANIME
                    sort: SEARCH_MATCH
                    isAdult: false
                ) {
                    id
                    title {
                        english
                        romaji
                        native
                    }
                    synonyms
                    episodes
                    coverImage {
                        extraLarge
                        large
                    }
                }
            }
        }`;

        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error("AniList API error");
        }

        const json = await response.json();
        const mediaList = json?.data?.Page?.media || [];

        const exact = mediaList.find(function(media) {
            return matchAnime(name, media);
        });

        if (!exact) return null;

        return {
            id: exact.id,
            cover:
                exact.coverImage?.extraLarge ||
                exact.coverImage?.large ||
                "",
            episodes: exact.episodes || 0
        };
    }

    async function loadAll() {
        const output = {};
        const usedIds = new Set();

        for (const name of ANIME_NAMES) {
            try {
                const item = await searchAnime(name);

                if (!item) continue;

                /* Prevent accidentally assigning the same anime result */
                if (usedIds.has(item.id)) continue;

                usedIds.add(item.id);
                output[name] = item;

                await new Promise(resolve => setTimeout(resolve, 350));

            } catch (error) {
                console.warn("KATRO cover failed:", name);
            }
        }

        return output;
    }

    async function start() {

        /* Load saved data first */
        try {
            const saved = JSON.parse(
                localStorage.getItem(CACHE_KEY) || "null"
            );

            if (saved && saved.data) {
                applyData(saved.data);
            }
        } catch(error) {
            console.warn("KATRO cache error");
        }

        /* Refresh from AniList */
        try {
            const freshData = await loadAll();

            applyData(freshData);

            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                    time: Date.now(),
                    data: freshData
                })
            );

            console.log("KATRO: Anime covers updated");

        } catch(error) {
            console.error("KATRO update failed", error);
        }
    }

    start();

})();
