const { admin, database } = require('../utils/firebase')

const createTodo = (uid, todo) => {
	return new Promise((resolve, reject) => {
		const taskRef = database.collection('users').doc(uid).collection('todos')
		taskRef.add({
			task: todo.task,
			completed: false,
			tags: todo.tags,
			date: new Date()
		})
		.then(() => {
			console.log("Added todo to db");
			resolve({
				statusCode: 201,
				msg: "Todo added succesfully"
			})
		})
		.catch(() => {
			console.log("Not added todo");
			reject({
				statusCode: 400,
				msg: "Something went wrong"
			})
		})
	})
}

const updateTodo = (uid, todoUID, task, completed) => {
	return new Promise((resolve, reject) => {
		const todoRef = database.collection('users').doc(uid).collection('todos').doc(todoUID)
		todoRef.set({
			task: task,
			completed: completed
		})
		.then(() => {
			resolve({
				msg: "Todo has been updated"
			})
		})
		.catch(() => {
			reject({
				msg: "Todo was not updated"
			})
		})
	})
}

const deleteTodo = (uid, todoUID) => {
	return new Promise((resolve, reject) => {
		const todoRef = database.collection('users').doc(uid).collection('todos').doc(todoUID)
		todoRef.delete()
		.then(() => {
			resolve({
				msg: "Todo has been deleted"
			})
		})
		.catch(() => {
			reject({
				msg: "Something went wrong and could not be deleted"
			})
		})
	})
}

const getTodos = (uid) => {
	return new Promise((resolve, reject) => {
		var todos = []
		const todoRef = database.collection('users').doc(uid).collection('todos')
		todoRef.get()
		.then((doc) => {
			doc.forEach((todo) => {
				todos.push(todo.data())
			})
			resolve({
				todos: todos
			})
		})
		.catch(() => {
			reject({
				msg: "Something went wrong"
			})
		})
	})
}

const filterTag = (uid, tag) => {
	return new Promise((resolve, reject) => {
		var filteredTodos = []
		const todoRef = database.collection('users').doc(uid).collection('todos')
		todoRef.get()
		.then((doc) => {
			doc.forEach((todo) => {
				todo.data().tags.find((element) => {
					if(element === tag) {
						filteredTodos.push(todo.data())
					}
				})
			})
			resolve({
				todos: filteredTodos
			})
		})
		.catch((error) => {
			reject({
				msg: error
			})
		})
	})
}

module.exports = {
	createTodo,
	updateTodo,
	getTodos,
	filterTag,
	deleteTodo
}