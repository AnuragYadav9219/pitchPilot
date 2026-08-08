# VirtualMento

> **AI-powered roleplay simulator for practicing real-world conversations.**

VirtualMento is an AI-powered communication and roleplay platform designed to help users practice difficult, high-pressure, and real-world conversations in a safe and interactive environment.

Instead of simply reading advice or watching tutorials, users can **practice conversations with AI**, receive feedback, identify weaknesses, and improve through repeated simulations.

The project is being developed as a cross-platform product with a **React web application** and a **React Native mobile application**, supported by a shared package for common data, configuration, and application logic.

---

## ✨ Why VirtualMento?

Many communication skills cannot be learned effectively through theory alone.

Users often need to practice situations such as:

* Job interviews
* Sales conversations
* Negotiations
* Customer interactions
* Presentations
* Difficult workplace conversations
* Networking
* Professional introductions
* High-pressure questions
* Other real-world communication scenarios

VirtualMento provides an interactive environment where users can repeatedly practice these situations with an AI-powered roleplay partner.

### The core idea

```text
Choose a Scenario
       ↓
Configure the Roleplay
       ↓
Start AI Conversation
       ↓
Respond Naturally
       ↓
Complete Simulation
       ↓
Receive AI Feedback
       ↓
Identify Weaknesses
       ↓
Practice Again
```

---

# 🎯 Project Goals

VirtualMento aims to:

* Make communication practice accessible and interactive.
* Provide realistic AI-powered roleplay experiences.
* Help users build confidence through repetition.
* Provide actionable feedback after each simulation.
* Allow users to practice different real-world scenarios.
* Provide a consistent experience across web and mobile.
* Build the foundation for personalized AI communication coaching.

---

# 🚀 Core Features

## AI Roleplay

Users can participate in simulated conversations with an AI character.

The AI can act according to the selected scenario and conversation context, allowing users to practice natural responses instead of predefined questions.

---

## Scenario-Based Practice

Users can select different communication scenarios and practice according to their specific goals.

Examples include:

* Interview practice
* Sales pitches
* Negotiation
* Customer conversations
* Professional communication
* Difficult conversations

The scenario system is designed to be extensible so additional scenarios can be introduced without restructuring the entire application.

---

## Interactive Conversations

The roleplay experience is designed around a conversational interface.

Instead of completing a static questionnaire, users interact with the AI dynamically and respond to the situation as it develops.

---

## AI Feedback

After completing a roleplay session, VirtualMento can provide structured feedback to help users understand:

* What they did well
* Where they struggled
* Areas for improvement
* Communication weaknesses
* Opportunities to improve their response
* Overall performance

The goal is not simply to provide a score, but to help the user understand **how to improve**.

---

## Cross-Platform Experience

VirtualMento is being developed for multiple platforms:

### Web

Built with React for users who prefer accessing VirtualMento from a desktop or browser.

### Mobile

Built with React Native for users who want to practice conversations from their mobile devices.

Both applications are designed around the same core product concepts.

---

# 🏗️ Architecture

VirtualMento follows a multi-application architecture.

                    ┌─────────────────────┐
                    │      VirtualMento   │
                    │       Platform      │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
        ┌───────▼────────┐          ┌────────▼────────┐
        │   Web Client   │          │  Mobile Client  │
        │     React      │          │  React Native   │
        └───────┬────────┘          └────────┬────────┘
                │                             │
                └──────────────┬──────────────┘
                               │
                       ┌───────▼────────┐
                       │ Shared Package │
                       │                │
                       │ Data           │
                       │ Types          │
                       │ Configuration  │
                       │ Constants      │
                       └───────┬────────┘
                               │
                       ┌───────▼────────┐
                       │ Backend / AI   │
                       │ Infrastructure │
                       └────────────────┘


The architecture is intentionally designed so that web and mobile applications can share common application-level information instead of maintaining duplicate definitions.

---

# 📁 Repository Structure

The repository follows a monorepo-style structure:

VirtualMento/
│
├── apps/
│   │
│   ├── web/
│   │   └── React web application
│   │
│   └── mobile/
│       └── React Native application
│
├── packages/
│   │
│   └── shared/
│       ├── constants/
│       ├── config/
│       ├── data/
│       ├── types/
│       └── ...
│
├── docs/
│   └── Project documentation
│
├── README.md
└── ...


The exact structure may evolve as the application grows.

---

# 🧩 Technology Stack

## Web

* React
* JavaScript / TypeScript
* React Router
* Modern component-based UI architecture

## Mobile

* React Native
* JavaScript / TypeScript

## AI

VirtualMento uses AI to power conversational roleplay and feedback.

The AI layer is designed around:

* Scenario context
* Role definition
* Conversation state
* User responses
* AI responses
* Evaluation
* Feedback generation

## Shared Architecture

A shared package is used to keep common application information consistent across platforms.

Examples include:

* Scenario definitions
* Constants
* Configuration
* Shared types
* Common data structures

---

# 🧠 AI Roleplay Architecture

At a high level, a roleplay session follows this flow:

Scenario
   │
   ▼
Role Configuration
   │
   ▼
Conversation Context
   │
   ▼
User Response
   │
   ▼
AI Roleplay Response
   │
   ▼
Updated Conversation State
   │
   ├───────────────┐
   │               │
   ▼               ▼
Continue       End Session
                   │
                   ▼
             AI Evaluation
                   │
                   ▼
               Feedback


The AI system is separated conceptually into two major responsibilities:

### 1. Roleplay Engine

Responsible for maintaining the conversation and behaving according to the selected scenario.

### 2. Evaluation Engine

Responsible for analyzing the completed interaction and generating useful feedback.

Keeping these responsibilities conceptually separate makes the system easier to extend and maintain.

---

# 🖥️ Web Application

The web application provides the browser-based VirtualMento experience.

Typical responsibilities include:

* Landing page
* Authentication
* Scenario discovery
* Roleplay configuration
* Conversation interface
* Results and feedback
* User profile
* Progress/history

The web application is intended to provide a rich experience suitable for desktop and larger screens.

---

# 📱 Mobile Application

The mobile application brings the same core VirtualMento experience to mobile devices.

The mobile application focuses on:

* Fast scenario selection
* Mobile-friendly roleplay
* Conversation experience
* Performance feedback
* Practice history

The mobile application shares common product definitions with the web application through the shared package.

---

# 🔗 Shared Package

The shared package exists to prevent duplication between the web and mobile applications.

Instead of maintaining separate versions of the same data:

Web
 └── scenario definitions

Mobile
 └── scenario definitions


VirtualMento aims for:

             Shared Package
             /             \
            /               \
         Web               Mobile


Potential shared resources include:

* Scenario metadata
* Difficulty levels
* Role definitions
* Constants
* Application configuration
* Shared types
* Validation rules
* Common utilities

This approach helps reduce inconsistencies between platforms.

---

# 🛠️ Local Development

## Prerequisites

Before developing VirtualMento, install the required development tools for the applications you intend to run.

Recommended tools include:

* Node.js
* npm
* Git
* React development environment
* React Native development environment for mobile development

---

## Clone the Repository

```bash
git clone https://github.com/AnuragYadav9219/pitchPilot

cd VirtualMento
```

---

## Install Dependencies

Install dependencies according to the repository's package-manager configuration.

For example:

```bash
npm install
```

---

## Start the Web Application

```bash
cd apps/web
npm run dev
```

The development server will provide the local URL in the terminal.

---

## Start the Mobile Application

```bash
cd apps/mobile
npm start
```

Then use the appropriate React Native development workflow for the target platform.

---

# 🔐 Environment Variables

Environment-specific configuration should not be committed to Git.

Create environment files according to the application's requirements.

Example:

```env
API_URL=
AI_API_URL=
AUTH_SECRET=
```

> Never commit API keys, authentication secrets, database credentials, or other sensitive values to the repository.

For the complete environment-variable reference, see:

`docs/13-environment-variables.md`

---

# 🧪 Testing

Testing is an important part of maintaining VirtualMento as the project grows.

Testing should cover:

* UI components
* User flows
* Authentication
* Scenario selection
* Roleplay sessions
* AI responses
* Evaluation logic
* API communication
* Shared package functionality

Detailed testing documentation will be maintained in:

`docs/14-testing.md`

---

# 🚢 Deployment

VirtualMento is designed to support independent deployment of its applications and backend infrastructure.

The deployment architecture may include:

                Internet
                   │
        ┌──────────┴──────────┐
        │                     │
      Web                   Mobile
        │                     │
        └──────────┬──────────┘
                   │
                Backend
                   │
             ┌─────┴─────┐
             │           │
             ▼           ▼
          Database       AI


Deployment-specific instructions will be maintained in:

`docs/15-deployment.md`

---

# 📚 Documentation

Detailed documentation is available inside the `docs/` directory.

| Document                      | Description                 |
| ----------------------------- | --------------------------- |
| `01-overview.md`              | Project overview and vision |
| `02-features.md`              | Product features            |
| `03-architecture.md`          | System architecture         |
| `04-project-structure.md`     | Repository structure        |
| `05-frontend.md`              | Web frontend                |
| `06-mobile.md`                | Mobile application          |
| `07-shared-package.md`        | Shared package              |
| `08-ai-system.md`             | AI roleplay and evaluation  |
| `09-api.md`                   | API documentation           |
| `10-data-model.md`            | Data structures and models  |
| `11-authentication.md`        | Authentication              |
| `12-development.md`           | Development workflow        |
| `13-environment-variables.md` | Environment configuration   |
| `14-testing.md`               | Testing strategy            |
| `15-deployment.md`            | Deployment                  |
| `16-contributing.md`          | Contribution guidelines     |
| `17-roadmap.md`               | Future development          |

---

# 🗺️ Roadmap

VirtualMento is being developed incrementally.

### Phase 1 — Foundation

* [x] Project concept
* [x] Product direction
* [x] Challenge approval
* [ ] Repository architecture
* [ ] Shared package
* [ ] Web foundation
* [ ] Mobile foundation

### Phase 2 — Core Product

* [ ] Authentication
* [ ] Scenario system
* [ ] Roleplay engine
* [ ] Conversation UI
* [ ] AI integration
* [ ] Session management

### Phase 3 — AI Coaching

* [ ] Conversation evaluation
* [ ] Performance scoring
* [ ] Personalized feedback
* [ ] Improvement recommendations
* [ ] Practice history

### Phase 4 — Platform Expansion

* [ ] Advanced scenarios
* [ ] User progress tracking
* [ ] Personalized practice
* [ ] Additional communication domains
* [ ] Improved AI evaluation
* [ ] Advanced analytics

> The roadmap is intentionally iterative and may change as the product evolves.

---

# 🏆 Beanstalk Challenge

VirtualMento was approved for the **Beanstalk Challenge**, providing an opportunity to develop and present the project in a real-world product-building environment.

The project is being developed with the goal of creating something beyond a simple AI chatbot: a structured platform focused on **practice, simulation, evaluation, and improvement**.

---

# 🤝 Contributing

Contributions are welcome.

Before making changes:

1. Create a branch for your work.
2. Keep changes focused.
3. Follow the project's existing coding conventions.
4. Test your changes.
5. Update documentation when behavior or architecture changes.
6. Open a pull request with a clear description.

See:

`docs/16-contributing.md`

for the complete contribution workflow.

---

# 📄 License

License information will be added when the project's licensing decision is finalized.

---

# 👨‍💻 Project

**VirtualMento**

AI-powered roleplay and communication practice platform.

Built with a focus on:

**Practice → Simulation → Feedback → Improvement**

---

<p align="center">
  Built with ❤️ for better communication through practice.
</p>
