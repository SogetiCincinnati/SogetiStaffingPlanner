
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
            validate.checkPositionName(val, this);
        },
        numberOfPositions: function (val) {
            validate.checkNumberOfPositions(val, this);
        },
        positionStatusId: function (val) {
            validate.checkPositionStatusId(val, this);
        },
        opportunityId: function (val) {
            validate.checkOpportunityId(val, this);
        },
        unitPracticeId: function (val) {
            validate.checkUnitPracticeId(val, this);
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
            /* Code to format the date for the controller to recieve */
            if (this.expectedStartDate) {
                let parts = this.expectedStartDate.split('-')
                let date = new Date(parts);
                date = date.toISOString();
                data.expectedStartDate = date;   
            }
              
            /* Set last modified date to present time, as this is initial creation of position */        
            data.lastModified = new Date().toISOString();
            /* Submit the data */
            requests.postPosition(data, this);
        },
        updatePosition: function () {
            let data = posHelpers.buildJSON(this);
            requests.editPosition(data, this);
        },
        checkForm: function () {
            validate.checkForm(this);
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
            /* Check if data is initial grab from DB or not */
            if (position.ExpectedStartDate.length > 10) {
                this.expectedStartDate = posHelpers.displayDate(position.ExpectedStartDate);
            } else {
                this.expectedStartDate = position.ExpectedStartDate;
            }
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
            if (this.positionDetail.ExpectedStartDate.length > 10) {
                this.positionDetail.ExpectedStartDate = posHelpers.displayDate(this.positionDetail.ExpectedStartDate);
                this.positionDetail.LastModified = posHelpers.displayDate(this.positionDetail.LastModified);  
            }                
            this.moreState = true;
        },
         getOpportunityName: function (opportunityId) {
            for (opportunity in this.opportunities) {
                if (this.opportunities[opportunity].OpportunityId == opportunityId) {
                    return (this.opportunities[opportunity].OpportunityName);
                }
            }
        },
    },
    created: function () {
        requests.fetchPositions(this);
        requests.getUserList(this);
        requests.getOpportunityList(this);
        requests.getUnitList(this);
        requests.getPositionStatusList(this);
        requests.getGradeList(this);
    }
})