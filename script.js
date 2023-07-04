let students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
  ];
  
  let filteredStudents = [...students];
  let editStudentId = null;
  
  document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Add or edit the student data
      let getname = document.getElementById('name');
      let getemail = document.getElementById('email');
      let getage = document.getElementById('age');
      let getgpa = document.getElementById('gpa');
      let getdegree = document.getElementById('degree');
  
      let nameValue = getname.value;
      let emailValue = getemail.value;
      let ageValue = getage.value;
      let gpaValue = getgpa.value;
      let degreeValue = getdegree.value;
  
      let obj = {
        ID: students.length > 0 ? students[students.length - 1].ID + 1 : 1,// Use the original ID when editing, or assign a new ID when adding
        name: nameValue,
        age: ageValue,
        grade: gpaValue,
        degree: degreeValue,
        email: emailValue
      };
  
      if (editStudentId) {
        // Edit existing student
        const index = students.findIndex((student) => student.ID === editStudentId);
        if (index !== -1) {
          students[index] = obj;
          filteredStudents = filteredStudents.map((student) => (student.ID === editStudentId ? obj : student));
        }
        editStudentId = null;
      } else {
        // Add new student
        students.push(obj);
        filteredStudents.push(obj);
      }
  
      // Clear input fields after adding/editing data
      getname.value = '';
      getemail.value = '';
      getage.value = '';
      getgpa.value = '';
      getdegree.value = '';
  
      // Filter the updated data
      filterStudents(searchStudent.value);
      resetForm();
    });
  
    // Filter the students data
    let searchStudent = document.querySelector('.searchStudent input');
    searchStudent.addEventListener('input', (event) => {
      filterStudents(event.target.value);
    });
  
    function filterStudents(searchValue) {
      filteredStudents = students.filter((element) => {
        return (
          element.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          element.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          element.degree.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      renderTable(filteredStudents);
    }
  
    // Render the initial table when the page finishes loading
    renderTable(filteredStudents);
  });
  
  // Data render
  function renderTable(data) {
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
  
    // Render the data
    data.forEach((student) => {
      let tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td class="images">
          <img src="edit 1.png" onClick="editItem(${student.ID})" id="img2" alt="">
          <img src="trash-2 1.png" onClick="removeItem(${student.ID})" id="img1" alt="">
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }
  
  // Remove element
  function removeItem(id) {
    students = students.filter((student) => student.ID !== id);
    filteredStudents = filteredStudents.filter((student) => student.ID !== id);
    renderTable(filteredStudents);
    resetForm(); // Reset the form and button text after removing a student
  }
  
  // Edit item
  function editItem(id) {
    const student = students.find((s) => s.ID === id);
    if (student) {
      let btn = document.getElementById('btn');
      btn.innerText = "Edit Student";
  
      let getname = document.getElementById('name');
      let getemail = document.getElementById('email');
      let getage = document.getElementById('age');
      let getgpa = document.getElementById('gpa');
      let getdegree = document.getElementById('degree');
  
      getname.value = student.name;
      getemail.value = student.email;
      getage.value = student.age;
      getgpa.value = student.grade;
      getdegree.value = student.degree;
  
      editStudentId = id;
  
      // Remove the previous event listener
      let form = document.getElementById('form');
      form.removeEventListener('submit', addStudent);
  
      // Add the new event listener
      form.removeEventListener('submit', updateStudent); // Remove the event listener if already added
      form.addEventListener('submit', updateStudent);
    }
  }
  
  function updateStudent(event) {
    event.preventDefault(); // Prevent form submission
  
    const id = editStudentId;
    const studentIndex = students.findIndex((s) => s.ID === id);
    if (studentIndex !== -1) {
      let btn = document.getElementById('btn');
      let getname = document.getElementById('name');
      let getemail = document.getElementById('email');
      let getage = document.getElementById('age');
      let getgpa = document.getElementById('gpa');
      let getdegree = document.getElementById('degree');
  
      // Update the properties of the student object
      students[studentIndex].name = getname.value;
      students[studentIndex].email = getemail.value;
      students[studentIndex].age = getage.value;
      students[studentIndex].grade = getgpa.value;
      students[studentIndex].degree = getdegree.value;
  
      // Update the same student in the filteredStudents array
      const filteredStudentIndex = filteredStudents.findIndex((s) => s.ID === id);
      if (filteredStudentIndex !== -1) {
        filteredStudents[filteredStudentIndex] = { ...students[studentIndex] };
      }
  
      // Reset the form and button text
      getname.value = '';
      getemail.value = '';
      getage.value = '';
      getgpa.value = '';
      getdegree.value = '';
      resetForm();
  
      // Render the updated table
      renderTable(filteredStudents);
    }
  }
  
  // Reset form and button text
  function resetForm() {
    let btn = document.getElementById('btn');
    btn.innerText = "Add Student";
  
    let form = document.getElementById('form');
    form.removeEventListener('submit', updateStudent);
    form.addEventListener('submit', addStudent);
  }
  