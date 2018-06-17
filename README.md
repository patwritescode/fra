# fra

[![npm](https://img.shields.io/npm/v/fra.svg?style=for-the-badge)](https://www.npmjs.com/package/fra)

Small (<1Kb) mapping library built in TypeScript. This project is still in development so the api may change until a stable release.

# about

The project was created to make object mapping easier in as simple a way as possible. This can help facilitate patterns such as a multi-tier architecture or DDD where you want to map between domain models and DTOs. However, this was created to solve a case where we need to map multiple legacy rest responses into one cleaner model to represent a GraphQL schema.

The name comes from Fra Mauro who, at the time (1400s) created the most detailed and accurate map of the world. There's a crater named after him on the moon that was inteded to be explored by Apollo 13. But really I just needed a name.

# installation

`npm i fra`

# usage

Fra will automatically map properties that are shared between both the source and target. You can chain the `.field` method to override a map or provide a map for a field that does not exist on the target.

```typescript
import { Fra } from "fra";

class Person {
    firstName: string = "Patrick";
    lastName: string = "Dunn";
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

class PersonDTO {
    firstName: string = undefined;
    lastName: string = undefined;
    fullName: string = undefined;
}

const personMapper = Fra.createMap<Person, PersonDTO>(PersonDTO)
    .field("fullName", (source) => source.getFullName());

const person = new Person();
const personDTO = personMapper.map(person);
```

## Fra
- `.field(fieldName, callback)`: allows you to specify a mapping function for a specific field.
- `.map(source, initialTarget?)`: map the source to the target with an optional initialTarget to hydrate. Default instatiates a new object for target.
- `.mapAll(sources)`: map many sources to many targets
- `createMap<Source, Target>(Target)`: create a mapper from a source to a target object. You can also just instatiate an instance of Fra directly. This is here just to help with creating a chain to register fields cleanly.

## link

`link(Target, mappers)` returns a function that accepts an array of different sources that match the input mappers. You can call the returned function to execute each mapper in the array to create a single target object.

```typescript
import { link } from "fra";

const multiPersonMapper = link(PersonDTO, [personMapper, humanMapper]);
const result = multiPersonMapper(person, human); // output is a PersonDTO mapped from both the human and person object
```

# Updates

- 0.0.3: Added `link` and `.mapAll`. Setup jest tests for source.