const express = require('express')
const app = express()
const instructors = require('./data/instructors')
const cors = require('cors')

const port = process.env.PORT || 3000

app.use(cors())

app.get('/', (req, res) => {
    return res.json({
        data: instructors
    })
})

function getInstructorById(id) {
    for(i = 0; i < instructors.length; i++) {
        if(instructors[i].id === +id) {
            return instructors[i]
        }
    }
    return null
}

app.get('/:id', (req, res, next) => {
    const instructor = getInstructorById(req.params.id)

    if(!instructor) {
        res.status(404).json({
            message: "No record found!"
        })
    } else {
        return res.json({
            data: instructor
        })
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
