## Subdocument array mutation

The idea of this repo is to show how to perform Subdocument array mutation operations using NodeJs and MongoDb + Mongoose ORM.


### Overview

The document database is designed to store high volume application data. The application needs to manage an array of
objects (i.e. posts, mentions) which get stored as properties of a root JSON document.

* We have Content Creators responsible for creating social posts and attach mentions to them.

* Both "posts" and "mentions" are subdocument arrays because they are made up of objects each having their own _id

* Subdocument arrays can be nested as shown with the "mentions" structure under an individual "post".

Example structure:

```js
{
  _id: 1,
  name: 'Johnny Content Creator',
  posts: [
    {
      _id: 2,
      value: 'one',
      mentions: []
    },
    {
      _id: 3,
      value: 'two',
      mentions: [
        {
          _id: 5,
          text: 'apple'
        },
        {
          _id: 6,
          text: 'orange'
        }
      ]
    },
    {
      _id: 4,
      value: 'three',
      mentions: []
    }
  ]
}
```

### DBMS Supported Operations

The document database we are using supports the following operations for subdocument arrays:
* $add: adding new subdocument to the end of an array
* $update: updating specific subdocuments by index (zero-based)
* $remove: removing specific subdocuments by index (zero-based)


### Examples: Input Mutations & Output Update Statements

#### Appending to an existing arrays:

```js
//INPUT: Add post
{ 
  posts: [
    {
      value: 'four'
    }
  ]
}

//OUTPUT: Add post
{
  $add: {
    posts: [
      {
        value: 'four'
      }
    ]
  }
}
```

#### Update to an specific field:

```js
//INPUT: Update value field of post with _id of 2
{ 
  posts: [
    {
      _id: 2,
      value: 'too'
    }
  ]
}

//OUTPUT: Update value field of post at index 0
{ 
  $update: {
    'posts.0.value': 'too'
  }
}
```

#### Removing existing items:

```js
//INPUT: Remove post with _id of 2
{
  posts: [
    {
      _id: 2,
      _delete: true
    }
  ]
}
//OUTPUT: Remove post at index 0
{ 
  $remove : {
    'posts.0' : true
  }
}
```

## Run application

## Prerequisites

Node.js version `10.19.0`
- [Node.js](https://nodejs.org/en/download/).

NPM version `6.13.4`
- [npm](https://www.npmjs.com/).

mongoDB version `3.6`
- [mongoDB](https://www.mongodb.com/download-center?jmp=nav#community).

#### Install project dependencies.

```sh
# cd to root folder
npm install
```

#### Start with npm script

```sh
npm start
```

### Testing

```sh
# Run all tests
npm test
```

#### Unit

```sh
# Run unit tests
npm run test:unit
```

#### Integration

```sh
# Run unit tests
npm run test:integration
```

## API Docs