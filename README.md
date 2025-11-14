# Task List Demo - Static Website

A simple, clean task list application built with vanilla HTML, CSS, and JavaScript. This project demonstrates local storage functionality and can be easily hosted on GitHub Pages.

## Features

- ✨ Clean, modern UI with Bootstrap 5
- ➕ Add tasks with a single click or Enter key
- 🗑️ Delete individual tasks
- 💾 Automatic saving to browser's localStorage
- 🔄 Tasks persist across page refreshes
- 📱 Fully responsive design
- 🚀 No backend required - runs entirely in the browser

## Project Structure

```
github-copilot-demo/
├── index.html      # Main HTML file with Bootstrap layout
├── app.js          # JavaScript logic for task management
├── styles.css      # Custom CSS styling
└── README.md       # Project documentation
```

## How to Run Locally

### Option 1: Open Directly in Browser
1. Clone this repository:
   ```bash
   git clone https://github.com/guramrit-dhillon/github-copilot-demo.git
   cd github-copilot-demo
   ```

2. Open `index.html` in your web browser:
   - Double-click the file, or
   - Right-click and select "Open with" → your preferred browser

### Option 2: Using a Local Server (Recommended)
For better testing, especially if you plan to add more features later:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

Then open `http://localhost:8000` in your browser.

## How to Deploy to GitHub Pages

### Method 1: Using GitHub Settings (Easiest)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add task list app"
   git push origin main
   ```

2. Go to your repository on GitHub

3. Click on **Settings** tab

4. Scroll down to **Pages** section in the left sidebar

5. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`

6. Click **Save**

7. Wait a few minutes, then visit:
   ```
   https://guramrit-dhillon.github.io/github-copilot-demo/
   ```

### Method 2: Using GitHub Actions (Alternative)

GitHub Actions will automatically deploy your site when you push to the main branch if you've configured Pages to use GitHub Actions as the source.

## Usage

1. **Add a Task**: Type your task in the input field and click "Add Task" or press Enter
2. **Delete a Task**: Click the red "Delete" button next to any task
3. **Persistent Storage**: Your tasks are automatically saved and will be there when you return

## Technologies Used

- **HTML5**: Structure and semantics
- **CSS3**: Styling and animations
- **JavaScript (ES6)**: Application logic
- **Bootstrap 5**: Responsive layout and components
- **localStorage API**: Data persistence

## Browser Compatibility

This app works in all modern browsers that support:
- ES6 JavaScript
- localStorage API
- CSS Grid/Flexbox

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Code Overview

### Key Functions in `app.js`

- `loadTasks()`: Loads tasks from localStorage on page load
- `saveTasks()`: Saves the current task list to localStorage
- `addTask()`: Adds a new task to the list
- `deleteTask(taskId)`: Removes a task by its ID
- `renderTasks()`: Updates the DOM with the current task list

### localStorage Structure

Tasks are stored as a JSON array:
```javascript
[
  { id: 1699999999999, text: "Buy groceries" },
  { id: 1699999999998, text: "Walk the dog" }
]
```

## Customization

### Change Colors
Edit `styles.css` to customize the color scheme:
```css
body {
    background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}
```

### Modify Bootstrap Theme
Replace the Bootstrap CDN link in `index.html` with a custom Bootstrap build or theme.

### Add More Features
Consider adding:
- Task completion/checkboxes
- Task editing
- Task priorities
- Categories or tags
- Search/filter functionality
- Export/import tasks

## License

This project is open source and available for anyone to use and modify.

## Contributing

Feel free to fork this project and submit pull requests with improvements!

## Contact

For questions or suggestions, please open an issue on GitHub.
