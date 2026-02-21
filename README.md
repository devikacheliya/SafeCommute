<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# SafeCommute 🌙

A minimal, iOS-style safety application for secure commuting with real-time location tracking, emergency alerts, and check-in timers.

## Basic Details

### Team Name: SafeCommute

### College: St.Joseph's College Autonomous, Devagiri

### Team Members
- Member 1: Devika - St.Joseph's College Autonomous, Devagiri
- Member 2: Niranjana - St.Joseph's College Autonomous, Devagiri

### Hosted Project Link
[mention your project hosted link here]

### Project Description
SafeCommute is a modern, user-friendly safety application designed to provide peace of mind during commutes. It features real-time GPS tracking, emergency SOS alerts with automatic WhatsApp sharing, check-in timers, and a beautiful frosted glass UI with soft lavender and blush color palette inspired by iOS design principles.

### The Problem statement
Many individuals, especially students and working professionals, feel unsafe during their daily commutes. Traditional safety apps often have cluttered interfaces and are cumbersome to use in emergencies. There's a need for a lightweight, visually appealing, and intuitive safety solution that works quickly.

### The Solution
SafeCommute addresses this with a minimal, calming design that prioritizes user safety without compromising aesthetics. It provides:
- Real-time location tracking with accuracy indicators
- One-tap emergency SOS button with automatic WhatsApp alert sharing
- Customizable check-in timers for planned arrivals
- Fake call feature to escape uncomfortable situations
- Beautiful, modern UI that reduces anxiety during use
- Live map interface showing current location and movement

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: HTML5, CSS3, JavaScript (Vanilla)
- Libraries used: Leaflet.js (mapping), Web Geolocation API
- Tools used: VS Code, Git, Web APIs (navigator.geolocation, MediaRecorder, Clipboard API)
- Styling: Modern CSS with Flexbox, Grid, Glass Morphism effects, CSS Variables

**For Hardware:**
- Main components: [List main components]
- Specifications: [Technical specifications]
- Tools required: [List tools needed]

---

## Features

- 📍 **Real-time Location Tracking**: Continuous GPS tracking with accuracy indicators displayed as circular radius on map
- 🚨 **Emergency SOS Button**: One-tap emergency activation with automatic WhatsApp message sharing including live location
- ⏰ **Check-in Timer**: Set custom reminders for planned arrivals with automatic alerts to contacts if user doesn't check in
- 📞 **Fake Call Feature**: Simulate an incoming call to help escape uncomfortable situations
- 🗺️ **Interactive Map**: Embedded mini-map showing real-time location with zoom controls, switching to full-screen modal on click
- 📍 **Share Location**: Manual location sharing via WhatsApp with coordinates and OpenStreetMap link
- 💾 **Audio Recording**: Automatic audio recording during SOS for evidence collection
- 🎨 **Beautiful UI**: Minimal design with soft lavender/blush palette, frosted glass cards, and iOS-inspired interactions
- 📊 **Coordinate Display**: Real-time coordinate display with accuracy in meters
- ✅ **Status Indicators**: Live status feedback showing trip state, location accuracy, and alert status

---

## Implementation

### For Software:

#### Installation & Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd SafeCommute
```

2. **No build process required** - SafeCommute is a pure frontend application using vanilla JavaScript

3. **Browser Requirements:**
   - Modern browser with Geolocation API support (Chrome, Firefox, Safari, Edge)
   - HTTPS or localhost for geolocation permissions

#### Run

**Option 1: Direct File Opening**
```bash
# Simply open doctype.html in your browser
open doctype.html
```

**Option 2: Local HTTP Server (Recommended)**
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```
Then open `http://localhost:8000/doctype.html` in your browser.

**First Time Setup:**
1. Open the app in your browser
2. Allow location permissions when prompted
3. You should see the map with your current location marked
4. Click "Start Trip" to begin tracking
5. Test SOS, Share Location, or Timer features as needed

### For Hardware:

#### Components Required
[List all components needed with specifications]

#### Circuit Setup
[Explain how to set up the circuit]

---

## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

![Screenshot1](Add screenshot 1 here with proper name)
*Add caption explaining what this shows*

![Screenshot2](Add screenshot 2 here with proper name)
*Add caption explaining what this shows*

![Screenshot3](Add screenshot 3 here with proper name)
*Add caption explaining what this shows*

#### Diagrams

**System Architecture:**

![Architecture Diagram](docs/architecture.png)
*Explain your system architecture - components, data flow, tech stack interaction*

**Application Workflow:**

![Workflow](docs/workflow.png)
*Add caption explaining your workflow*

---

### For Hardware:

#### Schematic & Circuit

![Circuit](Add your circuit diagram here)
*Add caption explaining connections*

![Schematic](Add your schematic diagram here)
*Add caption explaining the schematic*

#### Build Photos

![Team](Add photo of your team here)

![Components](Add photo of your components here)
*List out all components shown*

![Build](Add photos of build process here)
*Explain the build steps*

![Final](Add photo of final product here)
*Explain the final build*

---

## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

**Base URL:** `https://api.yourproject.com`

##### Endpoints

**GET /api/endpoint**
- **Description:** [What it does]
- **Parameters:**
  - `param1` (string): [Description]
  - `param2` (integer): [Description]
- **Response:**
```json
{
  "status": "success",
  "data": {}
}
```

**POST /api/endpoint**
- **Description:** [What it does]
- **Request Body:**
```json
{
  "field1": "value1",
  "field2": "value2"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Operation completed"
}
```

[Add more endpoints as needed...]

---

### For Mobile Apps:

#### App Flow Diagram

![App Flow](docs/app-flow.png)
*Explain the user flow through your application*

#### Installation Guide

**For Android (APK):**
1. Download the APK from [Release Link]
2. Enable "Install from Unknown Sources" in your device settings:
   - Go to Settings > Security
   - Enable "Unknown Sources"
3. Open the downloaded APK file
4. Follow the installation prompts
5. Open the app and enjoy!

**For iOS (IPA) - TestFlight:**
1. Download TestFlight from the App Store
2. Open this TestFlight link: [Your TestFlight Link]
3. Click "Install" or "Accept"
4. Wait for the app to install
5. Open the app from your home screen

**Building from Source:**
```bash
# For Android
flutter build apk
# or
./gradlew assembleDebug

# For iOS
flutter build ios
# or
xcodebuild -workspace App.xcworkspace -scheme App -configuration Debug
```

---

### For Hardware Projects:

#### Bill of Materials (BOM)

| Component | Quantity | Specifications | Price | Link/Source |
|-----------|----------|----------------|-------|-------------|
| Arduino Uno | 1 | ATmega328P, 16MHz | ₹450 | [Link] |
| LED | 5 | Red, 5mm, 20mA | ₹5 each | [Link] |
| Resistor | 5 | 220Ω, 1/4W | ₹1 each | [Link] |
| Breadboard | 1 | 830 points | ₹100 | [Link] |
| Jumper Wires | 20 | Male-to-Male | ₹50 | [Link] |
| [Add more...] | | | | |

**Total Estimated Cost:** ₹[Amount]

#### Assembly Instructions

**Step 1: Prepare Components**
1. Gather all components listed in the BOM
2. Check component specifications
3. Prepare your workspace
![Step 1](images/assembly-step1.jpg)
*Caption: All components laid out*

**Step 2: Build the Power Supply**
1. Connect the power rails on the breadboard
2. Connect Arduino 5V to breadboard positive rail
3. Connect Arduino GND to breadboard negative rail
![Step 2](images/assembly-step2.jpg)
*Caption: Power connections completed*

**Step 3: Add Components**
1. Place LEDs on breadboard
2. Connect resistors in series with LEDs
3. Connect LED cathodes to GND
4. Connect LED anodes to Arduino digital pins (2-6)
![Step 3](images/assembly-step3.jpg)
*Caption: LED circuit assembled*

**Step 4: [Continue for all steps...]**

**Final Assembly:**
![Final Build](images/final-build.jpg)
*Caption: Completed project ready for testing*

---

### For Scripts/CLI Tools:

#### Command Reference

**Basic Usage:**
```bash
python script.py [options] [arguments]
```

**Available Commands:**
- `command1 [args]` - Description of what command1 does
- `command2 [args]` - Description of what command2 does
- `command3 [args]` - Description of what command3 does

**Options:**
- `-h, --help` - Show help message and exit
- `-v, --verbose` - Enable verbose output
- `-o, --output FILE` - Specify output file path
- `-c, --config FILE` - Specify configuration file
- `--version` - Show version information

**Examples:**

```bash
# Example 1: Basic usage
python script.py input.txt

# Example 2: With verbose output
python script.py -v input.txt

# Example 3: Specify output file
python script.py -o output.txt input.txt

# Example 4: Using configuration
python script.py -c config.json --verbose input.txt
```

#### Demo Output

**Example 1: Basic Processing**

**Input:**
```
This is a sample input file
with multiple lines of text
for demonstration purposes
```

**Command:**
```bash
python script.py sample.txt
```

**Output:**
```
Processing: sample.txt
Lines processed: 3
Characters counted: 86
Status: Success
Output saved to: output.txt
```

**Example 2: Advanced Usage**

**Input:**
```json
{
  "name": "test",
  "value": 123
}
```

**Command:**
```bash
python script.py -v --format json data.json
```

**Output:**
```
[VERBOSE] Loading configuration...
[VERBOSE] Parsing JSON input...
[VERBOSE] Processing data...
{
  "status": "success",
  "processed": true,
  "result": {
    "name": "test",
    "value": 123,
    "timestamp": "2024-02-07T10:30:00"
  }
}
[VERBOSE] Operation completed in 0.23s
```

---

## Project Demo

### Video
[Add your demo video link here - YouTube, Google Drive, etc.]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** [e.g., GitHub Copilot, v0.dev, Cursor, ChatGPT, Claude]

**Purpose:** [What you used it for]
- Example: "Generated boilerplate React components"
- Example: "Debugging assistance for async functions"
- Example: "Code review and optimization suggestions"

**Key Prompts Used:**
- "Create a REST API endpoint for user authentication"
- "Debug this async function that's causing race conditions"
- "Optimize this database query for better performance"

**Percentage of AI-generated code:** [Approximately X%]

**Human Contributions:**
- Architecture design and planning
- Custom business logic implementation
- Integration and testing
- UI/UX design decisions

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- **Devika**: Frontend UI/UX Design, CSS styling (glass morphism, color palette), Interactive map integration, User experience optimization
- **Niranjana**: JavaScript functionality, Geolocation tracking, Emergency alert system, WhatsApp integration, Audio recording feature, Timer functionality

Both team members contributed equally to planning, testing, and refinement of the SafeCommute application.

---

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
