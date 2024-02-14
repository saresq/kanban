## Kanban - Saresq
Node v18.18.2

Client: Vite - React - Typescript - Axios - Tailwind

Server: Node - Express - Mongo - Mongoose

#### Running the Project
To run the project, clone the repo and enter its root folder.
Once inside, exec

    docker-compose up --build


*Remember that if you installed docker with sudo, then you should run this command also with sudo.*

#### 

Navigate to [localhost:3000](http://localhost:3000) and enjoy the Kanban
___


Things to note:

- Dummy data is added on the container run (running containers repeatedly will continue adding this dummy data, comment the line marked on server/src/app.js to stop this)
- In order to edit a task you should click it
- Modal can be closed by pressing escape
- Sorting by ascending or descending could be changed by clicking again the same filter option

Features that would be nice to have:

- Better UI overall following a design-system and more oriented towards mobile first
- Better filter/sorting UI/UX and component structure/logic
- Testing of both back and front
- Drag and drop functionality


#### Made with 🧠 by Saresq
