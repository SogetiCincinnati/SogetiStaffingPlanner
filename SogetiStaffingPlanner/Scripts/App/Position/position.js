
new Vue({
    el: '#app',
    data: {
       positions: ''
    },
    methods: {
       
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
               
            }.bind(this)
        })
    }
})

/*
 * data.positionId = this.newPosition.PositionId;
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
        */