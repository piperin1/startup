# Startup
Link to notes: https://github.com/piperin1/startup/blob/main/notes.md
# MyPet
**Elevator Pitch**
> Imagine a virtual pet that you can feed and care for, accessible right from your browser. MyPet lets users log in, interact with their pet by performing simple actions like feeding and playing, and watch the pet's happiness and hunger levels change in real-time. The app saves your progress so you can return to your pet later. With fun animations and real-world data like weather influencing the pet’s environment, it's a light, interactive experience for anyone who loves casual gaming and virtual pets.
>
**Design**
![](https://github.com/piperin1/startup/blob/main/programFiles/src/images/IMG_4865.jpg)

**Key Features**
> - Secure login over HTTPS
> - Display of pet with simple animations
> - Display of action options (feed, pet) with corresponding status bars (hunger, happiness)
> - Pet information stored and displayed (stats, name, associated user)
> - Real-time feedback of your pet's status 
> - Weather API that updates your pet's environment
>
**Use of Technologies**
> **HTML:** Uses correct HTML structure with a simple layout. Three HTML pages, one login "popup" page, a select "popup" page for new users, and a simulator page.
> 
> **CSS:** Styling for buttons and general webpage layout. Should include a pleasing color scheme and pleasing layout.
> 
> **JavaScript:** Provides functionality for action options, popup pages, and more.
> 
> **React:** Dynamically update pet stats with UI, organize components. Reactive to user's actions.
> 
> **Web service:** Save and load pet's status. Integrate external APIs (weather API)
> 
> **Authentication/Database data:** Uses a simple login system that allows users to create an account and save their pet's status and information. Can't play unless authenticated.
> 
> **WebSocket data:** Provides real-time updates/notifications on pet's status to user
>
 **HTML deliverable**
> For this deliverable I built out my application in HTML
> - Pages: Three HTML pages, one login, one select, and one home page.
> - Links: The login page currently links to the select, and the select to the home. There is a link navigation on the home page that I will eventually move.
> - Text: There is text that represents all actions and all placeholders, including action buttons such as "feed" and "pet."
> - Images: There is a placeholder image where I will put my pet animations.
> - DB/Login: There is a login page where users will authenticate their accounts and be able to access their pet. This is also represented by username and pet name placeholders.
> - Websocket: There is a placeholder where users will receive realtime notifications on their/other pet(s).
> - 3rd Party Calls: There is a placeholder where weather API will be integrated with the application.
>
 **CSS deliverable**
> For this deliverable I styled my application using CSS
> - Header, footer, and main content styled per the application context. 
> - Navigation elements: Main page navigation removed excluding GitHub link, everything else styled appropriately 
> - Responsive sizing: Incredibly responsive sizing to appeal on all devices
> - Text content: Unique and consistent fonts aligning with application purpose
> - Images: Filler image still in place, no styling currently needed
> - General aesthetics: All pages follow a visually pleasing aesthetic with harmonious colors and fonts
>
 **React deliverable**
> For this deliverable I programmed my application using React
> - Hunger and happiness stats dynamically update relative to user input 
> - React Router implemented with navigation between login and simulator page
> - Pet reacts dynamically to user input (change animations with actions)
> - Level-up system implemented based on filled statuses
> - Bundled using Vite
> - Placeholders for database and Websocket inputs
> - Hooks: useState and useEffect implemented to control pet statuses
>
 **Service deliverable**
> For this deliverable I added backend endpoints for my web service and a third-party service
> - Node.js/Express service implemented
> - Static middleware for frontend implemented
> - Calls to third-party weather service API to deliver local weather personalization
> - Backend service endpoints implemented for web service and third-party service
> - Frontend calls to backend endpoints using fetch()
>
**DB/Login deliverable**
> For this deliverable I implemented user creation and authentication 
> - MongoDB Atlas database created
> - Data now stored in MongoDB
> - User registration implemented, creates new account in database
> - User authentication available for existing accounts
> - MongoDB stores credentials and application data
> - User must log in to access simulator 