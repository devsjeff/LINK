import express from "express"
import cors from "cors"

const app = express()

app.use(cors())

let listt = [
  1,2,3,4,1,2,4,1,1,5,1,7,2,9,
  1,2,4,1,1,5,1,7,2,9
]

app.get("/fivestar", (req, res) => {

    let num = Number(req.query.num)

    res.send({
        list: [
            listt[num],
            listt[num + 1],
            listt[num + 2],
            listt[num + 3],
            listt[num + 4],
            listt[num + 5]
        ]
    })
})

app.listen(3000, () => {
    console.log("started server")
})