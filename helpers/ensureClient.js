var odm = require("./../helpers/configCosmos").odm;
const models = require('./../ModelsMx');
var user = models.Users;
var guser = models.GroupsUsers;

exports.ensureClient = function (client_id) {
    var p = new Promise(function (resolve, reject) {
        odm.settings.findOne({ "Category": "Authentication", "Key": "ClientId" }).then(function (clientId) {
            resolve(clientId.Value == client_id);
        });
    });
    return p;
};

exports.userInGroup = function(group){

}