const ProjectModel = require('../model/project.model')

const projectService = {
    createProject: async (ProjectData)=>{
        const project = new ProjectModel(ProjectData)
        await project.save()
        return project.id;
    },

    deleteProject: async (ProjectId)=>{
        await ProjectModel.findByIdAndDelete(ProjectId)
    },

    getProject: async(projectId)=>{
        var project = await ProjectModel.findById(projectId)
        return project
    },

    getProjectList: async(userId, page, limit)=>{
        var projects = await ProjectModel.find({userId:userId}).skip((page-1)*limit).limit(limit).exec()
        return projects
    }

}

module.exports = projectService