
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/stefanvermaas/factory-builder/blob/master/LICENSE) [![NPM Version](https://badge.fury.io/js/factory-builder.svg)](https://badge.fury.io/js/factory-builder) [![downloads](https://img.shields.io/npm/dm/factory-builder.svg?style=flat-square)](https://img.shields.io/npm/dm/factory-builder.svg?style=flat-square) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Factory Builder is a framework agnostic and scalable fixtures replacement for your test suite. It has a straightforward definition syntax, mimics multiple build strategies (saved instances, unsaved instances and attribute hashes), and it allows you to create multiple factories (variants) for the same instance.

It's heavily inspired by [FactoryBot](https://github.com/thoughtbot/factory_bot/) by [Thoughtbot](https://github.com/thoughtbot).

## Table of Contents
- [Installation](#installation)
- [Examples](#examples)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
  - [❓ Questions](#-questions)

## Installation
This module is distributed via npm which is bundled with node and should be installed as one of your project's devDependencies:

```shell
// When using NPM
npm install --save-dev factory-builder

// Or when using Yarn
yarn add --dev factory-builder
```

## Examples

### Defining factories
Each factory has a name and a set of attributes. It is highly recommended that you have one factory for each class that provides the simplest set of attributes necessary to create an instance of that class.

Note that the factory is an `Object` with the `attributes` key. The value of this `attributes` key can either be a function that returns an `Object` or an `Object`.

```js
// ./factories/User.js
const User = {
  attributes: {
    firstName: 'Thom',
    lastName: 'Taylor',
    email: 'example@example.org',
  }
}

export default User;
```

### Consuming factories
On it's own there is nothing special about factories. They're just plain javascript object that return a specifically styled object. To actually use the factory in your test you can make use of three methods that are provided by Factory Buider; `create`, `build` or `attributesFor`.

### Create or building a new factory
Factory Builder doesn't depend on any database, which makes it easy to quickly run your entire test suite. The `create` method mimicks the create action on a database level. It will create a new factory and it will assign it the `id`, `createdAt` and `updatedAt` properties. The `build` simple creates a new factory, but without the `id`, `createdAt` and `updatedAt` properties.

```js
// ./specs/User.js
import { create, build } from 'factory-builder';
import User from './factories/User';

describe('User', () => {
  it('creates a new user', () => {
    const user = create(User, { lastName: 'created' });
    expect(user.lastName).toEqual('created');
    expect(user.id).not.toBeUndefined();
  });

  it('builds a new user', () => {
    const user = build(User, { lastName: 'build' });
    expect(user.lastName).toEqual('build');
    expect(user.id).toBeUndefined();
  });
});
```

### Quickly grab the attributes
Want to quickly get all the attributes for a factory (for example to use it as POST data in your tests), you can use the `attributesFor` method. This will return an object with all the attributes of a factory.

```js
// ./specs/User.js
import { attributesFor } from 'factory-builder';
import User from './factories/User';

describe('User', () => {
  it('sends an API request', () => {
    const userData = attributesFor(User, { lastName: 'Moses' });

    const response = FakeApi('/some-url', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    expect(response.lastName).toEqual('Moses');
  });
});
```

### Creating or building multiple factories
You can also create multiple factories at the same time. For this you can use the `createList` or the `buildList` functions that the Factory Builder package provides.

```js
// ./specs/User.js
import { createList, buildList } from 'factory-builder';
import User from './factories/User';

describe('User', () => {
  it('creates 5 new users', () => {
    const users = createList(User, 5, { lastName: 'created' });
    expect(users.length).toEqual(5);
  });

  it('builds 2 new users', () => {
    const users = buildList(User, 2, { lastName: 'build' });
    expect(users.length).toEqual(2);
  });
});
```

### Before and After hooks
It's also possible to use one of the hooks that Factory Builder provides for injecting some code;
- `beforeCreate` - called before creating a factory
- `afterCreate` - called right after setting the `id`, `createdAt` and `updatedAt` attributes
- `beforeBuild` - called before building a factory
- `afterBuild` - called after building the factory

These methods can be globally defined on your factory or can be passed to the `create` or `build` methods. These hooks enable you to modify or use create data to do whatever you want. The `before*` and `after*` methods should always return an `Object` and they always have one argument; the attributes of the factory.

```js
// ./factories/User.js
const User = {
  attributes: {
    firstName: 'Peter',
  },

  beforeCreate: (attributes) => {
    return {
      ...attributes,
      lastName: 'Pong',
    };
  },

  afterCreate: (attributes) => {
    return {
      ...attributes,
      email: `email-${attributes.id}@email.org`,
    };
  },

  beforeBuild: (attributes) => {
    return {
      ...attributes,
      lastName: `${attributes.firstName}s`,
    };
  },

  afterBuild: (attributes) => {
    return {
      ...attributes,
      email: `${attributes.firstName}@email.org`,
    };
  },
};

export default User;
```

### Using variants
Variants enable you to define multiple variants of the same base factory. You can
use the `as` key when you create or build a factory and it will return the variant
you've defined.

```js
const User = {
  attributes: {
    firstName: 'Peter',
    isClient: false,
    isAdmin: false,
  },
  variants: {
    admin: {
      isClient: false,
      isAdmin: true,
    },
    client: {
      isClient: true,
    }
  }
};

import { create } from 'factory-builder';
create(User, as: 'admin'); // => { firstName: 'Peter', isClient: false, isAdmin: true };
```

NOTE: The variant must be a plain object and should be namespaced in your factory
under `variants`. The key name will also be the way you pick this specific factory
variant.

### Generating data
Note: You could use a third party library like [fakerjs](https://github.com/marak/Faker.js/) to create fake data for your factories or just define it yourself.

## Issues
_Looking to contribute? Look for the [Good First Issue](https://github.com/stefanvermaas/factory-builder/issues?utf8=✓&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3A"good+first+issue"+) label._

### 🐛 Bugs
Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**](https://github.com/stefanvermaas/factory-builder/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Acreated-desc)

### 💡 Feature Requests
Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**](https://github.com/stefanvermaas/factory-builder/issues?q=is%3Aissue+sort%3Areactions-%2B1-desc+label%3Aenhancement+is%3Aopen)

### ❓ Questions
For questions related to using the library, please file an issue on GitHub with
the [Question](https://github.com/stefanvermaas/factory-builder/issues?utf8=✓&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3A"question"+) label.
