# TravelTrucks

TravelTrucks is a web application for renting campers. This project is the frontend part of the application, built with Next.js and TypeScript. The application allows users to browse available campers, view detailed information, read reviews, and make bookings.

The frontend uses a ready-made backend API for camper listings:
https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers

Documentation is available here: https://github.com/mockapi-io/docs/wiki

## Features

Pages

- Home Page (/): Contains a main banner with a call-to-action button "View Now" that navigates to the catalog page.

- Catalog Page (/catalog):
  - Displays all available campers.
  - Filtering by location, camper type, and additional features (AC, kitchen, etc.).
  - Add campers to favorites list.
  - Load more campers with backend pagination.

- Camper Details Page (/catalog/:id):
  - Shows detailed description, photo gallery, user reviews, and booking form.
  - Default tab: Features; switchable to Reviews.
  - Features: transmission, engine, AC, bathroom, kitchen, TV, radio, refrigerator, microwave, gas, water.
  - Details: form, length, width, height, tank, consumption.

## Technology Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- State Management: Zustand
- HTTP Requests: Axios
- Styling: Any CSS library (CSS Modules, styled-components, MUI, etc.)
- Component Approach: DRY principle applied, clean and commented code.

## Routing

- / – Home Page
- /catalog – Catalog Page
- /catalog/:id – Camper Details Page

## Installation

```bash
git clone <repository-url>
cd traveltrucks-frontend
npm install
```

## Running Locally

```bash
npm run dev

```

Open http://localhost:3000 to view the application.

## Building for Production

```bash
npm run build
npm start

```
