function query<T>(
    items: T[],
    /* Instead, use an indexed accessor type.
    First, define the name of the property. Use keyof T to limit it to only property names that exist on the type T.
    Second, give this property name a generic type name. Use that as the type of parameter in the query function for this field (TProp).
    Finally,  since we don't want this object to require a query for every property of the target object, make the property optional with ?
    */
    query: {
        [TProp in keyof T]: (val: T[TProp]) => boolean
    }
    //  Using Record object kind of works, but it still says that the type of thisname property can either be a string or a number, which is not true. It's only a string.
    // query: Record<keyof T, (val: T[keyof T]) => boolean > // <--- replace this!
    // This gives me the ability to create a Record object whose property names match
    // those of the target object.
) {
    return items.filter(item => {
        // iterate through each of the item's properties
        for (const property of Object.keys(item)) {

            // get the query for this property name
            const propertyQuery = query[property]

            // see if this property value matches the query
            if (propertyQuery && propertyQuery(item[property])) {
                return true
            }
        }

        // nothing matched so return false
        return false
    })
}

const matches = query(
    [
        { name: "Ted", age: 12 },
        { name: "Angie", age: 31 }
    ],
    {
        name: name => name === "Angie",
        age: age => age > 30
    })
