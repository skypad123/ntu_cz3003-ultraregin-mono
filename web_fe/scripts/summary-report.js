var classLabels = ["Class A", "Class B", "Class C"];
var gradeLabels = ['Grade A', 'Grade B', 'Grade C', 'Grade D']
var worldLabels = ['World 1', 'World 2', 'World 3']
var gradeA_students = [14, 10, 17];
var gradeB_students = [12, 12, 13];
var gradeC_students = [10, 14, 14];
var gradeD_students = [12, 13, 14];
var studentA_grades = [80, 75, 60];
var barColors = ["#285474", "#ff7948","#d9d9d9","#ffdf2b"];

var gradesByClassChartData = {
    labels: classLabels,
    datasets: [{
        label: gradeLabels[0],
        backgroundColor: barColors[0],
        data: gradeA_students
    },
    {
        label: gradeLabels[1],
        backgroundColor: barColors[1],
        data: gradeB_students
    },
    {
        label: gradeLabels[2],
        backgroundColor: barColors[2],
        data: gradeC_students
    },
    {
        label: gradeLabels[3],
        backgroundColor: barColors[3],
        data: gradeD_students
    },
]
};

new Chart("gradesByClassChart", {
    type:"bar",
    data: gradesByClassChartData,
    options: {
        responsive: true,
        legend: {position:"bottom"},
        title: {
            display:true,
            text:"Grades By Class",
            fontSize: 18,
        },
        scales:{
            yAxes:[{
                ticks:{
                    beginAtZero: true
                }
            }]
        }
    }
});

var gradesOfClassChartData = {
    labels: gradeLabels,
    datasets: [{
        data: [gradeA_students[0], gradeB_students[0], gradeC_students[0], gradeD_students[0]],
        backgroundColor: barColors,
    }]
};

new Chart("gradesOfClassChart", {
    type:"bar",
    data: gradesOfClassChartData,
    options: {
        responsive: true,
        legend: {display:false},
        title: {
            display:true,
            text:"Grades Of Class",
            fontSize: 18,
        },
        scales:{
            yAxes:[{
                ticks:{
                    beginAtZero: true
                }
            }]
        }
    }
});

var gradesOfStudentChartData = {
    labels: worldLabels,
    datasets: [{
        data: studentA_grades,
        backgroundColor: barColors,
    }]
};

new Chart("gradesOfStudentChart", {
    type:"bar",
    data: gradesOfStudentChartData,
    options: {
        responsive: true,
        legend: {display:false},
        title: {
            display:true,
            text:"Grades Of Student",
            fontSize: 18,
        },
        scales:{
            yAxes:[{
                ticks:{
                    beginAtZero: true
                }
            }]
        }
    }
});