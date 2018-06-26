
new Vue({
    el: '#app',
    data: {
        positions: '',
        title: 'Positions',
        addState: false,
        moreState: false,
        updateState: false,
        numberOfPositions: '',
        positionName: '',
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
        errors: [],
    },
    methods: {
        onSubmit: function () {
            this.checkForm();
            if (!this.errors.length) {
                if (this.updateState) {
                    this.updateOpportunity();
                }
                else if (this.addState) {
                    this.addOpportunity();
                }
            } 
        },
        addPosition: function () {
            let data = this.buildJSON();

            console.log(data);

            $.ajax({
                type: "POST",
                url: "AddPosition",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    console.log('POST request success');
                    alert('successfully added');
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        checkForm: function () {
            this.errors = [];
            /*Checks to see if forms are empty */
            if (!this.positionName) {
                this.errors.push('Position Name required.');
            } if (!this.duration) {
                this.errors.push('Duration required.');
            } if (!this.skillset) {
                this.errors.push('Skillset required.');
            } if (!this.rate) {
                this.errors.push('Rate required.');
            } if (!this.expectedStartDate) {
                this.errors.push('Exepcted Start Date required.');
            } if (!this.hireCandidate) {
                this.errors.push('Hire Candidate required.');
            } if (!this.proposedCandidate) {
                this.errors.push('Proposed Candidate required.');
            } if (!this.rejectedCandidate) {
                this.errors.push('Rejected Candidate required.');
            } if (!this.positionNote) {
                this.errors.push('Position Note required.');
            }

            /* Looks for duplicate Opportunity Names - if adding NEW, but not if UPDATING */
            if (!this.updateState) {
                for (let i = 0; i < this.positions.length; i++) {
                    console.log(this.positionName);
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
            this.positionName = '';
            this.opportunityNotes = '';
            this.duration = '';
            this.acceptedCandidate = null;
            this.skillset = null;
            this.rate = null;
            this.expectedStartDate = null;
            this.hireCandidate = null;
            this.proposedCandidate = null;
            this.rejectedCandidate = null;
            this.positionNote = '';
            this.errors = [];
        },
        buildJSON: function () {
            let data = {};
            data.positionId = 1;
            data.opportunityId = 1;
            data.unitPracticeId = 1;
            data.maxConsultantGradeId = 1;
            data.minConsultantGradeId = 1;
            data.numberOfPositions = 1;
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
            console.log(position);
            /* Specify that status is being updated */
            this.updateState = true;
            /* Populate form with selected values */
            this.positionName = position.PositionName;
            this.duration = position.Duration;
            this.acceptedCandidate = position.AcceptedCandidate;
            this.skillset = position.Skillset;
            this.rate = position.Rate;
            this.expectedStartDate = position.ExpectedStartDate;
            this.hireCandidate = position.HireCandidate;
            this.proposedCandidate = position.ProposedCandidate;
            this.rejectedCandidate = position.RejectedCandidate;
            this.positionNote = position.PositionNote;
            /* Set form to drop down */
            this.addState = true;
            
        },
        displayDetail: function (position) {
            this.positionDetail = position;
            console.log(this.positionDetail);
            this.moreState = true;
        }
    },
    created: function () {
        $.ajax({
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
            }.bind(this)
        })
    }
})