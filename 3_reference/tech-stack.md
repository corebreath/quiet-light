# Tech Stack — The Quiet Light

> Reference for tech decisions. Read before adding dependencies.

## Core dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| expo | ~56.0.12 | App shell, build tooling |
| react | 19.2.3 | UI framework |
| react-native | 0.85.3 | Native renderer |
| expo-router | ~56.2.11 | File-based navigation |
| react-native-reanimated | ^4.3.1 | Animations (QuietLight pulse, fade-ins) |
| @react-native-async-storage/async-storage | 2.2.0 | Local persistence |
| @expo-google-fonts/nunito | ^0.4.2 | Typography (loaded via useFonts at runtime) |
| react-native-safe-area-context | ~5.7.0 | Insets for notch/home bar |
| react-native-screens | 4.25.2 | Native screen optimization |
| expo-splash-screen | ~56.0.10 | Controlled splash hide after fonts load |
| expo-haptics | ~56.0.3 | Haptic feedback (installed, not yet wired) |
| expo-audio | ~56.0.12 | Audio (installed, not yet wired) |
| expo-sqlite | ~56.0.5 | SQLite (installed, not yet used — AsyncStorage used instead) |

## Key patterns

### Font loading
- Uses `useFonts` from `@expo-google-fonts/nunito` — no local `.ttf` files needed
- `expo-font` plugin removed from `app.json` (local font paths didn't exist)
- SplashScreen is held until `fontsLoaded === true`

### State management
- Single `useStore()` hook (custom, no Zustand/Redux)
- Reads from AsyncStorage on mount, writes back on every update
- Key: `'ql_state_v1'`
- No backend. All state local. COPPA-safe.

### Navigation
- Expo Router (file-based). `index.ts` → `expo-router/entry`
- Root Stack: fade animation by default
- Onboarding Stack: `slide_from_right`
- Tabs: `none` animation (instant tab switch)
- Practice/Journey stacks: `slide_from_right`

### Reanimated v4
- Installed with `--legacy-peer-deps` (peer conflict with RN 0.85.3)
- NO Babel plugin needed — v4 uses Rust worklets, not Babel transform
- No `babel.config.js` needed
- Used in: `QuietLight.tsx` (pulse), `welcome.tsx` (fade-in sequence)

### Brightness model
- `lightBrightness`: 20–100, starts at 20%
- Grows +2% per `completeSession()` call
- Used as `brightness` prop in `<QuietLight brightness={state.lightBrightness} />`
- Alpha clamped to min 0.15 in `QuietLight.tsx` — never fully dark

## File conventions

```
app/app/          Expo Router screens (route = file path)
src/components/   Reusable components
  ui/             Generic UI (QuietLight, PracticeStep)
  inner-world/    Domain-specific (WeatherIcon)
src/constants/    Design tokens (theme.ts)
src/store/        State (useStore.ts)
src/hooks/        Custom hooks (future: usePractice, useProgress)
src/utils/        Utilities (future)
```

## Known issues / gotchas

- `react-native-reanimated` installed with `--legacy-peer-deps` — if you add new deps, use same flag or `--force`
- `adaptive-icon.png` referenced as `android-icon-foreground.png` in `app.json` (non-standard name from project scaffold)
- `App.tsx` is kept but unused — `index.ts` now points to `expo-router/entry`
- `expo-sqlite` is installed but not used — AsyncStorage was chosen for simplicity

## What's NOT in the project (by design)

- No backend / API server
- No auth / login
- No analytics / tracking
- No push notifications (yet)
- No IAP / subscriptions (yet)
- No inter-app communication with FSF or Grounded Kids (yet)
