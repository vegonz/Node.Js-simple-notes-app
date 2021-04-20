const { response } = require("express")
const express = require("express")
const notes = require("./notes")

const log  = console.log

// express config
const app = express()
const port = 3000
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))

// display a listing of the resource
app.get("/", (request, response) => {
    const notes_array = notes.index()
    response.render('list_notes', {
        notes: notes_array
    })
})

// show the form for creating a new resource
app.get("/create", (request, response) => {
    response.render("index", {
        message: "Welcome to App Notes!"
    })
})

// store a newly created resource in storage
app.post('/store', (request, response) => {
    log(request.body)
    const title = request.body.title
    const body = request.body.body

    notes.store(title, body)

    response.redirect('list_notes')
})

// display the specified resource
app.get("/:title", (request, response) => {
    response.send("show page")
})

// edit 
// show the form for editing the specified resource
// /:title

// update the specified resource in storage
app.put("/", (request, response) => {

})

// remove the sprecified resource from storage
app.delete("/:title", (request, response, next) => {
    next(new Error('not implemented'))
})


app.listen(port, () => {
    log('Listening at http://localhost:3000')
})