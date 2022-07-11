import { sendError } from "h3";
import { v4 as uniqueID } from "uuid";
import { db } from "../db/index";

export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export default defineEventHandler(async (event) => {
    const httpMethods = event.req.method || HttpMethods.GET;
    
    if (httpMethods === HttpMethods.GET) {
        return db.todos;
    }

    if (httpMethods === HttpMethods.POST) {
        const body = await useBody(event);

        if(!body.item) {
            const NoItemProvidedError = createError({
                statusCode: 400,
                statusMessage: "No item provided!",
                data: {}
            });

            sendError(event, NoItemProvidedError);
        }

        const newTodo = {
            id: uniqueID(),
            item: body.item,
            completed: false
        }

        db.todos.push(newTodo);
        return newTodo;
    }
})
