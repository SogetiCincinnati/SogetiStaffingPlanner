
new Vue({
    el: '#app',
    data: {
        positions: '',
        positionDetail: null,
        title: 'Positions',
        addState: false,
        moreState: false,
        updateState: false,
        numberOfPositions: '',
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
        unitPracticeId: null,
        positionNote: '',
        opportunities: '',
        units: '',
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

    },
    methods: {
        getStartDate: function () {
            console.log(this.expectedStartDate)

        },
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
            this.clearForm();
            
        },
        addPosition: function () {
            this.errors = {};
            //this.clearForm();
            this.checkForm();
            let data = this.buildJSON();
            /* Get user submitted date value and convert to proper format for controller method */
            let parts = this.expectedStartDate.split('-')
            let date = new Date(parts);
            date = date.toISOString();
            data.expectedStartDate = date;
            /* Set last modified date to present time, as this is initial creation of position */  
            data.lastModified = new Date().toISOString();
            console.log(data);
            $.ajax({
                type: "POST",
                url: "AddPosition",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    this.clearForm();
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
            let data = this.buildJSON();
            /* Get user submitted date value and convert to proper format for controller method */
            let parts = this.expectedStartDate.split('-')
            let date = new Date(parts);
            date = date.toISOString();
            data.expectedStartDate = date;
            /* Set last modified date to present time, as this is initial creation of position */
            data.lastModified = new Date().toISOString();

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
                   // this.clearForm();
                    this.fetchPositions();
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
                this.errors.unitPracticeId = 'Unit Practice required';
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
        clearForm: function () {
            this.addState = false;
            this.updateState = false;
            this.errors = {};
            this.positionName = null;
            this.opportunityNotes = null;
            this.duration = null;
            this.acceptedCandidate = null;
            this.skillset = null;
            this.rate = null;
            this.expectedStartDate = null;
            this.hireCandidate = null;
            this.proposedCandidate = null;
            this.rejectedCandidate = null;
            this.positionNote = null;
            this.numberOfPositions = null;
            this.positionStatusId = null;
            this.opportunityId = null;
            this.unitPracticeId = null;
            this.maxConsultantGradeId = null;
            this.minConsultantGradeId = null;
        },
        buildJSON: function () {
            let data = {};
            data.positionId = this.positionId;
            data.opportunityId = this.opportunityId;
            data.unitPracticeId = 4;
            data.maxConsultantGradeId = this.maxConsultantGradeId;
            data.minConsultantGradeId = this.minConsultantGradeId;
            data.numberOfPositions = this.numberOfPositions;
            data.active = true;
            data.positionStatusId = this.positionStatusId;
            data.lastModifiedUserId = 1;
            data.lastModified = 1;
            data.positionName = this.positionName;
            data.duration = this.duration;
            data.acceptedCandidate = this.acceptedCandidate;
            data.skillset = this.skillset;
            data.rate = this.rate;
            data.expectedStartDate = this.expectedStartDate;
            data.hireCandidate = this.hireCandidate;
            data.proposedCandidate = this.proposedCandidate;
            data.rejectedCandidate = this.rejectedCandidate;
            data.positionStatusId = 1;
            data.positionNote = this.positionNote;
            return data;
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
            this.expectedStartDate = position.ExpectedStartDate;
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
            console.log(position.UnitPracticeId);
            console.log(this.unitPracticeId);
            /* Set form to drop down */
            this.addState = true;
            
        },
        displayDetail: function (position) {
            this.positionDetail = position;
            console.log(this.positionDetail);
            this.moreState = true;
        },
        getUnitName: function (unitId) {
            for (unit in this.units) {
                if (this.units[unit].UnitId == unitId) {
                    return (this.units[unit].UnitName);
                }
            }
        },
        getGradeName: function (gradeId) {
            for (grade in this.grades) {
                if (this.grades[grade].GradeId == gradeId) {
                    return (this.grades[grade].GradeName);
                }
            }
        },
        getPositionStatus: function (positionStatusId) {
            for (positionStatus in this.positionStatuses) {
                if (this.positionStatuses[positionStatus].PositionStatusId == positionStatusId) {
                    return (this.positionStatuses[positionStatus].PositionStatusName);
                }
            }
        },
        getOpportunityName: function (opportunityId) {
            for (opportunity in this.opportunities) {
                if (this.opportunities[opportunity].OpportunityId == opportunityId) {
                    return (this.opportunities[opportunity].OpportunityName);
                }
            }
        },
        fetchPositions: function () {
            $.ajax({ // get positions
                async: false,
                cache: false,
                type: "GET",
                url: "GetPosition",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (data) {

                    console.log(data);
                    this.positions = data;
                    console.log(this.positions);
                }.bind(this),
                error: function (e) {
                    console.log(e);
                }
            })
        }
    },
    created: function () {
        this.fetchPositions();



        $.ajax({ // get opportunity list
            async: false,
            cache: false,
            type: "GET",
            url: "GetOpportunityList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                this.opportunities = data;
            }.bind(this)
        });


        $.ajax({ // get Unit list
            async: false,
            cache: false,
            type: "GET",
            url: "GetUnitList", 
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                this.units = data;
            }.bind(this)
        });


        $.ajax({ // Get Position Status List 
            async: false,
            cache: false,
            type: "GET",
            url: "GetPositionStatusList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                this.positionStatuses = data;
                console.log(this.positionStatuses);
            }.bind(this)
        });

        $.ajax({ // Get Grade List 
            async: false,
            cache: false,
            type: "GET",
            url: "GetGradeList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                this.grades = data;
            }.bind(this)
        });
        
    }
})