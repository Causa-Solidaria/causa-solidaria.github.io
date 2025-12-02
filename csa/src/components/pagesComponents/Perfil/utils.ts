import { staticPosition, SetStaticPositionW, SetStaticPositionH } from "csa/lib/utils"

export const MAX_SIZE = 1871

export const st = (s: number) => staticPosition(s, MAX_SIZE)
export const stW = (w: number) => SetStaticPositionW(w, MAX_SIZE)
export const stH = (h: number) => SetStaticPositionH(h, MAX_SIZE)
