# Telegram Mini App - Dreamcoin

## 1. App Working Principle

This is a Telegram Mini App that provides users with tasks and lets them earn rewards after complition. The app works on the following principle:

### Core Functionality:
- **Task System**: Users can view available sponsor tasks with step-by-step completion instructions
- **Progress Tracking**: Each task has a status (not started, in progress, completed)
- **Reward System**: For completing tasks, users receive various types of rewards:
  - **DC** (Dreamcoin) - internal app currency
  - **Tickets** - for participating in lotteries/promotions
  - **USDT** - cryptocurrency
- **User Balance**: All completed tasks result in user's balance increase
- **Partner Integration**: Tasks lead to external resources (bots, channels, websites, etc.)
- **Completion Verification**: System checks if all steps were completed for task and automatically adds rewards to user's balance

### User Journey:
1. User opens the app in Telegram
2. Sees their balance (DC, tickets, USDT)
3. Browses the list of available tasks with reward descriptions
4. Clicks "Start" (or taps task card) to begin a task
5. Follows the link to the partner to complete the task
6. Returns to the app and clicks "Check Task"
7a. Receives rewards upon successful completion
7b. User is asked to check carefully which steps were not completed and complete them, task remains in progress

## 2. Architectural Solutions and Their Justification

### 2.1 State Management Architecture
**Solution**: Using Zustand for state management
**Justification**:
- **Simplicity**: Minimal boilerplate code compared to Redux
- **TypeScript Support**: Excellent typing out of the box
- **Performance**: Lightweight library without unnecessary dependencies
- **Flexibility**: Easy separation into individual stores (appStore, uiStore)

### 2.2 Separation of Concerns
**Solution**: Separation into two separate stores
- `appStore` - business logic (tasks, balance, rewards)
- `uiStore` - UI state (modals, active elements)

**Justification**:
- **Clear Separation**: Business logic is separated from UI logic
- **Reusability**: UI store can be used for other modals
- **Testability**: Easier to test business logic separately from UI

### 2.3 Component Architecture
**Solution**: Modular component structure with CSS modules
```
components/
├── Balance.tsx              # User balance display
├── taskCard/               # Task card
│   ├── TaskCard.tsx
│   └── taskCard.module.css
└── taskModal/              # Modal with task details
    ├── TaskModal.tsx
    └── taskModal.module.css
```

**Justification**:
- **Encapsulation**: Each component has its own styles
- **Reusability**: Components can be easily reused
- **Scalability**: Easy to add new components

### 2.4 Telegram Mini App Integration
**Solution**: Using official SDK `@telegram-apps/sdk-react`
**Justification**:
- **Official Support**: Guaranteed compatibility with Telegram
- **React Integration**: Hooks and components for convenient work
- **Functionality**: Access to all TMA capabilities (viewport, theme, links)

## 3. Technologies and Approaches with Choice Justification

### 3.1 Frontend Framework
**React 19.1.1** + **TypeScript**
- **Justification**: 
  - React - most popular and mature UI framework
  - TypeScript - static typing for code reliability
  - React 19 - latest version with improved performance

### 3.2 UI Library
**Chakra UI v3.26.0**
- **Justification**:
  - **Ready Components**: Fast development without writing styles from scratch
  - **Dark Theme**: Perfect for Telegram Mini Apps
  - **Responsive**: Responsiveness out of the box
  - **TypeScript**: Full component typing
  - **Accessibility**: Built-in accessibility support

### 3.3 Animations
**Framer Motion 12.23.12**
- **Justification**:
  - **Performance**: Optimized animations
  - **Simplicity**: Declarative API
  - **React Integration**: Works as React component
  - **Mobile Optimization**: Excellent performance on mobile devices

### 3.4 Build and Development
**Vite 7.1.2**
- **Justification**:
  - **Speed**: Instant hot reload
  - **Modernity**: ES modules support
  - **TypeScript**: Built-in support without additional configuration
  - **Optimization**: Efficient production builds

### 3.5 Icons
**Lucide React + React Icons**
- **Justification**:
  - **Consistency**: Unified icon style
  - **Size**: Lightweight SVG icons
  - **Flexibility**: Easy to customize size and color

### 3.6 Deployment
**Ngrok for Tunneling**
- **Justification**:
  - **HTTPS**: Telegram requires HTTPS for Mini Apps
  - **Local Development**: Testing on real devices
  - **Simplicity**: Minimal setup

### 3.7 Linting
**ESLint with TypeScript Support**
- **Justification**:
  - **Code Quality**: Automatic problem detection
  - **Consistency**: Unified code style across team
  - **React Rules**: Special rules for React applications

## 4. Local Launch Instructions

### Prerequisites
- Node.js version 18+ 
- npm
- Git
- Ngrok account (for obtaining authtoken)

### Launch Steps
1. **Open directory where you want to clone the repository**
   in your console cd /path/to/your/desired/directory

2. **Clone and Install Dependencies**
   paste in your console and send: git clone https://github.com/VLSLV333/miniAppTest.git
   paste in your console and send: npm i

3. **Ngrok Setup**
   - Register at [ngrok.com](https://ngrok.com)
   - Get authtoken from your dashboard
   - Create `.env` file in project root:
   - Save your token in `.env` file : NGROK_AUTHTOKEN=YourTokenHere
   - Go to https://dashboard.ngrok.com/domains while logged in. Click "+ New Domain"
   - Copy your random domain
   - Open `vite.config.ts` file in project root
   - Find allowedHosts key, its value pair is array. Paste your copied domain in that array.

4. **Launch Application**
   paste in your console and send:
   npm run dev
   
   This command will start:
   - Vite dev server on port 5173
   - Ngrok tunnel for external access

5. **Get URL for Telegram**
   - Console will show: `ngrok lisening at: https://your-domain.ngrok-free.app`
   - Copy this URL

6. **Telegram Bot Setup**
   - Open [@BotFather](https://t.me/botfather) in Telegram
   - Select your bot (or create a new one)
   - Select Bot Settings
   - Select Configure menu button
   - Paste and send ngrok URL you copied in console: `https://your-domain.ngrok-free.app`
   - Send the title to be displayed on the button instead of 'Menu'

7. **Testing**
   - Open the bot you just created in Telegram
   - You should see a button containing title you just sent
   - Press that button and mini app will open

## 5. What was done great, what could be done better?

### Done great
1. **User Journey Logic**
   - I believe that required user flow was created exactly as requested.
2. **Created 2 ways of dealing with low width devices space issues**
   - In my opinion, hiding reward type makes task card look more elegant on small devices.
3. **Custom alert when task check fails**
   - Added custom alert for users to realise the reason, why no new funds were added to their balance.

### Could be done better
1. **Design, elements size, colors**
   - I believe that overall look of App can be improved
2. **Animations, hover effects, interactions**
   - The App can be made to feel more "alive" and engaging

## 6. Possible improvements
   - Bottom part of App looks empty. We need to add nav bar with "Tasks", "Wallet", "Profile" tabs. Maybe even more.
   - Add light and dark theme both are used according to user's TG theme.
   - Add i18n depending on user's setted language in TG.
   - Add "Add app to home screen" option in top right "..." TG native header button (for fast access, also works as a reminder).
   - Remove user balance from "Tasks" tab and move to "Wallet" tab.


## 7.Project Structure
```
tg-miniapp/
├── src/
│   ├── components/          # React components
│   ├── store/              # Zustand stores
│   ├── assets/             # Static resources
│   ├── App.tsx             # Main component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Public files
├── index.js                # Ngrok tunnel
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
└── .env                    # Environment variables
```

### Available Scripts
- `npm run dev` - Development mode
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Code linting

### Troubleshooting
1. **Ngrok not connecting**: Check authtoken correctness in `.env`
2. **App not loading in Telegram**: Ensure you started localhost with npm run dev in console
3. **TypeScript errors**: Run `npm run lint` to check code
