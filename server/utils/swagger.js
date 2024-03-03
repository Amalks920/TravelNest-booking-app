const { Express }= require("express");
const swaggerJsdoc=require('swagger-jsdoc') 
const swaggerUI= require('swagger-ui-express')
const { version }= require("../package.json") ;
const  log = require("./logger");


const options={
    definition:{
        openapi:'3.0.0',
        info:{
          //  title:"TravelNest hotel booking  website Docs",
          title:"Second Project Documentation",
            version:'1.0'
        },
        components:{
            securitySchemas:{
                bearerAuth:{
                    type:'http',
                    scheme:'bearer',
                    bearerFormat:'JWT',
                },
            },
        },
        security:[
            {
                bearerAuth:[],
            }
        ]
    },
    apis:["./src/api/routes/*.js","./src/api/models/*.js"]
};

const swaggerSpec=swaggerJsdoc(options)

function swaggerDocs(app,port){
    app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec)
    )

    app.get('/docs.json',(req,res)=>{
        res.setHeader('Content-Type','application/json');
        res.send(swaggerSpec)
    })
    log.info(`Docs available at http://localhost:${port}/docs`);
}

module.exports=swaggerDocs


