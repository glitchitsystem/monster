# Next Sprint — Additional Small Features (Set 2)

Five more small, incremental features aligned with the current Angular codebase. Each item includes concise acceptance criteria.

---

## Feature Ideas & Acceptance Criteria

- **URL-Persisted Filters & Sort:** Keep state in query params.

  - Search term, role filter, favorites-only toggle, and sort order are reflected in `/mine` query params.
  - Updating controls updates the URL (no full reload); reloading or direct linking restores the same filtered/sorted view.
  - Navigating between detail/edit and list preserves the current query state.

- **Duplicate Monster:** Quick clone to create similar entries.

  - From list or detail, a "Duplicate" action pre-fills `MonsterEdit` with the selected monster’s values and a default name like "Copy of <name>".
  - Saving creates a new monster; cancel makes no changes.
  - Works when filters/sort/search are active and returns to `/mine` respecting current state.

- **Client-Side Pagination:** Manage large lists smoothly.

  - When count exceeds a threshold (e.g., 10), show pagination controls in [src/app/monster/monster-list/monster-list.component.html](src/app/monster/monster-list/monster-list.component.html).
  - Supports next/prev and page numbers; updates are instant without navigation away from `/mine`.
  - Pagination integrates with search/filters/sort; displays the count for the current page and total.

- **Keyboard Shortcuts:** Speed up common actions.

  - On `/mine`, enable shortcuts: N = New Monster, R = Random Monster, T = Create Random Team, S = Sort, F = Toggle favorites-only.
  - Visual hint added to [src/app/monster/monster-list/monster-list.component.html](src/app/monster/monster-list/monster-list.component.html) or start view.
  - Shortcuts respect focus (avoid triggering while typing in inputs) and are disabled outside `/mine`.

- **Accessibility & Focus Management:** Improve usability.
  - Dialogs (e.g., confirm delete) include `aria-label` and trap focus until closed; see [src/app/shared/dialog.service.ts](src/app/shared/dialog.service.ts) and [src/app/pop-up/pop-up.component.html](src/app/pop-up/pop-up.component.html).
  - After add/update/delete, focus moves to a meaningful target (e.g., the new item or the list header) in [src/app/monster/monster-list/monster-list.component.ts](src/app/monster/monster-list/monster-list.component.ts).
  - Icon-only controls have `aria-label`; role icons remain `aria-hidden="true"` with textual equivalents present in the DOM.

---

## Notes

- All features are client-side and can be implemented incrementally.
- Where possible, reuse existing services/components; avoid introducing backend dependencies.
- Ensure unit tests cover core behaviors (state via query params, duplication logic, pagination calculations, shortcut enable/disable, and focus changes).
