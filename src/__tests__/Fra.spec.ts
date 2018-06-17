import { Fra, link } from "../index";
describe("Fra", () => {
    class PersonDTO {
        public firstName: string = "Patrick";
        public lastName: string = "Dunn";
    }
    // tslint:disable-next-line:max-classes-per-file
    class HumanDTO {
        public age: number = 28;
    }
    // tslint:disable-next-line:max-classes-per-file
    class Person {
        public firstName: string = undefined;
        public lastName: string = undefined;
        public fullName: string = undefined;
        public age: number = undefined;
    }
    let source: PersonDTO = null;
    let secondSource: HumanDTO = null;
    let mapper: Fra<PersonDTO, Person> = null;
    let secondMapper: Fra<HumanDTO, Person> = null;
    beforeEach(() => {
        source = new PersonDTO();
        secondSource = new HumanDTO();
        mapper = Fra.createMap<PersonDTO, Person>(Person)
            .field("fullName", (src) => `${src.firstName} ${src.lastName}`);
        secondMapper = Fra.createMap<HumanDTO, Person>(Person);
    });
    it("automaps properties", () => {
        const result = mapper.map(source);
        expect(result.firstName).toEqual(source.firstName);
        expect(result.lastName).toEqual(source.lastName);
    });
    it("maps fields", () => {
        const result = mapper.map(source);
        expect(result.fullName).toEqual(`${source.firstName} ${source.lastName}`);
    });
    it("maps all", () => {
        const result = mapper.mapAll([source]);
        expect(result).toHaveLength(1);
    });
    it("can link mapeprs", () => {
        const linkedMapper = link(Person, [mapper, secondMapper]);
        const result = linkedMapper(source, secondSource);
        expect(result.firstName).toEqual(source.firstName);
        expect(result.age).toEqual(secondSource.age);
    });
    it("can map to existing", () => {
        const person = new Person();
        person.age = 28;
        const result = mapper.map(source, person);
        expect(result.age).toEqual(28);
        expect(result.firstName).toEqual(source.firstName);
    });
});
