const ANIME_DATA = [

    {
        id: "one-piece",
        title: "One Piece",
        titleAr: "ون بيس",
        cover: "one_piece.jpg",
        status: "مستمر",

        seasons: [
            {
                id: "main",
                name: "One Piece",
                nameAr: "ون بيس",
                episodes: 1180,
                ongoing: true
            }
        ]
    },

    {
        id: "demon-slayer",
        title: "Demon Slayer",
        titleAr: "قاتل الشياطين",
        cover: "5a02947aed465c5b6a721884a87cdeca.jpg",
        status: "مستمر",

        seasons: [
            {
                id: "season-1",
                name: "Tanjiro Kamado, Unwavering Resolve Arc",
                nameAr: "قوس تانجيرو كامادو",
                episodes: 26
            },
            {
                id: "mugen-train-tv",
                name: "Mugen Train Arc",
                nameAr: "قوس قطار اللانهاية - التلفزيوني",
                episodes: 7
            },
            {
                id: "entertainment-district",
                name: "Entertainment District Arc",
                nameAr: "قوس حي الترفيه",
                episodes: 11
            },
            {
                id: "swordsmith-village",
                name: "Swordsmith Village Arc",
                nameAr: "قوس قرية صانعي السيوف",
                episodes: 11
            },
            {
                id: "hashira-training",
                name: "Hashira Training Arc",
                nameAr: "قوس تدريب الهاشيرا",
                episodes: 8
            },
            {
                id: "infinity-castle",
                name: "Infinity Castle",
                nameAr: "قلعة اللانهاية - الفيلم",
                episodes: 1,
                movie: true
            }
        ]
    },

    {
        id: "solo-leveling",
        title: "Solo Leveling",
        titleAr: "سولو ليفلينج",
        cover: "Solo leveling .jpg",
        status: "مستمر",

        seasons: [
            {
                id: "season-1",
                name: "Season 1",
                nameAr: "الموسم الأول",
                episodes: 12,
                watchId: "solo"
            },
            {
                id: "season-2",
                name: "Season 2",
                nameAr: "الموسم الثاني",
                episodes: 13,
                watchId: "solo-s2",
                cover: "Solo leveling season 2.jpg"
            }
        ]
    },

    {
        id: "naruto",
        title: "Naruto",
        titleAr: "ناروتو",
        cover: "naruto.jpg",
        status: "مكتمل",

        seasons: [
            {
                id: "naruto",
                name: "Naruto",
                nameAr: "ناروتو",
                episodes: 220
            },
            {
                id: "shippuden",
                name: "Naruto: Shippuden",
                nameAr: "ناروتو شيبودن",
                episodes: 500
            }
        ]
    },

    {
        id: "bleach",
        title: "Bleach",
        titleAr: "بليتش",
        cover: "bleach.jpg",
        status: "مستمر",

        seasons: [
            {
                id: "original",
                name: "Bleach",
                nameAr: "بليتش الأصلي",
                episodes: 366
            },
            {
                id: "tybw-1",
                name: "The Blood Warfare",
                nameAr: "حرب الألف عام - الجزء الأول",
                episodes: 13
            },
            {
                id: "tybw-2",
                name: "The Separation",
                nameAr: "حرب الألف عام - الجزء الثاني",
                episodes: 13
            },
            {
                id: "tybw-3",
                name: "The Conflict",
                nameAr: "حرب الألف عام - الجزء الثالث",
                episodes: 14
            },
            {
                id: "tybw-4",
                name: "The Calamity",
                nameAr: "حرب الألف عام - الجزء الرابع",
                episodes: 10
            }
        ]
    },

    {
        id: "my-hero-academia",
        title: "My Hero Academia",
        titleAr: "أكاديمية بطلي",
        cover: "my-hero-academia.jpg",
        status: "مكتمل",

        seasons: [
            {
                id: "season-1",
                name: "Season 1",
                nameAr: "الموسم الأول",
                episodes: 13
            },
            {
                id: "season-2",
                name: "Season 2",
                nameAr: "الموسم الثاني",
                episodes: 25
            },
            {
                id: "season-3",
                name: "Season 3",
                nameAr: "الموسم الثالث",
                episodes: 25
            },
            {
                id: "season-4",
                name: "Season 4",
                nameAr: "الموسم الرابع",
                episodes: 25
            },
            {
                id: "season-5",
                name: "Season 5",
                nameAr: "الموسم الخامس",
                episodes: 25
            },
            {
                id: "season-6",
                name: "Season 6",
                nameAr: "الموسم السادس",
                episodes: 25
            },
            {
                id: "season-7",
                name: "Season 7",
                nameAr: "الموسم السابع",
                episodes: 21
            },
            {
                id: "season-8",
                name: "Final Season",
                nameAr: "الموسم الثامن - الأخير",
                episodes: 11
            }
        ]
    },

    {
        id: "jujutsu-kaisen",
        title: "Jujutsu Kaisen",
        titleAr: "جوجوتسو كايسن",
        cover: "jujutsu-kaisen.jpg",
        status: "مستمر",

        seasons: [
            {
                id: "season-1",
                name: "Season 1",
                nameAr: "الموسم الأول",
                episodes: 24
            },
            {
                id: "season-2",
                name: "Season 2",
                nameAr: "الموسم الثاني",
                episodes: 23
            },
            {
                id: "season-3",
                name: "Culling Game - Part 1",
                nameAr: "لعبة الإبادة - الجزء الأول",
                episodes: 12
            }
        ]
    },

    {
        id: "dragon-ball",
        title: "Dragon Ball",
        titleAr: "دراغون بول",
        cover: "Dragon Ball.jpg",
        status: "مكتمل",

        seasons: [
            {
                id: "dragon-ball",
                name: "Dragon Ball",
                nameAr: "دراغون بول",
                episodes: 153
            },
            {
                id: "dragon-ball-z",
                name: "Dragon Ball Z",
                nameAr: "دراغون بول Z",
                episodes: 291
            },
            {
                id: "dragon-ball-gt",
                name: "Dragon Ball GT",
                nameAr: "دراغون بول GT",
                episodes: 64
            },
            {
                id: "dragon-ball-super",
                name: "Dragon Ball Super",
                nameAr: "دراغون بول سوبر",
                episodes: 131
            },
            {
                id: "dragon-ball-daima",
                name: "Dragon Ball DAIMA",
                nameAr: "دراغون بول دايما",
                episodes: 20
            }
        ]
    }

];


/* ==============================
   دوال البيانات
============================== */

function getAnimeById(id) {
    return ANIME_DATA.find(anime => anime.id === id);
}

function getSeasonById(anime, seasonId) {
    if (!anime) return null;

    return anime.seasons.find(
        season => season.id === seasonId
    );
}

function getSeasonIndex(anime, seasonId) {
    if (!anime) return -1;

    return anime.seasons.findIndex(
        season => season.id === seasonId
    );
                }
