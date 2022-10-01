class NavBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        

        <div class="sidebar">
            <a class="nav-link" id="nav-index" href="summary-report.html">Summary Report</a>
            <a class="nav-link" id="nav-workouts" href="create-question.html">Create</a>
            <a class="nav-link" id="nav-exercises" href="read-question.html">Read</a>
            <a class="nav-link" id="nav-mycoach" href="update-question.html">Update</a>
            <a class="nav-link" id="nav-myathletes" href="delete-question.html">Delete</a>
            <a class="nav-link" id="nav-meals" href="assign-question.html">Assign</a>
        </div>


        `;

        
    }
}

customElements.define('navbar-el', NavBar);