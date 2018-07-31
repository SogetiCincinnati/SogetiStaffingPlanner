let validate = {
    checkPositionName: function (newVal, oldVal, that) {
        console.log(newVal);
        if (newVal.length < 1) {
            that.errors.positionName = 'Position name required';
            that.errorCount++;
        } else {
            that.errors.positionName = null;
        }
    },
    checkNumberOfPositions: function (newVal, oldVal, that) {
        if (newVal.length < 1) {
            that.errors.numberOfPositions = 'Number of positions required';
            that.errorCount++;
        } else {
            that.errors.numberOfPositions = null;
        }
    },
    checkAcceptedCandidate: function (newVal, oldVal, that) {
        if (newVal.length < 1) {
            that.errors.acceptedCandidate = 'Accepted Candidate required';
            that.errorCount++;
        } else {
            that.errors.acceptedCandidate = null;
        }
    },
    checkProposedCandidate: function (newVal, oldVal, that) {
        console.log('work');
        if (newVal.length < 1) {
            that.errors.proposedCandidate = 'Proposed Candidate required';
            that.errorCount++;
        } else {
            that.errors.proposedCandidate = null;
        }
    },
    checkRejectedCandidate: function (newVal, oldVal, that) {
        if (newVal.length < 1) {
            that.errors.rejectedCandidate = 'Rejected Candidate required';
            that.errorCount++;
        } else {
            that.errors.rejectedCandidate = null;
        }
    },
    checkHiredCandidate: function (newVal, oldVal, that) {
        if (newVal.length < 1) {
            that.errors.hiredCandidate = 'Hired Candidate required';
            that.errorCount++;
        } else {
            that.errors.hiredCandidate = null;
        }
    },
    checkPositionStatusId: function (newVal, oldVal, that) {
        console.log(newVal);
        if (!newVal) {
            that.errors.positonStatusId = 'Position status required';
            that.errorCount++;
        } else {
            that.errors.positionStatusId = null;
        }
    },
    checkPositionNote: function (newVal, oldVal, that) {
        if (newVal.length < 1) {
            that.errors.positionNote = 'Position note required';
            that.errorCount++;
        } else {
            that.errors.positionNote = null;
        }
    },
    checkRate: function (newVal, oldVal, that) {
        if (newVal.length < 1) {
            that.errors.rate = 'Rate is required';
            that.errorCount++;
        } else {
            that.errors.rate = null;
        }
    },
    checkClientId: function (newVal, oldVal, that) {
        if (!newVal) {
            that.errors.clientDropdown = 'Client is required';
            that.errorCount++;
        } else {
            that.errors.clientDropdown = null;
        }
    },
    checkOpportunityId: function (newVal, oldVal, that) {
        console.log(newVal);
        if (!newVal) {
            that.errors.opportunityDropdown = 'Opportunity is required';
            that.errorCount++;
        } else {
            that.errors.opportunityDropdown = null;
        }
    },
    checkSubmission: function (that) {
        if (!that.formData.opportunityId) {
            that.errors.opportunityDropdown = 'Opportunity is required';
            that.message = 'Please provide missing information';
            that.errorCount++;
            that.message = null;
        } else {
            that.errors.opportunityDropdown = null;
        }

        if (!that.formData.clientId) {
            that.errors.clientDropdown = 'Client is required';
            that.errorCount++;
            that.message = 'Please provide missing information';
        } else {
            that.errors.clientDropdown = null;
            that.message = null;
        }

        if (!that.formData.positionStatusId) {
            that.errors.positionStatusId = 'Position Status is required';
            that.errorCount++;
            that.message = 'Please provide missing information';
        } else {
            that.errors.positionStatusId = null;
        }

        if (!that.formData.positionName) {
            that.errors.positionName = 'Position Name is required';
            that.errorCount++;
            that.message = 'Please provide missing information';
        } else {
            that.errors.positionName = null;
        }
        if (!that.formData.numberOfPositions) {
            that.errors.numberOfPositions = 'Number of positions is required';
            that.errorCount++;
            that.message = 'Please provide missing information';
        } else {
            that.errors.numberOfPositions = null;
        }
        if (!that.formData.acceptedCandidate) {
            that.errors.acceptedCandidate = 'Accepted candidate is required';
            that.errorCount++;
            that.message = 'Please provide missing information';
        } else {
            that.errors.acceptedCandidate = null;
        }
        if (!that.formData.rejectedCandidate) {
            that.errors.rejectedCandidate = 'Rejected candidate is required';
            that.errorCount++;
            that.message = 'Please provide missing information';
        } else {
            that.errors.rejectedCandidate = null;
        }
        if (!that.formData.hiredCandidate) {
            that.errors.hiredCandidate = 'Hired Candidate is required';
            that.errorCount++;
            that.message = 'Please provide missing information';
        } else {
            that.errors.hiredCandidate = null;
        }
        if (!that.formData.proposedCandidate) {
            that.errors.proposedCandidate = 'Proposed candidate is required';
            that.errorCount++;
            that.message = 'Please provide missing information';
        } else {
            that.errors.proposedCandidate = null;
        }
        if (!that.formData.positionNote) {
            that.errors.positionNote = 'Position Note is required';
            that.errorCount++;
            that.message = 'Please provide missing information';
        } else {
            that.errors.positionNote = null;
        }
        if (!that.formData.rate) {
            that.errors.rate = 'Rate is required';
            that.errorCount++;
            that.message = 'Please provide missing information';
        } else {
            that.errors.rate = null;
        }
    },





    //Code to check errors object
    checkErrors: function (that) {
        let result = 0;
        for (item in that.errors) {
            if (that.errors[item]) {
                result++;
            }
        }
        that.errorCount = result;
    }
}