# 📚 Smart Study - Mobile Learning Application

A modern, beautiful Android-style study application built with HTML, CSS, and JavaScript. This app helps students organize their learning with notes, quizzes, study routines, and task management.

## ✨ Features

### Core Features
- **🎓 Beautiful Home Screen** - Welcome screen with motivational quotes
- **📖 Subject Cards** - Quick access to Math, Science, English, and SST
- **📝 Notes Section** - Create, view, and manage study notes with subject categorization
- **📅 Daily Study Routine Planner** - Schedule your study sessions
- **✅ To-Do Task List** - Track your daily tasks with completion status
- **🧪 Quiz Section** - Interactive MCQ quizzes for different subjects
- **🌙 Dark Mode Toggle** - Easy on the eyes study sessions
- **📊 Progress Bar** - Track your daily study progress
- **🔐 Simple Login Page** - Secure access with username and password
- **💬 Motivational Quotes** - Daily inspiration for studying

### Extra Features
- **📱 Offline Support** - Full offline functionality
- **💾 Local Storage** - All data saved locally on device
- **⏱️ Study Timer** - Pomodoro-style study sessions
- **🔊 Sound Effects** - Feedback sounds for interactions
- **🎨 Dark Mode** - Eye-friendly dark theme
- **📊 User Profile** - Stats and achievements tracking
- **⚙️ Settings Page** - Customize app preferences

## 🎨 Design

### UI/UX Highlights
- **Modern Mobile Design** - Responsive layout for Android phones
- **Gradient Colors** - Beautiful blue and purple gradients
- **Rounded Elements** - Smooth, modern button and card design
- **Smooth Animations** - Elegant transitions between screens
- **Bottom Navigation Bar** - Easy access to all main sections
- **Student-Friendly Layout** - Intuitive and easy to navigate

## 📱 Pages

1. **Splash Screen** - Initial loading screen with app branding
2. **Login Page** - User authentication
3. **Home Page** - Dashboard with overview and quick actions
4. **Notes Page** - Create and manage study notes
5. **Quiz Page** - Interactive quiz section with multiple subjects
6. **Profile Page** - User profile with achievements and statistics
7. **Settings Page** - App preferences and customization
8. **Study Routine Page** - Daily schedule management
9. **Tasks Page** - To-do list for daily tasks

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

### Installation

1. Clone the repository or download the files
2. Open `index.html` in your web browser
3. Start studying!

### First Use
1. You'll see the splash screen (3 seconds)
2. Enter any username and password to login
3. Explore the app features

## 💾 Data Storage

All data is stored locally in your browser using localStorage:
- Notes
- Routines
- Tasks
- Study Progress
- User preferences
- Dark mode setting

Data persists between sessions automatically.

## 🎮 How to Use

### Adding Notes
1. Navigate to the Notes section
2. Click the '+' button
3. Enter title, select subject, and write content
4. Click 'Save Note'

### Creating Study Routine
1. Go to Routine section
2. Click the '+' button
3. Enter subject, time, and duration
4. Click 'Add Routine'

### Managing Tasks
1. Navigate to Tasks section
2. Type your task and press enter or click the arrow
3. Check the checkbox to mark as completed
4. Click delete to remove tasks

### Taking Quizzes
1. Go to Quiz section
2. Choose a subject
3. Answer the questions
4. View your score

### Study Timer
1. Click on a subject card to open timer (feature can be extended)
2. Set duration in settings
3. Click start and study!

## 🎨 Customization

### Change Theme Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #a855f7;
    --accent-color: #ec4899;
    /* ... more colors */
}
```

### Add More Subjects
Edit the subject cards in `index.html` and update quiz data in `app.js`

### Add More Quotes
Add to the `quotes` array in `app.js`

## 📊 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (Chrome, Safari)

## 🔐 Privacy

All data is stored locally in your browser. No data is sent to external servers. The app works completely offline.

## 📝 File Structure

```
Smart-Study/
├── index.html      # Main HTML file
├── styles.css      # All styles and responsive design
├── app.js          # Application logic and functionality
└── README.md       # This file
```

## 🎯 Features Roadmap

- [ ] Cloud sync support
- [ ] Collaboration features
- [ ] Advanced analytics
- [ ] Multiple quizzes per subject
- [ ] Voice notes
- [ ] Image support in notes
- [ ] Export notes as PDF
- [ ] Social sharing
- [ ] Leaderboard

## 🐛 Known Issues

- Audio context requires user interaction in some browsers
- Some animations may differ slightly on older devices

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a modern study app for students.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## 📞 Support

For support, feature requests, or bug reports, please create an issue in the repository.

---

**Happy Studying! 📚✨**

Remember: "Success is the sum of small efforts repeated day in and day out."
