let posHelpers = {
    clearForm: function (that) {
        that.addState = false;
        that.updateState = false;
        that.errors = {};
        that.positionName = null;
        that.opportunityNotes = null;
        that.duration = null;
        that.acceptedCandidate = null;
        that.skillset = null;
        that.rate = null;
        that.expectedStartDate = null;
        that.hireCandidate = null;
        that.proposedCandidate = null;
        that.rejectedCandidate = null;
        that.positionNote = null;
        that.numberOfPositions = null;
        that.positionStatusId = null;
        that.opportunityId = null;
        that.unitPracticeId = null;
        that.maxConsultantGradeId = null;
        that.minConsultantGradeId = null;
    },
    buildJSON: function (that) {
        let data = {};
        data.positionId = that.positionId;
        data.opportunityId = that.opportunityId;
        data.unitPracticeId = 4;
        data.maxConsultantGradeId = that.maxConsultantGradeId;
        data.minConsultantGradeId = that.minConsultantGradeId;
        data.numberOfPositions = that.numberOfPositions;
        data.active = that.active;
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
    },
    displayDate: function (date) {
        let returnDate = date;
            returnDate = parseInt(returnDate.slice(6));
            returnDate = new Date(returnDate);
            returnDate = returnDate.toISOString().slice(0, 10);
            return returnDate;
    }
}