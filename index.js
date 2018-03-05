const Generator = require("yeoman-generator");
const { promisify } = require("util");
const fs = require("fs");
const chalk = require("chalk");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

fs.readdir = promisify(fs.readdir);

module.exports = class extends Generator {
  // eslint-disable-next-line
  constructor(args, opts) {
    super(args, opts);
    this.answers = {
      name: this.appname,
      confirm: false,
    };
  }

  async writing() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath(`${this.answers.name}/package.json`),
      { name: this.answers.name, appDescription: this.answers.appDescription },
    );
    this.fs.copy(
      this.templatePath(".*"),
      this.destinationPath(`${this.answers.name}/`),
    );
    this.fs.copy(
      this.templatePath("api/**"),
      this.destinationPath(`${this.answers.name}/api`),
    );
    this.fs.copy(
      this.templatePath("client/**"),
      this.destinationPath(`${this.answers.name}/client`),
    );
    this.fs.copy(
      this.templatePath("config/**"),
      this.destinationPath(`${this.answers.name}/config`),
    );
    this.fs.copy(
      this.templatePath("scripts/**"),
      this.destinationPath(`${this.answers.name}/scripts`),
    );
  }

  install() {
    process.chdir(this.destinationPath(this.answers.name));
    this.log(chalk.green("\nInstalling dependencies\n"));
    this.installDependencies({
      npm: true,
      bower: false,
    })
      .then(() => {
        this.log(chalk.green("\nInitialising git repository"));
        return exec("git init");
      })
      .catch(err => {
        throw err;
      });
  }

  async prompting() {
    const { name } = await this.prompt({
      type: "input",
      name: "name",
      message: "What is the name of your project",
      default: this.appname, // Default to current folder name
    });
    this.answers.name = name;
    const destinationDirectory = await fs.readdir(this.destinationPath());
    if (destinationDirectory.includes(name)) {
      this.log(chalk.red(`\nDirectory ${name} already exists. Exiting app.\n`));
      process.exit(0);
    }
    const { appDescription } = await this.prompt({
      type: "input",
      name: "appDescription",
      message: "Describe application",
      default: "Default description",
    });
    this.answers.appDescription = appDescription;
  }
};
