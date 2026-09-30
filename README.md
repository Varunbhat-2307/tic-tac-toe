# Tic Tac Toe

A responsive, two-player Tic Tac Toe game built with HTML, CSS, and vanilla JavaScript. Play locally in the same browser, keep track of wins and draws, and start another round without losing the current scores.

## Play

Open `index.html` in a modern web browser. No installation, server, or network connection is required.

1. Enter a name for Player X and Player O.
2. Select **Start Game**. Player X goes first.
3. Players take turns selecting an empty square.
4. When a round ends, choose **Play Again** to keep the same names and scores, or **Main Menu** to return to setup.
5. Choose **Reset Score** to clear both player scores and the draw count. The game asks for confirmation first.

The scoreboard is kept in memory while the page is open. Reloading the page starts a new score session.

## Features

- Two-player local matches with customizable player names
- Win and draw detection, including a highlight for winning squares
- Result dialog with replay and menu actions
- Accessible labels and live turn updates
- Responsive layout and reduced-motion support
- No frameworks, libraries, APIs, or build tools

## Project Files

- `index.html` contains the game structure and accessible controls.
- `style.css` contains the responsive layout, visual styles, and animations.
- `script.js` contains turn handling, win/draw detection, and score management.

## Requirements

A modern browser with support for HTML5, CSS3, and JavaScript. The game can be hosted as static files, including on GitHub Pages.
