# ⏳ Premium Countdown Timer

A modern, elegant countdown timer built with **HTML, CSS, and JavaScript**, featuring smooth micro-interactions, theme switching, persistence, and keyboard shortcuts — all without external frameworks.

Designed to feel **premium, minimal, and professional**.

   🌍 Live Demo
            https://nikhil-prakash-at.github.io/Countdown-Timer/ 


   ✨ Features

   Core Functionality

* Countdown to any **future date & time**
* Displays **days, hours, minutes, and seconds**
* **Start / Stop / Reset** controls
* Accurate real-time updates (1s interval)

    Event Support

* Optional **event label** (e.g., *Birthday*, *Launch Day*)
* Event name displayed prominently above the timer
* Smart handling:

  * Empty event → nothing displayed
  * No stale event text after stop/reset
* Event included in finish message when present

    Smart Finish State

* Clear “Time’s up” message
* Event-aware completion message
* Visual completion animation on digits

    Theme System

* **Dark & Light mode**
* One-click toggle
* Respects system preference on first load
* Theme preference persisted via `localStorage`

    Micro-Interactions & Polish

* Per-second **tick animation**
* Subtle hover feedback on digits
* Smooth easing for buttons and transitions
* Glassmorphism-inspired UI elements

    Keyboard Shortcuts

* **Enter** → Start
* **Space** → Stop / Pause
* **R** → Reset
  (Disabled automatically when actions are unavailable)

    Persistence

* Countdown state survives page reloads
* Date, time, theme, and event name restored automatically
* Clean reset logic (no ghost data)


   🛠 Tech Stack

* **HTML5** — semantic structure
* **CSS3** — custom properties, animations, responsive layout
* **Vanilla JavaScript (ES6+)** — state management & logic
* **No frameworks, no libraries**


   📂 Project Structure


countdown-timer/
│
├── index.html     # Markup
├── style.css      # Styling & themes
├── script.js      # Logic & interactions
└── README.md      # Documentation
```

---

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Nikhil-Prakash-AT/Countdown-Timer.git
   ```

2. Open `index.html` in your browser
   *(or use Live Server for development)*

That’s it — no build tools required.



   🎯 Use Cases

* Event countdowns (birthdays, launches, deadlines)
* Study / productivity timers
* UI/UX demo project
* Portfolio showcase for frontend fundamentals



   🧠 Design Philosophy

This project intentionally avoids frameworks to demonstrate:

* Strong **JavaScript fundamentals**
* Thoughtful **state management**
* Attention to **UX micro-details**
* Clean, readable, maintainable code



   📌 Future Enhancements (Optional)

* Multiple saved countdowns
* Shareable countdown links
* Sound or notification on completion
* Time zone support

💻 Author

Nikhil Prakash A T 📍 Kerala, India 📧 nikhilprakashat@gmail.com 🕸️ https://github.com/Nikhil-Prakash-AT
