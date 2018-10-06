# paytweet functions

Firebase [cloud functions](https://firebase.google.com/docs/functions/)

## Build Setup

Set up `config/secrets.js`:

```js
module.exports = {
  twitter: {
    dev: {
      domain: 'domain.com',
      key: 'key-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      username: 'username',
    },
    prod: {
      domain: 'domain.com',
      key: 'key-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      username: 'username',
    },
  },
};
```

To run from the command line:

``` bash
# install dependencies
yarn install

# serve only firebase functions
yarn run serve

# run functions in shell
yarn run shell

# deploy only functions to firebase
yarn run deploy

# view function logs
yarn run logs
```
