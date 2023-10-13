## Task: "MediTrack" - A Personal Medical History Tracking Web Application

### Overview

Develop "MediTrack", a web application where users can store and retrieve their medical history, ensuring easy access during doctor visits, emergencies, or any situation requiring medical attention. Users should be able to register, log in, and manage their medical history, including details of their previous medical conditions, surgeries, allergies, and ongoing medications.

### Features

#### 1. User Registration and Authentication

- **Registration**: Users can sign up using their email and password.
- **Login**: Existing users can log in.
- Ensure secure authentication and authorization using best practices.

#### 2. Medical History Management

- **Add Medical History**: Authenticated users should be able to add entries to their medical history, such as:
  - Medical conditions/diagnoses
  - Surgeries or procedures undergone
  - Allergies
  - Medications
  - Attachments (like medical reports, prescriptions, etc.)
- **View Medical History**: Authenticated users should be able to view their entered medical history.
- **Update & Delete Entries**: Users should be able to update or delete specific entries in their medical history.

### Technical Requirements

#### Frontend (React.js)

- **Pages**:
  - **Registration Page**
  - **Login Page**
  - **Dashboard**: Display an overview of the user’s medical history.
  - **Detailed View Page**: For viewing, updating, or deleting specific medical history entries.
  - **Add Entry Page**: A form page that allows users to add new entries to their medical history.
- **State Management**: Use Redux / Context API / other solution / no state management if not needed.
- **Routing**: Implement routing with NextJS (app / page).

#### Backend (Next.js)

- **API Routes**:
  - **/api/register**: For new user registration.
  - **/api/login**: For user login.
  - **/api/medical-history**: POST to add a new entry and GET to retrieve all entries.
  - **/api/medical-history/[id]**: GET a single entry, PUT to update an entry, DELETE to remove an entry.
- **Database**: Choose a database suitable for storing user and medical history data.
- **Authentication**: Use secure methods like bcrypt for password hashing and jsonwebtoken for token management.

### Bonus Points

- Implement a feature to share a readable version of the medical history via a secure, temporary link.
- Add a feature to export the medical history as a PDF.
- Add multi-language support or accessibility features.
- Implement custom error pages (e.g., 404 Page).
- Implement responsive design for mobile users.

### Expected Submission

- Source code repository.
- A README file that includes:
  - Setup and installation instructions.
  - A brief discussion of your design choices and what you might do differently with more time.

### Evaluation Criteria

- **Functionality**: Is the application functioning as intended?
- **Code Quality**: Is the code readable, clean, and well-organized?
- **UI/UX**: Is the user interface intuitive and visually appealing?
- **Security**: How securely is the user and medical data handled?
- **Error Handling**: How does the application handle potential issues?

### Note

- Prioritize core functionalities and a solid foundation.
- Use libraries and tools that you are comfortable with or find best fit the problem.
- Keep the UI simplistic and focus more on the application’s functionality and data management, given the sensitive nature of the data being handled.
