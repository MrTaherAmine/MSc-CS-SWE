# Phase 2 Report — User Authentication and Authorization

For Phase 2, I extended the existing BookSphere full-stack project with complete user authentication and authorization functionality.

On the frontend, I created dedicated registration and login forms and added an authentication context that restores the current user session when the application loads. I also added a protected dashboard route so unauthenticated visitors are redirected to the login page.

On the backend, passwords are never stored in plain text. User passwords are hashed with bcrypt before being saved in MongoDB. Authentication sessions use JSON Web Tokens (JWT). After successful registration or login, the server stores the token in an HTTP-only cookie so normal client-side JavaScript does not directly handle the authentication credential.

I created authentication API endpoints for registration, login, current-user session retrieval, and logout. The authorization middleware validates the JWT, retrieves the corresponding user, and attaches the authenticated user to protected requests.

The existing recommendation creation endpoint is now protected so only authenticated users can publish recommendations. New recommendations are automatically associated with the authenticated user's MongoDB record.

Logout is implemented by clearing the authentication cookie and resetting the frontend authentication state.

This phase satisfies the registration, password hashing, token-based session management, protected-route, authorization, and logout requirements while extending the same BookSphere repository created during Phase 1.
