### POST `/creators`

> Add Content Creator user

#### Request

```js
{
  name: 'Jhon Doe',
  posts: [
    {
      value: 'three',
      mentions: [
        {
          text: 'banana'
        }
      ]
    }
  ]
}
```

#### Response

- Status 200:

```js
  {
    _id_: '5ef3e9cda1d25c748014e1b6'
  }
```

### GET `/creators/5f68134c82cc4c5c675401fa/posts`

> Get update statement from a Content Creator

```js
{
  posts: [
    {
      _id: '5f68134c82cc4c5c675401fb',
      mentions: [
        {
          _id: '5f68134c82cc4c5c675401fd',
          _delete: true
        }
      ]
    },
    {
      _id: '5a832e5bde260f4d8e17916e',
      mentions: [
        {
          text: 'banana'
        }
      ]
    },
    {
      _id: '5f68134c82cc4c5c675401fb',
      mentions: [
        {
          _id: '5f68134c82cc4c5c675401fc',
          text: 'orange'
        }
      ]
    }
  ]
}
```

#### Response

- Status 200:

```js
{
    $remove: {
        'posts.0.mentions.1': true
    },
    $add: {
        'posts.1.mentions': {
            text: 'banana'
        }
    },
    $update: {
        'posts.0.mentions.0.text': 'orange'
    }
}
```
