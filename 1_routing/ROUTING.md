# Routing Guide — The Quiet Light

> For AI agents landing cold. Read this to know where everything lives.

## Project root layout

```
quiet-light/
├── CLAUDE.md                      ← Start here every session
├── 0_identity/IDENTITY.md         ← What this app is, non-negotiables
├── 1_routing/ROUTING.md           ← This file — navigation map
├── 2_stage/current-phase.md       ← Current sprint / what's next
├── 3_reference/                   ← Static knowledge (design, content, tech)
│   ├── design-tokens.md           ← Colors, fonts, spacing (source of truth)
│   ├── tech-stack.md              ← Dependencies, patterns, gotchas
│   ├── screen-architecture.md     ← Full screen/navigation design spec
│   └── content-library.md        ← All teaching text (chapters + practices)
├── 4_working/                     ← Active scratch (changes every session)
│   ├── build-log.md               ← Session-by-session decisions
│   └── next-actions.md            ← Specific next steps with file paths
└── app/                           ← The Expo project (runnable)
    ├── app/                       ← Expo Router screens (file-based nav)
    │   ├── _layout.tsx            ← Root: fonts + SplashScreen
    │   ├── index.tsx              ← Redirect: onboarding | (tabs)/home
    │   ├── onboarding/            ← welcome → name → character
    │   ├── (tabs)/                ← home | practice | journey | echo
    │   ├── practice/              ← checkin short pond long chamber
    │   └── journey/               ← [chapter].tsx — 8 chapters
    └── src/
        ├── constants/theme.ts     ← Colors, Fonts, Spacing, Radius, Duration
        ├── store/useStore.ts      ← All app state + AsyncStorage persistence
        └── components/
            ├── ui/QuietLight.tsx       ← Animated golden orb (core symbol)
            ├── ui/PracticeStep.tsx     ← Reusable step card
            └── inner-world/
                └── WeatherIcon.tsx     ← 5-state weather selector

```

## If you need to…

| Task | Go to |
|------|-------|
| Understand the vision | `0_identity/IDENTITY.md` |
| Change colors or fonts | `src/constants/theme.ts` + `3_reference/design-tokens.md` |
| Add or edit app state | `src/store/useStore.ts` |
| Add a new screen | `app/app/` (follow Expo Router file conventions) |
| Edit a practice script | `app/app/practice/` + `3_reference/content-library.md` |
| Edit chapter content | `app/app/journey/[chapter].tsx` + `3_reference/content-library.md` |
| Understand screen design | `3_reference/screen-architecture.md` |
| Check what's left to build | `2_stage/current-phase.md` + `4_working/next-actions.md` |
| Understand tech decisions | `3_reference/tech-stack.md` |

## Navigation model (Expo Router)

- Root Stack: `_layout.tsx` manages all top-level routes
- Onboarding: its own Stack (slide animation), exits to `(tabs)/home`
- Tabs: `(tabs)/_layout.tsx` — 4 tabs: home, practice, journey, echo
- Practice screens: pushed onto a nested Stack in `practice/`
- Journey screens: pushed onto a nested Stack in `journey/`
- No backend. No auth. All state local via AsyncStorage.

## State shape (useStore)

```ts
{
  childName: string           // set in onboarding/name
  characterId: string         // 'owl' | 'fox' | 'turtle'
  onboardingComplete: boolean // gates redirect in app/index.tsx
  lightBrightness: number     // 20–100, grows +2 per session
  currentWeather: WeatherState // 'sunny'|'partlyCloudy'|'stormy'|'foggy'|'windy'
  totalSessions: number
  lastPracticeDate: string | null
  echoEntries: Array<{date, answer, label}>  // last 90
  chaptersComplete: string[]  // ['ch1', 'ch2', ...]
}
```
