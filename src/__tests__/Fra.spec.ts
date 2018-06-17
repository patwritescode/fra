import { Fra, link } from "../index";
describe("Fra", () => {
    class PersonDTO {
        public firstName: string = "Patrick";
        public lastName: string = "Dunn";
    }
    // tslint:disable-next-line:max-classes-per-file
    class Person {
        public firstName: string = undefined;
        public lastName: string = undefined;
        public fullName: string = undefined;
    }
    let source: PersonDTO = null;
    let mapper: Fra<PersonDTO, Person> = null;
    beforeEach(() => {
        source = new PersonDTO();
        mapper = Fra.createMap<PersonDTO, Person>(Person)
            .field("fullName", (src) => `${src.firstName} ${src.lastName}`);
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
});
