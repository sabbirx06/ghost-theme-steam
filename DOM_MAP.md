# 🗺️ STEAM WEBKIT DOM CLASS MAPPING REFERENCE

This document serves as the authoritative reference for Steam's obfuscated WebKit DOM classes to prevent regressions and infinite loops during theme development.

## 📌 DOM Class Reference Table

| Target UI Element | Exact Class Name(s) / Selectors | Purpose & Behavior |
| :--- | :--- | :--- |
| **Full Page Wrapper** | `._3Sb2o_mQ30IDRh0C72QUUu` | **PARENT WRAPPER** of both Left Sidebar AND Right Grid. Do NOT apply sidebar backgrounds here or the entire page changes! |
| **Left Sidebar Column (Exclusive)** | `._3x1HklzyDs4TEjACrRO2tB`, `div[class*="library_AppListContainer"]`, `div[class*="library_appListContainer"]` | **EXCLUSIVE LEFT SIDEBAR COLUMN**. Use this selector to style the left sidebar panel background and borders. |
| **Sidebar Top Bar** | `._2TKEazUUS3TlniZfpc8OOe` | Top header section of sidebar containing Home / Collections toggle buttons. |
| **Category Header Rows** | `._3qwXPrhpZYqVbJxrZDrvjy`, `._2sYIghGVXJr6tsQVvcryy8`, `.MyNb5dG3FsBnKdp8j_ntk` | Category rows (`+ FAVOURITES`, `+ MP`, `— ZETTLEKASTEN`). Has solid native blue/grey backgrounds that must be overridden with `background: transparent !important`. |
| **Selected Category Header** | `._3qwXPrhpZYqVbJxrZDrvjy._2zGph-MSF37bUmk_Qlu_XG`, `._2sYIghGVXJr6tsQVvcryy8._2zGph-MSF37bUmk_Qlu_XG` | Active expanded collection header state (`+ MP (22)`). |
| **Game List Item Row** | `._2-O4ZG0KrnSrzISHBKctFQ` | Every game row in the left sidebar list. Has native `linear-gradient(...)` fills. |
| **Selected Game Item** | `._2-O4ZG0KrnSrzISHBKctFQ._3cMVyOc-9F9Jvp3uKF7_xj`, `._1UBpAXP408Ez_L_mXhW5Q9` | Selected active game row (*CODE VEIN*, *Batman*). Used for Royal Blue Glass highlight bar. |
| **Game Title Text** | `._2ws8DONH9fxQjPXEmRpujE` (Installed), `._5YTBr7WwIfzVU_3nUtAph` (Uninstalled) | Color and opacity for game title text in list. |
| **Search Input Box** | `[class*="SearchFilterInput"]`, `input[class*="searchFilterInput"]` | Search bar input container at top of sidebar. |
| **Right Grid Containers** | `.u1xD3KJEgksF_J_5TLZzO`, `._17uEBe5Ri8TMsnfELvs8-N`, `._2gSXCB6PbOlMxslr8hm6dm`, `div[class*="library_AppGrid"]` | Main right-hand grid container for game poster cards. Background: `#05070a` (Deep Pitch Black). |

---

## 🎨 Theme Rules Summary
- **Main Right Grid**: Deep Pitch Black (`#05070a`)
- **Left Sidebar Column**: `._3x1HklzyDs4TEjACrRO2tB`
- **Accent Color**: Royal Blue (`#2563eb`)
- **Corners**: Sharp Edges (`border-radius: 0px !important`) unless specified.
