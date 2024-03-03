// const redis=require('redis')

// let client = redis.createClient(6379);

// client.on('error', (err) => {
//   console.log(err);
// });

const { createClient } =require('redis');

const client =  createClient({
    password: 'BFKegNNl2rh5anmWVkcEJfjYmfA7m1yL',
    socket: {
        host: 'redis-12446.c321.us-east-1-2.ec2.cloud.redislabs.com',
        port: 12446
    }
});





client.on('error', (err) => {
    console.log('err')
    console.log(err);
  });


  (async()=>{
    try {
        await client.connect();
    } catch (error) {
    console.log(error) 
    }
})();


module.exports=client;