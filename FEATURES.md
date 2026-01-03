# Application Features & User Guide

## Application Overview

Potential Bassoon is a modern task management application that allows users to organize their work with a clean, intuitive interface. This document describes the features and user experience.

## Key Features

### 1. User Authentication
- **User Registration**: Create a new account with email, password, and name
- **User Login**: Secure login with JWT token authentication
- **Session Management**: Automatic token storage and management
- **Logout**: Clear session and return to login page

### 2. Task Management
- **Create Tasks**: Add new tasks with title and description
- **View Tasks**: See all your tasks in a card-based grid layout
- **Edit Tasks**: Update task details and status
- **Delete Tasks**: Remove tasks you no longer need
- **Status Tracking**: Track tasks through three states:
  - 🟡 Pending (default for new tasks)
  - 🔵 In Progress (actively working on)
  - 🟢 Completed (finished tasks)

### 3. User Interface

#### Navigation Bar
- Application title "📋 Task Manager"
- User greeting with name
- Logout button

#### Login Page
- Email input field
- Password input field
- Login button
- Link to registration page
- Error messages for failed login attempts

#### Registration Page
- Name input field
- Email input field
- Password input field (minimum 6 characters)
- Register button
- Link to login page
- Error messages for validation failures

#### Dashboard
- Header with user greeting
- "New Task" button to create tasks
- Grid layout of task cards
- Empty state message when no tasks exist

#### Task Cards
Each task is displayed as a card showing:
- Task title (bold)
- Task description
- Status badge (color-coded)
- Creation date
- Edit button (blue)
- Delete button (red)

#### Task Form (Create/Edit)
- Title input field
- Description textarea
- Status dropdown (Pending, In Progress, Completed)
- Submit button (Create/Update)
- Cancel button

## User Journey

### First Time User

1. **Landing on the App**
   - User sees the login page
   - Clicks "Register" link

2. **Registration**
   - Fills in name, email, and password
   - Clicks "Register" button
   - System creates account and logs in automatically
   - Redirected to dashboard

3. **Creating First Task**
   - Sees empty dashboard with message "No tasks yet"
   - Clicks "+ New Task" button
   - Fills in task details
   - Selects status (defaults to Pending)
   - Clicks "Create Task"
   - Returns to dashboard with new task visible

4. **Managing Tasks**
   - Views task in card format
   - Clicks "Edit" to modify task
   - Updates status to "In Progress"
   - Saves changes
   - Later marks as "Completed"

5. **Logging Out**
   - Clicks "Logout" button
   - Session cleared
   - Redirected to login page

### Returning User

1. **Login**
   - Enters email and password
   - Clicks "Login"
   - Redirected to dashboard with existing tasks

2. **Continue Working**
   - Sees all previously created tasks
   - Creates new tasks as needed
   - Updates existing task statuses
   - Deletes completed old tasks

## Responsive Design

The application is fully responsive and works on:
- 💻 Desktop computers
- 📱 Tablets
- 📱 Mobile phones

### Mobile Adaptations
- Single column layout on narrow screens
- Touch-friendly button sizes
- Simplified navigation
- Readable text sizes

## Security Features (User-Facing)

### Password Requirements
- Minimum 6 characters
- Passwords are securely hashed (never stored as plain text)

### Session Security
- JWT tokens automatically expire after 7 days
- Tokens stored securely in browser localStorage
- Protected routes require valid authentication

### Rate Limiting
- Login attempts limited to prevent brute force attacks
- API calls rate-limited to prevent abuse
- Fair usage limits for all users

## Visual Design

### Color Scheme
- **Background**: Light gray (#f5f5f5)
- **Cards**: White (#ffffff)
- **Primary**: Blue (#007bff)
- **Success**: Green (#28a745)
- **Warning**: Yellow (#ffc107)
- **Danger**: Red (#dc3545)
- **Info**: Teal (#17a2b8)

### Typography
- **Font**: System fonts (San Francisco, Segoe UI, Roboto)
- **Headings**: Bold, larger sizes
- **Body Text**: Regular weight, readable sizes
- **Small Text**: Used for dates and secondary info

### Status Badges
- **Pending**: Yellow background, black text
- **In Progress**: Teal background, white text
- **Completed**: Green background, white text

## Keyboard Shortcuts

Currently, the application doesn't have specific keyboard shortcuts, but standard browser shortcuts work:
- `Tab` - Navigate between form fields
- `Enter` - Submit forms
- `Esc` - Close modals (if implemented)

## Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Accessibility Features

- Semantic HTML structure
- Form labels for screen readers
- Focus indicators on interactive elements
- Color contrast meets WCAG AA standards
- Keyboard navigation support

## Error Handling

### User-Friendly Error Messages
- **Registration Errors**: "Email already exists", "Password too short"
- **Login Errors**: "Invalid credentials"
- **Network Errors**: "Unable to connect to server"
- **Rate Limit**: "Too many attempts, please try again later"

### Loading States
- Loading indicator while fetching data
- Disabled buttons during API calls
- Visual feedback for all actions

## Data Privacy

- Your tasks are private to your account
- Passwords are encrypted
- No data is shared with third parties
- Session data stored locally in browser

## Tips for Best Experience

1. **Use descriptive titles**: Make tasks easy to identify at a glance
2. **Update status regularly**: Keep your workflow current
3. **Delete old tasks**: Keep your dashboard clean
4. **Use all three statuses**: Better organize your work
5. **Check back regularly**: New features may be added

## Planned Features (Future)

- [ ] Task due dates and reminders
- [ ] Task categories and tags
- [ ] Search and filter functionality
- [ ] Sort tasks by different criteria
- [ ] Task priority levels
- [ ] Shared tasks and collaboration
- [ ] File attachments
- [ ] Dark mode
- [ ] Email notifications
- [ ] Export data functionality
- [ ] Task templates
- [ ] Recurring tasks

## Support

If you encounter any issues:
1. Check the QUICKSTART.md guide
2. Review the README.md for setup instructions
3. Check browser console for errors (F12)
4. Open an issue on GitHub

## Credits

Built with modern web technologies:
- React for dynamic UI
- Express.js for robust backend
- MongoDB for flexible data storage
- JWT for secure authentication

---

Enjoy using Potential Bassoon! 🎵🎯
