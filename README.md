# ETHSofia  

## Project Details  
This project is part of our ETHSofia initiative, where we achieved remarkable success. Our project earned **three first-place bounties** from **Chainbase**, **iExec**, and **SeeBlocks**, as well as a **third-place bounty** in the **AI Open Track competition** at the ETHSofia hackathon.  

Below, you will find the demo video, presentation, and all other resources needed to explore the project:  
**Demo Video, Presentation, and Resources:** [https://dorahacks.io/buidl/17725](https://dorahacks.io/buidl/17725)  

# Project Setup Guide  

Welcome to our project! This guide will walk you through the steps required to set up and run the project locally.  

## Prerequisites  

Make sure you have the following installed on your machine:  
- **Node.js** (for running the frontend and backend)  
- **npm** (Node package manager)  
- **Python** (for running the model/server)  

## Setup Instructions  

Follow these steps to get the project up and running:  

### 1. Clone the Repository  

Start by cloning the repository to your local machine:  

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Set Up the Frontend  

Navigate to the frontend folder and install the necessary dependencies:  

```bash
cd frontend
npm install
```

Additionally, install `react-hot-toast` to manage notifications:  

```bash
npm install react-hot-toast
```

Once the dependencies are installed, you can start the frontend development server:  

```bash
npm run dev
```

The frontend should now be running.  

### 3. Start the Python Model/Server  

Open a **new terminal** and navigate to the root of the project directory. Run the Python server:  

```bash
python model/server.py
```

This will start the server handling the machine learning model or other backend logic.  

### 4. Set Up the Backend  

In a **new terminal**, go to the backend folder and install the necessary dependencies:  

```bash
cd backend
npm install
```

After that, navigate to the `src` folder and start the backend server:  

```bash
cd src
node server.js
```

### And that's it! 🎉  

Your project should now be fully set up with the frontend, backend, and Python model running.
