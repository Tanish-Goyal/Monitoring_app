const AppModel = require('../model/app.model')

const appService = {
    createApp: async (appData)=>{
        const app = new AppModel(appData)
        await app.save()
        return app.id;
    },

    deleteApp: async (appId)=>{
        await AppModel.findByIdAndDelete(appId)
    },

    getApp: async(appId)=>{
        var app = await AppModel.findById(appId)
        return app
    },

    getAppList: async(projectId, page, limit)=>{
        var apps = await AppModel.find({projectId:projectId}).skip(page).limit(limit).exec()
        return apps
    }
    
}

module.exports = appService