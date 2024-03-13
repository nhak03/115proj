Winter 2024 CSE115a Project SlimeLine

Members:
Bora Dursun,
Mohan Duvvuri,
Nicolas Hak,
Ronith Kalidindi,
Jack Kelly

NOTE: if you did a git pull to get all the files, then just do
1. Sudo apt install npm
2. npm install react react-dom express
3. npm install body-parser
4. npm install axios
12. npm install firebase react-firebase-hooks @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
5. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
6. nvm install 14
7. nvm use 14 --> if err "nvm command not found", close terminal and open new one
8. to run, cd into path: /115proj/my-react-app --> then run: node server.js
    also run "npm start"

9. whenever adding a new feature to a page, do "npm run build" inside the ~/115proj/my-react-app directory to create the static files to be served
10. for ease of running, ensure path is /115proj/my-react-app --> npm install concurrently
    edit /115proj/my-react-app/package.json to have "start" in section "scripts" defined as:
    "start": "concurrently \"node server.js\" \"react-scripts start\""
11. if you did step 10, just do "npm start" to start both the backend and the frontend at the same time in only one terminal!


Setup Instructions (starting from scratch):

1. Sudo apt install npm
    Install npm which is the javascript package installer
2. npm install react react-dom express
React for front-end, express view engine to render React objects
https://www.npmjs.com/package/express-react-views
3. npm install body-parser
    https://www.npmjs.com/package/body-parser
4. npm install axios
    Needed to integrate react
5. npm init -y
    In the desired directory, run this to set up the environment
6. npx create-react-app client
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    Used for “nvm install 14” and “nvm use 14”
    Node 14 is needed for the npx command to run
    If get error nvm command not found, then close terminal, open new one
7. From step 6, there should now be a directory called client
    Cd into that directory ".../115proj/client"
    Run: npm run build
    Creates a build directory
8. Inside your client directory, create a file called server.js
    See heading Server.js
9. Inside your src directory “.../client/src”
    Edit the App.js file
    See heading App.js
10. Ensure your terminal path is now in the client directory
    Now run node server.js
    You can now go to localhost:5000 and you will see a button that you can push
    It was made with React!
11. npm install react-router-dom
    needed for file routing in App.js to serve: /, /foo paths, and many others

