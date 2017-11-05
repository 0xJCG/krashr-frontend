# Krashr front-end

A new repository to improve the Krashr front-end. If you want to check the original project, you can go to: https://github.com/0xJCG/tfg-krashr.

## Getting started and running the application

This front-end has been developed using the webpack template of Vue.js. That's why its necessary to install Node.js and npm first of all.

```
sudo apt-get install nodejs npm
```

Once installed, we can:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

It's necessary to have a web server (for example Apache or Nginx) to run the compiled web.

## New improvements

* As commented in the previous point, the new front-end uses the Vue.js framework instead of AngularJS.
* Now, the front-end uses [Troy Hunt](https://twitter.com/troyhunt)'s [Have I Been Pwned](https://haveibeenpwned.com) API when users sign up on the service.

## Future improvements

* Activate HTTPS.
* Add the methods missing from the first version of the front-end.
