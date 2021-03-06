
let position = new Vue({
    el: '#app',
    data: {
        positions: '',
        message: '',
        positionDetail: null,
        prevPosition: '',
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
        selected: null, // Index of entry being selected to be highlighted,
        sorting: {
            PositionName: 0,
            posSort: true,
            posDir: false
        }
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
        },
        duration: function (val) {
            validate.checkDuration(val, this);
        },
        rate: function (val) {
            validate.checkRate(val, this);
        },
        'sorting.PositionName': function (val) {
            if (val > 0) { this.sorting.posSort = false };
            if (val % 2 === 0) { this.sorting.posDir = true } else { this.sorting.posDir = false };
        }
    },
    methods: {
        onSubmit: function () {
            console.log(this.checkForm());
            if (this.checkForm() == true) {
                if (this.updateState) {
                    console.log('update positions function called');
                    console.log(this.maxConsultantGradeId);
                    this.updatePosition();
                }
                else if (this.addState) {
                    console.log('add positions function called');
                    this.addPosition();

                }
            }
        },
        add: function () {
            this.addState = true;
            this.errors = {};
            window.scrollTo(0, 200);
        },
        cancel: function () {
            this.errors = {};
            this.addState = false;
            posHelpers.clearForm(this);
            window.scrollTo(0, 0);
        },
        addPosition: function () {
            this.errors = {};
            validate.checkForm(this);
            let data = posHelpers.buildJSON(this);
            this.selected = this.positions.length
            console.log(data);
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
            console.log('here here');
            this.findSelected();
            this.scrollDown();
        },
        updatePosition: function () {
            let data = posHelpers.buildJSON(this);
            requests.editPosition(data, this);
        },
        checkForm: function () {
            validate.checkDuration(this);
            validate.checkNumberOfPositions(this);
            validate.checkRate(this);
            return validate.checkForm(this);
        },
        onEdit: function (position) {
            console.log('EDIT POSTION', position);
            this.errors = {};
            /* Specify that status is being updated */
            
            this.updateState = true;
            /* Populate form with selected values */
            this.active = position.Active;
            this.positionName = position.PositionName;
            this.prevPosition = this.positionName;
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
            window.scrollTo(0, 200);
        },
        displayDetail: function (position) {
            /* Set up N/A for some values */
            for (item in position) {
                if (!position[item]) {
                    position[item] = 'N/A';
                }
                if (!position['Rate']) {
                    position['Rate'] = '~';
                }
                if (position.Active == 'N/A') {
                    position.Active = false;
                }
            }
            this.positionDetail = position;
            if (this.positionDetail.ExpectedStartDate.length > 10) {
                this.positionDetail.ExpectedStartDate = posHelpers.displayDate(this.positionDetail.ExpectedStartDate);
                this.positionDetail.LastModified = posHelpers.displayDate(this.positionDetail.LastModified);
            }
            /* Set up N/A value for missing ExpectedStartDate value */
            if (this.positionDetail.ExpectedStartDate[1] == 0) {
                this.positionDetail.ExpectedStartDate = 'N/A';
            }
            console.log(this.positionDetail);
            this.moreState = true;
            window.scrollTo(0, 100);
        },
        getOpportunityName: function (opportunityId) {
            for (opportunity in this.opportunities) {
                if (this.opportunities[opportunity].OpportunityId == opportunityId) {
                    return (this.opportunities[opportunity].OpportunityName);
                }
            }
        },
        back: function () {
            this.positionDetail = false;
            this.moreState = false;
            window.scrollTo(0, 0);
        },
        findSelected: function () {
            console.log('findSelected');
            for (p in this.positions) { // Highlights the updated row
                if (this.positions[p].PositionName == this.prevPosition
                ) {
                    console.log('found');
                    this.selected = p;
                    break;
                }
            }
        },
        scrollDown: function () {    // Add a 1 second delay so the table can update before scrolling down
            let container = document.querySelector(".scrollBar");
            setTimeout(function () { container.scrollTop = container.scrollHeight; }, 1000);
        },
        checkErrorObject: function (obj) {
            let count = 0;
            $.each(obj, function (index, value) {
                if (value) {
                    count += 1;
                }
                console.log(count);
                return count;
            });
        },
        toggleActive: function () {
            let foundPosition = null;
            for (let i = 0; i < this.positions.length; i++) {
                if (this.positions[i].PositionId == this.positionDetail.PositionId) {
                    foundPosition = this.positions[i];
                }
            }
            requests.toggleActive(foundPosition, this);
        },
        sortTable: function (value) {
            sorting.sortData(value, this);
        }
    },
    created: function () {
        requests.fetchPositions(this);
        requests.getUserList(this);
        requests.getOpportunityList(this);
        requests.getUnitList(this);
        requests.getPositionStatusList(this);
        requests.getGradeList(this);
    }
});
Vue.config.devtools = true;