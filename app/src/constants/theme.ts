export const Colors = {
  // Core backgrounds
  background: '#0D0B1F',
  surface: '#1A1540',
  surfaceCard: '#1E1A3A',
  surfaceElevated: '#252050',

  // The Quiet Light — gold palette
  quietLight: '#FFD97D',
  quietLightHalo: '#FFF4D0',
  quietLightDeep: '#3D2A00',
  quietLightGlow: 'rgba(255, 217, 125, 0.15)',

  // Text
  textPrimary: '#F5F0E8',
  textSecondary: '#B8AED4',
  textMuted: '#6B6292',

  // Aura / world spectrum
  violet: '#7B5EA7',
  indigo: '#4A4080',
  blue: '#3A7BD5',
  teal: '#2AAEA8',
  amber: '#C17D3C',
  rust: '#8B3E2F',

  // Weather states
  sunny: '#FFD97D',
  partlyCloudy: '#89A7C5',
  stormy: '#3D3560',
  foggy: '#A89BBE',
  windy: '#5BA8A0',

  // Echo Journal
  echoMine: '#FFD97D',
  echoNotMine: '#C5A3D4',
  echoUnsure: '#89A7C5',

  // Functional
  success: '#5B9E6F',
  border: 'rgba(255, 255, 255, 0.08)',
  overlay: 'rgba(13, 11, 31, 0.85)',
} as const;

export const Fonts = {
  light: 'Nunito_300Light',
  regular: 'Nunito_400Regular',
  semiBold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  heavy: 'Nunito_800ExtraBold',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
  xxl: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const Duration = {
  fast: 200,
  normal: 350,
  slow: 600,
  breath: 2000,
} as const;
