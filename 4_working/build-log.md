# Build Log

## Session 1 (2026-06-27)
- Analyzed BPI + Roy Masters books, wrote comparative report
- Generated spiritual portrait image (Downloads/human_nature_portrait.jpg)
- Created ICM project structure (0_identity, 1_routing, 2_stage, 3_reference, 4_working)
- Initialized Expo app (SDK 56, expo-router, Reanimated v4, AsyncStorage, Nunito fonts)
- Built core files: theme.ts, useStore.ts, QuietLight.tsx, WeatherIcon.tsx
- Built all screens:
  - Onboarding: welcome, name, character
  - Tabs: home, practice, journey, echo
  - Practice: checkin, short, pond, long, chamber
  - Journey: [chapter] (all 8 chapters with full content)
  - Root layout with font loading + SplashScreen

## Key decisions
- Fonts: @expo-google-fonts/nunito loaded at runtime (no local font files needed)
- Navigation: expo-router file-based with nested stacks
- State: useStore hook + AsyncStorage (no backend, COPPA-safe)
- lightBrightness: starts at 20%, grows +2% per session, max 100%
- Chapters: locked progressively — only one chapter ahead is unlocked
- Characters: Owl (wise/still), Fox (curious/brave), Turtle (grounded/safe)

## Known issues / to watch
- react-native-reanimated v4 was installed with --legacy-peer-deps (peer conflict with RN 0.85.3)
- No babel.config.js needed for Reanimated v4 (uses Rust worklets, no Babel plugin)
- adaptive-icon updated to use android-icon-foreground.png (matches existing asset)
