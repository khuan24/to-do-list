import { pubSub } from "./pubSub.js"

export class Task {
    static idCount = 0

    constructor(title, description, dueDate, priority, projectId) {
        this.title = title
		this.description = description
        this.dueDate = dueDate // need to decide how to format
		this.priority = priority

		this.isComplete = false

		this.id = Task.idCount
		this.projectId = projectId
		
		Task.idCount += 1

        pubSub.notify("task-created", this)
    }

    update(updates) {
        // add warning if due date is in the past

        Object.assign(this, updates)

        pubSub.notify("task-updated", this)
    }

    toggleComplete() {
        if (this.isComplete) {
            this.isComplete = false
        } else {
            this.isComplete = true
        }
    }
}