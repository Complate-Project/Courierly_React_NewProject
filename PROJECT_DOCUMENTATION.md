# Courier Website - Role-Based Dashboard System

## Project Overview

This project implements a role-based dashboard system for a courier service with
three distinct user roles:

1. **Admin** - Full system access and management capabilities
2. **Rider** - Delivery personnel with access to delivery-related functions
3. **Branch** - Branch managers with access to branch-specific operations

The system features a login page that authenticates users and redirects them to
their respective dashboards based on their roles.

## Project Structure

```
src/
├── Components/
│   ├── Admin/
│   │   └── Sidebar/
│   │       └── AdminSidebar.jsx
│   ├── Branch/
│   │   └── Sidebar/
│   │       └── BranchSidebar.jsx
│   ├── ProtectedRoute.jsx
│   └── Rider/
│       └── Sidebar/
│           └── RiderSidebar.jsx
├── Contexts/
│   └── AuthContext.jsx
├── Hooks/
│   └── useAuth.js
├── Layout/
│   ├── AdminLayout.jsx
│   ├── BranchLayout.jsx
│   └── RiderLayout.jsx
├── Pages/
│   ├── Admin/
│   │   └── Dashboard/
│   │       └── AdminDashboard.jsx
│   ├── Branch/
│   │   └── Dashboard/
│   │       └── BranchDashboard.jsx
│   ├── Login/
│   │   └── Login.jsx
│   └── Rider/
│       └── Dashboard/
│           └── RiderDashboard.jsx
├── Router/
│   └── Router.jsx
├── index.css
└── main.jsx
```

## Key Features Implemented

### 1. Authentication System

- **Login Page**: Central authentication point where users enter credentials
- **Role Detection**: System identifies user role based on credentials
- **Protected Routes**: Unauthorized access to dashboards is prevented
- **Session Management**: User sessions are maintained using localStorage

### 2. Role-Based Dashboards

Each role has a dedicated dashboard with:

- Customized layout and color scheme
- Role-specific sidebar navigation
- Relevant content and functionality

### 3. Collapsible Sidebar Navigation

Each dashboard includes a collapsible sidebar with:

- Collapsed state showing only icons (default)
- Expanded state showing icons with text labels
- Hamburger menu in the navbar to toggle sidebar state
- Main menu items with icons
- Submenu items with hierarchical organization
- Visual indication of active pages
- Consistent styling per role
- Profile icon in the navbar for each role

### 4. Role-Specific Functionality

#### Admin Dashboard

- System-wide management capabilities
- Rider and branch management
- Package tracking and monitoring
- Comprehensive reporting system
- System configuration options

#### Rider Dashboard

- Delivery assignment tracking
- Route planning tools
- Delivery status updates
- Personal profile management

#### Branch Dashboard

- Branch-specific package management
- Staff management for riders and support personnel
- Inventory tracking
- Financial reporting

## Technical Implementation Details

### Authentication Flow

1. User accesses the application and is redirected to the login page
2. User enters credentials (demo: admin/rider/branch as username)
3. System validates credentials and determines user role
4. User is redirected to their role-specific dashboard
5. Session is maintained throughout the user's visit

### Component Architecture

- **Context API**: Used for global state management of authentication
- **Protected Routes**: Higher-order components that prevent unauthorized access
- **Layout Components**: Consistent page structure for each role
- **Reusable UI Components**: Sidebar navigation components for each role

### Security Features

- Role-based access control
- Client-side protection with server-side validation recommended
- Session persistence using localStorage
- Unauthorized access prevention

## How to Use the System

### Login Credentials (Demo)

- **Admin**: Username "admin", any password
- **Rider**: Username "rider", any password
- **Branch**: Username "branch", any password

### Navigation

1. Log in with appropriate credentials
2. Use the hamburger menu in the navbar to expand/collapse the sidebar
3. In collapsed state, only icons are visible
4. In expanded state, icons and text labels are visible
5. Click on menu items to expand submenus
6. Select submenu items to access specific functionality
7. Use the profile icon in the navbar for user-specific actions
8. Use the logout button to end the session

## File Descriptions

### Core Files

- **main.jsx**: Application entry point with AuthProvider wrapper
- **Router.jsx**: Route definitions with protected routes
- **AuthContext.jsx**: Authentication state management
- **useAuth.js**: Custom hook for accessing authentication context
- **ProtectedRoute.jsx**: Component for protecting routes based on roles

### Layout Files

- **AdminLayout.jsx**: Layout for admin users with sidebar and navbar
- **RiderLayout.jsx**: Layout for rider users with sidebar and navbar
- **BranchLayout.jsx**: Layout for branch users with sidebar and navbar

### Page Files

- **Login.jsx**: Authentication page
- **AdminDashboard.jsx**: Admin dashboard content
- **RiderDashboard.jsx**: Rider dashboard content
- **BranchDashboard.jsx**: Branch dashboard content

### Component Files

- **AdminSidebar.jsx**: Navigation sidebar for admin users with collapsible
  functionality
- **RiderSidebar.jsx**: Navigation sidebar for rider users with collapsible
  functionality
- **BranchSidebar.jsx**: Navigation sidebar for branch users with collapsible
  functionality

## Styling and UI

- **Tailwind CSS**: Used for styling all components
- **React Icons**: Icon library for UI elements
- **Responsive Design**: Adapts to different screen sizes
- **Role-Based Color Schemes**:
  - Admin: Gray/Blue theme
  - Rider: Green theme
  - Branch: Yellow theme
- **Collapsible Sidebar**: Smooth transitions between expanded and collapsed
  states

## Future Enhancements

1. Integration with backend authentication system
2. Database connectivity for real user data
3. Enhanced security with JWT tokens
4. Additional role-specific features
5. Mobile-responsive sidebar navigation
6. Real-time notifications and updates

## Dependencies Used

- React and React DOM
- React Router DOM for navigation
- Tailwind CSS for styling
- React Icons for UI icons

This system provides a solid foundation for a role-based courier management
application with clear separation of concerns and extensibility for future
features.
