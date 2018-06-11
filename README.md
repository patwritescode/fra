# fra

Small (<1Kb) mapping library built in TypeScript.

# installation

`npm i fra`

# usage

```typescript
import { Fra } from "fra";

class PersonDTO {
    firstName: string = "John";
    lastName: string = "Adams";
    middleName: string = "Test";
}

class Person {
    firstName: string = "";
    lastName: string = "";
    otherName: string = "";
}

const personDTOValue = new PersonDTO();

const personMapper = Fra.createMap<PersonDTO, Person>(Person)
                        .field("otherName", (src) => src.middleName);
const personValue = personMapper.map(personDTOValue);
console.log(personValue);
/*
Person {
    firstName: "John",
    lastName: "Adams",
    otherName: "Test"
}
*/
```

You can also pass in an already instatiated instance of the destination object and use a mapper to hydrate the rest of the properties.
