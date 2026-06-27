# Screen Architecture — The Quiet Light

> Full design spec for every screen. Reference when adding or redesigning screens.

## Navigation tree

```
index.tsx                   ← Redirect only (onboarding | home)
onboarding/
  welcome.tsx               ← Cinematic fade-in, "light that never goes out"
  name.tsx                  ← Text input "What shall we call you?"
  character.tsx             ← Companion choice: Owl / Fox / Turtle
(tabs)/
  home.tsx                  ← Inner World Map (main hub)
  practice.tsx              ← Practice menu (5 options)
  journey.tsx               ← 8 chapters with progressive unlock
  echo.tsx                  ← Echo Journal (feelings log)
practice/
  checkin.tsx               ← 2-min morning weather check-in
  short.tsx                 ← 3-min Quick Quieting
  pond.tsx                  ← 5-8 min Still Pond observer practice
  long.tsx                  ← 10-15 min Deep Practice
  chamber.tsx               ← Open-ended Quiet Chamber (safe space)
journey/
  [chapter].tsx             ← Dynamic: ch1–ch8 with page-by-page content
```

## Screen design principles

- **Dark background everywhere** (`#0D0B1F`) — deep space, safe, not scary
- **Quiet Light (gold `#FFD97D`)** appears on every screen that has a completion state
- **No headers** — `headerShown: false` always; back navigation via "← Back" text links
- **Large touch targets** — buttons min 48px height, pill-shaped with generous padding
- **Breathing UI** — key elements pulse (QuietLight) or animate gently

## Companion characters

| ID | Emoji | Name | Trait |
|----|-------|------|-------|
| owl | 🦉 | Owl | wise and still |
| fox | 🦊 | Fox | curious and brave |
| turtle | 🐢 | Turtle | grounded and safe |

## Weather states

| State | Emoji | Label | Color |
|-------|-------|-------|-------|
| sunny | ☀️ | Bright | `#FFD97D` |
| partlyCloudy | ⛅ | Mixed | `#89A7C5` |
| stormy | ⛈️ | Stormy | `#3D3560` |
| foggy | 🌫️ | Foggy | `#A89BBE` |
| windy | 💨 | Swirling | `#5BA8A0` |

## Chapter list (Journey tab)

| ID | Title | Theme |
|----|-------|-------|
| ch1 | The Light Inside | Discover your quiet center |
| ch2 | The Weather of Feelings | Feelings come and go like weather |
| ch3 | The Still Pond | You are the water, not the ripple |
| ch4 | The Voices in the Wind | Not every thought is yours |
| ch5 | The Echo | Feelings can belong to others |
| ch6 | The Shadow Friend | The confused part of you |
| ch7 | The Quiet Chamber | Your safe place inside |
| ch8 | The Gardener | Growing your light over time |

Unlock rule: only the next unread chapter is unlocked (progressive disclosure).

## Practice list

| ID | Title | Duration | File |
|----|-------|----------|------|
| checkin | Morning Check-in | 2 min | practice/checkin.tsx |
| short | Quick Quieting | 3 min | practice/short.tsx |
| pond | The Still Pond | 5-8 min | practice/pond.tsx |
| long | Deep Practice | 10-15 min | practice/long.tsx |
| chamber | Quiet Chamber | Open-ended | practice/chamber.tsx |

## Completion flow

Every practice that has steps ends with:
1. `completeSession()` called — adds +2% to `lightBrightness`, increments `totalSessions`
2. A "done" screen shown: QuietLight at high brightness + affirming text
3. `router.back()` returns to the practice hub

Every chapter that reaches the last page:
1. `chaptersComplete` updated with the chapter id
2. "Chapter complete" screen shown
3. `router.back()` returns to Journey tab
