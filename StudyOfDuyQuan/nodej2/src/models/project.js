const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete'); // import mongoose 

const customerSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
})

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true   
    },
    startDate: String,
    endDate: String,
    description: String,
    customerInfo: customerSchema,
    userInfor: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    leader: userSchema,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
},{
    timestamps: true,
})

projectSchema.plugin(mongoose_delete, { overrideMethods: 'all' }, { deletedAt : true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;