# crypto-orbit

A gesture-driven crypto pay button — press-and-hold to reveal an orbiting arc of coins, drag to hover, release to select — built for fintech and wallet apps.

<!-- Replace with your own screen recording, uploaded the same way as expo-quick-pay's preview -->
<img width="1280" height="720" alt="crypto-orbit" src="REPLACE_WITH_YOUR_PREVIEW_IMAGE_URL" />

---

## ✨ Features

- 🪙 **Gesture-driven coin reveal** — press-and-hold morphs the button into an orbiting arc of coins with a staggered spring reveal, no pre-baked animation
- 🎯 **Radial hit-testing** — drag anywhere on screen; the nearest coin within `hitRadius` highlights live as your finger moves, powered by a single worklet-side distance check
- 💫 **Active-coin glow & scale** — the hovered coin scales up and glows via its own `glowColor`, driven entirely on the UI thread
- 🕶️ **Dimming backdrop** — optional fade-in backdrop focuses attention on the coin arc while it's open, fully overridable via `backdropColor`
- 🧠 **Headless hook included** — `useCoinGesture` exposes the raw gesture and shared values separately from `<CryptoPaySelector>`, for teams building a fully custom coin-picker UI
- 🧩 **TypeScript-first** — `Coin` / `CoinPosition` types, fully typed props, no `any`
- ♿ **Accessible by default** — `accessibilityRole` and a dynamic `accessibilityLabel` that reflects whichever coin is currently hovered

---

## ⚙️ Installation

This isn't published as an npm package yet — copy the source directly into your project.

```bash
git clone https://github.com/ManasCodeXart/crypto-orbit
```

Copy `components/`, `constants/`, `hooks/`, `utils/`, and `assets/CoinImages/` from `src/` into your project, then install the peer dependencies:

```bash
npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler expo-haptics
```

> Reanimated 4.x ships its worklets runtime as the separate `react-native-worklets` package — it's required alongside `react-native-reanimated`, not optional.

> Requires `react-native-reanimated`'s Babel plugin already configured, and `GestureHandlerRootView` wrapping your app root — both are standard for any Expo Router / RN project already using Reanimated or Gesture Handler.

---

## 🚀 Usage

```tsx
import { CryptoPaySelector } from './components/CryptoPaySelector';
import type { Coin } from './constants/types';

export function WalletScreen() {
  const handleSelectCoin = (coin: Coin) => {
    // navigate to a send flow, open a modal, etc.
  };

  return <CryptoPaySelector onSelect={handleSelectCoin} />;
}
```

Ships with a built-in 5-coin starter set (SOL, BTC, ETH, ADA, BNB) and bundled icons — pass your own `coins` array to fully replace it.

## Preview

<!-- Replace with your own screen recording, uploaded the same way as expo-quick-pay's preview -->
`REPLACE_WITH_YOUR_PREVIEW_VIDEO_URL`

---

## 🧱 Component Anatomy

```
<CryptoPaySelector>
  ├─ CoinBubble         (per-coin render node, memoized)
  └─ useCoinGesture      (pan gesture + shared-value orchestration, headless)
```

`CoinBubble` is intentionally not exported on its own — it depends on shared animation values owned by `useCoinGesture` and isn't meaningful outside that context. `useCoinGesture` *is* exported standalone if you want to drive a completely custom visual layer with the same interaction logic.

---

## 🧩 API

### `<CryptoPaySelector>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `coins` | `readonly Coin[]` | built-in 5-coin set | Coins revealed around the button on press-and-hold. |
| `idleLabel` | `string` | `'Pay'` | Label shown on the button while idle. |
| `hitRadius` | `number` | `DEFAULT_HIT_RADIUS` (`verticalScale(80)`) | Touch radius, in points, used to detect which coin is under the finger. |
| `hapticsEnabled` | `boolean` | `true` | Enables impact haptics on hover and selection. |
| `showBackdrop` | `boolean` | `true` | Dims the screen behind the coins while the selector is active. |
| `backdropColor` | `string` | `'#000000'` | Color of the dimming backdrop. |
| `bottomOffset` | `number` | `0` | Extra bottom spacing for the button, e.g. to sit above a tab bar. |
| `onActiveChange` | `(isActive: boolean) => void` | — | Fires whenever the selector opens or closes. |
| `onSelect` | `(coin: Coin) => void` | — | **Required.** Fires when the user releases their finger over a coin. |
| `containerStyle` | `StyleProp<ViewStyle>` | — | Style override for the outer container. |
| `buttonStyle` | `StyleProp<ViewStyle>` | — | Style override for the button. |
| `labelStyle` | `StyleProp<TextStyle>` | — | Style override for the button label. |

### `useCoinGesture(params)`

Headless hook powering `<CryptoPaySelector>`. Use it directly if you want to render the coin arc yourself.

**Params**

| Prop | Type | Default | Description |
|---|---|---|---|
| `coins` | `readonly Coin[]` | — | **Required.** Coins to hit-test against. |
| `hitRadius` | `number` | `DEFAULT_HIT_RADIUS` | Touch radius, in points. |
| `hapticsEnabled` | `boolean` | `true` | Enables impact haptics on hover and selection. |
| `onSelect` | `(coin: Coin) => void` | — | **Required.** Fires on release over a coin. |
| `onActiveChange` | `(isActive: boolean) => void` | — | Fires on gesture begin/end. |

**Returns**

| Field | Type | Description |
|---|---|---|
| `gesture` | `GestureType` | Pass to `<GestureDetector gesture={gesture}>`. |
| `activeIndex` | `SharedValue<number>` | Index of the currently hovered coin, `-1` if none. |
| `activeCoinId` | `string \| null` | JS-thread mirror of `activeIndex`, for use outside worklets. |
| `revealProgress` | `SharedValue<number[]>` | Per-coin reveal progress, `0`–`1`. |
| `backdropOpacity` | `SharedValue<number>` | Backdrop fade progress, `0`–`1`. |
| `buttonLayout` | `SharedValue<CoinPosition>` | Measured screen position of the button, used as the hit-test origin. |

### Types

```ts
interface Coin {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly glowColor: string;
  readonly icon: ImageSourcePropType;
  readonly position: CoinPosition; // offset from the button's center once revealed
}

interface CoinPosition {
  readonly x: number;
  readonly y: number;
}
```

---

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

## 🧱 Stack

[Expo SDK 56](https://expo.dev/changelog) · [React Native 0.85](https://reactnative.dev/) · [Reanimated 4.3](https://docs.swmansion.com/react-native-reanimated/) · [React Native Worklets 0.8](https://docs.swmansion.com/react-native-reanimated/) · [Gesture Handler 2.31](https://docs.swmansion.com/react-native-gesture-handler/) · Expo Haptics