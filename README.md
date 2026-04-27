# BCI Starter Pack

A collection of browser-based mini-games designed from the ground up for Brain-Computer Interface (BCI) users.

## About

Built for Neuralink Prime Study participants and BCI users broadly. Every game is designed around cursor movement and 1–3 click inputs — no keyboard required.

## Games

| Game             | Description                                                     | Status  |
| ---------------- | --------------------------------------------------------------- | ------- |
| Hackey Sac       | Color-matched click training with a falling ball                | Live    |
| WebGrid          | BPS benchmark — colored cells in an N×N grid                    | Live    |
| Golf             | Putt-putt mini-golf (Live), driving range + course planned      | Live    |
| Hoops            | Free Throw + Three-Point — rotating colored rim, click to match | Live    |
| QB Targets       | Football receiver targeting under pressure                      | Planned |
| Goalie / Striker | Soccer shot blocking and striking                               | Planned |
| Batter / Pitcher | Baseball timing and pitch selection                             | Planned |
| Rally            | Tennis / badminton color-matched returns                        | Planned |
| Range            | Target practice with decision-making                            | Planned |
| Tower Defense    | Wave-based click strategy                                       | Planned |
| Side Scroller    | Action platformer                                               | Planned |

## How to Play

Open `index.html` in any modern browser to launch the game hub. Each game opens directly in your browser — no installation required.

## BCI Input

All games support 1, 2, or 3 click inputs and adjustable cursor sensitivity. Configure inputs per game in the in-game Settings panel.

## Project Structure

```
bci-starter-pack/
├── index.html           # Game launcher hub
├── games/
│   ├── hackey-sac/      # BCI Hackey Sac
│   ├── webgrid/         # WebGrid (BPS benchmark)
│   ├── golf/            # Golf (Putt-Putt Live, Driving Range + Course planned)
│   └── hoops/           # BCI Hoops (Free Throw + Three-Point Live)
├── shared/              # Shared BCI utilities and config
├── FUTURE_FEATURES.md   # Planned games and enhancements
└── ASSETS.md            # Asset and license tracking
```

## Tech Stack

- Vanilla HTML, CSS, JavaScript
- No build step required
- ESLint + Prettier for code quality
