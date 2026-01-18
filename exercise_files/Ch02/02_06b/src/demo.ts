interface Contact {
    id: number;
    name: string;
}

// Generic <TExternalId>
interface UserContact<TExternalId> {
    id: number
    name: string
    username: string
    // Generic syntax <TExternalId> on the interface. Now, you can refer to it from externalId
    externalId: TExternalId 
    loadExternalId(): Task<TExternalId>
}

// The return type matches the input type so we restrict The second parameter needs to match the first type parameter by using the extends
function clone<T1, T2 extends T1>(source: T1): T2 {
    return Object.apply({}, source);
}

// Since Contact and UserContact share some simlar properties. 
const a: Contact = { id: 123, name: "Homer Simpson" };
const b = clone<Contact, UserContact>(a)

// Definind a metatype using generics
const dateRange = { startDate: Date.now(), endDate: Date.now() }
const dateRangeCopy = clone(dateRange)