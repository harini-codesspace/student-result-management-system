let students = JSON.parse(localStorage.getItem("students")) || [];
displayStudents();
function addStudent() {
    let regNo = document.getElementById("regNo").value;
    let name = document.getElementById("studentName").value;
    let tamil = Number(document.getElementById("tamil").value);
    let english = Number(document.getElementById("english").value);
    let maths = Number(document.getElementById("maths").value);
    let science = Number(document.getElementById("science").value);
    let social = Number(document.getElementById("social").value);
    if (
        regNo === "" ||
        name === "" ||
        document.getElementById("tamil").value === "" ||
        document.getElementById("english").value === "" ||
        document.getElementById("maths").value === "" ||
        document.getElementById("science").value === "" ||
        document.getElementById("social").value === ""
    ) {
        alert("Please fill all fields!");
        return;
    }
    let exists = students.find(
        student => student.regNo === regNo
    );
    if (exists) {
        alert("Register Number Already Exists!");
        return;
    }
    let total =
        tamil +
        english +
        maths +
        science +
        social;
    let percentage = total / 5;
    let grade;
    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else {
        grade = "D";
    }
    let gpa = (percentage / 10).toFixed(1);
    let student = {
        regNo,
        name,
        total,
        percentage: percentage.toFixed(2),
        grade,
        gpa
    };
    students.push(student);
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
    displayStudents();
    document.getElementById("resultName").textContent = name;
    document.getElementById("resultRegNo").textContent = regNo;
    document.getElementById("resultTotal").textContent = total;
    document.getElementById("resultPercentage").textContent =
        percentage.toFixed(2) + "%";
    document.getElementById("resultGrade").textContent = grade;
    document.getElementById("resultGPA").textContent = gpa;
    alert("Student Added Successfully!");
    document.getElementById("regNo").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("tamil").value = "";
    document.getElementById("english").value = "";
    document.getElementById("maths").value = "";
    document.getElementById("science").value = "";
    document.getElementById("social").value = "";
}
function displayStudents() {
    let tableBody =
        document.getElementById("studentTableBody");
    tableBody.innerHTML = "";
    students.forEach(student => {
        tableBody.innerHTML += `
        <tr>
            <td>${student.regNo}</td>
            <td>${student.name}</td>
            <td>${student.percentage}%</td>
            <td>${student.grade}</td>
            <td>${student.gpa}</td>
            <td>
                <button onclick="deleteStudent('${student.regNo}')">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}
function searchStudent() {
    let searchRegNo =
        document.getElementById("searchRegNo").value;
    let student = students.find(
        s => s.regNo === searchRegNo
    );
    if (student) {
        document.getElementById("resultName").textContent =
            student.name;
        document.getElementById("resultRegNo").textContent =
            student.regNo;
        document.getElementById("resultTotal").textContent =
            student.total;
        document.getElementById("resultPercentage").textContent =
            student.percentage + "%";
        document.getElementById("resultGrade").textContent =
            student.grade;
        document.getElementById("resultGPA").textContent =
            student.gpa;
    } else {
        alert("Student Not Found!");
    }
}
function deleteStudent(regNo) {
    students = students.filter(
        student => student.regNo !== regNo
    );
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
    displayStudents();
    alert("Student Deleted Successfully!");
}
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(
        "Student Result Management System",
        20,
        20
    );
    doc.setFontSize(12);
    doc.text(
        "Name: " +
        document.getElementById("resultName").textContent,
        20,
        40
    );
    doc.text(
        "Register No: " +
        document.getElementById("resultRegNo").textContent,
        20,
        50
    );
    doc.text(
        "Total Marks: " +
        document.getElementById("resultTotal").textContent,
        20,
        60
    );
    doc.text(
        "Percentage: " +
        document.getElementById("resultPercentage").textContent,
        20,
        70
    );
    doc.text(
        "Grade: " +
        document.getElementById("resultGrade").textContent,
        20,
        80
    );
    doc.text(
        "GPA: " +
        document.getElementById("resultGPA").textContent,
        20,
        90
    );
    doc.save("Student_Result.pdf");
}
