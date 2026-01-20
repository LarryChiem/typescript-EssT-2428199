interface Contact {
    id: number;
}

const currentUser = {
    id: 1234,
    roles: ["ContactEditor"],
    isAuthenticated(): boolean {
        return true
    },
    isInRole(role: string): boolean {
        return this.roles.contains(role);
    }
}
/* We are going to learn how to create a decorator by creating a method decorator.
 This function is executed at runtime and accepts three parameters:
 1. First parameter target is the object that the decorator is being applied to. This is the instance of the object that the method belongs to.
 2. The name of the property that the decorator is applied to. 
 3. an object containing current metadata about the property

*/
function authorize(target: any, property: string, descriptor: PropertyDescriptor) {
    // This new function completely overwrites the current method. So we still need to execute the original logic. 
    // To do this, make a copy of the current method before overwriting it.
    const wrapped = descriptor.value

    descriptor.value = function () {
        if (!currentUser.isAuthenticated()) {
            throw Error("User is not authenticated");
        }

        try {
            // Then call that function from within the new function, using the apply approach.

            return wrapped.apply(this, arguments);
            // We've wrapped the methods logic with our own.
        } catch (ex) {
            // TODO: some fancy logging logic here
            throw ex;
        }
    }
}
// with this in place, our decorator now guarantees that users are authenticated in order to access these methods. Otherwise, an error is thrown. Now we can delete the ("ContactX") sections below next to the @authorize calls.

class ContactRepository {
    private contacts: Contact[] = [];

    // @authorize("ContactViewer")
    @authorize
    getContactById(id: number): Contact | null {
        if (!currentUser.isInRole("ContactViewer")) {
            throw Error("User not authorized to execute this action");
        }

        const contact = this.contacts.find(x => x.id === id);
        return contact;
    }

    // @authorize("ContactEditor")
    @authorize
    save(contact: Contact): void {
        const existing = this.getContactById(contact.id);

        if (existing) {
            Object.assign(existing, contact);
        } else {
            this.contacts.push(contact);
        }
    }
}