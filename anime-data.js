
/* =========================================
   KATRO ANIME DATABASE
   Ordered anime list
   English titles
   Official AniList covers
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
   CREATE DATABASE IN FIXED ORDER
========================================= */

ANIME_NAMES.forEach(function(name, index) {

    KATRO_ANIME[name] = {
        order: index + 1,
        title: name,
        arabic: name,
        cover: "",
        anilistId: null,
        totalEpisodes: 0,
        seasons: []
    };

});

/* =========================================
   SOLO LEVELING
========================================= */

KATRO_ANIME["Solo Leveling"].seasons = [
    {
        id: "s1",
        name: "Solo Leveling",
        episodes: 12,
        cover: "",
        watchId: "solo"
    },
    {
        id: "s2",
        name: "Solo Leveling Season 2",
        episodes: 13,
        cover: "",
        watchId: "solo-s2"
    }
];

KATRO_ANIME["Solo Leveling"].totalEpisodes = 25;

/* =========================================
   NARUTO SERIES
========================================= */

KATRO_ANIME["Naruto"].seasons = [
    {
        id: "s1",
        name: "Naruto",
        episodes: 220,
        cover: "",
        watchId: "Naruto"
    },
    {
        id: "s2",
        name: "Naruto Shippuden",
        episodes: 500,
        cover: "",
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
    return ANIME_NAMES.slice();
}

/* =========================================
   ANILIST COVER SYSTEM
========================================= */

(function() {

    const API = "https://graphql.anilist.co";

    /* New cache version */
    const CACHE_KEY = "KATRO_ANIME_DATA_V7";

    const ALIASES = {
        "Demon Slayer": "Kimetsu no Yaiba",
        "Attack on Titan": "Shingeki no Kyojin",
        "Haikyuu!!": "Haikyu",
        "Frieren: Beyond Journey's End": "Sousou no Frieren",
        "The Apothecary Diaries": "Kusuriya no Hitorigoto",
        "Pokémon": "Pokemon",
        "Parasyte": "Kiseijuu",
        "Hunter x Hunter": "Hunter x Hunter",
        "The Seven Deadly Sins": "Nanatsu no Taizai",
        "Blue Exorcist": "Ao no Exorcist",
        "The Promised Neverland": "Yakusoku no Neverland",
        "Your Lie in April": "Shigatsu wa Kimi no Uso",
        "Mob Psycho 100": "Mob Psycho 100",
        "One Piece": "One Piece",
        "Solo Leveling": "Ore dake Level Up na Ken",
        "Naruto": "Naruto",
        "Bleach": "Bleach",
        "Jujutsu Kaisen": "Jujutsu Kaisen",
        "My Hero Academia": "Boku no Hero Academia",
        "Black Clover": "Black Clover",
        "Death Note": "Death Note",
        "One Punch Man": "One Punch Man",
        "Tokyo Ghoul": "Tokyo Ghoul",
        "Blue Lock": "Blue Lock",
        "Chainsaw Man": "Chainsaw Man",
        "Spy x Family": "Spy x Family",
        "Vinland Saga": "Vinland Saga",
        "JoJo's Bizarre Adventure": "JoJo no Kimyou na Bouken",
        "Code Geass": "Code Geass",
        "Steins;Gate": "Steins Gate",
        "Re:Zero": "Re Zero",
        "Sword Art Online": "Sword Art Online",
        "Overlord": "Overlord",
        "Dr. Stone": "Dr Stone",
        "Fire Force": "Enen no Shouboutai",
        "Tokyo Revengers": "Tokyo Revengers",
        "Akame ga Kill!": "Akame ga Kill",
        "Assassination Classroom": "Ansatsu Kyoushitsu",
        "Classroom of the Elite": "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e",
        "Noragami": "Noragami",
        "Erased": "Boku dake ga Inai Machi",
        "Made in Abyss": "Made in Abyss",
        "Monster": "Monster",
        "Cyberpunk: Edgerunners": "Cyberpunk Edgerunners",
        "Oshi no Ko": "Oshi no Ko",
        "Kaiju No. 8": "Kaijuu 8-gou",
        "Wind Breaker": "Wind Breaker",
        "Dandadan": "Dandadan",
        "Record of Ragnarok": "Shuumatsu no Walküre",
        "Baki": "Baki",
        "Kengan Ashura": "Kengan Ashura",
        "Detective Conan": "Detective Conan",
        "Yu-Gi-Oh!": "Yu-Gi-Oh",
        "Digimon": "Digimon Adventure",
        "Slam Dunk": "Slam Dunk",
        "Kuroko's Basketball": "Kuroko no Basket",
        "Fairy Tail": "Fairy Tail",
        "Magi": "Magi",
        "Gintama": "Gintama",
        "Soul Eater": "Soul Eater",
        "Food Wars": "Shokugeki no Souma"
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
        const alias = normalize(ALIASES[name] || name);

        const titles = [
            media.title?.english,
            media.title?.romaji,
            media.title?.native,
            ...(media.synonyms || [])
        ].filter(Boolean);

        return titles.some(function(title) {

            const normalized = normalize(title);

            return normalized === wanted ||
                   normalized === alias;

        });
    }

    /* =====================================
       APPLY COVER DATA
    ===================================== */

    function applyData(data) {

        Object.keys(data).forEach(function(name) {

            const anime = getAnime(name);
            const item = data[name];

            if (!anime || !item) return;

            anime.cover = item.cover || anime.cover;
            anime.anilistId = item.id || anime.anilistId;

            if (item.episodes > 0) {

                anime.totalEpisodes = item.episodes;

                /* Only fill an unknown episode count */
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

    /* =====================================
       SEARCH ANILIST
    ===================================== */

    async function searchAnime(name) {

        const queryName = ALIASES[name] || name;

        const query = `
        query {
            Page(perPage: 15) {
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

            body: JSON.stringify({
                query: query
            })

        });

        if (!response.ok) {
            throw new Error("AniList API error");
        }

        const json = await response.json();

        const mediaList =
            json?.data?.Page?.media || [];

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

    /* =====================================
       LOAD ALL ANIME
    ===================================== */

    async function loadAll() {

        const output = {};

        const usedIds = new Set();

        for (const name of ANIME_NAMES) {

            try {

                const item = await searchAnime(name);

                if (!item) continue;

                /* Avoid assigning the same anime to two entries */
                if (usedIds.has(item.id)) continue;

                usedIds.add(item.id);

                output[name] = item;

                await new Promise(function(resolve) {
                    setTimeout(resolve, 300);
                });

            } catch(error) {

                console.warn(
                    "KATRO cover failed:",
                    name
                );

            }

        }

        return output;

    }

    /* =====================================
       START DATABASE
    ===================================== */

    async function start() {

        /* Load saved covers first */

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

        /* Refresh official covers */

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

            console.log(
                "KATRO: Anime database updated"
            );

        } catch(error) {

            console.error(
                "KATRO update failed",
                error
            );

        }

    }

    start();

})();
