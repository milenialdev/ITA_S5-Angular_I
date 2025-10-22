# onBoarding - Angular 20 Application

Interactive onboarding application built with Angular 20, featuring a multi-step carousel with animations and responsive design. This project demonstrates modern Angular patterns including standalone components, signals for state management, and a zoneless architecture.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have installed:

```
Node.js >= 18.x
npm >= 9.x
Angular CLI >= 20.x
```

### Installing

Clone the repository and enter the project folder:

```bash
git clone <your-repository-url>
cd onBoarding
```

Install dependencies:

```bash
npm install
```

To start the development server:

```bash
ng serve
```

You can access the app at `http://localhost:4200`.

## Project Architecture

### Overview

The application follows a **component-based architecture** with clear separation of concerns, using Angular 20's latest features including standalone components and signals for reactive state management.

```
┌───────────────────────────────────────┐
│         APP COMPONENT (Root)          │
│                                       │
│   ┌────────────────────────────────┐  │
│   │     HOME COMPONENT             │  │
│   │  (Smart/Container Component)   │  │
│   │                                │  │
│   │  - Injects Steps Service       │  │
│   │  - Manages data signal         │  │
│   │  - Passes data to child        │  │
│   │                                │  │
│   │  ┌──────────────────────────┐  │  │
│   │  │  ESCENA COMPONENT        │  │  │
│   │  │  (Presentational)        │  │  │
│   │  │                          │  │  │
│   │  │  - Receives steps input  │  │  │
│   │  │  - Manages navigation    │  │  │
│   │  │  - Handles animations    │  │  │
│   │  │  - User interactions     │  │  │
│   │  └──────────────────────────┘  │  │
│   └────────────────────────────────┘  │
│                                       │
│   ┌────────────────────────────────┐  │
│   │     STEPS SERVICE              │  │
│   │  (Data Provider)               │  │
│   │                                │  │
│   │  - Provides onboarding data    │  │
│   │  - Singleton pattern           │  │
│   └────────────────────────────────┘  │
└───────────────────────────────────────┘
```

### Component Hierarchy

#### **App Component** (Root)
- Entry point of the application
- Loads the Home component

#### **Home Component** (Smart/Container)
- **Responsibility:** Data management and service integration
- **Features:**
  - Injects the Steps service using `inject()`
  - Stores onboarding steps in a signal
  - Acts as intermediary between service and presentation layer
- **Type:** Smart/Container component

#### **Escena Component** (Presentational)
- **Responsibility:** UI rendering and user interaction
- **Features:**
  - Receives steps data via `input()` signal
  - Manages current step navigation with signals
  - Handles animation states
  - Provides navigation methods (next, previous, goToStep)
  - Renders step content dynamically

#### **Steps Service**
- **Responsibility:** Data provision
- **Features:**
  - Provides hardcoded onboarding step data
  - Returns array of IStep objects
  - Singleton service (`providedIn: 'root'`)

### Data Flow

```
Steps Service (getSteps())
      ↓
Home Component (data signal)
      ↓ [steps] input
Escena Component (renders UI + handles navigation)
```

### Technology Stack

#### **Core Technologies**
- **Angular 20** - Latest version with zoneless support
- **TypeScript** - Strict type checking enabled
- **RxJS** - Reactive programming (minimal usage)
- **CSS3** - Custom animations and responsive design

#### **Angular 20 Modern Features Used**

1. **Standalone Components**
   - No NgModules required
   - Direct imports in components

2. **Signals**
   - `signal()` for reactive state
   - `input()` for component inputs
   - `computed()` ready for derived state

3. **Zoneless Architecture**
   - No Zone.js in production
   - Better performance

4. **Control Flow Syntax**
   - `@if` instead of `*ngIf`
   - `@for` instead of `*ngFor`
   - Improved readability

### State Management

The application uses **Angular Signals** for state management:

```typescript
// Component-level state
currentStep = signal(0);                    // Current active step index
directionAnimation = signal<'left' | 'right'>('right');  // Animation direction
showContent = signal(true);                 // Content visibility

// Service-level state
data = signal(this.steps.getSteps());      // Onboarding steps data
```

### Key Design Patterns

1. **Container/Presentational Pattern**
   - Home = Container (manages data)
   - Escena = Presentational (renders UI)

2. **Dependency Injection**
   - Services injected using `inject()` function
   - No constructor injection

3. **Reactive State**
   - Signals for automatic UI updates
   - Unidirectional data flow

## Folder Structure

```
src/
├── app/
│   ├── app.ts                    # Root component
│   ├── app.html                  # Root template
│   ├── escena/
│   │   ├── escena.ts             # Presentation component
│   │   ├── escena.html           # Step carousel template
│   │   ├── escena.css            # Step styles + animations
│   │   └── escena.spec.ts        # Component tests
│   ├── home/
│   │   ├── home.ts               # Container component
│   │   ├── home.html             # Container template
│   │   ├── home.css              # Container styles
│   │   └── home.spec.ts          # Component tests
│   ├── services/
│   │   ├── steps.ts              # Steps data service
│   │   └── steps.spec.ts         # Service tests
│   └── models/
│       └── istep.interface.ts    # Step data interface
├── assets/
│   ├── time_management.svg       # Step 1 illustration
│   ├── programming.svg           # Step 2 illustration
│   └── meditation.svg            # Step 3 illustration
└── main.ts                       # Application bootstrap
```

## Data Model

### IStep Interface

```typescript
export interface IStep {
  title: string;        // HTML string with step title
  description: string;  // HTML string with step description
  img: string;          // Path to step illustration
  bgcolor: string;      // Hex color for card background
}
```

### Example Step Object

```typescript
{
  title: '<h3>Dedica moltes hores</h3>',
  description: 'Un mínim de 30 hores a la setmana...',
  img: '/assets/time_management.svg',
  bgcolor: '#4ca2a8'
}
```

## Usage Examples

### Basic Usage

The application runs automatically when you execute `ng serve`. Users can:

1. **Navigate forward:** Click the right arrow button (→)
2. **Navigate backward:** Click the left arrow button (←)
3. **Jump to step:** Click on any indicator dot at the bottom
4. **View content:** Each step displays:
   - Illustration with colored background
   - Title (HTML formatted)
   - Description (HTML formatted)

### Component Integration Example

If you want to integrate the Escena component in another part of your application:

```typescript
// parent.component.ts
import { Component, signal } from '@angular/core';
import { Escena } from './escena/escena';
import { IStep } from './models/istep.interface';

@Component({
  selector: 'app-parent',
  imports: [Escena],
  template: `<app-escena [steps]="mySteps()"></app-escena>`
})
export class ParentComponent {
  mySteps = signal<IStep[]>([
    {
      title: '<h3>Custom Step</h3>',
      description: 'Your custom content here',
      img: '/path/to/image.svg',
      bgcolor: '#ff6b6b'
    }
  ]);
}
```

### Adding New Steps

To add more onboarding steps, edit `src/app/services/steps.ts`:

```typescript
getSteps(): IStep[] {
  return [
    // Existing steps...
    {
      title: '<h3>Your New Step</h3>',
      description: 'Your description here',
      img: '/assets/your-image.svg',
      bgcolor: '#your-color'
    }
  ];
}
```

### Customizing Animations

Animation timing can be adjusted in `escena.ts`:

```typescript
// Change animation duration (default: 50ms)
setTimeout(() => {
  this.currentStep.update(value => value + 1);
  this.showContent.set(true);
}, 50);  // Modify this value
```

CSS animations are defined in `escena.css`:

```css
@keyframes slide-in-right {
  from {
    transform: translateX(100%); 
    opacity: 0;                
  }
  to {
    transform: translateX(0);  
    opacity: 1;
  }
}

.slide-in-right {
  animation: slide-in-right 0.4s ease-out;  /* Modify duration here */
}
```

## Running the Tests

The project includes comprehensive unit tests for all components and services.

### Execute All Tests

```bash
ng test
```

This will open Karma in Chrome and run all test suites.

### Test Coverage

The project includes **17 tests** covering:

#### Steps Service (4 tests)
```bash
✓ should be created
✓ should return array with specific length
✓ should have correct structure
✓ should have correct bgcolor for first step
```

#### Home Component (4 tests)
```bash
✓ should create
✓ should have data signal that returns an array
✓ should have 3 steps in data
✓ should have correct structure in data steps
```

#### Escena Component (9 tests)
```bash
✓ should create
✓ should start at step 0
✓ should increment currentStep when calling nextStep
✓ should decrement currentStep when calling previousStep
✓ should not go below 0 when calling previousStep at first step
✓ should not go above last step when calling nextStep at last step
✓ should go to specific step when calling goToStep
✓ should set animation direction to right when going forward
✓ should set animation direction to left when going backward
```

### Testing Approach

The project uses **async/await pattern** for testing asynchronous code:

```typescript
it('should increment currentStep when calling nextStep', async () => {
  component.nextStep();
  await new Promise(resolve => setTimeout(resolve, 60));
  expect(component.currentStep()).toBe(1);
});
```

This approach is compatible with Angular's zoneless architecture and doesn't require Zone.js for testing.

### Test Configuration

Tests are configured for **zoneless** environment:

```typescript
TestBed.configureTestingModule({
  imports: [ComponentName],
  providers: [provideZonelessChangeDetection()]
});
```


## Built With

* [Angular 20](https://angular.dev/) - Web framework
* [TypeScript 5.6](https://www.typescriptlang.org/) - Programming language
* [Jasmine](https://jasmine.github.io/) - Testing framework
* [Karma](https://karma-runner.github.io/) - Test runner

## Development Tools

* [Angular CLI 20](https://angular.dev/cli) - Project scaffolding and build
* [ESLint](https://eslint.org/) - Code linting
* [Prettier](https://prettier.io/) - Code formatting (optional)

## Authors

* **Carlos Benito** - [milenialdev](https://github.com/milenialdev)

## Acknowledgments

* ImageColorPicker for allowing to pick the exact color of a picture: (https://imagecolorpicker.com/es)
* Angular team for the excellent documentation

## License

This project is developed as part of IT Academy's frontend bootcamp curriculum.

## Improvements

* Add accessibility improvements (ARIA labels, focus management)
* Using Tailwind or SASS instead of CSS for the web layout