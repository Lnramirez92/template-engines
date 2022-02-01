const express = require("express");
const pug = require("ejs");

const Contenedor = require("./contenedor.js");
const contenedor = new Contenedor("./assets/productos.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Espacio publico del servidor
app.use(express.static("public"));

//Establecemos el motor de plantilla que se utiliza por defecto va a la carpeta views asi que no hay que setearla
app.set("view engine", "ejs");


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
})

server.on("Error", error => console.log("Error en el servidor", error));