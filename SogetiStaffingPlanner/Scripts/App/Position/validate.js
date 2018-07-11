let validate = {
    /* When a user hits submit, that function will check all the forms. */
    checkForm: function (that) {
        that.errors.positionName = null;
        that.errors.positionStatusId = null;
        that.errors.opportunityId = null;
        that.errors.unitPracticeId = null;
        that.errors.numberOfPositions = null;
        that.errors.duration = null;
        that.errors.rate = null;
        /*Checks to see if forms are empty */
        if (!that.positionName) {
            that.errors.positionName = 'Position Name required';
        } if (!that.positionStatusId) {
            that.errors.positionStatusId = 'Position Status required';
        } if (!that.opportunityId) {
            that.errors.opportunityId = 'Opportunity required';
        } if (!that.numberOfPositions) {
            that.errors.numberOfPositions = 'Number of Positions required';
        }
        try {
            if (that.duration) {
                if (that.duration < 1 && that.duration !== "") {
                    that.errors.duration = 'Duration must be 1 or above.';
                }
                if (that.duration % 1 != 0) {
                    that.errors.duration ? that.errors.duration += ' Cannot be a decimal.' : that.errors.duration = 'Cannot be a decimal.';
                }
            }   

        } catch (e) { }
        try {
            if (that.rate) {
                if (that.rate < 30) {
                    that.errors.rate = 'Rate cannot be below 30.';
                } 
                if (that.rate % 1 != 0) { // check for decimals
                    that.errors.rate ? that.errors.rate += ' Cannot be a decimal.' : that.errors.rate = 'Cannot be a decimal.'; 
                }
            }
        } catch (e) { }
        try {
            if (that.numberOfPositions) {
                if (that.numberOfPositions < 1) {
                    that.errors.numberOfPositions = 'Number of Positions must be greater than 1.';
                }
                if (that.numberOfPositions % 1 != 0) {
                    that.errors.numberOfPositions ? that.errors.numberOfPositions += ' Cannot be a decimal.' : that.errors.numberOfPositions = 'Cannot be a decimal.'; 
                }
            }

        } catch (e) { }
        console.log(Object.keys(that.errors).length);
        if (Object.keys(that.errors).length == 0) {
            return true;
        }

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
        try {
            if (val < 1) {
                that.errors.duration = 'Duration must be 1 or above.';
            } else { that.errors.duration = ''; }
            if (val % 1 != 0) {
                that.errors.duration += ' Cannot be a decimal.'
            }
        } catch (e) { }

    },
    checkRate: function (val, that) {
        try {
            if (val < 30) {
                that.errors.rate = 'Rate cannot be below 30.';
            } else { that.errors.rate = ''; }
            if (val && val % 1 != 0) { // check for decimals
                that.errors.rate += ' Cannot be a decimal.'
            }
        } catch (e) { }

    },
    checkNumberOfPositions: function (val, that) {
        try {
            if (val < 1) {
                that.errors.numberOfPositions = 'Number of Positions must be greater than 1.';
            } else { that.errors.numberOfPositions = ''; }
            if (val && val % 1 != 0) {
                that.errors.numberOfPositions += ' Cannot be a decimal.'
            }
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
    },
}