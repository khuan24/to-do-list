import { pubSub } from "./pubSub"

export class Project {
    static idCount = 0

    constructor(title) {
        this.title = title
        this.tasks = [] // always sorted from most recent
        this.id = Project.idCount

        Project.idCount += 1
        pubSub.notify("project-created", this)
    }

    update(title) {
        this.title = title
        pubSub.notify("project-updated", this)
    }

    addTask(task) {
        const date = task.dueDate
        // find where to push by comparing dates
        // push to tasks[]
        pubSub.notify("project-updated", this)
    }

    removeTask(id) {
        const index = tasks.map(task => task.id).indexOf(id)
        tasks.splice(index, 1)
        pubSub.notify("project-updated", this)
    }

    findTask(id) {
        const index = tasks.map(task => task.id).indexOf(id)
        return this.tasks[index]
    }
}