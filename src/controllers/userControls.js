const { admin, database } = require('../utils/firebase')
const chalk = require("chalk");

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        const userRef = database.collection('users').doc(user.uid)
        userRef.set({
            uid: user.uid,
            email: user.email,
            name: user.name,
            todos:[]
        })
            .then((resp) => {
                console.log("New user details saved in db")
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "User created.",
                    },
                    wasUserRegistered: false,
                    isRegSuccess: true,
                })
            })
            .catch((e) => {
                console.log("Error in saving user details to db")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Server Side error contact support"
                    },
                    wasUserRegistered: false,
                    isRegSuccess: false,
                })
            })

    })
}

const checkUserUid = (uid) => {
    console.log("checkuseruid")
    return new Promise((resolve, reject) => {
        admin.auth().getUser(uid)
            .then((resp) => {
                console.log(chalk.green("User uid verified!"))
                resolve(resp)
            })
            .catch((err) => {
                console.log(chalk.red("User UID Not verified from authentication!"))
                reject({ error: err.message, message: "Unauthorised" })
            })
    })
}

const checkUserObject = (uid, resp) => {
    return new Promise(async (resolve, reject) => {
        console.log("Entered checkUserObject")
        const userRef = await database.collection('Users').doc(uid)
        console.log("wait")
        userRef.get()
            .then((docSnapshot) => {
                console.log("got docSnapshot")
                console.log(docSnapshot)
                if (docSnapshot._fieldsProto !== undefined) {
                    console.log(docSnapshot.exists)
                    resolve({
                        statusCode: 200,
                        payload: {
                            msg: "User Checked",
                            responce: resp
                        }
                    })
                } else {
                    console.log("400")
                    reject({
                        statusCode: 400,
                        payload: {
                            msg: "User not found"
                        }
                    })
                }
            })
            .catch((err) => {
                console.log(chalk.red("User uid un-verified from database!"))
                reject({
                    statusCode: 400,
                    error: err.message,
                    message: "Unauthorised"
                })
            })
    })
}

const getUserInfo = (uid) => {
    return new Promise((resolve, reject) => {
        console.log(chalk.yellow("Getting user info..."))
        const userRef = database.collection('Users').doc(uid)
        userRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    userRef.onSnapshot((doc) => {
                        console.log(chalk.green("User exists!"));
                        console.log(doc._fieldsProto)
                        resolve(true)
                    });
                }
                else {
                    resolve(false)
                }
            }).catch((err) => {
                console.log(chalk.red("Error in fetching user details!"));
                reject(err)
            })
    })
}

module.exports = {
    createUser,
    checkUserUid,
    getUserInfo,
    checkUserObject
}