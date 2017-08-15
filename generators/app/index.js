'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.green('alex vue') + ' build app!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }, {
      type: 'input',
      name: 'appName',
      message: 'Your project name',
      default: 'project'
      // default: this.appname
    }, {
      type: 'input',
      name: 'description',
      message: 'description',
      default: 'A Vue.js project'
    }, {
      type: 'input',
      name: 'author',
      message: 'author',
      default: this.user.git.name()
    }, {
      type: 'input',
      name: 'email',
      message: 'email',
      default: this.user.git.email()
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }
  
  default() {
    if (path.basename(this.destinationPath()) !== this.props.appName) {
      this.log(
        '\nYour generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.\n'
      );
      mkdirp(this.props.appName);
      this.destinationRoot(this.destinationPath(this.props.appName));
    }
  }

  writing(){
    this.log('\nWriting...\n');

    this.fs.copyTpl(
      this.templatePath('build/**'),
      this.destinationPath('build/')
    );

    this.fs.copyTpl(
      this.templatePath('config/**'),
      this.destinationPath('config/')
    );

    this.fs.copyTpl(
      this.templatePath('src/**'),
      this.destinationPath('src/')
    );

    this.fs.copyTpl(
      this.templatePath('static/_gitkeep'),
      this.destinationPath('static/.gitkeep')
    );

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"), {
        name: this.props.appName,
        description: this.props.description,
        author: this.props.author,
        email: this.props.email,
      }
    );

    this.fs.copy(
      this.templatePath("_babelrc"),
      this.destinationPath(".balelrc")
    );

    this.fs.copy(
      this.templatePath("_editorconfig"),
      this.destinationPath(".editorconfig")
    );

    this.fs.copy(
      this.templatePath("_gitignore"),
      this.destinationPath(".gitignore")
    );

    this.fs.copy(
      this.templatePath("_postcssrc.js"),
      this.destinationPath(".postcssrc.js")
    );

    this.fs.copy(
      this.templatePath("index.html"),
      this.destinationPath("index.html")
    );

    this.fs.copy(
      this.templatePath("README.md"),
      this.destinationPath("README.md")
    );

  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {
    this.log(yosay(
      '\nYour front templates has been created successfully!\n'+
      'To get started:\n' + '\n' +
      chalk.red('cd ' + this.props.appName + '\n' + 
      'npm start'+ '\n')
    ));
  }

};
