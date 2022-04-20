import like from "assets/images/emoji/like.png";
import heart from "assets/images/emoji/heart.png";
import laugh from "assets/images/emoji/laugh.png";
import surprise from "assets/images/emoji/surprise.png";
import sad from "assets/images/emoji/sad.png";
import angered from "assets/images/emoji/angered.png";

export const TOAST_DEFAULT_OPTIONS = { autoClose: 2000 };

export const APP_KEY = {
    MEDIA: "5df4ce16506d9b3c587948ca",
    CHATTING: "5dfe4c1b51dc622100bb9d8f",
    PCM_PLAN_TASK: "5dfe4b9051dc622100bb9d89",
    DOCUMENT: "5e47867080019357cce04746",
    HUMAN: "61e049c9fdebf77b072d1b13",
    CMCS: "6131d6f83f4b736dc93253b2",
}

export const EMOJI_TYPE = [
    {
        id: 1,
        icon: like,
        value: 1
    },
    {
        id: 2,
        icon: heart,
        value: 2
    },
    {
        id: 3,
        icon: laugh,
        value: 3
    },
    {
        id: 4,
        icon: surprise,
        value: 4
    },
    {
        id: 5,
        icon: sad,
        value: 5
    },
    {
        id: 6,
        icon: angered,
        value: 6
    }
];