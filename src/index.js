import "./styles.css"

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
        // const projId = ...
        // const task = new Task(...)

        // collectionManager.findProject(projId).addTask(task)
        console.log({title, description, dueDate, priority})
        formController.closeAndReset(taskDialog, taskForm)
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
        // const project = new Project(title)
        
        // collectionManager.addProject(project)
        console.log({title})
        formController.closeAndReset(projectDialog, projectForm)
    })

})()
