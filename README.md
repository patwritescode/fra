# fra

Small (<1Kb) mapping library built in TypeScript. This project is still in development.

# installation

`npm i fra`

# usage

```typescript
import { Fra } from "fra";

class PersonDTO {
    firstName: string = "Patrick";
    lastName: string = "Dunn";
    middleName: string = "Thomas";
}

class Person {
    firstName: string = "";
    lastName: string = "";
    otherName: string = "";
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

const personDTO = new PersonDTO();

const personMapper = Fra.createMap<PersonDTO, Person>(Person)
                        .field("otherName", (src) => src.middleName);
const person = personMapper.map(personDTO);
console.log(personValue);
/*
Outputs: 
Person {
    firstName: "Patrick",
    lastName: "Dunn",
    otherName: "Thomas"
}
*/
console.log(person.fullName());
/*
Outputs:
Patrick Dunn
*/
```

You can also pass in an already instantiated instance of the destination object and use a mapper to hydrate the rest of the properties.
