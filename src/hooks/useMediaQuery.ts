export const useMediaQuery = (viewport: string) => {
  return window.matchMedia(viewport);
}