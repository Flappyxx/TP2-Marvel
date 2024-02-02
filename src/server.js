import fastify from "fastify";
import fastifyView from "@fastify/view";
import handlebars from "handlebars";
import  {getData} from "./api.js";

const app = fastify();

app.register(fastifyView, {
    engine: {
        handlebars: handlebars,
    },
    templates: '../templates',
    options: {
        partials : {
            header : "../templates/_partials/header.hbs",
            footer : "../templates/_partials/header.hbs",
        }
    }
});


app.get('/', async (request, reply) => {
    const context = {
        characters: await getData("https://gateway.marvel.com:443/v1/public/characters")
    };
    return reply.view('index.hbs', context);
});


app.listen({ port: 3000 }, (err) => {
    if (err) throw err;
    console.log(`server listening on ${app.server.address().port}`);
});