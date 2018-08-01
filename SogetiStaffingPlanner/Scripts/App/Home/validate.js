let validate = {
    checkPositionName: function (newVal, oldVal, that) {
 
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
  
        if (!newVal) {
            that.errors.positionStatusId = 'Position status required';
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
            that.errors.clientDropdown = '*Client is required';
            that.errorCount++;
        } else {
            that.errors.clientDropdown = null;
        }
    },
    checkOpportunityId: function (newVal, oldVal, that) {
  
        if (!newVal) {
            that.errors.opportunityDropdown = '*Opportunity is required';
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
    checkClientName(newVal, oldVal, that) {
        if (!newVal) {
            that.errors.clientName = 'Client name is required';
            that.quickClientErr++;
        } else {
            that.errors.clientName = null;
            this.checkClientErrs(that);
        }
    },
    checkClientSubbusiness(newVal, oldVal, that) {
        if (!newVal) {
            that.errors.clientSubbusiness = 'Client name is required';
            that.quickClientErr++;
        } else {
            that.errors.clientSubbusiness = null;
            this.checkClientErrs(that);
        }
    },
    checkClientSubmit(that) {
        if (!that.formData.clientName) {
            that.errors.clientName = 'Client name is required';
            that.quickClientErr++;
        } else {
            that.errors.clientName = null;
            this.checkClientErrs(that);
        }
        if (!that.formData.clientSubbusiness) {
            that.errors.clientSubbusiness = 'Client name is required';
            that.quickClientErr++;
        } else {
            that.errors.clientSubbusiness = null;
            this.checkClientErrs(that);
        }
        if (that.quickClientErr === 0) {
            return true;
        } else {
            return false;
        }
    },
    checkOpportunityName: function (newVal, oldVal, that) {
        if (!newVal) {
            that.errors.opportunityName = 'Opportunity Name is required';
            that.quickOppErr++;
        } else {
            that.errors.opportunityName = null;
        }
    },
    checkAccountExecutiveUserId: function (newVal, oldVal, that) {
        if (!newVal) {
            that.errors.accountExecutiveUserId = 'Opportunity Name is required';
            that.quickOppErr++;
        } else {
            that.errors.accountExecutiveUserId = null;
        }
    },
    checkRegionId: function (newVal, oldVal, that) {
        if (!newVal) {
            that.errors.regionId = 'Region is required';
            that.quickOppErr++;
        } else {
            that.errors.regionId = null;
        }
    },
    checkUnitId: function (newVal, oldVal, that) {
        
        if (!newVal) {
            that.errors.unitId = 'Unit is required';
            that.quickOppErr++;
        } else {
            that.errors.unitId = null;
        }
    },
    checkClientContact: function (newVal, oldVal, that) {
        if (!newVal) {
            that.errors.clientContact = 'Client contact is required';
            that.quickOppErr++;
        } else {
            that.errors.clientContact = null;
        }
    },
    /*checkOpportunityNotes: function (newVal, oldVal, that) {
        if (!newVal) {
            that.errors.opportunityNote = 'Opportunity Note is required';
            that.quickOppErr++;
        } else {
            that.errors.opportunityNote = null;
        }
    },*/
    checkOpportunitySubmit: function (that) {
        
        if (!that.formData.opportunityName) {
            that.errors.opportunityName = 'Opportunity Name is required';
            that.quickOppErr++;
        } else {
            that.errors.opportunityName = null;
        }
        if (!that.formData.accountExecutiveUserId) {
            that.errors.accountExecutiveUserId = 'Account Executive is required';
            that.quickOppErr++;
        } else {
            that.errors.accountExecutiveUserId = null;
        }
        if (!that.formData.regionId) {
            that.errors.regionId = 'Region is required';
            that.quickOppErr++;
        } else {
            that.errors.regionId = null;
        }
        if (!that.formData.unitId) {
            that.errors.unitId = 'Unit is required';
            that.quickOppErr++;
        } else {
            that.errors.unitId = null;
        }
        if (!that.formData.clientContact) {
            that.errors.clientContact = 'Client contact is required';
            that.quickOppErr++;
        } else {
            that.errors.clientContact = null;
        }
        /*if (!that.formData.opportunityNotes) {
            that.errors.opportunityNote = 'Opportunity Note is required';
            that.quickOppErr++;
        } else {
            that.errors.opportunityNote = null;
            console.log(that.formData.opportunityNotes);
        }*/
        if (!that.formData.clientId) {
            that.errors.clientDropdown = 'Client is required';
            that.quickOppErr++;
        } else {
            that.errors.clientDropdown = null;
        }



        if (that.quickOppErr > 0) {
            that.message = 'Please provide required information'
            return true;
        } else {
            return false;
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
    },
    checkClientErrs: function (that) {
        if (that.formData.clientName && that.formData.clientSubbusiness) {
            that.quickClientErr = 0;
        }
    },
    checkOppErrs: function (that) {
        let result = 0;
        for (item in that.errors) {
            if (that.errors[item]) {
                result++;
            }
        }
        that.quickOppErr = result;
        if (result === 0) {
            that.message = null;
        }
    }
}