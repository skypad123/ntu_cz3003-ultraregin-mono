class NavBar_Student extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        

        <div class="sidebar">
            <img src="img/sidebar-logo.jpg" style="width:180px">
            <a class="nav-link" id="nav-index" href="student-play.html"><i class="fa fa-fw fa-play"></i>Play</a>
            <a class="nav-link" id="nav-workouts" href="create-question.html"><i class="fa fa-fw fa-plus"></i>Create</a>
            <a class="nav-link" id="nav-exercises" href="read-question.html"><i class="fa fa-fw fa-book"></i>Read</a>
            <a class="nav-link" id="nav-mycoach" href="update-question.html"><i class="fa fa-fw fa-refresh"></i>Update</a>
            <a class="nav-link" id="nav-myathletes" href="delete-question.html"><i class="fa fa-fw fa-trash-o"></i>Delete</a>
            <a class="nav-link" id="nav-meals" href="assign-question.html"><i class="fa fa-fw fa-check-square-o"></i>Assign</a>
        </div>


        `;

        
    }
}

customElements.define('navbar-student', NavBar_Student);

class NavBar_Professor extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        

        <div class="sidebar">
            <img src="img/sidebar-logo.jpg" style="width:180px">
            <a class="nav-link" id="nav-index" href="summary-report.html"><i class="fa fa-fw fa-pie-chart"></i>Summary Report</a>
            <a class="nav-link" id="nav-workouts" href="create-question.html"><i class="fa fa-fw fa-plus"></i>Create</a>
            <a class="nav-link" id="nav-exercises" href="read-question.html"><i class="fa fa-fw fa-book"></i>Read</a>
            <a class="nav-link" id="nav-mycoach" href="update-question.html"><i class="fa fa-fw fa-refresh"></i>Update</a>
            <a class="nav-link" id="nav-myathletes" href="delete-question.html"><i class="fa fa-fw fa-trash-o"></i>Delete</a>
            <a class="nav-link" id="nav-meals" href="assign-question.html"><i class="fa fa-fw fa-check-square-o"></i>Assign</a>
        </div>


        `;

        
    }
}

customElements.define('navbar-professor', NavBar_Professor);