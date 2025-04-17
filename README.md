# Hi-Tech Steels Angular 19 Website

This is a modern, responsive Angular 19+ website for Hi-Tech Steels with smooth scrolling animations and interactive elements.

## Features

- Responsive design for all devices
- Smooth scrolling between sections
- Modern animations and transitions
- Interactive product cards with 3D hover effects
- Custom cursor follower (desktop only)
- Animated counters
- Loading screen
- Mobile-friendly navigation
- Theme customization

## Prerequisites

- Node.js (v18+)
- Angular CLI (v19+)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/hi-tech-steels.git
cd hi-tech-steels
```

2. Install dependencies:
```bash
npm install
```

3. Create placeholder images for development:
```bash
./create-placeholder-images.sh
```

4. Start the development server:
```bash
ng serve
```

5. Open your browser and navigate to `http://localhost:4200`

## Project Structure

This project uses Angular 19's standalone components approach, which is more modular and efficient than the traditional NgModule approach.

```
src/
├── app/
│   ├── components/
│   │   ├── about-us/
│   │   ├── categories/
│   │   ├── contact-us/
│   │   ├── counter/
│   │   ├── cursor-follower/
│   │   ├── customize-options/
│   │   ├── footer/
│   │   ├── gallery/
│   │   ├── header/
│   │   ├── loading/
│   │   ├── products/
│   │   └── top-header/
│   ├── directives/
│   │   ├── animation.directive.ts
│   │   └── hover-card.directive.ts
│   ├── services/
│   │   ├── animation.service.ts
│   │   ├── scroll.service.ts
│   │   └── theme.service.ts
│   ├── app.component.ts
│   
