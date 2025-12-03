import { staticPosition, SetStaticPositionW, SetStaticPositionH } from "csa/lib/utils"

export const DISPLAY_BASE = 2008

export const st = (s: number | number[]) => staticPosition(s, DISPLAY_BASE)
export const stW = (w: number | number[]) => SetStaticPositionW(w, DISPLAY_BASE)
export const stH = (h: number | number[]) => SetStaticPositionH(h, DISPLAY_BASE)

// Para página de criar ONG
export const DISPLAY_CRIAR = 2438
export const stCriar = (s: number | number[]) => staticPosition(s, DISPLAY_CRIAR)
export const stWCriar = (w: number | number[]) => SetStaticPositionW(w, DISPLAY_CRIAR)
export const stHCriar = (h: number | number[]) => SetStaticPositionH(h, DISPLAY_CRIAR)
