# Design Tokens — The Quiet Light

## Color Palette

### Core
```
Background (deep space)    #0D0B1F   ← Near-black with blue undertone
Inner world sky            #1A1540   ← Deep midnight blue
Surface cards              #1E1A3A   ← Slightly lighter surface

Quiet Light (core glow)    #FFD97D   ← Warm amber-gold
Quiet Light (halo)         #FFF4D0   ← Soft gold haze
Quiet Light (pulse outer)  #3D2A00   ← Deep warm for contrast ring

Text primary               #F5F0E8   ← Warm white (never pure white)
Text secondary             #B8AED4   ← Soft lavender-grey
Text muted                 #6B6292   ← Deeper purple-grey
```

### Aura / World Colors
```
Violet (spirit layer)      #7B5EA7
Indigo (intuition)         #4A4080
Blue (emotion)             #3A7BD5
Teal (heart)               #2AAEA8
Amber (earth energy)       #C17D3C
Rust (roots)               #8B3E2F
```

### Weather States
```
Sunny                      #FFD97D (Quiet Light gold)
Partly Cloudy              #89A7C5 (soft blue-grey)
Stormy                     #3D3560 (deep purple)
Foggy                      #A89BBE (misty lavender)
Windy                      #5BA8A0 (moving teal)
```

### Functional
```
Success / Growth           #5B9E6F  ← Forest green
Echo (not mine)            #C5A3D4  ← Soft violet
Echo (mine)                #FFD97D  ← Same as Quiet Light
Echo (not sure)            #89A7C5  ← Neutral blue
```

## Typography

```
Primary font:   Nunito         ← Warm, rounded, child-friendly
                                  (same as Felt Sense Friends for consistency)

Weights:
  Heavy:        Nunito_800ExtraBold   ← Chapter titles, big moments
  Bold:         Nunito_700Bold        ← Screen titles
  SemiBold:     Nunito_600SemiBold    ← Card labels, buttons
  Regular:      Nunito_400Regular     ← Body text, narration subtitles
  Light:        Nunito_300Light       ← Whisper text, ambient labels
```

## Spacing
```
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   40px
xxl:  64px
```

## Border Radius
```
sm:   8px
md:   16px
lg:   24px
pill: 999px
```

## Animations
```
Quiet Light pulse:   scale 1.0 → 1.08, opacity 0.8 → 1.0, 2000ms loop
Weather transition:  300ms ease-in-out
World entrance:      600ms spring (damping 15, stiffness 100)
Pond ripple:         1200ms sine wave, settles over 2 min
Echo shape morph:    400ms ease
```

## Key Design Principles

1. **Dark is safe, not scary.** Deep space background = mystery and wonder, not threat.
2. **Gold = the real self.** Any time the Quiet Light or the child's true nature is
   referenced, warm gold is the visual language.
3. **Round, not sharp.** All UI elements use generous radius. Safety = softness.
4. **Breathing UI.** Key elements gently pulse or breathe. The app itself feels alive.
5. **No harsh white.** Pure #FFFFFF never appears. Warmth in all surfaces.
6. **Text never shouts.** Large text is light-weight. Heavy weight only for emphasis.
