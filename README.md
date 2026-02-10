# Test Task

This is a test task.

### Run APP

Install all dependencies. The recommended Node.js version is 20.0.0:

```bash
npm install
```

### Run the application:

```bash
npm run start
```

Once the server is running, open your browser and navigate to http://localhost:4200/.

### AI Notes

For this project, ChatGPT was used only to produce small code snippets as reminders.

### Implementation Notes

- The **form-sport-select** component is designed as an isolated, reusable component. It performs its own API call to retrieve the list of sports. The sports list was intentionally not added to state management because the functionality is straightforward, relatively static, and easily reusable across the application.

- **State management** is implemented for the leagues list, including filtering parameters and related actions.

- Due to the limited free API usage quota, selecting **Motorsport** in the sports selector _may return no results_.

- Additionally, the API request used **to retrieve all leagues** does not currently support filtering on the server side by sport ID (acc to documentation). If server-side filtering becomes available in the future, the state management approach can be adjusted accordingly (on every sport selection - refresh data will be dispatched).
