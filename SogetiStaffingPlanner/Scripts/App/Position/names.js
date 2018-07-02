let names = {
    getLastModifiedUserName: function (id, that) {
        for (let i = 0; i < that.users.length; i++) {
            if (that.users[i].UserId === that.positionDetail.LastModifiedUserId) {
                return that.users[i].UserFullName;
            }
        }
        return that.users[1].UserFullName;
    },
    getUnitName: function (unitId, that) {
        for (unit in that.units) {
            if (that.units[unit].UnitId == unitId) {
                return (that.units[unit].UnitName);
            }
        }
    },
    getGradeName: function (gradeId, that) {
        for (grade in that.grades) {
            if (that.grades[grade].GradeId == gradeId) {
                return (that.grades[grade].GradeName);
            }
        }
    },
    getPositionStatus: function (positionStatusId, that) {
        for (positionStatus in that.positionStatuses) {
            if (that.positionStatuses[positionStatus].PositionStatusId == positionStatusId) {
                return (that.positionStatuses[positionStatus].PositionStatusName);
            }
        }
    },
    testFunc: function (that) {
        console.log(that);
    }
}