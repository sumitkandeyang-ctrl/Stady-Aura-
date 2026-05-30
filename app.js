// App State
const appState = {
    currentUser: null,
    darkMode: localStorage.getItem('darkMode') === 'true' || false,
    soundEnabled: localStorage.getItem('soundEnabled') !== 'false',
    notes: JSON.parse(localStorage.getItem('notes')) || [],
    routines: JSON.parse(localStorage.getItem('routines')) || [],
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    studyProgress: parseInt(localStorage.getItem('studyProgress')) || 0,
    timerRunning: false,
    timerInterval: null,
    timerSeconds: 25 * 60,
    currentPage: 'home'
};

const quotes = [
    "Success is the sum of small efforts repeated day in and day out. - Robert Collier",
    "Education is the most powerful weapon you can use to change the world. - Nelson Mandela",
    "The expert in anything was once a beginner. - Helen Hayes",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "Education is not the filling of a pail, but the lighting of a fire. - William Butler Yeats",
    "Learn as if you will live forever, live as if you will die tomorrow. - Mahatma Gandhi",
    "The only true wisdom is in knowing you know nothing. - Socrates",
    "Knowledge is power. - Francis Bacon",
    "Education breeds confidence. Confidence breeds hope. Hope breeds peace. - Clarice Asper",
    "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice. - Brian Herbert"
];

const quizzes = [
    {
        id: 1,
        subject: 'Math',
        name: 'Algebra Basics',
        questions: [
            {
                question: 'What is 2 + 2?',
                options: ['3', '4', '5', '6'],
                correct: 1
            },
            {
                question: 'Solve: x + 5 = 12',
                options: ['5', '6', '7', '8'],
                correct: 2
            }
        ]
    },
    {
        id: 2,
        subject: 'Science',
        name: 'Biology Basics',
        questions: [
            {
                question: 'What is the basic unit of life?',
                options: ['Atom', 'Cell', 'Molecule', 'Organ'],
                correct: 1
            },
            {
                question: 'How many bones are in human body?',
                options: ['186', '206', '226', '246'],
                correct: 1
            }
        ]
    },
    {
        id: 3,
        subject: 'English',
        name: 'Grammar',
        questions: [
            {
                question: 'Which is correct?',
                options: ['She go to school', 'She goes to school', 'She going to school', 'She gone to school'],
                correct: 1
            }
        ]
    }
];

// App Object
const app = {
    init() {
        this.setupEventListeners();
        this.applyDarkMode();
        this.loadNotesDisplay();
        this.loadRoutineDisplay();
        this.loadTasksDisplay();
        this.setRandomQuote();
        
        // Simulate splash screen
        setTimeout(() => {
            this.showLoginPage();
        }, 3000);
    },

    setupEventListeners() {
        // Login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Dark Mode
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        }

        // Settings
        const logoutBtn = document.querySelector('.btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    },

    showLoginPage() {
        const splashScreen = document.getElementById('splashScreen');
        const loginPage = document.getElementById('loginPage');
        
        if (splashScreen) splashScreen.classList.add('hidden');
        if (loginPage) loginPage.classList.remove('hidden');
    },

    handleLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            appState.currentUser = username;
            localStorage.setItem('currentUser', username);
            
            this.playSound('success');
            this.showMainApp();
            this.updateGreeting();
        }
    },

    showMainApp() {
        const loginPage = document.getElementById('loginPage');
        const mainApp = document.getElementById('mainApp');
        
        if (loginPage) loginPage.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        
        this.navigateTo('home');
    },

    updateGreeting() {
        const userName = document.getElementById('userName');
        if (userName && appState.currentUser) {
            userName.textContent = appState.currentUser.charAt(0).toUpperCase() + appState.currentUser.slice(1);
        }
        
        const profileName = document.getElementById('profileName');
        if (profileName) {
            profileName.textContent = appState.currentUser?.charAt(0).toUpperCase() + appState.currentUser?.slice(1);
        }
    },

    toggleDarkMode() {
        appState.darkMode = !appState.darkMode;
        localStorage.setItem('darkMode', appState.darkMode);
        this.applyDarkMode();
        this.playSound('toggle');
    },

    applyDarkMode() {
        const body = document.body;
        if (appState.darkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    },

    navigateTo(page) {
        appState.currentPage = page;
        
        // Hide all pages
        const pageContents = document.querySelectorAll('.page-content');
        pageContents.forEach(pc => pc.classList.remove('active'));
        
        // Show selected page
        const selectedPage = document.getElementById(page + 'Page');
        if (selectedPage) {
            selectedPage.classList.add('active');
        }
        
        // Update nav buttons
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach((btn, index) => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[onclick="app.navigateTo('${page}')"]`);
        if (activeBtn) {
            activeBtn.parentElement?.classList.add('active');
        }
        
        // Set active nav button
        const navButtons = document.querySelectorAll('.nav-btn');
        const pageMap = ['home', 'notes', 'quiz', 'profile', 'settings'];
        const pageIndex = pageMap.indexOf(page);
        if (pageIndex !== -1) {
            navButtons.forEach((btn, i) => {
                if (i === pageIndex) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        
        // Load quiz cards when navigating to quiz
        if (page === 'quiz') {
            this.loadQuizzes();
        }
    },

    // Notes Management
    openNoteModal() {
        const modal = document.getElementById('noteModal');
        if (modal) modal.classList.remove('hidden');
        this.playSound('open');
    },

    closeNoteModal() {
        const modal = document.getElementById('noteModal');
        if (modal) modal.classList.add('hidden');
        this.resetNoteForm();
    },

    resetNoteForm() {
        const form = document.getElementById('noteForm');
        if (form) form.reset();
    },

    saveNote(event) {
        event.preventDefault();
        
        const title = document.getElementById('noteTitle').value;
        const subject = document.getElementById('noteSubject').value;
        const content = document.getElementById('noteContent').value;
        
        const note = {
            id: Date.now(),
            title,
            subject,
            content,
            date: new Date().toLocaleDateString()
        };
        
        appState.notes.push(note);
        localStorage.setItem('notes', JSON.stringify(appState.notes));
        
        this.loadNotesDisplay();
        this.closeNoteModal();
        this.playSound('success');
    },

    loadNotesDisplay() {
        const container = document.getElementById('notesContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (appState.notes.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-light);">No notes yet. Create your first note!</p>';
            return;
        }
        
        appState.notes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.innerHTML = `
                <span class="note-subject">${note.subject}</span>
                <div class="note-title">${note.title}</div>
                <div class="note-content">${note.content}</div>
                <div style="font-size: 12px; color: var(--text-light); margin-bottom: 10px;">${note.date}</div>
                <button class="note-delete" onclick="app.deleteNote(${note.id})">Delete</button>
            `;
            container.appendChild(noteCard);
        });
    },

    deleteNote(id) {
        appState.notes = appState.notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(appState.notes));
        this.loadNotesDisplay();
        this.playSound('delete');
    },

    // Routine Management
    openRoutineModal() {
        const modal = document.getElementById('routineModal');
        if (modal) modal.classList.remove('hidden');
        this.playSound('open');
    },

    closeRoutineModal() {
        const modal = document.getElementById('routineModal');
        if (modal) modal.classList.add('hidden');
        document.getElementById('routineForm').reset();
    },

    saveRoutine(event) {
        event.preventDefault();
        
        const subject = document.getElementById('routineSubject').value;
        const time = document.getElementById('routineTime').value;
        const duration = document.getElementById('routineDuration').value;
        
        const routine = {
            id: Date.now(),
            subject,
            time,
            duration
        };
        
        appState.routines.push(routine);
        localStorage.setItem('routines', JSON.stringify(appState.routines));
        
        this.loadRoutineDisplay();
        this.closeRoutineModal();
        this.playSound('success');
    },

    loadRoutineDisplay() {
        const container = document.getElementById('routineContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (appState.routines.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-light);">No routines yet. Create your study schedule!</p>';
            return;
        }
        
        // Sort by time
        const sorted = [...appState.routines].sort((a, b) => a.time.localeCompare(b.time));
        
        sorted.forEach(routine => {
            const item = document.createElement('div');
            item.className = 'routine-item';
            item.innerHTML = `
                <div class="routine-info">
                    <div class="routine-subject">${routine.subject}</div>
                    <div class="routine-time">⏰ ${routine.time} - ${routine.duration} minutes</div>
                </div>
                <button class="routine-delete" onclick="app.deleteRoutine(${routine.id})">Delete</button>
            `;
            container.appendChild(item);
        });
    },

    deleteRoutine(id) {
        appState.routines = appState.routines.filter(r => r.id !== id);
        localStorage.setItem('routines', JSON.stringify(appState.routines));
        this.loadRoutineDisplay();
        this.playSound('delete');
    },

    // Task Management
    openTaskModal() {
        // For now, just focus on the input
        const input = document.getElementById('taskInput');
        if (input) input.focus();
    },

    addTask() {
        const input = document.getElementById('taskInput');
        if (!input || !input.value.trim()) return;
        
        const task = {
            id: Date.now(),
            text: input.value,
            completed: false
        };
        
        appState.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(appState.tasks));
        
        input.value = '';
        this.loadTasksDisplay();
        this.playSound('success');
        this.updateProgress();
    },

    loadTasksDisplay() {
        const container = document.getElementById('tasksList');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (appState.tasks.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-light);">No tasks yet. Add one to get started!</p>';
            return;
        }
        
        appState.tasks.forEach(task => {
            const item = document.createElement('div');
            item.className = `task-item ${task.completed ? 'completed' : ''}`;
            item.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                    onchange="app.toggleTask(${task.id})">
                <span class="task-text">${task.text}</span>
                <button class="task-delete" onclick="app.deleteTask(${task.id})">Delete</button>
            `;
            container.appendChild(item);
        });
    },

    toggleTask(id) {
        const task = appState.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(appState.tasks));
            this.loadTasksDisplay();
            this.updateProgress();
            this.playSound('toggle');
        }
    },

    deleteTask(id) {
        appState.tasks = appState.tasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(appState.tasks));
        this.loadTasksDisplay();
        this.updateProgress();
        this.playSound('delete');
    },

    updateProgress() {
        if (appState.tasks.length === 0) {
            appState.studyProgress = 0;
        } else {
            const completed = appState.tasks.filter(t => t.completed).length;
            appState.studyProgress = Math.round((completed / appState.tasks.length) * 100);
        }
        
        localStorage.setItem('studyProgress', appState.studyProgress);
        
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = appState.studyProgress + '%';
        }
        
        const progressText = document.getElementById('studyProgress');
        if (progressText) {
            progressText.textContent = appState.studyProgress;
        }
    },

    // Quiz Management
    loadQuizzes() {
        const container = document.getElementById('quizContainer');
        if (!container) return;
        
        container.innerHTML = `
            <div class="quiz-intro">
                <h3>📚 Choose a Quiz to Test Your Knowledge</h3>
                <p>Select a subject and challenge yourself!</p>
            </div>
            <div class="quiz-grid">
                ${quizzes.map(quiz => `
                    <div class="quiz-card" onclick="app.startQuiz(${quiz.id})">
                        <i class="fas fa-${quiz.id === 1 ? 'calculator' : quiz.id === 2 ? 'flask' : 'book'}"></i>
                        <h4>${quiz.name}</h4>
                        <p style="font-size: 12px; color: var(--text-light);">${quiz.questions.length} Questions</p>
                    </div>
                `).join('')}
            </div>
        `;
    },

    startQuiz(quizId) {
        const quiz = quizzes.find(q => q.id === quizId);
        if (!quiz) return;
        
        const container = document.getElementById('quizContainer');
        if (!container) return;
        
        let currentQuestion = 0;
        let score = 0;
        
        const showQuestion = () => {
            if (currentQuestion >= quiz.questions.length) {
                container.innerHTML = `
                    <div class="question-card" style="text-align: center;">
                        <h3>🎉 Quiz Completed!</h3>
                        <p style="font-size: 24px; color: var(--primary-color); margin: 20px 0;">${score}/${quiz.questions.length}</p>
                        <p>Great job! You scored ${Math.round((score / quiz.questions.length) * 100)}%</p>
                        <button class="btn-primary" onclick="app.loadQuizzes()" style="margin-top: 20px;">Back to Quizzes</button>
                    </div>
                `;
                return;
            }
            
            const question = quiz.questions[currentQuestion];
            container.innerHTML = `
                <div class="question-card">
                    <p style="color: var(--text-light); margin-bottom: 10px;">Question ${currentQuestion + 1} of ${quiz.questions.length}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((currentQuestion + 1) / quiz.questions.length) * 100}%"></div>
                    </div>
                    <p class="question-text">${question.question}</p>
                    <div class="options-group">
                        ${question.options.map((option, index) => `
                            <label class="option-label">
                                <input type="radio" name="answer" value="${index}" onchange="
                                    if (${index} === ${question.correct}) {
                                        app.quizScore = ${score} + 1;
                                    } else {
                                        app.quizScore = ${score};
                                    }
                                    app.nextQuestion(${quizId});
                                ">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        };
        
        app.nextQuestion = (qId) => {
            score = app.quizScore !== undefined ? app.quizScore : score;
            currentQuestion++;
            showQuestion();
        };
        
        showQuestion();
    },

    // Quotes
    setRandomQuote() {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const quoteText = document.getElementById('dailyQuote');
        const newQuoteBtn = document.getElementById('newQuoteBtn');
        
        if (quoteText) {
            quoteText.textContent = `"${randomQuote.split(' - ')[0]}"` || randomQuote;
        }
        
        if (newQuoteBtn) {
            newQuoteBtn.addEventListener('click', () => this.setRandomQuote());
        }
    },

    // Timer
    openTimerModal() {
        const modal = document.getElementById('timerModal');
        if (modal) modal.classList.remove('hidden');
    },

    closeTimerModal() {
        const modal = document.getElementById('timerModal');
        if (modal) modal.classList.add('hidden');
        this.stopTimer();
    },

    startTimer() {
        if (appState.timerRunning) return;
        
        appState.timerRunning = true;
        const startBtn = document.getElementById('startTimerBtn');
        const pauseBtn = document.getElementById('pauseTimerBtn');
        
        if (startBtn) startBtn.classList.add('hidden');
        if (pauseBtn) pauseBtn.classList.remove('hidden');
        
        appState.timerInterval = setInterval(() => {
            appState.timerSeconds--;
            this.updateTimerDisplay();
            
            if (appState.timerSeconds <= 0) {
                this.stopTimer();
                this.playSound('complete');
                alert('⏱️ Study time completed! Take a break!');
            }
        }, 1000);
    },

    pauseTimer() {
        appState.timerRunning = false;
        clearInterval(appState.timerInterval);
        
        const startBtn = document.getElementById('startTimerBtn');
        const pauseBtn = document.getElementById('pauseTimerBtn');
        
        if (startBtn) startBtn.classList.remove('hidden');
        if (pauseBtn) pauseBtn.classList.add('hidden');
    },

    stopTimer() {
        clearInterval(appState.timerInterval);
        appState.timerRunning = false;
        
        const startBtn = document.getElementById('startTimerBtn');
        const pauseBtn = document.getElementById('pauseTimerBtn');
        
        if (startBtn) startBtn.classList.remove('hidden');
        if (pauseBtn) pauseBtn.classList.add('hidden');
    },

    resetTimer() {
        this.stopTimer();
        const timerDuration = parseInt(localStorage.getItem('timerDuration')) || 25;
        appState.timerSeconds = timerDuration * 60;
        this.updateTimerDisplay();
    },

    updateTimerDisplay() {
        const minutes = Math.floor(appState.timerSeconds / 60);
        const seconds = appState.timerSeconds % 60;
        const display = document.getElementById('timerDisplay');
        
        if (display) {
            display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    },

    // Sound Effects
    playSound(type) {
        if (!appState.soundEnabled) return;
        
        // Using Web Audio API for sound effects
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            switch(type) {
                case 'success':
                    oscillator.frequency.value = 800;
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.2);
                    break;
                    
                case 'toggle':
                    oscillator.frequency.value = 600;
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.1);
                    break;
                    
                case 'delete':
                    oscillator.frequency.value = 400;
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.15);
                    break;
                    
                case 'open':
                    oscillator.frequency.value = 700;
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.1);
                    break;
                    
                case 'complete':
                    for (let i = 0; i < 3; i++) {
                        const osc = audioContext.createOscillator();
                        const gain = audioContext.createGain();
                        osc.connect(gain);
                        gain.connect(audioContext.destination);
                        osc.frequency.value = 800 + (i * 100);
                        gain.gain.setValueAtTime(0.1, audioContext.currentTime + (i * 0.1));
                        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (i * 0.1) + 0.2);
                        osc.start(audioContext.currentTime + (i * 0.1));
                        osc.stop(audioContext.currentTime + (i * 0.1) + 0.2);
                    }
                    break;
            }
        } catch (e) {
            console.log('Audio not supported');
        }
    },

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            appState.currentUser = null;
            localStorage.removeItem('currentUser');
            
            const loginPage = document.getElementById('loginPage');
            const mainApp = document.getElementById('mainApp');
            
            if (loginPage) loginPage.classList.remove('hidden');
            if (mainApp) mainApp.classList.add('hidden');
            
            // Reset form
            const form = document.getElementById('loginForm');
            if (form) form.reset();
        }
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
    app.updateProgress();
});

// Add event listeners for modals closing
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.add('hidden');
    }
});