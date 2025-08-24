# 🏀 BasketNad - Modern Basketball Game

A modern, professional basketball shooting game built for the Mission 7 Monad Game Jam using Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern UI/UX Design**: Professional gradient backgrounds, glass-morphism effects, and smooth animations
- **Realistic Physics**: Parabolic ball trajectory with collision detection
- **Interactive Gameplay**: Drag and drop basketball mechanics with touch support
- **Time Challenge**: 60-second scoring challenge
- **Visual Effects**: Score animations, trajectory trails, and particle effects
- **Responsive Design**: Works on desktop and mobile devices
- **Modular Architecture**: Clean, maintainable component structure

## 🎮 How to Play

1. Click "START GAME" to begin
2. Click and drag the basketball to aim
3. Release to shoot at the glowing hoop
4. Score as many baskets as possible in 60 seconds!

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd basketballnad
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main game page
├── components/              # Reusable UI components
│   ├── BackgroundEffects.tsx
│   ├── Basketball.tsx
│   ├── BasketballCourt.tsx
│   ├── BasketballHoop.tsx
│   ├── GameHUD.tsx
│   ├── GameInstructions.tsx
│   ├── GameOverModal.tsx
│   ├── GameTitle.tsx
│   ├── ScoreEffect.tsx
│   ├── StartGameMenu.tsx
│   └── TrajectoryTrail.tsx
└── hooks/                   # Custom React hooks
    ├── useGameLogic.ts      # Main game logic and state
    ├── useMouseHandlers.ts  # Mouse interaction handlers
    └── useTouchHandlers.ts  # Touch interaction handlers
```

## 🎨 Design Features

### Visual Elements
- **Gradient Backgrounds**: Multi-layered animated gradients
- **Glass Morphism**: Backdrop blur effects with transparency
- **3D Basketball**: Realistic basketball with texture and lighting
- **Professional Hoop**: Detailed backboard, rim, and animated net
- **Particle Effects**: Score celebration animations

### Animations
- **Custom CSS Animations**: Smooth transitions and effects
- **Bounce Effects**: Realistic ball physics
- **Floating Elements**: Ambient background animations
- **Gradient Animations**: Dynamic color transitions

## 🛠️ Technical Stack

- **Framework**: Next.js 15.5.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks
- **Animation**: Custom CSS animations
- **Build Tool**: Webpack (via Next.js)

## 🎯 Game Mechanics

### Physics System
- Parabolic trajectory calculation
- Realistic ball arc based on distance
- Collision detection with forgiving hit box
- Smooth 60fps animations using requestAnimationFrame

### Scoring System
- 1 point per successful basket
- Visual feedback with "SWISH!" effect
- Performance-based end game messages
- Score tracking and display

### Controls
- **Desktop**: Click and drag with mouse
- **Mobile**: Touch and drag gestures
- **Responsive**: Adapts to different screen sizes

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Custom Animations

The game includes custom CSS animations defined in `globals.css`:
- `animate-gradient-x`: Gradient color transitions
- `animate-float`: Floating elements
- `animate-sway`: Net swaying animation
- `animate-bounce-*`: Various bounce effects
- `animate-pulse-gentle`: Subtle pulsing effects

## 🎨 Customization

### Colors
The game uses a modern color palette:
- **Primary**: Orange/Red gradients for basketball elements
- **Secondary**: Blue/Purple for backgrounds
- **Accent**: Yellow for highlights and effects

### Animations
All animations can be customized in `globals.css`. The game uses:
- CSS custom properties for consistent timing
- Tailwind CSS classes for responsive design
- Custom keyframe animations for unique effects

## 📱 Mobile Support

- Touch-friendly controls
- Responsive design for all screen sizes
- Optimized performance for mobile devices
- Gesture-based gameplay

## 🏆 Performance

- Optimized bundle size (~107KB first load)
- 60fps smooth animations
- Efficient collision detection
- Minimal re-renders with React hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for the Mission 7 Monad Game Jam.

## 🎉 Acknowledgments

- Mission 7 Monad Game Jam organizers
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling approach