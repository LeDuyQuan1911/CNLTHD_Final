const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete'); // import mongoose 

const userSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
})

const projectSchema = new mongoose.Schema({
    name:String,
    startDate: String,
    endDate: String,
    description: String,
})

const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true   
    },
    description: String,
    status: String,
    startDate: String,
    endDate: String,
    userInfo: userSchema,
    projectInfo: projectSchema
},{
    timestamps: true,
})

taskSchema.plugin(mongoose_delete, { overrideMethods: 'all' }, { deletedAt : true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;