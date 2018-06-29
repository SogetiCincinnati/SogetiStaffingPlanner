
let position = new Vue({
    el: '#app',
    data: {
        positions: '',
        positionDetail: null,
        title: 'Positions',
        addState: false,
        moreState: false,
        updateState: false,
        positionName: '',
        positionId: null,
        opportunityId: null,
        unitPracticeId: null,
        maxConsultantGradeId: null,
        minConsultantGradeId: null,
        numberOfPositions: null,
        duration: '',
        acceptedCandidate: '',
        skillset: '',
        rate: '',
        expectedStartDate: '',
        hireCandidate: '',
        proposedCandidate: '',
        rejectedCandidate: '',
        positionStatusId: '',
        positionNote: '',
        opportunities: '',
        units: '',
        users: '',
        positionStatuses: '',
        grades: '',
        errors: {}, // builds all the errors
    },
    watch: {
        positionName: function (val) {
            try {
                if (val.length || val) { this.errors.positionName = ''; }
                else {
                    this.errors.positionName = 'Position Name required';
                }
                if (!this.updateState) {
                    for (let i = 0; i < this.positions.length; i++) {
                        if (val == this.positions[i].PositionName) {
                            this.errors.positionName = '"' + this.positionName + '" already exists.';
                            break;
                        }
                    }
                }
            } catch (e) {}

        },
        duration: function (val) {
            try {
                if (val.length || val) { this.errors.duration = ''; }
                else { this.errors.duration = 'Duration required'; }
            } catch (e) {}

        },
        acceptedCandidate: function (val) {
            try {
                if (val.length) { this.errors.acceptedCandidate = ''; }
                else { this.errors.acceptedCandidate = 'Accepted Candidate required'; }
            } catch (e) {}

        },
        skillset: function (val) {
            try {
                if (val.length) { this.errors.skillset = ''; }
                else { this.errors.skillset = 'Duration required'; }
            } catch (e) { }

        },
        rate: function (val) {
            try {
                if (val.length || val) { this.errors.rate = ''; }
                else { this.errors.rate = 'Rate required'; }
            } catch (e) { }

        },
        expectedStartDate: function (val) {
            try {
                if (val.length) { this.errors.expectedStartDate = ''; }
                else { this.errors.expectedStartDate = 'Expected Start Date required'; }
            } catch (e) { }

        },
        hireCandidate: function (val) {
            try {
                if (val.length) { this.errors.hireCandidate = ''; }
                else { this.errors.hireCandidate = 'Hire Candidate required'; }
            } catch (e) { }

        },
        proposedCandidate: function (val) {
            try {
                if (val.length) { this.errors.proposedCandidate = ''; }
                else { this.errors.proposedCandidate = 'Proposed Candidate required'; }
            } catch (e) { }

        },
        rejectedCandidate: function (val) {
            try {
                if (val.length) { this.errors.rejectedCandidate = ''; }
                else { this.errors.rejectedCandidate = 'Rejected Candidate required'; }
            } catch (e) { }

        },
        positionNote: function (val) {
            try {
                if (val.length) { this.errors.positionNote = ''; }
                else { this.errors.positionNote = 'Position Note required'; }
            } catch (e) { }

        },
        numberOfPositions: function (val) {
            try {
                if (val.length || val) { this.errors.numberOfPositions = ''; }
                else { this.errors.numberOfPositions = 'Number of Positions required'; }
            } catch (e) { }

        },
        positionStatusId: function (val) {
            if (val) {
                this.errors.positionStatusId = '';
            }
        },
        opportunityId: function (val) {
            if (val) {
                this.errors.opportunityId = '';
            }
        },
        unitPracticeId: function (val) {
            if (val) {
                this.errors.unitPracticeId = '';
            }
        },
        minConsultantGradeId: function (val) {
            if (val) {
                this.errors.minConsultantGradeId = '';
            }
        },
        maxConsultantGradeId: function (val) {
            if (val) {
                this.errors.maxConsultantGradeId = '';
            }
        }
    },
    methods: {
        onSubmit: function () {   
            if (!this.errors.length) {
                if (this.updateState) {
                    this.updatePosition();
                }
                else if (this.addState) {
                    this.addPosition();
                }
            } 
        },
        cancel: function () {
            this.errors = {};
            this.addState = false;
            posHelpers.clearForm(this);
            
        },
        addPosition: function () {
            this.errors = {};
            this.checkForm();
            let data = posHelpers.buildJSON(this);
            /* Get user submitted date value and convert to proper format for controller method */
            let parts = this.expectedStartDate.split('-')
            let date = new Date(parts);
            date = date.toISOString();
            data.expectedStartDate = date;
            /* Set last modified date to present time, as this is initial creation of position */        
            data.lastModified = new Date().toISOString();
            $.ajax({
                type: "POST",
                url: "AddPosition",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    posHelpers.clearForm(this);
                    requests.fetchPositions(this);
                    console.log('POST request success');
                    alert('Successfully added');
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        updatePosition: function () {
            let data = posHelpers.buildJSON(this);
            data.expectedStartDate = new Date(data.expectedStartDate);

            console.log('data', data);
            $.ajax({
                type: "POST",
                url: "EditPosition",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    
                    alert('Successfully updated ' + this.positionName + '.');
                    posHelpers.clearForm(this);
                    requests.fetchPositions(this);
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        checkForm: function () {
            this.errors = {};
            /*Checks to see if forms are empty */
            if (!this.positionName) {
                this.errors.positionName = 'Position Name required';
            } if (!this.duration) {
                this.errors.duration = 'Duration required';
            } if (!this.acceptedCandidate) {
                this.errors.acceptedCandidate = 'Accepted Candidate required';
            } if (!this.skillset) {
                this.errors.skillset = 'Skillset required';
            } if (!this.rate) {
                this.errors.rate = 'Rate required';
            } if (!this.expectedStartDate) {
                this.errors.expectedStartDate = 'Exepcted Start Date required';
            } if (!this.hireCandidate) {
                this.errors.hireCandidate = 'Hire Candidate required.';
            } if (!this.proposedCandidate) {
                this.errors.proposedCandidate = 'Proposed Candidate required';
            } if (!this.rejectedCandidate) {
                this.errors.rejectedCandidate = 'Rejected Candidate required.';
            } if (!this.positionNote) {
                this.errors.positionNote = 'Position Note required';
            } if (!this.numberOfPositions) {
                this.errors.numberOfPositions = 'Number of Positions required';
            } if (!this.positionStatusId) {
                this.errors.positionStatusId = 'Position Status required';
            } if (!this.opportunityId) {
                this.errors.opportunityId = 'Opportunity required';
            } if (!this.unitPracticeId) {
                //this.errors.unitPracticeId = 'Unit Practice required';
            } if (!this.maxConsultantGradeId) {
                this.errors.maxConsultantGradeId = 'Max Consultant Grade required';
            } if (!this.minConsultantGradeId) {
                this.errors.minConsultantGradeId = 'Min Consultant Grade required.';
            }

            /* Looks for duplicate Opportunity Names - if adding NEW, but not if UPDATING */
            if (!this.updateState) {
                for (let i = 0; i < this.positions.length; i++) {
                    
                    if (this.positionName == this.positions[i].PositionName) {
                        this.errors.push('Position Name: "' + this.positionName + '" already exists.')
                        break;
                    }
                }
            }
            if (!this.errors.length) { return true; }
        },
        onEdit: function (position) {
            
            this.errors = {};
            /* Specify that status is being updated */
            this.updateState = true;
            /* Populate form with selected values */
            this.positionName = position.PositionName;
            this.positionId = position.PositionId;
            this.duration = position.Duration;
            this.acceptedCandidate = position.AcceptedCandidate;
            this.skillset = position.Skillset;
            this.rate = position.Rate;
            /* Format expected start date to correctly display data */
            this.expectedStartDate = position.ExpectedStartDate;
            this.expectedStartDate = this.expectedStartDate.slice(6);
            this.expectedStartDate = parseInt(this.expectedStartDate);
            this.expectedStartDate = new Date(this.expectedStartDate);
            this.expectedStartDate = this.expectedStartDate.toISOString();
            this.expectedStartDate = this.expectedStartDate.slice(0, 10);
            
            this.hireCandidate = position.HireCandidate;
            this.proposedCandidate = position.ProposedCandidate;
            this.rejectedCandidate = position.RejectedCandidate;
            this.positionNote = position.PositionNote;
            this.numberOfPositions = position.NumberOfPositions;
            this.maxConsultantGradeId = position.MaxConsultantGradeId;
            this.minConsultantGradeId = position.MinConsultantGradeId;
            
            this.opportunityId = position.OpportunityId;
            
            this.unitPracticeId = position.UnitPracticeId;
            this.positionStatusId = position.PositionStatusId;
            
            /* Set form to drop down */
            this.addState = true;
            
        },
        displayDetail: function (position) {
            this.positionDetail = position;
            this.positionDetail.ExpectedStartDate = this.positionDetail.ExpectedStartDate.slice(6);
            this.positionDetail.ExpectedStartDate = parseInt(this.positionDetail.ExpectedStartDate);
            this.positionDetail.ExpectedStartDate = new Date(this.positionDetail.ExpectedStartDate);
            this.positionDetail.ExpectedStartDate = this.positionDetail.ExpectedStartDate.toISOString().slice(0, 10);

            /* Produces a human readable string for the details view panel */
            this.positionDetail.LastModified = this.positionDetail.LastModified.slice(6);
            this.positionDetail.LastModified = parseInt(this.positionDetail.LastModified);
            this.positionDetail.LastModified = new Date(this.positionDetail.LastModified);
            this.positionDetail.LastModified = this.positionDetail.LastModified.toDateString();
            
            this.moreState = true;
        },
         getOpportunityName: function (opportunityId) {
        console.log(this);
        for (opportunity in this.opportunities) {
            if (this.opportunities[opportunity].OpportunityId == opportunityId) {
                return (this.opportunities[opportunity].OpportunityName);
            }
        }
    },
    },
   
    created: function () {
        requests.postPosition();
        requests.fetchPositions(this);
        requests.getUserList(this);
        requests.getOpportunityList(this);
        requests.getUnitList(this);
        requests.getPositionStatusList(this);
        requests.getGradeList(this);
    }
})