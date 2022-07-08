const express = require('express')
const app = express()
app.set('port', 4000)
app.listen(app.get('port'), () => {
    console.log(`app is listening at port 4000`)
})