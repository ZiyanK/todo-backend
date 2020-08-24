const router = require("express")();
const userAuth = require("../middlewares/userAuth");
const todoControls = require("../controllers/todoControls");

router.post('/createTodo', (req, res) => {
	todoControls.createTodo(req.headers.uid, req.body.todo)
		.then(resp => res.status(200).send(resp))
		.catch(err => res.status(400).send(err))
})

router.patch('/updateTodo', (req, res) => {
	todoControls.updateTodo(req.headers.uid, req.body.todoUID, req.body.task, req.body.completed)
		.then(resp => res.status(200).send(resp))
		.catch(err => res.status(400).send(err))
})

router.post('/deleteTodo', (req, res) => {
	todoControls.deleteTodo(req.headers.uid, req.body.todoUID)
		.then(resp => res.status(200).send(resp))
		.catch(err => res.status(400).send(err))
})

router.get('/getTodos', (req, res) => {
	todoControls.getTodos(req.headers.uid)
		.then(resp => res.status(200).send(resp))
		.catch(err => res.status(400).send(err))
})

router.post('/getFilteredTodos', (req, res) => {
	todoControls.filterTag(req.headers.uid, req.body.tag)
		.then(resp => res.status(200).send(resp))
		.catch(err => res.status(400).send(err))
})

module.exports = router;