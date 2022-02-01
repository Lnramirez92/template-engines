module.exports = class Contenedor {

    fs = require("fs")

    constructor(path){
        this.path = (path)? path:'./assets/productos.json',
        this.data = ''
    }

    save(objeto){
        let newId = 1
        const data = this.fs.readFileSync(this.path)

        if(data.length > 0){
            const jsonData = JSON.parse(data)
            newId = jsonData.reduce((acc,item) => {return (Math.max(acc, item.id))}, 0) + 1 // Revisar los parentesis
            jsonData.push({title: objeto.title, price: objeto.price, thumbnail: objeto.thumbnail, id: newId})
            this.data = JSON.stringify(jsonData)
            try {
                this.fs.writeFileSync(this.path, JSON.stringify(jsonData))
            } catch (error) {
                console.log("ERROR")
            }
        }
    else{
        const products = []
        const product = {title: objeto.title, price: objeto.price, thumbnail: objeto.thumbnail, id: newId}
        products.push(product)

        try {
            this.fs.writeFileSync(this.path, JSON.stringify(products))
        } catch (error) {
            console.log("ERROR")
        }
    }
    return newId
    }

    upload(prod, id){
        let data = this.fs.readFileSync(this.path);
        let nuevoproducto = {title: prod.title, price: prod.price, thumbnail: prod.thumbnail, id: id}
        if(data.length > 0){
            let jsonData = JSON.parse(data)
            jsonData[id - 1] = nuevoproducto;
            try {
                this.fs.writeFileSync(this.path, JSON.stringify(jsonData))
            } catch (error) {
                console.log("ERROR")
            }
        }
    }

    getAll(){
        const data = this.fs.readFileSync(this.path)
        if(data.length > 0){
            const jsonData = JSON.parse(data)
            return jsonData
        }
            return null 

    }

    getById(id){
        const data = this.fs.readFileSync(this.path)
        if(data.length > 0){
        const jsonData = JSON.parse(data)
        const row = jsonData.find((product) => product.id == id)
        return row

        }
        return null
    }

    deleteById(id){
        const data = this.fs.readFileSync(this.path)
        if(data.length > 0){
            const jsonData = JSON.parse(data)
            const newArray = [...jsonData].filter(product => product.id != id)
            try {
                this.fs.writeFileSync(this.path, JSON.stringify(newArray))
            } catch (error) {
                console.log("ERROR")
            }
        }
        else{
            console.log("No se puede borrar un archivo que este vacío")
        }
    }

    deleteAll(){
        this.writeFileSync(this.path, '')
    }
}