export const GradientColor = {
  light: 'linear-gradient(45deg, #FF8000 30%, #ffa64d 90%)',
  dark: 'linear-gradient(45deg, #0d0d0d 30%, #262626 90%)'
}
export enum EThemeType {
  light = 'light',
  dark = 'dark',
}
export interface IGlobalAttributes {
  themeHTChallenge: EThemeType | 'light'
}

export type VideoType = {
  id: string,
  url: string,
  name: string,
  frames: Array<string>
}

export type CutArea = {
  begin: number,
  end: number
}