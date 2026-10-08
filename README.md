# QuickNotes

QuickNotes is a lightweight note-taking app for capturing short thoughts and organizing them as Personal, Work, or Study notes. Notes include a creation date, can be searched and deleted, and are saved in the browser so they remain available after a refresh.

## Features

- Add notes in the Personal, Work, and Study categories.
- Validate notes to require text and limit entries to 200 characters.
- Display each note's category and creation date, with an option to delete it.
- Search note text as you type, including case-insensitive multiword searches.
- Save notes in browser localStorage and show an accurate note count.
- Use the responsive layout on desktop and mobile screens.

## Run locally

No dependencies or build step are required. Clone the repository, open its folder, and start a local web server from the project root:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000> in a browser. You can also open `index.html` directly, though using a local server is recommended for consistent browser storage behavior.

## What I learned

- How semantic HTML and responsive CSS make a small app easier to use across screen sizes.
- How to create and update interface elements safely with DOM methods and `textContent`.
- How to manage note data with form validation, search filtering, and JSON in localStorage.