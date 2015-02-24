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
3. With any non-trivial, real-life object, this validation script will become
  long, messy, and error prone, especially with objects having nested objects
  that will also require validation.
4. We still have to add in normalization (trimming strings, casting values to
  the correct data types, capitalization, filtering, etc).

To solve the problem of repetitive code, we can abstract some things into
reusable functions:

```javascript
var validator = new Validator(); /* [1] */
validator.property('title') /* [2] */
  .type('string') /* [3] */
  .required() /* [4] */
validator.property('author') /* [5] */
  .type('string')
  .required()

var Book = function (props) { /* [6] */
  this.props = props;
};

Book.prototype = {
  validator: validator,
  validate: function () {
    this.validator.validate(this.props); /* [7] */
  }
};

var book = new Book({ /* [8] */
  title: 'Validation the Right Way',
  author: 'Joshua Stoutenburg',
  pages: 20
});

book.validate(); /* [9] */
```

1. We instantiate a new validator using a constructor defined somewhere.
2. We define a ruleset for a property.
3. We indicate it should be of type 'string'.
4. We indicate the property is required (whatever that means).
5. We do something similar for another property.
6. We define the Book object constructor.
7. We wire the Book object to the validator.
8. We instantiate a book with the props.
9. We call validate.

It's just dreamcode at this point, but it's much better than the blobby mess we
had previously.

