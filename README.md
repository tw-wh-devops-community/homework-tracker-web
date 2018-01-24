## Homework Tracker

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

For more [Create React App](https://github.com/facebookincubator/create-react-app) guide, please refer to [wiki](https://github.com/tw-wh-devops-community/homework-tracker-web/wiki/Create-React-App-Guide).


### Preconditon
- Node(v6.12.3)
- npm(v3.10.10)

### How to run

#### [Set node version via nvm](https://github.com/creationix/nvm#nvmrc) and install dependencies
```
nvm install
nvm use
npm install
```

#### Download codebase and run
```
git clone git@github.com:tw-wh-devops-community/homework-tracker-web.git
cd homework-tracker-web
npm i
npm start
```

#### Guidelines

##### Git commit

In order to make our commit messages more readable and easy to follow when looking through the project history, we made the git commit guideline. 

Our commit message format is:

`[Yourname] [type]: your commit message`

For example: 
```
[grace] feat: add lint rules.
```

For `type`, we use part of [Angular JS commit message guideline](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commit-message-format), Generally speaking, a commit has a type which must be one of the following:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
