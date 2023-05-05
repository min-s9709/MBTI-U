import { atom } from "recoil";

export const genreForMbti = atom({
  key: "genreWithMbti",
  default: [
    {
      ISTJ: 18,
    },
    {
      ISFJ: 10751,
    },
    {
      INFJ: 18,
    },
    {
      INTJ: 9648,
    },
    {
      ISTP: 28,
    },
    {
      ISFP: 18,
    },
    {
      INFP: 10749,
    },
    {
      INTP: 878,
    },
    {
      ESTP: 35,
    },
    {
      ESFP: 10402,
    },
    {
      ENFP: 14,
    },
    {
      ENTP: 35,
    },
    {
      ESTJ: 28,
    },
    {
      ESFJ: 14,
    },
    {
      ENFJ: 10749,
    },
    {
      ENTJ: 53,
    },
  ],
});
