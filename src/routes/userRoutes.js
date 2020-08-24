const router = require("express")();
const userCreate = require("../middlewares/userCreateMiddleware");
const userLogin = require("../middlewares/loginMiddleware");
const userControls = require("../controllers/userControls");

router.post('/create',[userCreate], (req, res) => {
    userControls.createUser(req.user)
        .then(resp => res.status(200).send(resp))
        .catch(err => res.status(400).send(err))
})

router.post('/login',[userLogin], (req, res) => {
    userControls.createUser(req.user)
        .then(resp => res.status(200).send(resp))
        .catch(err => res.status(400).send(err))
})

module.exports = router;