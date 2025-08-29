import { ScreenSize } from "./getScreenSize";


export function isMobile( breakpoint = 700) {
  const { width, height } = ScreenSize();
  return (width*4 <= height*3 || width < breakpoint) || (height < 1000 && width < 1000)
}