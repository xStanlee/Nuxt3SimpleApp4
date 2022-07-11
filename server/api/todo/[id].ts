import { HttpMethods } from "./index";
import { db } from "../db/index"
import { sendError } from "h3";

function findToDoById(e, todoId) {
        let index;
        
        const todo = db.todos.find((t, i) => {
            index = t.id === todoId ? i : undefined;
            return i ? true : false;
        });
        if(!todoId) {
            const TodoNotFoundError = createError({
                statusCode: 404,
                statusMessage: "Todo not found!",
                data: {}
            });

            sendError(e, TodoNotFoundError);
        }
        return { todo, index };
}

export default defineEventHandler((event) => {
    const method = event.req.method;
    const { context } = event;
    const { id } = context.params;

    if(method === HttpMethods.PUT) {
        const { todo, index } = findToDoById(event, id);
        const updateTodo = {
            ...todo,
            completed: !todo.completed,
        }
        db.todos[index] = updateTodo;
        return updateTodo;
    }

    if (method === HttpMethods.DELETE) {
        const { index } = findToDoById(event, id);

        db.todos.splice(index, 1);

        return {
            message: "Item deleted"
        }
    }
});