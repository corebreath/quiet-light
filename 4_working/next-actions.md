# Next Actions — The Quiet Light

> Specific next steps with file paths. Update at the end of each session.
> Last updated: 2026-06-27

## Ready to start immediately

### 1. Haptic feedback (expo-haptics is already installed)
File: every `TouchableOpacity.onPress` in screens
Pattern: `import * as Haptics from 'expo-haptics'; Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);`
Add to: weather selection, practice "Continue" buttons, chapter completion

### 2. Progress bar for multi-step practices
File: `app/app/practice/short.tsx`, `pond.tsx`, `long.tsx`, `journey/[chapter].tsx`
Pattern: a thin gold bar under the title, `width: (step/total * 100)%`
Use `Animated.View` with `useAnimatedStyle` for smooth transition

### 3. Chapter completion burst animation
File: `app/app/journey/[chapter].tsx` — the `done` screen
Pattern: `useEffect` triggers a scale+opacity animation on QuietLight when `completed` becomes true
Consider using `withSpring` for a satisfying pop

### 4. Discovery/cinematic onboarding screen (4th onboarding step)
File: create `app/app/onboarding/discovery.tsx`
Design: character steps into the inner world for the first time — dark landscape, Quiet Light visible in distance
Route: add after character.tsx, before redirecting to home

### 5. Ambient sound in Quiet Chamber
File: `app/app/practice/chamber.tsx`
Package: `expo-audio` (already installed)
Sound: a very soft, low hum / binaural tone — load from `assets/sounds/chamber-tone.mp3`
Toggle: user can tap to start/stop

### 6. Settings screen
File: create `app/app/settings.tsx`
Access: via gear icon on home screen
Content: child name (editable), companion choice (editable), reset progress

## Phase 2 ideas (after v1 polish)

- Voice narration for all practices (expo-audio + pre-recorded MP3s)
- Inner World Map animated background (weather-responsive sky)
- Weekly view in Echo Journal ("these feelings visit you often")
- App-to-app deeplinks: FSF and Grounded Kids can link here
- Spanish (es) translation after v1

## EAS build (run this yourself, do not run autonomously)

```bash
cd app
eas build --profile preview --platform android
```

Prerequisites:
- EAS CLI: `npm install -g eas-cli`
- Logged in: `eas login`
- Configured: `eas build:configure`
