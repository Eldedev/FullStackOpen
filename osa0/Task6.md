```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST /exampleapp/new_note_spa
    activate server
    
    Note right of browser: Browser sends new note to server and re-renders notes locally
    
    server->>browser: 201 Created
    deactivate server

    Note right of browser: Browser confirms note is saved successfully