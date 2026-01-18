/*  exercise files. I've already created the tsconfig.json file, but your challenge is to find a place to apply each of the techniques that I've shown you in this chapter. 
First, create an interface to describe the structure of this variable. Hint: It's an array. So you want to define the interface for the type of items that are in the array, not the whole array.
Next, I want you to strongly type some hard-coded values with an enum. Then, apply types to the parameters and return values of these functions. 
And also, use a generic parameter to define the parameter type of this function. This one will probably take you a little bit longer to finish. You might be able to finish it in under 15 minutes, but don't be disappointed if it takes you longer than that.
*/
interface ToDo {
    id: number;
    title: string;
    status: TodoStatus;
    completedOn?: Date;
}

enum TodoStatus {
    Done = "done",
    InProgress = "in-progress",
    ToDo = "todo"
}

const todoItems: ToDo[] = [
    { id: 1, title: "Learn HTML", status: TodoStatus.Done, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: TodoStatus.InProgress },
    { id: 3, title: "Write the best app in the world", status: TodoStatus.ToDo },
]

// And also, use a generic parameter to define the parameter type of this function. This one will probably take you a little bit longer to finish. You might be able to finish it in under 15 minutes, but don't be disappointed if it takes you longer than that.
function addTodoItem(todo: string): ToDo {
    const id = getNextId(todoItems)

    const newTodo = {
        id,
        title: todo,
        status: TodoStatus.ToDo,
    }

    todoItems.push(newTodo)

    return newTodo
}

function getNextId<T extends { id: number }>(items: T[]): number {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))
