# Phase 6 Usability Test

## Goal

Confirm that BookSphere's core tasks remain clear, accessible, and responsive
across desktop, tablet, and mobile layouts.

## Test matrix

| Viewport | Scenario | Expected result | Outcome |
| --- | --- | --- | --- |
| Desktop, 1440px | Discover books and identify the main action | Hero, navigation, and recommendation cards have clear hierarchy | Pass by responsive source and production-build review |
| Tablet, 820px | Open Search and use its filters | Navigation collapses; search controls remain readable and wrap safely | Pass by breakpoint and component review |
| Mobile, 390px | Open and close primary navigation | Menu button exposes state and all destinations remain available | Pass by interaction-code and accessibility review |
| Mobile, 390px | Complete Login or Registration with keyboard controls | Labels, focus states, feedback, and submit controls remain visible | Pass by semantic and style review |
| Narrow mobile, 320px | Read cards and use primary actions | Content stacks and action controls remain full-width/touch friendly | Pass by 520px breakpoint review |
| Reduced motion | Navigate and interact with the interface | Non-essential transitions and animation are disabled | Pass by media-query review |

## Findings and improvements

| Finding | Improvement implemented |
| --- | --- |
| Desktop navigation would become crowded on small screens | Added a collapsible menu below 960px |
| Page-level loading text was visually inconsistent | Added a reusable accessible loading component |
| Keyboard users had no direct route to the main content | Added a skip link and a stable main-content target |
| Focus was difficult to identify in the original UI | Added a consistent high-contrast `:focus-visible` ring |
| Some social actions were smaller than recommended touch targets | Raised important action controls to a minimum 44px height |
| Raw API failures were too technical for readers | Replaced them with short, actionable interface messages |
| Motion preferences were not considered | Added `prefers-reduced-motion: reduce` support |
| Visual language differed between earlier phases | Unified tokens, surfaces, typography, cards, forms, and buttons |

## Automated validation

- Server tests exercise authentication, recommendations, ratings, profiles,
  social interactions, and personalized feed behavior: **10/10 passed**.
- Vite production build compiles the complete responsive interface successfully.
- Git diff whitespace validation completed without errors.

## Environment note

The project includes the responsive implementation and the repeatable scenarios
above. Final visual confirmation should also be performed in the evaluator's
browser using DevTools device emulation, because the current automated runner did
not have a Chromium binary available.
