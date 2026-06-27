# Current Phase: Core Build — Complete

## Status
All core screens and navigation are implemented. App is runnable.

## What's built
- [x] Expo Router setup (index.ts → expo-router/entry)
- [x] Root layout with Nunito font loading + SplashScreen
- [x] Onboarding flow: welcome → name → character → home
- [x] Home screen (Inner World Map) with QuietLight + weather selector
- [x] Tab navigation: My Light | Practice | Journey | Echo
- [x] Practice hub with 5 practices
- [x] Check-in (2 min) — weather selection practice
- [x] Quick Quieting (3 min) — step-by-step observer practice
- [x] Still Pond (5-8 min) — pond metaphor observer practice
- [x] Deep Practice (10-15 min) — full guided session
- [x] Quiet Chamber — open-ended safe space
- [x] Journey tab with 8 chapters, progressive unlock
- [x] All 8 chapter texts (full page-by-page content)
- [x] Echo Journal — add/log feelings with mine/notMine/unsure tagging
- [x] State persists via AsyncStorage (useStore)
- [x] lightBrightness grows with each session (completeSession)

## Remaining for polish pass
- [ ] Add haptic feedback on key interactions (expo-haptics installed)
- [ ] Add progress bar / step indicator animations
- [ ] App icon design
- [ ] Onboarding: add a 4th "discovery" screen with the three-world map
- [ ] Sound: optional ambient tone during Quiet Chamber
- [ ] Chapter completion animation (burst of light)

## How to run
```
cd C:\Users\coreb\Projects\quiet-light\app
npx expo start
```
Scan QR with Expo Go on Android, or press `a` for Android emulator.
