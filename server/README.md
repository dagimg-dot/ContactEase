# This is an example project 

## Technologies used

1. NodeJS
    - NodeJS is used as the backend for the project. You can install nodejs from [here](https://nodejs.org/en/download/)
2. Docker 
    - Docker is used to containerize the application. You can install the docker desktop from [here](https://www.docker.com/products/docker-desktop)
3. Yarn 
    - Yarn is used as the package manager for the project. You can install yarn through 
        - `npm install -g yarn` (if you have nodejs installed)
        - `choco install yarn` (if you have chocolatey installed)
        - `scoop install yarn` (if you have scoop installed)

## Pre-requisites

1. Install NodeJS
2. Install Docker
3. Install Yarn

## How to run the project

1. Clone the project
2. Open the project in your favorite IDE
3. Run `yarn install` to install the dependencies
4. Run `yarn migrate` to run the migrations 
5. Run `yarn dev` to start the project in development mode 
    - ensure that you have docker running
    - check the package.json file for more scripts
6. You can access the hasura console at `http://localhost:2000/console`
7. In the hasura query explorer, choose the `say_hi` type and check both the `name` and `message` fields.
8. In the name field enter your name and click on the play button to execute the query
9. You should see the response in the response pane