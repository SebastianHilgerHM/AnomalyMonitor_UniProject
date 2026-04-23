# AnomalyMonitor Uni Project

Mobile app built with Expo + React Native for creating and tracking anomalies, searching NASA APOD results, and exploring recent APOD images on an interactive world map.

## Tech Stack

- Expo SDK: `54.0.33`
- React: `19.1.0`
- React Native: `0.81.5`
- Expo Router: `~6.0.23`
- TypeScript: `~5.9.2`

Main packages used:

- `expo`
- `expo-router`
- `@expo/vector-icons`
- `@react-native-community/datetimepicker`
- `expo-image-picker`
- `react-native-safe-area-context`
- `react-native-screens`

Dev packages:

- `typescript`
- `babel-preset-expo`
- `pngjs` (used for generating the world map land-mask file)

## Requirements

- Node.js LTS (recommended: 18+)
- npm
- Expo Go on Android/iOS, or local emulator/simulator

## Install

From the project root:

```bash
cd AnomalyMonitor
npm install
```

## Run

Inside `AnomalyMonitor`:

```bash
npm run start
```

Optional direct targets:

```bash
npm run android
npm run ios
npm run web
```

## App Structure

- `AnomalyMonitor/app/(tabs)/home.tsx`: Home screen
- `AnomalyMonitor/app/(tabs)/newanomaly.tsx`: Create anomaly form
- `AnomalyMonitor/app/(tabs)/myanomalies.tsx`: Saved anomalies list
- `AnomalyMonitor/app/(tabs)/search.tsx`: APOD date-range search
- `AnomalyMonitor/app/(tabs)/worldmap.tsx`: APOD map view
- `AnomalyMonitor/context/anomalyprovider.tsx`: In-memory anomaly state
- `AnomalyMonitor/hooks/apodApi.ts`: Shared APOD request/retry helper
- `AnomalyMonitor/hooks/useApodSearch.ts`: APOD search logic
- `AnomalyMonitor/hooks/useApodMapScatter.ts`: Map scatter logic

## How The App Works

### 1. New Anomaly

- User enters a name and description, and optionally selects an image from the gallery.
- On save, anomaly is added to in-memory context.
- IDs use an incrementing counter (`0, 1, 2, ...`) while app is running.

### 2. My Anomalies

- Displays anomalies from context in newest-first order.
- Tapping a card opens a detail modal.

### 3. APOD Search

- User selects `FROM` and `TO` dates with date pickers.
- App requests NASA APOD entries for the range.
- Results are filtered to image entries only (no videos).
- Each result card can open details and be saved to My Anomalies.

### 4. World Map Feature

- Map button on Search screen opens the world map screen.
- App fetches the latest APOD image entries going backward from today until up to 20 images are collected.
- Each APOD result is mapped to a deterministic scatter position and shown as an interactive preview card.
- Tapping a preview card opens details for that APOD item.
- Back button returns directly to Search screen.

## Land-Only Scatter Logic

The map uses a generated land-mask so points spawn on land-colored pixels of `world_map.png`.

- Source image: `AnomalyMonitor/assets/images/world_map.png`
- Generated mask: `AnomalyMonitor/constants/worldmapLandMask.ts`
- Generator script: `AnomalyMonitor/scripts/generate-worldmap-land-mask.cjs`

To regenerate mask after changing map image:

```bash
cd AnomalyMonitor
node scripts/generate-worldmap-land-mask.cjs
```

## APOD API Notes

- Current key is `DEMO_KEY` in `AnomalyMonitor/hooks/apodApi.ts`.
- `DEMO_KEY` may hit rate limits (`429`) or temporary service errors (`503`).
- The app includes retry handling and user-friendly error messages.

## Course Context

Created as part of a university mobile development course.
