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
        
        if (!that.formData.rate) {
            that.errors.rate = 'Rate is required';
            that.errorCount++;
            that.message = 'Please provide missing information';
        } else {
            that.errors.rate = null;
        }
    },
    checkClientName(newVal, oldVal, that) {
        console.log(newVal);
        if (!newVal) {
            that.errors.clientName = 'Client name is required';
            that.quickClientErr++;
        } else {
            that.errors.clientName = null;
            this.checkClientErrs(that);
        }
    },
    checkClientSubbusiness(newVal, oldVal, that) {
        console.log(newVal);
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
            that.errors.accountExecutiveUserId = 'Account Exectutive is required';
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
      
        if (!newVal && oldVal.length < 1) {
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
        console.log('NAME!!!!!!!!!!!', that.formData.opportunityName);
        
        if (!that.formData.opportunityName) {
            that.errors.opportunityName = 'Opportunity Name is required';
            that.quickOppErr++;
        } else {
            for (opportunity in that.opportunities) {
                console.log(that.opportunities[opportunity].opportunityName);
                if (that.formData.opportunityName === that.opportunities[opportunity].opportunityName) {
                    console.log('IHIII');
                    that.errors.opportunityName = ' Opportunity already exists';
                    that.quickOppErr++;
                    that.message = 'Please correct the error!';
                    alert('Opportunity name already exists.');
                } else {
                    that.errors.opportunityName = null;
                }
            }
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