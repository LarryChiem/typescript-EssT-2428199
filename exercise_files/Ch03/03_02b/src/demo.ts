type ContactName = string;
type ContactStatus = "active" | "inactive" | "new"
type ContactBirthDate = Date | number | string

interface Contact  {
    id: number;
    name: ContactName;
    birthDate?: ContactBirthDate;
    status?: ContactStatus;
}

let primaryContact: Contact = {
    id: 12345,
    name: "Jamie Johnson",
    status: "active"
}

type ContactFields = keyof Contact

// #1
// useful but it can be prone to typo mistakes due to no guardrails. hard to diagnose.
// function getValue(source, propertyName) {
//     return source[propertyName]
// }

// const value = getValue(contact, "stattus") // misspelling name field. UNDEFINED value.

// #2
// better way is to use the keyof to the second parameter, propertyName, which limits the values of the second parameters to valid property names of the Contact interface. Now, const value will highlight the mistake below
// function getValue(source, propertyName: keyof Contact) {
//     return source[propertyName]
// }

// const value = getValue(contact, "sttatus") // misspelling name field. UNDEFINED value.

// #3
// Even better, refactor the source to a generic. Typescript limits the second parameter to be a property field of the first object
// function getValue<T>(source: T, propertyName: keyof T) {
//     return source[propertyName]
// }

// you can see the second param extracted its field for min and max
// const value = getValue({ min: 1, max: 200 }, "")

// #4
// we can even constrain the generic types by using the 'U extends keyof T'. 
// The second parameter is still limited to the property names that appear on the generic T type, the first generic type. However, what is introduced is a generic type that can be referenced later on in this function.
function getValue<T, U extends keyof T>(source: T, propertyName: U) {
    return source[propertyName]
}

// you can see the second param extracted its field for min and max
const value = getValue({ min: 1, max: 200 }, "")
