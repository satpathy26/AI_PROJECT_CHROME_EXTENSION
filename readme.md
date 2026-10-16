# 🧠 AI MCQ Solver — Chrome Extension

An AI-powered Chrome Extension that instantly solves **Multiple Choice Questions (MCQs)** directly from webpages using **Mistral AI**.

Simply highlight a question with its four options, click **Solve Question**, and receive the correct option along with a concise explanation.

---

## ✨ Features

* 🤖 AI-powered MCQ solving with Mistral AI
* 📄 Solve questions directly from any supported webpage
* ⚡ Fast AI responses
* 🧠 Returns the correct option with an explanation
* 🎯 Handles technical, conceptual, and reasoning-based questions
* ⏳ Loading spinner during AI processing
* 🛡️ Error handling for failed requests and missing selections
* 🎨 Clean and responsive Chrome extension UI
* 🔌 Chrome Manifest V3 architecture
* 💻 Lightweight frontend with vanilla JavaScript

---

## 🚀 Performance

The extension was tested for responsiveness, resource usage, and AI response time.

| Metric                              |       Result |
| ----------------------------------- | -----------: |
| 🧠 MCQs tested                      |       **20** |
| ✅ Correct answers                   |  **20 / 20** |
| 🎯 Test-set accuracy                |     **100%** |
| ⚡ Average AI response time          | **~0.9 sec** |
| 🖱️ Interaction to Next Paint (INP) |     **8 ms** |
| 💻 CPU usage                        |    **~0.1%** |
| 🧠 Memory footprint                 |   **~36 MB** |
| 🖼️ Extension logo size             |    **32 KB** |
| 📦 Project size                     |  **~1.4 MB** |
| 🐛 Console errors during testing    |        **0** |

> **Note:** The 100% accuracy figure is based on a 20-question internal test set and should not be interpreted as guaranteed real-world model accuracy.

---

## 🧪 Accuracy Testing

The extension was tested using MCQs from multiple areas, including:

* JavaScript
* Python
* DBMS
* Machine Learning
* Algorithms
* Operating Systems
* Computer Networks
* Data Structures
* Logical Reasoning

The final test set also included deliberately tricky questions involving:

* JavaScript type coercion
* Python list copying
* SQL aggregation and `HAVING`
* Clock-angle reasoning
* Logical ordering problems

### Result

```text
Questions tested : 20
Correct          : 20
Incorrect        : 0

Test accuracy    : 100%
```

The test demonstrates strong performance on the selected benchmark, while larger and more diverse test sets would be required for a meaningful general accuracy estimate.

---

## 🏗️ Architecture

The extension follows a simple message-based architecture:

```text
┌─────────────────────┐
│      Webpage        │
│                     │
│  Select MCQ +       │
│  Four Options       │
└──────────┬──────────┘
           │
           │ chrome.runtime
           ▼
┌─────────────────────┐
│     content.js      │
│                     │
│ Gets selected text  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      popup.js       │
│                     │
│ Sends MCQ to        │
│ background worker   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    background.js    │
│                     │
│ Handles AI request  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       ai.js         │
│                     │
│ GROQ    API request │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       GROQ  AI      │
│                     │
│ Answer + Explanation│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      popup.js       │
│                     │
│ Displays result     │
└─────────────────────┘
```

---

## 📂 Project Structure

```text
AI-MCQ-Solver/
│
├── manifest.json       # Chrome extension configuration
├── popup.html          # Extension UI
├── popup.css           # Extension styling
├── popup.js            # Popup interaction and messaging
├── content.js          # Retrieves selected webpage text
├── background.js       # Service worker and message handling
├── ai.js               # Mistral AI integration
├── icons/
│   └── logo.png
│
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)

### Extension

* Chrome Extension Manifest V3
* Chrome Tabs API
* Chrome Runtime Messaging
* Content Scripts
* Service Workers

### AI

* GROQ AI
* 'openai/gpt-oss-120b',
* REST API

---

## 🔄 How It Works

### 1. Select an MCQ

Highlight the question and its four options on a webpage.

```text
Which data structure follows the LIFO principle?

A. Queue
B. Stack
C. Tree
D. Graph
```

### 2. Click Solve Question

The popup sends a message to the content script requesting the selected text.

### 3. Process the Question

The selected MCQ is sent to the background service worker.

### 4. Call Mistral AI

The service worker sends the question to Mistral using the configured model.

### 5. Receive the Result

The AI returns:

```text
Answer: B

Explanation:
A stack follows the Last In, First Out (LIFO) principle,
meaning the last element inserted is the first one removed.
```

### 6. Display the Answer

The result is returned to the popup and displayed to the user.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Shaurya925/AI_MCQ_SOLVER_Extension
```

### 2. Open Chrome

Navigate to:

```text
chrome://extensions
```

### 3. Enable Developer Mode

Enable **Developer Mode** in the top-right corner.

### 4. Load the extension

Click:

```text
Load unpacked
```

Select the cloned project directory.

---

## 🔑 Configure Mistral API

Open:

```text
ai.js
```

Add your Mistral API key:

```javascript
const API_KEY = "YOUR_GROQ_API_KEY";
```

> ⚠️ **Security:** This project is designed as a personal/local Chrome extension. API keys embedded directly in a browser extension can be extracted by users with access to the extension files. Do not commit a real API key to GitHub.

For a production application, the API request should be moved behind a secure backend.

---

## 💡 Usage

1. Open a webpage containing an MCQ.
2. Highlight the complete question and its options.
3. Open **AI MCQ Solver**.
4. Click **Solve Question**.
5. Wait for the AI response.
6. View the answer and explanation.

---

## 📸 Example

### Input

```text
Which data structure follows the LIFO principle?

A. Queue
B. Stack
C. Tree
D. Graph
```

### Output

```text
Answer: B

Explanation:
A stack follows the Last In, First Out (LIFO) principle,
meaning the last element inserted is the first one removed.
```

---

## 🧩 Error Handling

The extension handles common runtime failures, including:

* No MCQ selected
* Content script unavailable
* Failed background connection
* Failed API request
* Empty AI response
* Invalid AI response

The UI also disables the **Solve Question** button while a request is being processed to prevent accidental duplicate requests.

---

## 🔮 Future Improvements

### UX

* 📋 Copy answer button
* 🌙 Dark mode
* 📜 Question history
* ⌨️ Keyboard shortcuts
* 🎨 Improved answer highlighting
* 📊 Confidence score

### AI

* 🔄 Multiple AI model support
* 🧠 Better prompt engineering
* 🎯 Structured JSON responses
* ⚖️ Model comparison and benchmarking
* 📈 Larger automated accuracy benchmark

### Advanced Features

* 🖼️ OCR support for image-based MCQs
* 🔍 Automatic MCQ detection
* 📑 PDF question support
* 📚 Question history and analytics
* 📤 Export answers
* 🔊 Voice-based question input

---

## 📊 Current Project Status

```text
Core MCQ solving       ✅ Complete
Mistral integration    ✅ Complete
Chrome messaging       ✅ Complete
Loading state          ✅ Complete
Error handling         ✅ Complete
Custom extension icon  ✅ Complete
Performance testing    ✅ Complete
20-question benchmark  ✅ Complete
```

### Current Version

```text
Version: 1.0
Status:  Stable / Personal Use
Model:   mistral-small-latest
Platform: Google Chrome
```

---

## 🤝 Contributing

Contributions are welcome.

If you'd like to improve the project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the extension
5. Submit a pull request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you find the project useful, consider giving the repository a ⭐ on GitHub.

It helps support the project and encourages further development.