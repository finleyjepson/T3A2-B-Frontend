# T3A2-A + T3A2-B - Anime Event and Screening Scheduler
Created by Finley, Thomas and Jon

Deployed website: https://t3-a2-b-frontend-dl3h.vercel.app/

## Description

[Github Repository](https://github.com/finleyjepson/T3A2-A)

### Purpose

The purpose of our app and website is to provide a comprehensive platform for both anime enthusiasts and Madman Entertainment, an Australian distribution and rights management company, to discover, engage with and organise anime-related events. Our platform is designed to facilitate anime screenings, streamline event organisation and enhance engagement within the anime community.

### Functionality / Features

- **User authentication:** Login and registration system where users can create accounts and access the platform.
- **Organiser accounts:** Flag certain user accounts as organisers, granting them privileges to create and manage event listings.
- **Event listings:** Provides a list of upcoming anime events and screenings, including details such as date, time, location, and a description.
- **Event calendar:** Users can view events displayed on a calendar, making it easier to plan their schedules.
- **Event RSVP:** Allows users to RSVP to events they are interested in attending, providing organisers with insights into the attendance.
- **Searching and filtering:** Allows users to easily find events based on criteria such as anime title, location and dates.
- **Map integration:** Integrates maps to display event locations, helping users to navigate and find venues easily.

### Target Audience

- **Anime fans and interested individuals:** The app caters to those who have an interest in anime culture and includes the most dedicated enthusiasts to those who are simply wanting to know more about anime. It is intended for fans across any genre, series or character. 

- **Madman Entertainment and event organisers:** The app is intended for the client, as well as other verified organisers, to promote, advertise and garner interest in anime-related events, such as screenings, film festivals, marathons, meet-ups and conventions.  

### Tech Stack

- **Database:** [MongoDB](https://www.mongodb.com/) and [AWS](https://aws.amazon.com/)
- **Backend:** [Express](https://expressjs.com/) and [Node.js](https://nodejs.org/) 
- **Frontend:** [React](https://react.dev/), [tailwindcss](https://tailwindcss.com/)
- **Object Data Modeling (ODM) library:** [Mongoose](https://mongoosejs.com/) 
- **Dataflow Diagrams:** [draw.io](https://www.drawio.com/)
- **Wireframes, Architecture Diagram:** [Figma](https://www.figma.com/) 
- **Project management:** [Trello](https://trello.com/) 
- **Collaboration/communication:** [Discord](https://discord.com/) 

## Data Flow Diagram

### Legend

- **External Entity -** These are entities that interact with the system but are not part of the system, eg. users.
- **Process -** These are the processes that occur within the system, eg. user authentication.
- **Data Store -** These are the data stores that hold data within the system, eg. databases.

![Legend](./docs/DataFlowDiagram/legend_diagram.drawio.png)

### Overview

![Data Flow Diagram](./docs//DataFlowDiagram/overview_diagram.drawio.png)

### Events

The user will be able to view a list of upcoming events and screenings. The events will be displayed in a list format and will include details such as the event name, date, time, location, and a description. The user will also be able to view events on a calendar, making it easier to plan their schedules. The user will be able to RSVP to events they are interested in attending, providing organisers with insights into the attendance. The user will also be able to easily search and filter events based on criteria such as anime title, location and dates. They will also be able to view event locations on an embedded map, helping them to navigate and find venues easily.

Organisers will be able to create and manage event listings. They will be able to add an event name, state, category, date, venue, information.

![Events](./docs/DataFlowDiagram/events_diagram.drawio.png)

### Login/Registration

The user will be able to access the platform logging in with their username and password. If the user does not have an account, they can register and create a new account. 

Organisers can access the platform by logging in with their username and password. If the organiser does not have an account, they can register and create a new account. The account will need to be flagged as an organiser by an admin.

![Login/Registration](./docs/DataFlowDiagram/login_diagram.png)

### Profile Picture Upload

The user will be able to upload a profile picture to their account by selecting an image file from their device. The image image will be uploaded to the AWS storage and a URL will be sent back to then be stored in the user's account in the users collection in the database.

![Profile Picture Upload](./docs/DataFlowDiagram/image_upload.drawio.png)

## Application Architecture Diagram

![Application Architecture Diagram](./docs/AppArchitectureDiagram/app_architecture_diagram.png)

### Frontend

The Apps frontend is built using the React JavaScript library.
It is responsible for creating an interface for the user to interact with the application. It will be responsible for rendering the user interface, handling user input, and making requests to the backend server.

### Backend

The backend of the application is built using the Express framework for Node.js. It is responsible for handling requests from the frontend, interacting with the database, and returning responses to the frontend.

### Database

The database for the application is built using MongoDB & AWS. It is responsible for storing all the data for the application, including user accounts, event listings, and profile pictures(AWS). The database will be accessed by the backend server via the Mongoose ODM.

## User Stories
#### Written 14th February 2024
- As a user, I want to create an account on the platform, so that I can access upcoming anime events and screenings.
- As an event organiser, I want to have privileges to create and manage event listings, so that I can effectively organise events.
- As a user, I want to view a list of upcoming events, so that I can find events that interest me.
- As a user, I want to view events on a calendar, so that I can plan my schedule more effectively.
- As a user, I want to RSVP to events I plan to attend, so that I can indicate my interest and help organisers gauge attendance.
- As a user, I want to easily search and filter events by criteria like anime title, location, and date, so that I can find events that match my preferences.
- As a user, I want event locations displayed on an embedded map, so that I can find venues easily.

#### Revised and added on 15th February 2024
- As a user, I want to be able to log out of my account, so that my account is protected when I am not longer using it.
- As a user, I want to upload a picture to my profile, so that I can customise my profile.
- As a user, I want to add my top 5 favourite animes, so that I can customise my profile.
- As a user, I want to add my favourite characters, so that I can customise my profile.
- As an event organiser, I want to be able to add an event name, state, category, date, venue, information and upload a photo, so that I can provide event information for patrons for my created event.

## Wireframes
### Log in/sign up flow
- The first page a user will see is the home page which will contain a number of components that are not dependent on the user being logged in. From this page a user can choose to sign up or log in to an existing account.

- Upon signing up or logging in, a user will then have access to their profile screen and can make customisations such as adding in a profile picture, adding in their top 5 anime/characters as well as viewing any upcoming events they have RSVP'd to.

![Log in flow](./docs/Wireframe/login-signup-flow.png)

### App flow
- From the home page, users will be presented with a calendar widget showing the current month and any events that are scheduled will be highlighted within this calendar. Additionally, a list view of the upcoming events will be shown to the user.

- Clicking onto an event from the calender or upcoming events widget will take the user directly to the event information page where they can log their interest in the event by clicking 'Interested' or 'Not for me'.

- The navigation bar will have an 'All events' link which will take the user to the events landing page. This page will contain a list of all the events posted to the platform and will have filter options giving users the ability to find events that fit their criteria.

- Clicking onto any events on the event landing page will direct users to the event page where all the event information will be shown. Users can RSVP from this page.

- The navigation bar will have a 'Create event' link which will only be available to authorised users (i.e. users who have been flagged as 'Organisers' by the Admins) and will take the user to a form allowing them to create a new event listing or edit an existing listing if it already exists. Once the event is published it will appear on the platform and will be available for users to view.

![App flow](./docs/Wireframe/app-flow3.png)

### Home page - Content prioritisation

- The application's first and foremost goal is to be intuitive and easy for the user to decide whether or not they would like to attend an event. Given this purpose: 
    1. The first priority that a user would like to see would be a calendar so the user could quickly check whether or not any event timings would fit into their schedule. 
    1. The second priority would be a written list of upcoming events which would provide more information such as the type of event happening (anime movie screening, anime episode marathon, meet & greet, anime convention) and the location in an attempt to further catch the user's interest.
    1. The third priority would be a list of upcoming animeswhich would also serve as a way to catch the user's interest.
    1. The fourth priority would be an weekly poll that would serve to drive engagement and give the organiser's some feedback as to what events the users would like to see next.

- This application is being built following the 'mobile-first' concept, and hence the order of the components follows our specified priority in mobile view. In desktop and tablet mode, the device will have additional screen space and hence priority 3 and 4 items are pushed to the sidebar.
![Home page content prioritisation](./docs/Wireframe/homepage-priority.png)

### Event page - Content prioritisation
- Upon entering the event page our content is laid out based on the following justifications:
    1. The user will need confirmation of the anime event they would like to attend, hence priority #1 is the anime name and title screen.
    1. The user will need more information about the event such as the location, the event type, the date and any other pertinent information hence priority #2 is the information box
    1. The RSVP buttons are priority #3 and act as a call to action for the user to log their interest in the event. It has been placed high up in the event page so that the user is instantly reminded that they can RSVP to the event.
    1. The maps view is priority #4 which is an addition to the information box. Users may already be familiar with the location and hence the maps widget ranks lower in terms of priority.

- Much like the home page, our content in mobile view reflects our specified order of priority in a vertical layout, whilst in desktop/tablet view the components are nested next to each other due to the increased screen availability.
![Event page content prioritisation](./docs/Wireframe/eventpage-priority.png)

### Wireframes
- Login and sign up screens
![Login and sign up screens](./docs/Wireframe/login-signup-screens.png)

- Mobile view
![Mobile view](./docs/Wireframe/mobile-view2.png)

- Desktop view
![Desktop view](./docs/Wireframe/desktop-view3.png)

- Tablet view
![Tablet view](./docs/Wireframe/tablet-view2.png)

## Trello Board

Link: https://trello.com/b/dn7mOQ1I/finley-thomas-jon-t3a2

Our team decided to utilise [Trello](https://trello.com/) for the project management and planning methodology. Each task was delegated an owner, as represented by the profile photos in the bottom right of each card. Each card also had a start date and desired completed date that gave enough lead time.

For Part A of the assessment, 2024-02-12 marked the first day of planning and delegating tasks. Screenshots of the Trello board were taken daily at approximately 5pm, besides 2024-02-13 where no significant changes were made and on 2024-02-17 when two screenshots were taken as significant progress was made from morning to evening.

- 2024-02-12
![Trello Board - 2024-02-12](./docs/Trello/trello-12-feb.png)

- 2024-02-14
![Trello Board - 2024-02-14](./docs/Trello/trello-14-feb.png)
![Trello Board - 2024-02-14](./docs/Trello/trello-14-feb-wireframe.png)

- 2024-02-15
![Trello Board - 2024-02-15](./docs/Trello/trello-15-feb.png)

- 2024-02-16
![Trello Board - 2024-02-16](./docs/Trello/trello-16-feb.png)

- 2024-02-17 (Morning)
![Trello Board - 2024-02-17 - Morning](./docs/Trello/trello-17-feb-morning.png)

- 2024-02-17 (Evening)
![Trello Board - 2024-02-17 - Evening](./docs/Trello/trello-17-feb-evening.png)

For Part B of the assessment, 2024-02-20 marked the first day of planning and delegating tasks. Similar to Part A, screenshots were taken daily, besides 2024-02-25 where no significant changes were made, and on 2024-02-26 when two screenshots were taken due to significant progress from morning to afternoon.  

- 2024-02-20
![Trello Board - 2024-02-20](./docs/Trello/trello-20-feb.png)

- 2024-02-21
![Trello Board - 2024-02-21](./docs/Trello/trello-21-feb.png)

- 2024-02-22
![Trello Board - 2024-02-22](./docs/Trello/trello-22-feb.png)

- 2024-02-23
![Trello Board - 2024-02-23](./docs/Trello/trello-23-feb.png)

- 2024-02-24
![Trello Board - 2024-02-24](./docs/Trello/trello-24-feb.png)

- 2024-02-26 (Morning)
![Trello Board - 2024-02-26 - Morning](./docs/Trello/trello-26-feb-morn.png)

- 2024-02-26 (Afternoon)
![Trello Board - 2024-02-26 - Afternoon](./docs/Trello/trello-26-feb-arvo.png)

- 2024-02-27
![Trello Board - 2024-02-27](./docs/Trello/trello-27-feb.png)

- 2024-02-28
![Trello Board - 2024-02-28](./docs/Trello/trello-28-feb.png)

- 2024-02-29
![Trello Board - 2024-02-29](./docs/Trello/trello-29-feb.png)

- 2024-03-01
![Trello Board - 2024-03-01](./docs/Trello/trello-01-mar.png)

## User Testing

The team carried out manual user testing or user acceptance testing (UAT) in both the development environment and production environment once launched. We covered multiple test cases across every component, page and function, noting down the test steps taken and what the expected results were. Each test case was given an overall pass or fail on both the development environment and the production environment, with notes taken when further input was required. The team tracked the user testing using a spreadsheet, with the final results of testing shown below. 

![User Testing Board](./docs/user_testing.png)