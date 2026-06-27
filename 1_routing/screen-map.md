# Screen Map — The Quiet Light

## Navigation Structure

```
app/
├── index.tsx                    ← Welcome / first launch
├── onboarding/
│   ├── _layout.tsx
│   ├── name.tsx                 ← What's your name?
│   ├── character.tsx            ← Choose your character
│   └── discovery.tsx            ← First fall into inner world (cinematic)
├── (home)/
│   ├── _layout.tsx
│   └── index.tsx                ← Inner World Map (main home)
├── (practice)/
│   ├── _layout.tsx
│   ├── checkin.tsx              ← Weather check-in
│   ├── short.tsx                ← 3-min practice
│   ├── long.tsx                 ← 10-15 min practice
│   ├── pond.tsx                 ← The Still Pond (observer practice)
│   └── chamber.tsx             ← The Quiet Chamber (safe space)
├── (journey)/
│   ├── _layout.tsx
│   ├── index.tsx                ← Chapter list / world map
│   └── [chapter].tsx            ← Individual chapter content
└── (echo)/
    ├── _layout.tsx
    └── index.tsx                ← Echo Journal ("whose feeling is this?")
```

## Screen Descriptions

### index.tsx — Welcome
- First launch only
- Cinematic: dark screen, a small point of light appears
- Text fades in: "Inside you, there is a light that never goes out."
- CTA: "Find yours →"

### onboarding/name.tsx
- "What do you like to be called?"
- Simple text input, warm styling
- Stored locally (SQLite)

### onboarding/character.tsx
- Choose character appearance (3-4 silhouette options)
- Skin tone, hair style
- Character shown standing in a misty inner world

### onboarding/discovery.tsx
- Cinematic "first fall" sequence
- Animated: character steps through a door of light, lands in inner world
- Inner world appears stormy/cloudy
- Character spots the Quiet Light in the distance for the first time
- No text — pure visual + narration audio

### (home)/index.tsx — Inner World Map
- The living landscape (animated background)
- Weather overlay matches last check-in
- Three world entrances visible:
  - Left: Feeling Forest (FSF link)
  - Center: Earth Chamber (GK link)
  - Right: Quiet Chamber (this app)
- Quiet Light glowing at center
- Daily practice button: "Practice today →"
- Echo Journal icon (top right)

### (practice)/checkin.tsx — Weather Check-in
- "How does your inner world look today?"
- 5 weather options (visual, no text labels):
  Sunny / Partly Cloudy / Stormy / Foggy / Windy
- Leads to: short or long practice choice

### (practice)/short.tsx — Short Practice (3 min)
Step 1: Find your feet (grounding — 30 sec animation)
Step 2: Three breaths to the light (animated light pulses with breaths)
Step 3: "You are safe inside yourself." (full screen, gentle hold)
Step 4: Inner world clears slightly (visual reward)

### (practice)/long.tsx — Long Practice (10-15 min)
Step 1: Weather check-in
Step 2: Grounding tree (extended visualization, 2 min)
Step 3: Body scan / feeling visitor (FSF sensation style)
Step 4: The Still Pond (embedded pond component, 5 min)
Step 5: Return to the light (Quiet Chamber moment, 1 min)
Step 6: Closing: "You found your way back. You always can."

### (practice)/pond.tsx — The Still Pond
- Animated rippling water surface
- Instruction: "Just watch. Don't touch."
- Mechanic: touching disturbs the water, stillness lets it settle
- After 2 min of sustained stillness: an image appears in the reflection
  (a scene from the inner world, or a symbol)
- Narration: "The pond shows you clearly when you stop stirring it."

### (practice)/chamber.tsx — The Quiet Chamber
- The innermost safe space
- Full-screen: deep blue, the Quiet Light at center, pulsing gently
- Child's name displayed softly
- Options: just be here / hear a message / bring a feeling here
- This screen is always available as a refuge — no practice required

### (journey)/index.tsx — Journey Map
- Visual map of chapters as areas of the inner world
- 6 chapters (see content architecture)
- Shows which are complete, which are next

### (echo)/index.tsx — Echo Journal
- Today's question: "Did you notice a feeling today?"
- Three-tap response: Mine / Not mine / Not sure
- Visual: a floating shape that shifts color based on response
- Weekly pattern view: "Look — these feelings visit you often"
- No text required, symbol/color based
