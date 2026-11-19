
/* =========================================
   KATRO ANIME DATABASE
   English titles + automatic AniList data
========================================= */

const KATRO_ANIME = {};

const ANIME_LIST = [
    {
        title: "One Piece",
        episodes: 0,
        ongoing: true,
        seasons: [
            { id: "s1", name: "One Piece", episodes: 0 }
        ]
    },
    {
        title: "Solo Leveling",
        episodes: 25,
        seasons: [
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
        ]
    },
    {
        title: "Demon Slayer",
        episodes: 0,
        seasons: [
            { id: "s1", name: "Demon Slayer", episodes: 0, watchId: "Demon Slayer" }
        ]
    },
    {
        title: "Naruto",
        episodes: 720,
        seasons: [
            { id: "s1", name: "Naruto", episodes: 220, watchId: "Naruto" },
            { id: "s2", name: "Naruto Shippuden", episodes: 500, watchId: "Naruto Shippuden" }
        ]
    },
    {
        title: "Bleach",
        episodes: 406,
        seasons: [
            { id: "s1", name: "Bleach", episodes: 366, watchId: "Bleach" },
            { id: "s2", name: "Bleach: Thousand-Year Blood War", episodes: 40, watchId: "Bleach TYBW" }
        ]
    },
    {
        title: "Jujutsu Kaisen",
        episodes: 47,
        seasons: [
            { id: "s1", name: "Season 1", episodes: 24, watchId: "Jujutsu Kaisen" },
            { id: "s2", name: "Season 2", episodes: 23, watchId: "Jujutsu Kaisen" }
        ]
    },
    {
        title: "Attack on Titan",
        episodes: 89,
        seasons: [
            { id: "s1", name: "Season 1", episodes: 25, watchId: "Attack on Titan" },
            { id: "s2", name: "Season 2", episodes: 12, watchId: "Attack on Titan" },
            { id: "s3", name: "Season 3", episodes: 22, watchId: "Attack on Titan" },
            { id: "s4", name: "The Final Season", episodes: 30, watchId: "Attack on Titan" }
        ]
    },
    {
        title: "My Hero Academia",
        episodes: 0,
        seasons: [
            { id: "s1", name: "My Hero Academia", episodes: 0 }
        ]
    },
    {
        title: "Dragon Ball",
        episodes: 639,
        seasons: [
            { id: "s1", name: "Dragon Ball", episodes: 153 },
            { id: "s2", name: "Dragon Ball Z", episodes: 291 },
            { id: "s3", name: "Dragon Ball GT", episodes: 64 },
            { id: "s4", name: "Dragon Ball Super", episodes: 131 }
        ]
    },
    {
        title: "Black Clover",
        episodes: 170,
        seasons: [
            { id: "s1", name: "Black Clover", episodes: 170 }
        ]
    },
    {
        title: "Hunter x Hunter",
        episodes: 148,
        seasons: [
            { id: "s1", name: "Hunter x Hunter", episodes: 148 }
        ]
    },
    {
        title: "Death Note",
        episodes: 37,
        seasons: [
            { id: "s1", name: "Death Note", episodes: 37 }
        ]
    },
    {
        title: "One Punch Man",
        episodes: 24,
        seasons: [
            { id: "s1", name: "Season 1", episodes: 12 },
            { id: "s2", name: "Season 2", episodes: 12 }
        ]
    },
    {
        title: "Tokyo Ghoul",
        episodes: 48,
        seasons: [
            { id: "s1", name: "Tokyo Ghoul", episodes: 12 },
            { id: "s2", name: "Tokyo Ghoul √A", episodes: 12 },
            { id: "s3", name: "Tokyo Ghoul:re", episodes: 24 }
        ]
    }
];

/* Additional anime titles */
const EXTRA_ANIME = [
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

/* Build database */
ANIME_LIST.forEach(function (anime) {
    KATRO_ANIME[anime.title] = {
        title: anime.title,
        arabic: anime.title,
        cover: "",
        totalEpisodes: anime.episodes,
        ongoing: anime.ongoing || false,
        seasons: anime.seasons
    };
});

/* Add remaining anime without invented episode counts */
EXTRA_ANIME.forEach(function (name) {
    if (KATRO_ANIME[name]) return;

    KATRO_ANIME[name] = {
        title: name,
        arabic: name,
        cover: "",
        totalEpisodes: 0,
        seasons: [
            {
                id: "s1",
                name: "Complete Series",
                episodes: 0
            }
        ]
    };
});

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
   ANILIST AUTOMATIC DATA
========================================= */

(function () {
    const API = "https://graphql.anilist.co";
    const CACHE_KEY = "katro_anime_database_v5";
    const CACHE_TIME = 7 * 24 * 60 * 60 * 1000;

    const ALIASES = {
        "Demon Slayer": ["Kimetsu no Yaiba"],
        "Attack on Titan": ["Shingeki no Kyojin"],
        "Haikyuu!!": ["Haikyu"],
        "Frieren: Beyond Journey's End": ["Sousou no Frieren"],
        "The Apothecary Diaries": ["Kusuriya no Hitorigoto"],
        "Pokémon": ["Pokemon", "Pocket Monsters"],
        "Parasyte": ["Kiseijuu"],
        "Hunter x Hunter": ["Hunter x Hunter (2011)"]
    };

    function normalize(value) {
        return String(value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, "");
    }

    function exactMatch(name, media) {
        const titles = [
            media.title && media.title.english,
            media.title && media.title.romaji,
            ...(media.synonyms || [])
        ];

        const accepted = [name, ...(ALIASES[name] || [])]
            .map(normalize);

        return titles.some(function (title) {
            return title && accepted.includes(normalize(title));
        });
    }

    function applyData(data) {
        Object.keys(data).forEach(function (name) {
            const anime = getAnime(name);
            const item = data[name];

            if (!anime || !item) return;

            if (item.cover) {
                anime.cover = item.cover;
            }

            if (item.episodes > 0) {
                anime.totalEpisodes = item.episodes;

                /* Update only automatically generated series */
                if (
                    anime.seasons.length === 1 &&
                    anime.seasons[0].name === "Complete Series"
                ) {
                    anime.seasons[0].episodes = item.episodes;
                }

                if (
                    anime.seasons.length === 1 &&
                    anime.seasons[0].name !== "Complete Series" &&
                    anime.seasons[0].episodes === 0
                ) {
                    anime.seasons[0].episodes = item.episodes;
                }
            }
        });
    }

    async function fetchBatch(names) {
        const fields = names.map(function (name, index) {
            const searchName =
                (ALIASES[name] && ALIASES[name][0]) || name;

            return `
                a${index}: Page(page: 1, perPage: 5) {
                    media(
                        search: ${JSON.stringify(searchName)},
                        type: ANIME,
                        sort: SEARCH_MATCH,
                        isAdult: false
                    ) {
                        title {
                            english
                            romaji
                        }
                        synonyms
                        episodes
                        coverImage {
                            extraLarge
                            large
                        }
                    }
                }
            `;
        }).join("\n");

        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query: `query { ${fields} }`
            })
        });

        if (!response.ok) {
            throw new Error("AniList request failed");
        }

        const result = await response.json();

        if (!result.data) {
            throw new Error("AniList data unavailable");
        }

        const output = {};

        names.forEach(function (name, index) {
            const page = result.data["a" + index];
            const results = page && page.media ? page.media : [];

            const media = results.find(function (item) {
                return exactMatch(name, item);
            });

            if (!media) return;

            output[name] = {
                episodes: media.episodes || 0,
                cover:
                    media.coverImage &&
                    (media.coverImage.extraLarge ||
                     media.coverImage.large)
            };
        });

        return output;
    }

    async function fetchAll() {
        const names = getAnimeNames();
        const output = {};

        for (let i = 0; i < names.length; i += 5) {
            const batch = names.slice(i, i + 5);
            const result = await fetchBatch(batch);
            Object.assign(output, result);
        }

        return output;
    }

    async function start() {
        try {
            const saved = JSON.parse(
                localStorage.getItem(CACHE_KEY) || "null"
            );

            if (
                saved &&
                saved.time &&
                Date.now() - saved.time < CACHE_TIME
            ) {
                applyData(saved.data || {});
            }
        } catch (error) {
            console.log("KATRO: Cache unavailable");
        }

        try {
            const data = await fetchAll();

            applyData(data);

            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                    time: Date.now(),
                    data: data
                })
            );

            console.log("KATRO: Anime data updated");
        } catch (error) {
            console.log("KATRO: AniList update failed", error);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }
})();
