const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];


const questions = [
    {
        type: 'list',
        message: 'Please enter employee role',
        name: 'role',
        choices: ['Manager', 'Engineer', 'Intern'],
    },
    {
        type: 'input',
        message: 'Please enter full name of employee',
        name: 'name',
    },
    {
        type: 'input',
        message: 'Please enter employee ID',
        name: 'id',
    },
    {
        type: 'input',
        message: 'Enter email of employee',
        name: 'email',
    },
    {
        type: 'input',
        message: 'Please enter manager office number',
        name: 'officeNumber',
        when: answers => {
            return answers.role === 'Manager';
        },
    },
    {
        type: 'input',
        message: 'Please enter github username',
        name: 'github',
        when: answers => {
            return answers.role === 'Engineer';
        },
    },
    {
        type: 'input',
        message: 'Please enter school name',
        name: 'school',
        when: answers => {
            return answers.role === 'Intern';
        },
    },

    {
        type: 'confirm',
        name: 'addMore',
        message: 'Would you like to add more employees?',
        default: true
    }
];


async function init() {
	
	try {
		const answers = await inquirer.prompt(questions);
                const { name, id, email, role } = answers;
		switch (role) {
			case 'Manager':
				let manager = new Manager(name, id, email, answers.officeNumber);
				employees.push(manager);
				break;
			case 'Engineer':
				let engineer = new Engineer(name, id, email, answers.github);
				employees.push(engineer);
				break;
			case 'Intern':
				let intern = new Intern(name, id, email, answers.school);
				employees.push(intern);
		}

    		
   		if (answers.addMore) init();
    
   		 
    		renderOutput();

	} catch (err) {
		console.log(err);
	}
}


function renderOutput() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
  const teamHTML = fs.writeFileSync(outputPath, render(employees), (err) => {
     if (err) throw err;
  } )
}


init();


