/* This object contains methods that perform varios AJAX requests to the controller. */
/* Note that the this context is being passed in to these as the parameter 'that'.  */

let requests = {
    fetchPositions: function (that) {
        $.ajax({ // get positions
            async: false,
            cache: false,
            type: "GET",
            url: "GetPosition",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.positions = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        })
    },
    getUserList: function (that) {
        $.ajax({ // User list
            async: false,
            cache: false,
            type: "GET",
            url: "GetUserList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                that.users = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        });
    },
    getOpportunityList: function (that) {
        $.ajax({ // get opportunity list
            async: false,
            cache: false,
            type: "GET",
            url: "GetOpportunityList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.opportunities = data;
            }.bind(that)
        });
    },
    getUnitList: function (that) {
        $.ajax({ // get Unit list
            async: false,
            cache: false,
            type: "GET",
            url: "GetUnitList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.units = data;
            }.bind(that)
        });
    },
    getPositionStatusList: function (that) {
        $.ajax({ // Get Position Status List 
            async: false,
            cache: false,
            type: "GET",
            url: "GetPositionStatusList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.positionStatuses = data;
            }.bind(that)
        });
    },
    postPosition: function (that, data) {
        console.log(this);
    },
    buildPositionJSON: function (that) {  
            let data = {};
            data.positionId = that.positionId;
            data.opportunityId = that.opportunityId;
            data.unitPracticeId = 4;
            data.maxConsultantGradeId = that.maxConsultantGradeId;
            data.minConsultantGradeId = that.minConsultantGradeId;
            data.numberOfPositions = that.numberOfPositions;
            data.active = true;
            data.positionStatusId = that.positionStatusId;
            data.lastModifiedUserId = 1;
            data.lastModified = 1;
            data.positionName = that.positionName;
            data.duration = that.duration;
            data.acceptedCandidate = that.acceptedCandidate;
            data.skillset = that.skillset;
            data.rate = that.rate;
            data.expectedStartDate = that.expectedStartDate;
            data.hireCandidate = that.hireCandidate;
            data.proposedCandidate = that.proposedCandidate;
            data.rejectedCandidate = that.rejectedCandidate;
            data.positionStatusId = that.positionStatusId;
            data.positionNote = that.positionNote;
            return data;       
    }
};