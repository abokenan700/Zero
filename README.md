# Blinkit Clone — React Native CLI

A production-oriented React Native CLI + TypeScript foundation for a high-fidelity Blinkit mobile app clone. The app is organized around atomic design, React Navigation v6, Redux Toolkit, RTK Query-backed local mocks, Reanimated interactions, Fast Image, MMKV storage hooks, and map/payment/auth UI scaffolding.

## Project setup

```bash
npm install
npm run ios
npm run android
npm run start
```

## Core stack

- React Native CLI, React 18, TypeScript strict mode
- React Navigation v6: native stack, bottom tabs, drawer
- Redux Toolkit + RTK Query fake-base mock API with 300–800ms delay
- React Native Reanimated v3 and Gesture Handler
- React Native Vector Icons, Fast Image, Maps, MMKV
- StyleSheet-based design tokens matching Blinkit yellow/green, 4px spacing grid, card radii, and subtle elevation

## Implemented flows

- Splash, location permission, phone entry, OTP simulation
- Home, search, categories, product listing, product detail
- Cart, checkout, order confirmation, tracking
- Account, addresses, notifications, offers, refer & earn, help, order history

## Mock data coverage

The local mock layer includes 12 categories, 60 products, 5 saved addresses, 10 promo codes, 3 past orders, and a delivery agent profile.
