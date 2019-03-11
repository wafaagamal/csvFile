var fs =require ('fs')
const yargs = require('yargs')
const csv=require('csvtojson/v2')

var argv=yargs.option('path', {
    alias: 'p',
    default: process.env.p,
    demand:true,
    describe:"path to folder"
  })
  .argv
  

 async function parseCSV(csvFilePath,arr){

    let readStream=require('fs').createReadStream(csvFilePath);
    let json=await csv().fromStream(readStream);

    json = json.map((i)=>{
        let o = {};
        arr.forEach((el)=>{
            o[el]=i[el];    
        }) 
        return o;
    });
      fs.writeFileSync('result.json',JSON.stringify(json,undefined,2) ,(err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
      
   
}

let csvFilePath=argv.path
let arr=["Segment","Country", "Product"]
parseCSV(csvFilePath,arr)
            