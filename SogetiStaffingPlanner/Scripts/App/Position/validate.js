let validate = {
    /* When a user hits submit, that function will check all the forms. */
    checkForm: function (that) {
        console.log('validate working');
        that.errors = {};
        /*Checks to see if forms are empty */
        if (!that.positionName) {
            that.errors.positionName = 'Position Name required';
        } if (!that.duration) {
            //that.errors.duration = 'Duration required';
        } if (!that.acceptedCandidate) {
            //that.errors.acceptedCandidate = 'Accepted Candidate required';
        } if (!that.skillset) {
            //that.errors.skillset = 'Skillset required';
        } if (!that.rate) {
            //that.errors.rate = 'Rate required';
        } if (!that.expectedStartDate) {
            //that.errors.expectedStartDate = 'Exepcted Start Date required';
        } if (!that.hireCandidate) {
            //that.errors.hireCandidate = 'Hire Candidate required.';
        } if (!that.proposedCandidate) {
            //that.errors.proposedCandidate = 'Proposed Candidate required';
        } if (!that.rejectedCandidate) {
            //that.errors.rejectedCandidate = 'Rejected Candidate required.';
        } if (!that.positionNote) {
            //that.errors.positionNote = 'Position Note required';
        } if (!that.numberOfPositions) {
            that.errors.numberOfPositions = 'Number of Positions required';
        } if (!that.positionStatusId) {
            that.errors.positionStatusId = 'Position Status required';
        } if (!that.opportunityId) {
            that.errors.opportunityId = 'Opportunity required';
        } if (!that.unitPracticeId) {
            //that.errors.unitPracticeId = 'Unit Practice required';
        } if (!that.maxConsultantGradeId) {
            //that.errors.maxConsultantGradeId = 'Max Consultant Grade required';
        } if (!that.minConsultantGradeId) {
            //that.errors.minConsultantGradeId = 'Min Consultant Grade required.';
        }
        

        //Check for sql-injection
        
        //if (!that.positionName === "") {
        //    that.errors.positionName = 'Invalid charachers input';
       // }
        //contains "" or;; tha.eeror.postionNmae = "Invalid charachers input"


        /* Looks for duplicate Opportunity Names - if adding NEW, but not if UPDATING */
        if (!that.updateState) {
            for (let i = 0; i < that.positions.length; i++) {

                if (that.positionName == that.positions[i].PositionName) {
                    that.errors.push('Position Name: "' + that.positionName + '" already exists.')
                    break;
                }
            }
        }
        if (!that.errors.length) { return true; }
    },
    checkPositionName: function (val, that) {
        try {
            if (val.length || val) { that.errors.positionName = ''; }
            else {
                that.errors.positionName = 'Position Name required';
            }
            if (!that.updateState) {
                for (let i = 0; i < that.positions.length; i++) {
                    if (val == that.positions[i].PositionName) {
                        that.errors.positionName = '"' + that.positionName + '" already exists.';
                        break;
                    }
                }
            }
        } catch (e) { }

    },
    /*
    checkDuration: function (val, that) {
        try {
            if (val.length || val) { that.errors.duration = ''; }
            else { that.errors.duration = 'Duration required'; }
        } catch (e) { }

    },*/
    /*
    checkAcceptedCandidate: function (val, that) {
        try {
            if (val.length) { that.errors.acceptedCandidate = ''; }
            else { that.errors.acceptedCandidate = 'Accepted Candidate required'; }
        } catch (e) { }

    },*/
    /*checkSkillset: function (val, that) {
        try {
            if (val.length) { that.errors.skillset = ''; }
            else { that.errors.skillset = 'Duration required'; }
        } catch (e) { }

    },*/
    /*
    checkRate: function (val, that) {
        try {
            if (val.length || val) { that.errors.rate = ''; }
            else { that.errors.rate = 'Rate required'; }
        } catch (e) { }

    },*/
    /*
    checkExpectedStartDate: function (val, that) {
        try {
            if (val.length) { that.errors.expectedStartDate = ''; }
            else { that.errors.expectedStartDate = 'Expected Start Date required'; }
        } catch (e) { }

    },*/
    /*
    checkHireCandidate: function (val, that) {
        try {
            if (val.length) { that.errors.hireCandidate = ''; }
            else { that.errors.hireCandidate = 'Hire Candidate required'; }
        } catch (e) { }

    },
    checkProposedCandidate: function (val, that) {
        try {
            if (val.length) { that.errors.proposedCandidate = ''; }
            else { that.errors.proposedCandidate = 'Proposed Candidate required'; }
        } catch (e) { }

    },*/
    /*
    checkRejectedCandidate: function (val, that) {
        try {
            if (val.length) { that.errors.rejectedCandidate = ''; }
            else { that.errors.rejectedCandidate = 'Rejected Candidate required'; }
        } catch (e) { }

    },*/
    /*
    checkPositionNote: function (val, that) {
        try {
            if (val.length) { that.errors.positionNote = ''; }
            else { that.errors.positionNote = 'Position Note required'; }
        } catch (e) { }

    },*/
    checkNumberOfPositions: function (val, that) {
        try {
            if (val.length || val) { that.errors.numberOfPositions = ''; }
            else { that.errors.numberOfPositions = 'Number of Positions required'; }
        } catch (e) { }

    },
    checkPositionStatusId: function (val, that) {
        if (val) {
            that.errors.positionStatusId = '';
        }
    },
    checkOpportunityId: function (val, that) {
        if (val) {
            that.errors.opportunityId = '';
        }
    },
    checkUnitPracticeId: function (val, that) {
        if (val) {
            that.errors.unitPracticeId = '';
        }
    },/*
    checkMinConsultantGradeId: function (val, that) {
        if (val) {
            that.errors.minConsultantGradeId = '';
        }
    },*/
    /*
    checkMaxConsultantGradeId: function (val, that) {
        if (val) {
            that.errors.maxConsultantGradeId = '';
        }
    }, */
}