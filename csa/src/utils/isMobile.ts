

export function isMobile(width: number, height: number, breakpoint = 700) {
  return (width*2 <= height || width < breakpoint) && (height < 1000 || width < 1000)
}