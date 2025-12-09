```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST /exampleapp/new_note
    activate server
    
    Note right of browser: Browser sends a form to the server that contains data of the new note
    
    server-->>browser: 302 Found
    deactivate server
    
    Note right of browser: Server clarifies that it has saved the data and tells browser to load /exampleapp/notes

    browser->>server: GET /exampleapp/notes
    activate server
    server-->>browser: HTML file
    deactivate server
    

    browser->>server: GET /exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET /exampleapp/main.js
    activate server
    server-->>browser: JS file
    deactivate server
    
    Note right of browser: The browser starts executing JS that fetches JSON from the server
    
    browser->>server: GET /exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ...]
    deactivate server

    Note right of browser: Browser executes callback that renders the notes
