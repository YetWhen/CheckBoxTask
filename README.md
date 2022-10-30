# CheckBoxTask
A simple taskboard allowing the user to set up tasks and view tasklist, edit, sort and search.

-	User should be able to create a new task, including the following fields (Required)
o	Name
o	Description
o	Due date
-	User should be able to view all tasks created in a list view, showing all the following details (Required)
o	Name
o	Description
o	Due date
o	Create date
o	Status
	Not urgent
	Due soon (Due date is within 7 days)
	Overdue
-	User should be able to edit task name, description and due date (Required)
-	User should be able to sort by due date or create date (Should have)
-	User should be able to search based on task name (Should have)

need to address the key risk of large volume of task creation within 10s of 1000s.

development operation process:
database:
run mysql workbench
go to server index.js
change the host,user,password,database into correct setting of database workbench
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "taskdatabase",
});

The database should have the following columns and settings
"id" : INT, the id number of data node (row), primary key, not null, auto increment
"taskName": VARCHAR(200), not null
"description": TEXT(200), not null
"createDate": DATE, not null
"dueDate": DATE, not null

frontend:
go to client folder, run:
    npm start

    create task:
        input the information and click "create" button to create task
        the date follows the format of YYYY-MM-DD
    When updating the information:
        go to the task card, input information and click "update" button
        If you don't want to change one of the information, just leave that textbox empty as empty textbox will not change the task information. eg. original task name is "Name", edit box is "", after clicking update, the task name is still "Name"
    Delete the task card:
        go to task card, click the "delete" button
    Sort:
        Ascending: listing from top to bottom, from earliest date to latest date
        Descending: listing from top to bottom, from latest date to earliest date
    Search:
        input the taskName and click "Search" button"
        if there's multiple tasks with same name, it will return a list of all the tasks with that name
        Searched results also support the sorting feature

backend:
split terminal/open new terminal, go to server folder, run:
    npm run devStart
