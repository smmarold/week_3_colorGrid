//Set up express
const express = require(`express`);
const app = express();
//Include the file system functions
const fs =require(`fs`);
//Include and set the hbs (handlebars) view engine
const hbs = require(`hbs`)
app.set(`view engine`,`hbs`)
//register the location of partial snippets for the view engine
hbs.registerPartials(__dirname + `/views/partials`,(err)=>{})
hbs.registerHelper('table', (tableSize)=>{
    let html = ''

    for(let i = 0; i<tableSize; i++){
        html += '<tr>';
        for(let i = 0; i<tableSize; i++){

            let color = ((1<<24)*Math.random()|0).toString(16);
            html += `<td style="background-color:#${color};">${color}<br /><div style="color: white;">${color}</div></td>`
        }
        html += '</tr>'
    }

    return new hbs.handlebars.SafeString(html);
})
//Uses extended url capability
app.use(express.urlencoded({extended:true}));
//add the static asset folder
app.use(express.static(`${__dirname}/public`));
//allow express json functionality
app.use(express.json())

//Route to the root directory. 
app.get(`/`, (req,res)=>{
    res.render(`index`)
})

app.post('/generate_table', (req, res)=>{

    //let {size} = req.body

    res.render('table', {size: req.body.size})
})

let port = process.env.PORT || 80;
app.listen(port, () => {
	console.log(`Server Running at localhost:${port}`);
});