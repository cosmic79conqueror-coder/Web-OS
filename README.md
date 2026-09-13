TurboOS - Web Interface

A browser-based OS interface themed around car tuning, engine telemetry, and horsepower. Built with vanilla HTML, CSS, and JavaScript.

Features
- Boot Sequence: Custom RPM gauge animation and ECU flashing load screen.
- Ignition Screen: Glitch text effects and an ignition button to launch the desktop.
- Heads Up Display (HUD): Top bar with live system status and boost pressure tracking.
- Desktop Apps: 
  - Engine Control: Settings menu with sliders for boost target and toggles for TCS, Launch Control, and Drift Mode.
  - Telemetry: Live dashboard data showing RPM, temps, and pressure.
  - Nav System: Embedded Google Maps window.
  - Media Deck: Spotify playlist embed.
  - Garage: File system to load different ECU map files (clicking base or pops maps updates settings and HUD boost readout).
  - Calendar: Scheduler supporting dates up to 2100 with reminder creation and deletion.
- Window Manager: Apps open in draggable, closable glassmorphic windows with dynamic z-index layering.
- Custom Cursor: Neon red and cyan targeting cursor that trails mouse movement and reacts to clicks, drags, and hovers.
- Live Chronometer: Real-time clock widget with rotating outer rings.

Setup Instructions
1. Download all files and place them in a single folder:
   - index.html
   - style.css
   - script.js
2. Add a background image named "imgres.jpg" to the same folder.
3. Open index.html in a web browser.

Notes
- No external frameworks required.
- Spotify and Google Maps require an active internet connection.
- Dragging windows disables iframe pointer-events automatically for smooth movement.