'use strict';

const e = React.createElement;

class StudentButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render() {
    if (this.state.clicked) {
      return 'Student chosen.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ clicked: true }) },
      'Student Clicked'
    );
  }
}

const domContainer = document.querySelector('student-btn');
const root = ReactDOM.createRoot(domContainer);
root.render(e(StudentButton));