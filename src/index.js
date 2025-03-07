import "./styles.css"

import {Task} from "./task.js"
import {Project} from "./project.js"
import { pubSub } from "./pubSub.js"

const collectionManager = (function() {
    const collection = []
    
    const addProject = (project) => {
        collection.push(project)
        pubSub.notify("project-created", project)
        console.log(collection)
    }

    const getCollection = () => {
        return collection
    }

    return {
        addProject,
        getCollection
    }
})()

const formController = (function() {
    const closeAndReset = (modal, form) => {
        modal.close()
        form.reset()
    }

    return {
        closeAndReset
    }
})()

const taskFormHandler = (function() {
    const addTaskBtns = document.querySelectorAll(".add-task")
    const taskDialog = document.querySelector("#task-dialog")
    const taskForm = document.querySelector("#task-form")
    const projectMenu = taskForm.querySelector("#select-project")
    const taskCancelBtn = taskForm.querySelector(".cancel")

    addTaskBtns.forEach((button) => {
        button.addEventListener("click", () => {
            taskDialog.showModal()
        })
    })

    taskCancelBtn.addEventListener("click", () => {
        formController.closeAndReset(taskDialog, taskForm)
    })

    taskForm.addEventListener("submit", () => {
        const title = taskForm.querySelector("#task-title").value
        const description = taskForm.querySelector("#task-desc").value
        const dueDate = taskForm.querySelector("#task-due-date").value
        const priority = taskForm.querySelector("#task-priority").value
        const projId = projectMenu.value
        const task = new Task(title, description, dueDate, priority, projId)

        // collectionManager.findProject(projId).addTask(task)
        console.log({title, description, dueDate, priority, projId})
        formController.closeAndReset(taskDialog, taskForm)
    })

    const updateProjectOptions = (projects) => {
        projectMenu.replaceChildren()
        
        for (const project of projects) {
            const option = document.createElement("option")
            option.value = project.id
            option.textContent = project.title
            projectMenu.appendChild(option)
        }
    }

    pubSub.subscribe("project-created", () => {
        updateProjectOptions(collectionManager.getCollection())
    })

})()

const projectFormHandler = (function() {
    const addProjectBtn = document.querySelector(".add-project")
    const projectDialog = document.querySelector("#project-dialog")
    const projectForm = document.querySelector("#project-form")
    const projectCancelBtn = projectForm.querySelector(".cancel")

    addProjectBtn.addEventListener("click", () => {
        projectDialog.showModal()
    })

    projectCancelBtn.addEventListener("click", () => {
        formController.closeAndReset(projectDialog, projectForm)
    })

    projectForm.addEventListener("submit", () => {
        const title = projectForm.querySelector("#project-title").value
        const project = new Project(title)

        collectionManager.addProject(project)
        formController.closeAndReset(projectDialog, projectForm)
    })

})()
