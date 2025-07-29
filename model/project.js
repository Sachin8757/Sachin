const mongoose=require('mongoose')
const {Schema}=mongoose.Schema;
const dotenv=require('dotenv').config();
 const url=process.env.ATLASDB_URL;
main().then(()=>{
    console.log("db connected !");
}).catch((err)=>{
    console.log(err)
})
async function main() {
    await mongoose.connect(url)
}

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    github: { type: String, required: true },
    live: { type: String, required: true }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;