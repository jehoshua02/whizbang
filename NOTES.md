Normalization and validation seems like a common problem. Common enough to
establish a common solution. But it seems like everyone is doing it a different
way, not doing it thoroughly and consistently, or not doing it at all.

I want a framework that establishes a foundation for predictable, consistent,
thorough validation, making it easy to define normalization and validation rules
all in one place and get a nice set of validation messages back with the
normalized object.

Let's start with a plain old object with some data in it.

```javascript
var book = {
  title: 'Validation the Right Way',
  author: 'Joshua Stoutenburg',
  pages: 20
};
```

How would I validate this object? First, every book must have a title:

```javascript
if (!book.title) {
  throw new Error('Title is required.');
}
```

I want to check for more than just the presence of a title though. It must also
be a string:

```javascript
if (!book.title) {
  throw new Error('Title is required.');
} else if (typeof book.title !== 'string') {
  throw new Error('Title must be a string.');
}
```

Next I want to check the author, which is required and must also be a string:

```javascript
if (!book.title) {
  throw new Error('Title is required.');
} else if (typeof book.title !== 'string') {
  throw new Error('Title must be a string.');
}

if (!book.author) {
  throw new Error('Author is required.');
} else if (typeof book.author !== 'string') {
  throw new Error('Author must be a string.');
}
```

There are several problems I see already with the way this is going:

1. Repetitive code. I literally copied and pasted the code and changed the
  property name for validation of the other.
2. Only one validation message. I want all of them.
3. Maintenance. With any non-trivial, real-life object, this validation script
  will become long, messy, and error prone, especially with objects having
  nested objects that will also require validation.
4. Normalization. We still have to add in normalization (trimming strings,
  casting values to the correct data types, capitalization, filtering, etc).

To solve the problem of repetitive code, we can abstract some things into
reusable objects and functions:

__Book.js__
```javascript
var Validator = require('validator').Validator;

var validator = new Validator();
validator.property('title')
  .type('string')
  .required()
validator.property('author')
  .type('string')
  .required()


var Book = function (props) {
  this.props = props;
};

Book.prototype = {
  validator: validator,
  validate: function () {
    this.validator.validate(this.props);
  }
};

module.exports = Book;
```

__example.js__
```javascript
var Book = require('./Book');

var book = new Book({
  title: 'Validation the Right Way',
  author: 'Joshua Stoutenburg',
  pages: 20
});

book.validate();
```

It's just dreamcode at this point, but it's much better than the blobby mess we
had previously.

# TODO
+ Throwing and Catching.
+ Structure for validation messages.
+ Implement Validator.
+ Abstract Book.validate to a base class.
+ Plugability: Define custom validators.
+ Built in validators.
+ Maybe write real code instead of notes?
