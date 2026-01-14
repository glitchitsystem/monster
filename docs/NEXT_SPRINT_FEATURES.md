# Next Sprint — Small Feature Backlog

This backlog proposes small, incremental features aligned with the current Angular codebase. Each item includes concise acceptance criteria for planning and implementation.

---

## Feature Ideas & Acceptance Criteria

- **Local Storage Persistence:** Persist monsters across reloads.

  - Saves the monsters array to localStorage on add/update/delete/unfavorite/clear.
  - Loads from localStorage on app start; falls back to existing in-memory defaults.
  - Clear-all also clears localStorage.

- **Unique Name Validation:** Prevent duplicate monster names.

  - `MonsterEdit` checks for unique `name` against current list and blocks save if duplicate.
  - Shows a clear inline validation message.
  - Random add/team creation avoid duplicates when possible.

- **Search by Name:** Quickly filter visible monsters.

  - A search input above the list filters by `name` substring (case-insensitive).
  - Filtering is client-side and instant; clearing input restores full list.

- **Role & Favorite Filters:** Narrow down the list by attributes.

  - Role filter (dropdown) and "Show favorites only" toggle.
  - Filters combine with search; badge shows count of filtered results.

- **Toggle Favorite in List/Detail:** Faster favorite management.

  - Clicking the heart icon toggles `favorite` in both list item and detail views.
  - Immediate visual update and persistence (if local storage is enabled).

- **Snackbar Notifications:** Confirm user actions unobtrusively.

  - Use Material `MatSnackBar` to show short messages for add/update/delete/clear/team actions.
  - Messages auto-dismiss; accessible text and no blocking dialogs.

- **Dialog for Remove-All:** Unify confirmations via `DialogService`.

  - Replace native `confirm()` in [src/app/monster/monster-list/monster-list.component.ts](src/app/monster/monster-list/monster-list.component.ts) with the existing Material dialog.
  - Dialog text: "Are you sure you want to remove all monsters?"; YES removes all, NO cancels.

- **Enhanced Sorting:** Add sort controls.

  - Sort by `name` asc/desc and by `role`.
  - UI buttons or a dropdown; list updates immediately.

- **Role Count Badges:** Show distribution of roles.

  - Above the list, show small badges: Soldier, Medic, Shield, Thief, Mage with counts.
  - Badges update reactively when the list changes.

- **Export/Import JSON:** Manage teams across sessions.
  - "Export" downloads current monsters as a JSON file.
  - "Import" (file input) loads monsters from a selected JSON, replacing current list with confirmation.
