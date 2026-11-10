# Video Downloads App (SnapDown)

> 👨‍💻 Developed by **[Suresh Kumar Meesala](https://github.com/SureshKumarMeesala)** · 🎨 UI design by **Sadek Hossen Rony** (credits below)

A complete, high-performance media downloader & offline entertainment hub modeled directly after the **Video Downloads App** Sketch UI Kit (26 artboards in Interfaces page). Built with **React Native 0.88+**, **Expo SDK 58+**, and **Expo Router** using **pure JavaScript and JSX (`.js`, `.jsx`)**.

---

## 🎨 Artboards & Features (based on 26 design artboards)

| # | Artboard Name | Sketch ID | Screen Location | Description |
|---|---|---|---|---|
| 1 | **Home** | `67CF25B3-4633-1D14-03CB-9C8AE7947DC7` | `src/app/(tabs)/index.jsx` | Main discovery portal with search prompt, social icons, category chips, and video feed. |
| 2 | **Home up** | `ACF4A416-9476-7EDE-D639-8E9C3150A509` | `src/app/(tabs)/index.jsx` | Scrolled state with floating controls and interactive cards. |
| 3 | **Web** | `799E6113-6612-D63D-8110-9BA5AFDCABD8` | `src/app/web-browser.jsx` | In-app browser with URL bar, social shortcuts (WhatsApp, Facebook, YouTube, Instagram), and video grabber. |
| 4 | **Search** | `7D3C9FD0-192D-BACE-87A1-FFAB785F5607` | `src/app/search.jsx` | Search interface with Hot Searches (*Taylor Swift, TikTok, Twice, Drake*) and Recent Searches. |
| 5 | **Search (Filtered)** | `36440D9E-8C62-1C93-8C7C-EFBC7E9F47B2` | `src/app/search.jsx` | Filtered video and channel results list. |
| 6 | **Sub** & **Sub Up** | `5130451B-F437-99A9-0BAF-A7A32D6D0E4E` | `src/app/(tabs)/index.jsx` | Subscriptions feed and channel updates. |
| 7 | **Music** (Tab) | `0CE7EDA9-A727-A5F1-F7F9-E6C5EDF0BD9D` | `src/app/(tabs)/downloads.jsx` | Music download library (MP3 320K, M4A 128K). |
| 8 | **Music** (Player) | `C0BB5815-6DB3-097C-507C-0866979DC634` | `src/app/(tabs)/downloads.jsx` | Audio player view with track status. |
| 9 | **Frame 86** | `B98CBD5A-56E4-FB48-E9CB-B69F2444F2A0` | `src/data.js` | Bollywood Hitlist banner (*"Today's biggest hits and hottest tracks... 34 Tracks"*). |
| 10 | **Trending** | `D16AA85D-A7CF-B090-B424-BE80BA861BA1` | `src/app/(tabs)/index.jsx` | Trending videos and viral media. |
| 11 | **Video Content** | `86EB4DE3-1343-3A30-66AF-ED692F1BCED0` | `src/components/VideoCard.jsx` | Reusable feed card component with duration badge (`5:45`), avatar, and 3-dot menu. |
| 12 | **Channel** | `7063BE9D-DE36-8389-54F6-145FC9F8E7C2` | `src/app/channel.jsx` | Channel profile for SADEK Tut's / Youlanda Renee with subscriber count and video grid. |
| 13 | **Download** | `C98FD01E-F8FB-7A2D-7B4F-3AE52487A9EA` | `src/app/(tabs)/downloads.jsx` | Active & completed downloads list with speed meter. |
| 14 | **Videos** | `B296B657-7BED-69BD-B624-5045EAA8CF8D` | `src/app/(tabs)/downloads.jsx` | Downloaded video list (`1080P HD`, `720P`). |
| 15 | **Video Open Page** | `8B93C044-420E-6A89-B81C-7AACF1B1ED97` | `src/app/video-player.jsx` | Full video playback view (*Armageddon Final Battle, 6.5M views*), channel subscribe bar, and Up Next list. |
| 16 | **Component 4/OFF** | `9E578737-8F38-3016-FB38-BC539D589CF7` | `src/components/DownloadSheet.jsx` | Bottom sheet resolution selector with Private Download OFF. |
| 17 | **Component 4/ON** | `C84A8484-F228-4E4D-DDEE-9987FD418687` | `src/components/DownloadSheet.jsx` | Bottom sheet resolution selector with Private Download ON. |
| 18 | **Share** | `F98A8301-071D-F4D1-EE9D-70213034B323` | `src/components/ShareSheet.jsx` | Social sharing sheet (Copy Link, WhatsApp, News Feed, Chats, Tweet). |
| 19 | **Me** | `BEBFD72F-5630-B587-E85D-1EAE949DA41E` | `src/app/(tabs)/profile.jsx` | Profile overview, Snaptube Premium card, and storage cleaner. |
| 20 | **Edit Profile** | `BA6D4574-85CD-5A84-8E59-2B1438C2C57F` | `src/app/edit-profile.jsx` | Profile editor (Sadek Hossen, Male, 15 May 2021). |
| 21-26 | **Dialoge & Components** | `57A338DD...` | Integrated | Junk cleaner dialog, download pause/resume popups, and status indicators. |

---

## 💎 Design Tokens

- **Brand Yellow / Gold**: `#FCDA5F` / `#FDE79A`
- **Brand Dark**: `#151515` / `#161616` / `#1E1E1E`
- **Accent Red**: `#FF0000` / `#FF3B30`
- **Accent Green**: `#2ECC71` / `#25D366`
- **Light Surface**: `#FAF9F7` / `#FFFFFF`

---

## 🚀 Running the App

```bash
# Start development server
npx expo start
```

<!-- run-locally:start -->

## ▶️ Run locally

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or `w` for the web, or scan the QR code with Expo Go.

<!-- run-locally:end -->

<!-- developer:start -->

## 👨‍💻 Developer

This React Native app was developed by **Suresh Kumar Meesala**.

| | |
|---|---|
| Developer | [Suresh Kumar Meesala](https://github.com/SureshKumarMeesala) |
| GitHub | [@SureshKumarMeesala](https://github.com/SureshKumarMeesala) |
| Organization | [FreeAppSource](https://github.com/FreeAppSource) |
| Repository | <https://github.com/FreeAppSource/video-downloads-app> |

<!-- developer:end -->

---

<!-- design-credits:start -->

## 🎨 Design Credits

This app is based on the free **Video Downloads App** design by **Sadek Hossen Rony**, downloaded from Sketch App Sources. All visual design credit goes to the designer. It follows the design's screens, user flows and content; visual details (exact spacing, fonts, some colours and illustrations) are approximated and may differ from the original.

| | |
|---|---|
| Designer | [Sadek Hossen Rony](https://www.sketchappsources.com/contributor/sadekbranding) |
| Original design | Video Downloads App |
| Downloaded from | [Sketch App Sources](https://www.sketchappsources.com/free-source/4767-video-downloads-app-sketch-freebie-resources.html) |
| Twitter | <https://twitter.com/sadekrony435> |
| Website | <https://sadekbraning.myportfolio.com/> |
| Original file | `video-downloads-app-sadek.sketch` |
| License / usage | Not stated on the source page. Free download; credit the designer (Sketch App Sources Terms) and confirm with them before commercial use. |

**Attribution:**

> UI design: "Video Downloads App" by Sadek Hossen Rony (https://sadekbraning.myportfolio.com/), downloaded from Sketch App Sources (https://www.sketchappsources.com/free-source/4767-video-downloads-app-sketch-freebie-resources.html).

The original design source files are not included in this repository; get them from the links above. This app's **code** is released under the [MIT License](./LICENSE); the visual design remains the designer's (see [NOTICE](./NOTICE)).

Photos, brand logos and avatars inside the design may belong to third parties and are not covered by the designer's permission.

<!-- design-credits:end -->
