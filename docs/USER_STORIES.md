# Monster Dream Team — User Stories & Acceptance Criteria

## Overview

This document captures user stories and acceptance criteria inferred from the current Angular codebase. Key areas include routing, authentication, monster CRUD and list management, dialogs, and navigation.

Relevant modules for reference:

- Routing: [src/app/app-routing.module.ts](src/app/app-routing.module.ts)
- Authentication: [src/app/auth.service.ts](src/app/auth.service.ts), [src/app/auth-guard.service.ts](src/app/auth-guard.service.ts), [src/app/login/login.component.\*](src/app/login)
- Monsters: [src/app/monster/monster.service.ts](src/app/monster/monster.service.ts), components under [src/app/monster](src/app/monster)
- Dialogs: [src/app/shared/dialog.service.ts](src/app/shared/dialog.service.ts), [src/app/pop-up/pop-up.component.\*](src/app/pop-up)
- Header/Nav: [src/app/header/header.component.\*](src/app/header)

---

## User Stories & Acceptance Criteria

### 1) Login Authentication

As a user, I want to log in so I can manage my monster team.

- Acceptance Criteria:
  - Shows a login form with `username` (email) and `password` fields.
  - Email must be valid format; both fields are required. Login button stays disabled until form is valid.
  - Only `bob@bob.com` with password `Test123` succeeds.
  - On successful login, navigates to `/mine` and the header shows the user menu.
  - On invalid credentials, shows an error message: "Invalid username or password".
  - If already logged in and visiting root `/`, redirect or navigate to `/mine`.

### 2) Auth Guarded Access

As a user, I want secure access control so only logged-in users reach the monster area.

- Acceptance Criteria:
  - Route `/mine` (and its children) is protected by an auth guard that checks `isAuthenticated()`.
  - When not authenticated, navigation to `/mine` is blocked; user remains at or is returned to the login page.
  - After logout, access to `/mine` is blocked until re-authentication.

### 3) Header Navigation & Logout

As a user, I want easy navigation and the ability to log out.

- Acceptance Criteria:
  - Header displays brand link to `/` and a nav link to `/mine`.
  - When logged in, a dropdown menu appears with "Support" and "Log Out".
  - Clicking "Log Out" clears session (`loggedIn=false`) and navigates back to root `/`.

### 4) View Monster List

As a user, I want to view my monsters with key information.

- Acceptance Criteria:
  - Monster list shows each monster’s `name`, `description`, and role icon; a heart icon appears if `favorite=true`.
  - Displays the count: "Number of monsters: N".
  - Clicking a monster item navigates to `/mine/:id` to view details.

### 5) View Monster Details

As a user, I want to see monster details and manage the monster.

- Acceptance Criteria:
  - Detail view shows `name`, `description`, role icon, and heart if favorite.
  - A dropdown labeled "Manage Monster" provides actions: "Edit Monster", "Delete Monster".
  - Choosing "Edit" navigates to `/mine/:id/edit`.
  - Choosing "Delete" opens a confirmation dialog; on confirm, the monster is removed and the app navigates to `/mine`.

### 6) Create a New Monster

As a user, I want to add a new monster to my team.

- Acceptance Criteria:
  - From the list, "New Monster" navigates to `/mine/new`.
  - The form includes `name` (required), `description` (required), `favorite` (checkbox), and `role` (radio options: soldier, medic, shield, thief, mage).
  - Save button is disabled until the form is valid.
  - Current implementation requires `favorite` to be checked for the form to be valid.
  - On save, the monster is added and the app navigates back to the list.
  - Cancel returns to the list without changes.

### 7) Edit an Existing Monster

As a user, I want to modify the details of an existing monster.

- Acceptance Criteria:
  - Edit screen pre-populates form fields with the selected monster’s values.
  - `name` and `description` are required; `favorite` must be explicitly set to satisfy current validation.
  - On save, the monster is updated and the app navigates back to the list.
  - Cancel returns to the list without changes.

### 8) Delete a Monster (with Confirmation)

As a user, I want to safely delete a monster only after confirmation.

- Acceptance Criteria:
  - From detail view, selecting delete opens a modal asking: "Are you sure you want to delete this monster?".
  - Clicking "YES" deletes the monster; clicking "NO" cancels.
  - After deletion, navigates to `/mine` and the list no longer shows the deleted monster.

### 9) Add a Random Monster

As a user, I want to quickly add a random monster from the catalog.

- Acceptance Criteria:
  - "Random Monster" adds one monster chosen from `assets/monsters.json`.
  - The list updates immediately and the app returns to `/mine`.

### 10) Remove All Monsters (with Confirmation)

As a user, I want to clear my list with an explicit confirmation.

- Acceptance Criteria:
  - Clicking "Remove All Monsters" prompts a confirmation.
  - On confirm, the list becomes empty and the app returns to `/mine`.
  - On cancel, no changes are made.

### 11) Unfavorite All Monsters

As a user, I want to quickly reset favorites across all monsters.

- Acceptance Criteria:
  - Clicking "Unfavorite All" sets `favorite=false` for all monsters.
  - The list updates immediately and remains on `/mine`.

### 12) Create a Random Monster Team

As a user, I want to auto-generate a team of monsters.

- Acceptance Criteria:
  - "Create Random Monster Team" clears the current list and adds 5 random monsters from `assets/monsters.json`.
  - The list shows 5 monsters and remains accessible under `/mine`.

### 13) Sort Monsters by Name

As a user, I want to sort my monsters to find them easily.

- Acceptance Criteria:
  - Clicking "Sort Monsters" sorts the list by `name` ascending.
  - The list updates in-place without navigation changes.

### 14) Dropdown Interactions

As a user, I want intuitive dropdown interactions in header and detail views.

- Acceptance Criteria:
  - Dropdown menus toggle open/closed via the `appDropdown` directive.
  - Actions within dropdowns trigger the expected navigations and operations without page reloads.

---

## Constraints & Notes

- Persistence: Monsters are stored in-memory via `MonsterService` and are not persisted to a backend; data resets on page reload.
- Randomization: Random selection draws from `assets/monsters.json`; team creation adds 5 items at random.
- Validation: Current `MonsterEdit` form requires the `favorite` checkbox to be set for the form to be valid.
- Guard Behavior: Auth guard strictly relies on `AuthService.isAuthenticated()` boolean. No token or session expiry is implemented.
