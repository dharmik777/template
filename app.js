const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const employees = [];

const addEmployee = () => {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Name?"
        },
        {
            name: "id",
            type: "input",
            message: "Employee ID?"
        },
        {
            name: "email",
            type: "input",
            message: "Email? "
        },
        {
            name: "role",
            type: "list",
            message: "Role",
            choices: ["Engineer", "Intern", "Manager"]
        },
        {
            name: "github",
            type: "input",
            message: "Username?",
            when: (answer) => answer.role === "Engineer"
        },
        {
            name: "school",
            type: "input",
            message: "School?",
            when: (answer) => answer.role === "Intern"
        },
        {
            name: "officeNumber",
            type: "input",
            message: "Phone Number?",
            when: (answer) => answer.role === "Manager"
        },
    ]).then((answer) => {
        let choice = answer.role;
        switch (choice) {
            case "Engineer":
                let engineer = new Engineer(
                    answer.name,
                    answer.id,
                    answer.email,
                    answer.github
                );
                console.log(engineer);
                employees.push(engineer);
                console.log(employees);
                addAnother();

                break;

                case "Intern": 
                let intern = new Intern(
                    answer.name,
                    answer.id,
                    answer.email,
                    answer.school
                );
                employees.push(intern);
                console.log(intern);
                addAnother();

                break;

                case "Manager":
                let manager = new Manager(
                    answer.name,
                    answer.id,
                    answer.email,
                    answer.officeNumber
                );
                employees.push(manager);
                console.log(manager);
                addAnother();
                
                break;

        }
    }).catch((err) => {
        console.log(err);
    });
};

const addAnother = () => {
    inquirer.prompt([
        {
            name: "newEmployee",
            type: "list",
            message: "Would you like to add another employee?",
            choices: ["YES", "NO"]
        },
    ]).then((answer) => {
        if (answer.newEmployee === "YES") {
            addEmployee();
        } else {
            console.log(employees);
            writeFile();
            console.log("exit");
        }
    })
};

addEmployee();

const writeFile = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    };

    fs.writeFileSync(outputPath, render(employees));
    console.log("Successfully added to team")
};