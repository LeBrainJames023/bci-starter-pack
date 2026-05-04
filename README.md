# BCI Starter Pack

A collection of browser-based mini-games designed from the ground up for Brain-Computer Interface (BCI) users.

## About

Built for Neuralink Prime Study participants and BCI users broadly. Every game is designed around cursor movement and 1–3 click inputs — no keyboard required.

## Games

| Game             | Description                                                        | Status      |
| ---------------- | ------------------------------------------------------------------ | ----------- |
| Hackey Sac       | Color-matched click training with a falling ball                   | Live        |
| WebGrid          | BPS benchmark — colored cells in an N×N grid                       | Live        |
| Golf             | Putt-Putt v1 (7 holes); driving range + full course planned        | Live        |
| Hoops            | Free Throw + Three-Point + 9-Shot Drill — color-matched shooting   | Live        |
| QB Targets       | Behind-QB football targeting — concurrent reads, sack/incompletion | Live        |
| Goalie / Striker | Soccer Penalty Shootout — side + color save read (Goalie mode)     | Live        |
| Boxing           | First-person boxing — 4-punch combos with Guitar Hero counter      | Live        |
| Batter / Pitcher | Baseball — 3 pitch types, free-cursor swing with timing windows    | Live        |
| Hockey           | Slap Shot — 5-zone read with iconic five-hole, 6s shot clock       | Live        |
| Rally            | Tennis: serve combo + ACE, color-matched rally returns             | Live        |
| Archery          | Hold cursor steady, release at the right moment                    | Coming Soon |
| Range            | Target practice with friend/foe decision-making                    | Coming Soon |
| Tower Defense    | Wave-based click strategy                                          | Coming Soon |
| Side Scroller    | Action platformer                                                  | Coming Soon |

## How to Play

Open `index.html` in any modern browser to launch the game hub. Each game opens directly in your browser — no installation required.

## BCI Input

All games support 1, 2, or 3 click inputs and adjustable cursor sensitivity. Configure inputs per game in the in-game Settings panel.

## Project Structure

```
bci-starter-pack/
├── index.html           # Game launcher hub
├── games/
│   ├── hackey-sac/      # Live — color-matched falling-ball training
│   ├── webgrid/         # Live — BPS benchmark
│   ├── golf/            # Live — Putt-Putt v1 (7 holes)
│   ├── hoops/           # Live — Free Throw + 3PT + 9-Shot Drill
│   ├── qb-targets/      # Live — football receiver targeting
│   ├── goalie-striker/  # Live — Soccer Penalty Shootout (Goalie)
│   ├── boxing/          # Live — 4-punch combo offense + counter
│   ├── batter-pitcher/  # Live — Batter mode v1
│   ├── hockey/          # Live — Slap Shot v1
│   ├── rally/           # Live — Tennis v1 (serve combo + ACE, color-matched returns)
│   ├── archery/         # Coming Soon
│   ├── range/           # Coming Soon
│   ├── tower-defense/   # Coming Soon (Godot HTML5 export drops here)
│   └── side-scroller/   # Coming Soon (likely separate repo)
├── shared/              # Shared BCI modules (input, settings, analytics, shell, walkthrough)
├── DESIGN_GUIDE.md      # BCI design standards
├── FUTURE_FEATURES.md   # Project backlog
└── ASSETS.md            # Asset and license tracking
```

## Tech Stack

- Vanilla HTML, CSS, JavaScript
- No build step required
- ESLint + Prettier for code quality
