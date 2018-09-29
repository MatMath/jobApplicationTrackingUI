# Getting Started
Front-end UI for the the Job tracking app.

### Why/What
Job application tracking can get tedious with applying on different websites, different company, location, and many recruiters that all propose something... So instead of putting everything in a Excel file I wanted to regroup everything.

### Tech Stack
##### (BE)[https://github.com/MatMath/jobApplicationTracking]:
- Auth with Passport (google-oauth2 & Local)
- Node/Express API
- MongoDB

##### FE This repo:
- Angular
- Bootstrap
- Rickshaw (for simple graph)

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build will be stored in the `dist/` directory.
Run `ng build -prod` flag for a production build.
Move the dist folder to the backend dist folder so it can be serve & secured.

### Graph:
I tried D3 directly but it is way too much trouble to build simple Line/Bar/Scatter/Geo graph. So I will move to a wrapper on top called Rickshaw.
