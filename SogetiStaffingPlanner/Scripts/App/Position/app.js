
new Vue({
    el: '#app',
    data: {
        newForm: false,
        buttonText: 'Add New',
        posts: [],
        message: 'Planning view',
        newPosition: {
            PositionId: 1,
            OpportunityId: 1,
            UnitPracticeId: 1,
            MaxConsultantGradeId: 5,
            MinConsultantGradeId: 1,
            PositionName: 'Tester',
            NumberOfPositions: 2,
            Skillset: 'test',
            Rate: 123,
            ExpectedStartDate: 1234,
            Duration: 12345,
            ProposedCandidate: 'Mark',
            RejectedCandidate: 'Peter',
            AcceptedCandidate: 'Dan',
            PositionNote: 'Phil'
        },
        
    },
    methods: {
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
        })
    }
})