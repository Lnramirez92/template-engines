const express = require('express');
const handlebars = require('express-handlebars');

const Contenedor = require('./contenedor');
const contenedor = new Contenedor("./assets/productos.json");

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//espacio publico del servidor
app.use(express.static('public'));

//configuramos handlebars
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs'
    })
);

//establecemos el motor de plantillas que se utiliza
app.set("view engine", "hbs");
//establecemos el directorio donde se encuentran los archivos de plantilla
app.set("views", "./views");


app.post("/productos", (req, res) => {
    const producto = req.body;
    contenedor.save(producto);
    res.redirect("/");
});

app.get("/productos", (req, res) => {
    const prods = contenedor.getAll();

    res.render("vista", {
        productos: prods,
        hayProductos: prods.length
    })
});


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en el servidor ${error}`));