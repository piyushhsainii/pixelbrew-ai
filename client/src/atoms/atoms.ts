import { atom } from "recoil";

export const authUser = atom({
    key: "authUser",
    default: null,
});

export const userImageLink = atom({
    key: "userImageLink",
    default: null
})
export const userUsername = atom({
    key: "userUsername",
    default: null
})
export const userAbout = atom({
    key: "userAbout",
    default: null
})

export const promptInfo = atom({
    key: "promptInfo",
    default: null
})

export const Balance = atom({
    key: "balance",
    default: null
})