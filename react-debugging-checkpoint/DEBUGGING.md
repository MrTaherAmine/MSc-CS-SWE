# Debugging Process

## Objective

The checkpoint required a React application with multiple components, state,
and props. The application was inspected using React Developer Tools to identify
incorrect props, unexpected state values, and component behavior.

The final application in `src/` contains the corrected code.

A documented intentionally buggy version is preserved in:

```text
debug-reference/BuggyApp.js
```

It is not imported by the running application.

## Tools Used

- Browser Developer Tools
- React Developer Tools
- React **Components** panel
- Browser console
- React application running in development mode

React Developer Tools exposes a component tree and allows developers to inspect
component props and state. The Profiler panel can also be used to analyze
renders.

---

## Debugging Procedure

### 1. Run the sample application

```bash
npm install
npm start
```

Open:

```text
http://localhost:3000
```

### 2. Open React Developer Tools

Open the browser Developer Tools and select the **Components** tab.

Inspect this component hierarchy:

```text
App
├── ProfileCard
├── Counter
└── StatusPanel
```

### 3. Issue 1 — Missing / incorrect profile prop

#### Symptom

The profile component did not display the expected user name correctly.

#### Diagnosis

In the intentionally buggy version, `App` passed:

```jsx
<ProfileCard username={user.name} />
```

but `ProfileCard` expected:

```jsx
function ProfileCard({ name, role, online })
```

Using the Components panel reveals that `ProfileCard` receives `username`
instead of `name`.

#### Fix

Pass the correct prop:

```jsx
<ProfileCard
  name={user.name}
  role={user.role}
  online={user.online}
/>
```

#### Verification

The Components panel now shows:

```text
name: "Taher"
role: "Software Engineering Student"
online: true
```

and the UI displays the correct name.

---

## 4. Issue 2 — Incorrect counter prop

### Symptom

The displayed counter value was one number higher than the actual state.

### Diagnosis

The buggy version passed:

```jsx
<Counter count={count + 1} />
```

React Developer Tools showed that the state in `App` could be `0` while
`Counter` received `1`.

### Fix

Pass the state value directly:

```jsx
<Counter count={count} />
```

The increment handler was also written using a functional state updater:

```jsx
onIncrement={() => setCount((current) => current + 1)}
```

This makes the update depend on the latest available state.

### Verification

When `App` state is:

```text
count: 0
```

the Counter prop is also:

```text
count: 0
```

Clicking **Increment** updates both to `1`.

---

## 5. Issue 3 — Reversed online status

### Symptom

The StatusPanel reported the opposite status from the profile.

### Diagnosis

The buggy application passed:

```jsx
<StatusPanel online={!user.online} />
```

The React component tree made the inconsistency visible:

```text
App user.online: true
ProfileCard online: true
StatusPanel online: false
```

### Fix

Pass the original state value:

```jsx
<StatusPanel
  online={user.online}
  onToggle={toggleOnlineStatus}
/>
```

### Verification

ProfileCard and StatusPanel now receive the same `online` value.

Clicking the status button changes the state in `App` and updates both child
components consistently.

---

## 6. Final Verification

The corrected application was checked for the following behavior:

- Profile name is displayed.
- Profile role is displayed.
- Profile status matches application state.
- Counter initially displays `0`.
- Increment increases the counter by exactly one.
- Reset returns the counter to `0`.
- Status toggle changes online/offline state.
- All dependent components update consistently.
- No missing-prop or runtime errors are expected from the corrected code.

## Suggested Evidence Screenshots

If the instructor requires visual evidence, capture these screenshots locally:

1. React Developer Tools **Components** tab showing `App`.
2. `ProfileCard` selected with its props visible.
3. `Counter` selected with `count` visible.
4. `StatusPanel` selected with `online` visible.
5. Final working application after the fixes.

Store them in an optional `screenshots/` folder before submission.
