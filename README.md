# Systecon Technical Assessment
 
Instructions for installation:

1. Make sure you have Node.js and NPM installed on your system: https://nodejs.org
2. Clone this repository
3. Navigate in your preffered terminal to the parent folder of the repository
4. Then enter and run the command `npm install` (or use your preferred package manager eg: pnpm or yarn)
5. Once the required packages have been installed, you can run `npm run dev` to use Vite to run a local server on port 5173


This repository is a prototype for a web dashboard where a user would be able to assign their own work day activity to specific projects based on which document they were working on.

For right now the data is received and sent through dummy REST calls and updates the visual through a local prop instead of pulling data from the backend.

Certain considerations were made while designing this dashboard and can be found at `/public/considerations.txt`.

To improve the visuals of the dashboard, I modified the `projects.json` file and added different colors per project in the new `projects_with_colors.json`.
