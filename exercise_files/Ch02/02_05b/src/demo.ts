interface Contact {
    id: number;
    name: string;
    clone(name: string): Contact
}

// have clone accept a clone function as a parameter
// this resembles a function signature
function clone(source: Contact): Contact {
    return Object.apply({}, source);
}

const a: Contact = { id: 123, name: "larry chiem" };
const b = clone(a)