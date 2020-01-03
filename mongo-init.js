//require('dotenv').config()

let dbName = "ShieldyDB";
let userName = "shieldy";
let userPassword = "shieldy";
let acceptableRoles = ["readWrite", "dbAdmin", "dbOwner", "userAdmin"];

let mydb = db.getSiblingDB(dbName);

//If no collection exists for this db, we create one
if (mydb.getCollectionNames().length < 1) {
    mydb.delete_me.insert({ "why": "Mongo requires creating a collection when creating a new database, once shieldy has created it's collection please delete this one" });
}
// If no user exists for this db with sufficent rights, we create one
if (!(mydb.getUsers().filter(user => user["db"] == dbName &&
    user["roles"].filter(role => acceptableRoles.includes(role["role"]) &&
        role["db"] == dbName).length > 0).length > 0)) {
    mydb.createUser({ user: userName, pwd: userPassword, roles: [{ role: "readWrite", db: dbName }], passwordDigestor: "server" });
}
