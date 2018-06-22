/* This script corresponds to the Home controller. */
new Vue({
    el: '#app',
    data: {
        posts: [],
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
        }
    },
    created: function () {
        /* 
         * This function will fire as soon as this script loads on the page.
         * It will fetch the initial dataload from the database.
         */
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