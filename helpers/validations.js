'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'LearnerAnalytics';
const models = require('./../Models');
var User = models.Users;
var Guser = models.GroupsUsers;
var Group = models.Groups;

exports.userInGroup = (group, user, IdInstitution) => {
    var p = new Promise(function (resolve, reject) {
        let _user = User.findOne({
            where: {
                UserName: user
            }
        });

        let _group = Group.findOne({
            attributes: ["IdGroup"],
            where: {
                Name: group,
                IdInstitution: IdInstitution
            }
        });

        _user.then((u) => {
            _group.then((g) => {
                if (g) {
                    let result = Guser.findAll({
                        attributes: ["IdGroupUser"],
                        where: {
                            IdGroup: g.IdGroup,
                            IdUser: u.IdUser
                        }
                    });
                    result.then((r) => {
                        resolve(r.length == 1);
                    });
                } else {
                    resolve (false)
                }
            });

        });
    });
    return p;
};
