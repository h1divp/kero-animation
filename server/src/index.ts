import express from 'express'
import 'dotenv/config';

const app = express()
const port = process.env.port
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/posts', async (req, res) => {
    res.send('Posts')
})

// app.post('/messages', async (req, res) => {
// })
//
// app.delete('/messages', async (req, res) => {
// })
//
// app.get('/users', async (req, res) => {
// })
//
// app.post('/users', async (req, res) => {
// })
//
// // Updates user location so far, going to add updating and checking messages in next push
// app.put('/users', async (req, res) => {
// })
//
// app.delete('/users', async (req, res) => {
// })
//
// Error handling
app.get('*', (req, res) => {
    // res.json("404: Path could not be found! COULD NOT {GET}")
    res.json({"errorType":1,"errorMsg":"Invalid Path"})
    res.status(404)
})

app.post('*', (req, res) => {
    // res.json("404: Path could not be found! COULD NOT {POST}")
    res.json({"errorType":1,"errorMsg":"Invalid Path"})
    res.status(404)
})

app.put('*', (req, res) => {
    // res.json("404: Path could not be found! COULD NOT {PUT}")
    res.json({"errorType":1,"errorMsg":"Invalid Path"})
    res.status(404)
})

app.delete('*', (req, res) => {
   // res.json("404: Path could not be found! COULD NOT {DELETE}")
   res.json({"errorType":1,"errorMsg":"Invalid Path"})
   res.status(404)
})

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`)
})
