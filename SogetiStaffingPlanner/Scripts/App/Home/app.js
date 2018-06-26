
new Vue({
    el: '#app',
    data: {
        addState: false,
        opportunityName: '',
        unit: '',
        numberOfPositions: '',
        positionName: '',
        priority: '',
        sold: '',
        status: '',
        client: '',
        ae: '',
        actLead: '',
        skillset: '',
        minConsultantGrade: '',
        maxConsultantGrade: '',
        rate: '',
        date: '',
        duration: '',
        hireCandidate: '',
        proposed: '',
        rejected: '',
        accepted: '',
        notes: '',

    },
    methods: {
        onSubmit: function() {
            let data = {};
            data.opportunityName = this.opportunityName;
            data.unit = this.unit;
            data.numberOfPositions = this.numberOfPositions;
            data.positionName = this.positionName;
            data.priority = this.priority;
            data.sold = this.sold;
            data.status = this.status;
            data.client = this.client;
            data.ae = this.ae;
            data.actLead = this.actLead;
            data.skillset = this.skillset;
            data.minConsultantGrade = this.minConsultantGrade;
            data.maxConsultantGrade = this.maxConsultantGrade;
            data.rate = this.rate;
            data.date = this.date;
            data.duration = this.duration;
            data.hireCandidate = this.hireCandidate;
            data.proposed = this.proposed;
            data.rejected = this.rejected;
            data.accepted = this.accepted;
            data.notes = this.notes;

            console.log(data);
            this.opportunityName = '';
            this.unit = '';
            this.numberOfPositions = '';
            this.positionName = '';
            this.priority = '';
            this.sold = '';
            this.status = '';
            this.client = '';
            this.ae = '';
            this.actLead = '';
            this.skillset = '';
            this.minConsultantGrade = '';
            this.maxConsultantGrade = '';
            this.rate = '';
            this.date = '';
            this.duration = '';
            this.hireCandidate = '';
            this.proposed = '';
            this.rejected = '';
            this.accepted = '';
            this.notes = '';
           
        },
        displayAdd: function () {
            this.newForm = !this.newForm;
            if (this.newForm === true) {
                this.buttonText = 'Collapse';
            } else {
                this.buttonText = 'Add New';
            }
        },
        submitNew: function () {
            this.newForm = false;
            var data = {};
            data.positionId = this.newPosition.PositionId;
            data.opportunityId = this.newPosition.OpportunityId;
            data.unitPracticeId = this.newPosition.UnitPracticeId;
            data.maxConsultantGradeId = this.newPosition.MaxConsultantGradeId;
            data.minConsultantGradeId = this.newPosition.MinConsultantGradeId;
            data.positionName = this.newPosition.PositionName;
            data.numberOfPositions = this.newPosition.NumberOfPositions;
            data.skillset = this.newPosition.Skillset;
            data.rate = this.newPosition.Rate;
            data.expectedStartDate = this.newPosition.ExpectedStartDate;
            data.duration = this.newPosition.Duration;
            data.proposedCandidate = this.newPosition.ProposedCandidate;
            data.rejectedCandidate = this.newPosition.RejectedCandidate;
            data.acceptedCandidate = this.newPosition.AcceptedCandidate;
            data.positionNote = this.newPosition.PositionName;

            console.log(data);

            $.ajax({
                type: "POST",
                url: "Home/AddPosition",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    //Receives message from backend for you to do what you want with it
                    alert(data);
                },
                error: function (e) {
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        }
    },
    created: function () {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "Home/GetMainData",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                this.posts = data;
            }.bind(this)
        });
    }
});