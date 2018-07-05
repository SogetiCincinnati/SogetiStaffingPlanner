let validate = {
    /* When a user hits submit, that function will check all the forms. */
    checkForm: function (that) {
        console.log('validate working');
        that.errors = {};
        /*Checks to see if forms are empty */
        if (!that.positionName) {
            that.errors.positionName = 'Position Name required';
        } if (!that.numberOfPositions) {
            that.errors.numberOfPositions = 'Number of Positions required';
        } if (!that.positionStatusId) {
            that.errors.positionStatusId = 'Position Status required';
        } if (!that.opportunityId) {
            that.errors.opportunityId = 'Opportunity required';
        }
        if (!that.errors.length) { return true; }
    },
    checkPositionName: function (val, that) {
        try {
            if (val.length || val) { that.errors.positionName = ''; }
            else {
                that.errors.positionName = 'Position Name required';
            }
        } catch (e) { }

    },
    checkDuration: function (val, that) {
        if (val < 1) {
            that.errors.duration = 'Duration has to be atleast 1';
        } else { that.errors.duration = ''; }
        if (val % 1 != 0) {
            that.errors.duration += ' Cannot be a decimal.'
        }
    },
    checkRate: function (val, that) {
        if (val < 30) {
            that.errors.rate = 'Rate cannot be below 30.';
        } else { that.errors.rate = ''; }
        if (val % 1 != 0) { // check for decimals
            that.errors.rate += ' Cannot be a decimal.'
        }
    },
    checkNumberOfPositions: function (val, that) {
        if (val < 1) {
            that.errors.numberOfPositions = 'Number of Positions has to be atleast 1.';
        } else { that.errors.numberOfPositions = ''; }
        if (val % 1 != 0) {
            that.errors.numberOfPositions += ' Cannot be a decimal.'
        }
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
    },
}