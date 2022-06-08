import express, { Application } from 'express'
import cors from 'cors'
const app: Application = express()
const port = process.env.PORT || 9000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

import HomeBackground from './routes/HomeBackground'
app.use('/home-background', HomeBackground)

import AllLegendOverview from './routes/AllLegendOverview'
app.use('/all-legends', AllLegendOverview)

import Legend from './routes/GetLegend'
app.use('/legend', Legend)

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`)
    })
} catch (err: any) {
    console.error(`Error occured: ${err.message}`)
}
