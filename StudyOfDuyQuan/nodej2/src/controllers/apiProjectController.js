const express = require('express');
const Project = require("../models/project")
const aqp = require('api-query-params');

const postCreateProject = async (req, res) => { 
    if(req.body.type == "ADD_PROJECT"){
        const { name, startDate, endDate, description, customerInfo, leader } = req.body
        const result = await Project.create({
            name: name,
            startDate: startDate,
            endDate: endDate,
            description: description,
            customerInfo: customerInfo,
            leader: leader
        })
        console.log(result)
        res.status(200).json({
            message: 'Hello world',
            errorCode: 0,
            data: result
        })
    }
    if(req.body.type == "ADD_USER"){    
        let userInfor = req.body.userInfor // userInfor: array of user _id
        let projectId = req.body.projectId
    
        // Tìm project
        let result = await Project.findById(projectId)
        if (!result) {
            return res.status(404).json({
                message: 'Project not found',
                errorCode: 1
            });
        }
    
        // Thêm user vào mảng userInfor (nếu chưa có)
        result.userInfor.push(...userInfor) // spread array
    
        let newResult = await result.save()
        return res.status(200).json({
            message: 'Users added to project',
            errorCode: 0,
            data: newResult
        })
    }
}

const postCreateTask = async (req, res) => { 
    res.status(200).json({
        message: 'Hello world',
        errorCode: 0,
        data: req.body
    })
}
const getProject = async (req, res) => {
    const { filter, limit, page, population } = aqp(req.query)
    console.log(filter, limit, page, population)
    const result = await Project.find(filter).limit(limit).skip((page - 1) * limit).populate(population)
    console.log(result)
    return res.status(200).json({
        message: 'Hello world',
        errorCode: 0,
        data: result
    })
 }

const updateProject = async (req, res) => {
    const { id, name } = req.body
    const result = await Project.findByIdAndUpdate(id, {name}, { new: true })
    return res.status(200).json({
        message: 'Hello world',
        errorCode: 0,
        data: result
    })
}

const deleteProject = async (req, res) => {
    const { id } = req.body
    const result = await Project.delete({ id })
    return res.status(200).json({
        message: 'Hello world',
        errorCode: 0,
        data: result
    })
}

const deleteProjectUsers = async (req, res) => {
    const { id, userInfor } = req.body
    console.log(id, userInfor)
    const result = await Project.findByIdAndUpdate(id, { $pull: { userInfor: { $in: userInfor } } }, { new: true })
    return res.status(200).json({
        message: 'Hello world',
        errorCode: 0,
        data: result
    })
}


module.exports = {
    postCreateProject, postCreateTask,getProject, updateProject, deleteProject, deleteProjectUsers

}