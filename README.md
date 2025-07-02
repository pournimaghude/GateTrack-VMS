## Project Title - GateTrack-VMS
**Intelligent Gate Entry Tracker Software** For secure, fast, and trackable vehicle movement.

## 👩‍💻 Author  
**Developed by:** Pournima Ghude

[![GitHub Logo](https://img.icons8.com/ios-filled/30/000000/github.png)](https://github.com/pournimaghude/GateTrack-VMS)
**[View Project on GitHub](https://github.com/pournimaghude/GateTrack-VMS)**

<br>

[![LinkedIn Logo](https://img.icons8.com/color/30/000000/linkedin.png)](https://www.linkedin.com/in/pournima-ghude)
**[Connect with me on LinkedIn](https://www.linkedin.com/in/pournima-ghude)**

## Project Status 
**✅ Fully Developed 💻 Deployed on local & internal network  📈 Improved gate security and data traceability**

## Description
- GateTrack-VMS is a real-time vehicle entry management system built to assist security guards in tracking, recording, and controlling vehicle movements at the gate.
- It is an intelligent vehicle management software developed to streamline and secure gate entry operations within organizational premises.
- This application enables real-time tracking of vehicle movements, ensuring accurate recording of in-time, out-time, and duration inside the premises.
- It supports location-wise user login, automated record storage, and seamless data export for reporting and analysis.
- GateTrack-VMS has been solely developed by Ms. Pournima Ghude, utilizing a modern tech stack including JavaScript, Node.js, Express.js, SQL-SERVER, and more.
- The software is optimized for both desktop and mobile usage, enhancing gate security and operational efficiency across all departments.

## Key Features
- **Real-time vehicle in/out tracking**
- **Gate-wise login (e.g., A1/A2)**
- **Export filtered records to Excel**
- **Date-wise filtering and reporting**
- **Fast, Secure, and Trackable operations**
- **Intelligent duration calculation & storage**
- **Separate management of company vehicles & regular vehicles**
- **Vehicle search and dynamic filtering**
- **Daily/monthly summary with vehicle count**
- **Secure database access with location-based entries access**
- **Mobile responsive layout for guards**

## Purpose
- The main goal of the project is to build a web-based software application that simplifies the process of vehicle entry and exit tracking.
- The purpose of this project is to develop a software application that efficiently manages the entry and exit of vehicles at a factory gate.
- to improve gate security, ensure accurate data collection, and make the entire vehicle entry process faster, easier, and more reliable for security personnel.

## Technologies Used

| Frontend                     | Backend                 | Database | Tools & Utilities        |
|-----------------------------|--------------------------|----------|--------------------------|
| HTML - CSS        | Node.js        |  SQL-SERVER    | VS Code |
JavaScript | Express.js     | JSON Server(for Testing-purpose) |  Postman(API-Testing)|


##  Features

-  Fast and secure vehicle check-in/check-out
-  Role-based guard entry access
-  Daily entry and export reports
-  Realtime searchable vehicle data
-  Built with practical, industry-oriented tools

## 📸 Screenshots

| Screenshot Name                       | Screenshot                                                                                                         | Description                                                                               |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| **Login Page**                        | ![Login Page](https://github.com/user-attachments/assets/6c20f8ac-b417-4a38-9ca0-892303ef3ce5)                     | Secure login using a valid username and password.                                         |
| **Signup Page**                       | ![Signup Page](https://github.com/user-attachments/assets/696fbe1b-3929-4b67-95d8-676474520498)                    | New users can register with details like name, email, password, and gate location.        |
| **Vehicle Registration**              | ![Registration](https://github.com/user-attachments/assets/6b1e32d0-30fb-437b-966b-c4745631bc8c)                   | Enter vehicle number, owner name, department, designation, and employee ID for new entry. |
| **Dashboard**                         | ![Dashboard](https://github.com/user-attachments/assets/a26c6d3d-ea1f-408a-a2b4-bf4b76b2bd25)                      | Displays in/out times with calculated durations of parked vehicles.                       |
| **Logged-In User Info**               | ![Mobile View](https://github.com/user-attachments/assets/9ea3d32b-1022-4873-baf6-08c1cc3ef4a1)                    | Shows the current user login and assigned gate location.                                  |
| **Invalid Vehicle Search Validation** | ![search-vehicle](https://github.com/user-attachments/assets/347bea43-ebf4-4abf-8772-f8d7211e7bee)                 | Alerts when entering less than 4 digits of a vehicle number.                              |
| **Valid Vehicle Search**              | ![search-vehicle](https://github.com/user-attachments/assets/0fb8be76-e895-4209-8f8a-d017bfff394e)                 | Entering last 4 digits fetches owner info and sets in time/date automatically.            |
| **Guard Selection Validation**        | ![Mark Out](https://github.com/user-attachments/assets/2412905b-bb16-43b4-94c0-fb6240241de6)                       | System asks to select a guard before submitting an entry.                                 |
| **Daily Entries Table**               | ![daily-entries](https://github.com/user-attachments/assets/78a14486-745b-4213-a60b-ca8947f63b4a)                  | Shows current in-vehicles with out button, guard, and timestamps.                         |
| **Mark Vehicle Out**                  | ![out-vehicle](https://github.com/user-attachments/assets/cab19c85-8108-4ab7-b2ac-3250cd60dfed)                    | Process to search and mark a vehicle out of the company.                                  |
| **Confirmation Before Out**           | ![validation](https://github.com/user-attachments/assets/4cf4d7ed-67ff-430e-81c2-603dfc04c9d6)                     | Prompt asking confirmation before marking vehicle as OUT.                                 |
| **Guard Not Selected Validation**     | ![validation](https://github.com/user-attachments/assets/fa89b88d-eb9f-4cad-9368-7bcd047a44f9)                     | Warning if trying to mark OUT without selecting a guard.                                  |
| **Gate Access Restriction**           | ![Mobile View](https://github.com/user-attachments/assets/530250cc-6c89-4af6-9cd3-ce57c5938914)                    | Restricts marking out if the logged-in user belongs to another gate.                      |
| **Entry Stored After Out**            | ![entry-stored](https://github.com/user-attachments/assets/a93e13f6-0d94-4497-8127-db536fe3649a)                   | After marking OUT, entry is moved to permanent table.                                     |
| **Company Vehicle Entry**             | ![searching](https://github.com/user-attachments/assets/d8da6fcf-70d3-48e3-9838-52f1815d9a50)                      | If owner name is “COMPANY VEHICLE”, special handling is applied.                          |
| **Company Vehicle Handling**          | ![Mobile View](https://github.com/user-attachments/assets/c1dbd63d-e711-4d28-872b-0e683ed2ee5c)                    | Company-owned vehicles are stored in a separate table.                                    |
| **Company Vehicle Entries Table**     | ![Complete vehicle entries Table](https://github.com/user-attachments/assets/88a890ae-f4e1-4d52-94b3-2996afaa0315) | Table showing entries of all company vehicles with remarks.                               |
| **Master Data Tab**                   | ![Master Data](https://github.com/user-attachments/assets/d8727ddc-ad9e-4f27-aa7e-70e409b72e57)                    | Tab containing employee and company vehicle data.                                         |
| **Employee Vehicle Details**          | ![Master Data](https://github.com/user-attachments/assets/f7fcc5ea-a197-44fe-bb08-3acccc36e5d5)                    | Contains emp ID, vehicle number, designation, etc.                                        |
| **Vehicle Entries Tab**               | ![vehicle entries](https://github.com/user-attachments/assets/58276cd2-adc2-45c3-8a6d-dc6e727eb492)                | Complete history of vehicle movements.                                                    |
| **Vehicle Entries Table View**        | ![Vehicle table](https://github.com/user-attachments/assets/4b6025a4-fb13-4d05-8b31-04239d7fa87e)                  | Shows all entries with duration, filtering, and export options.                           |
| **Company Vehicle Entries Tab**       | ![Company Vehicles](https://github.com/user-attachments/assets/22164799-11f9-4cbf-9204-a51a73590912)               | Tab specifically for company-owned vehicles.                                              |
| **Complete Company Vehicle Table**    | ![Complete vehicle entries Table](https://github.com/user-attachments/assets/31fc2927-77eb-4739-8dd0-011293b6d7d5) | Contains detailed remarks for company vehicle usage.                                      |
| **Mobile View**                       | ![Mobile View](https://github.com/user-attachments/assets/990173ab-a17b-4a27-9ab1-5447d489f217)                    | Fully responsive UI optimized for mobile screen sizes.                                    |















