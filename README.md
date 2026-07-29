# Courier Website - Role-Based Dashboard System

This project implements a role-based dashboard system for a courier service with
three distinct user roles: Admin, Rider, and Branch.

## Features

- Role-based authentication and authorization
- Separate dashboards for Admin, Rider, and Branch users
- Collapsible sidebar navigation for each role with icons and text labels
- Hamburger menu in the navbar to toggle sidebar state
- Profile icon in the navbar for each role
- Protected routes to prevent unauthorized access
- Responsive design using Tailwind CSS

## Roles

1. **Admin**: Full system access and management capabilities
2. **Rider**: Delivery personnel with access to delivery-related functions
3. **Branch**: Branch managers with access to branch-specific operations

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Access the application at http://localhost:5173

## Login Credentials (Demo)

- **Admin**: Username "admin", any password
- **Rider**: Username "rider", any password
- **Branch**: Username "branch", any password

## Navigation

- Use the hamburger menu in the navbar to expand/collapse the sidebar
- In collapsed state, only icons are visible
- In expanded state, icons and text labels are visible
- Click on menu items to expand submenus
- Use the profile icon in the navbar for user-specific actions

## Documentation

For detailed information about the project structure, implementation details,
and usage instructions, please refer to
[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md).
