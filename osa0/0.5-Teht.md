```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: GET /exampleapp/spa
    activate server
    
    
    server-->>browser: HTML file
    deactivate server
    

    browser->>server: GET /exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server
    

    browser->>server: GET /exampleapp/spa.js
    activate server
    server-->>browser: JS file
    deactivate server
    
    Note right of browser: The browser starts executing JS that fetches JSON from the server

    browser->>server: GET /exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ...]
    deactivate server
    
    Note right of browser: Browser executes callback that renders the notes
    
  

    
