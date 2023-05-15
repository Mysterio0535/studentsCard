// Массив для хранения студентов
let students = [];

// Функция добавления студента
function addStudent(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const middleName = document.getElementById("middleName").value.trim();
  const birthdate = new Date(document.getElementById("birthdate").value);
  const startYear = parseInt(document.getElementById("startYear").value);
  const faculty = document.getElementById("faculty").value.trim();

  // Ошибки при заполнении
  const errors = [];
  if (!firstName) {
    errors.push("Заполните имя");
  }
  if (!lastName) {
    errors.push("заполните фамилию");
  }
  if (!middleName) {
    errors.push("Заполните отчество");
  }
  if (isNaN(birthdate.getTime()) || birthdate < new Date("1900-01-01") || birthdate > new Date()) {
    errors.push("Некоретно введена дата рождения");
  }
  if (startYear < 2000 || startYear > new Date().getFullYear()) {
    errors.push("Дата начала учебы должна быть не раньше 2000");
  }
  if (!faculty) {
    errors.push("Заполните факультет");
  }

  // Если есть ошибки, выводим сообщения
  if (errors.length > 0) {
    const errorContainer = document.getElementById("errorContainer");
    errorContainer.innerHTML = ""; // Очищаем контейнер с ошибками

    errors.forEach(function (error) {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = error;
      errorMessage.classList.add("Ошибка при заполнении");
      errorContainer.appendChild(errorMessage);
    });

    return;
  }

  // Создаем объект студента
  const student = {
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    birthdate: birthdate,
    startYear: startYear,
    faculty: faculty
  };

  // Добавляем студента в массив
  students.push(student);

  // Очищаем поля формы
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("middleName").value = "";
  document.getElementById("birthdate").value = "";
  document.getElementById("startYear").value = "";
  document.getElementById("faculty").value = "";

  // Обновляем таблицу
  renderTable();
}

// Функция отрисовки таблицы
function renderTable() {
  const tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = ""; // Очищаем тело таблицы

  // Если есть студенты, добавляем их в таблицу
  if (students.length > 0) {
    students.forEach(function (student) {
      const fullName = `${student.lastName} ${student.firstName} ${student.middleName}`;
      const birthdateString = formatDate(student.birthdate);
      const age = calculateAge(student.birthdate);
      const studyYears = `${student.startYear}-${student.startYear + 4} (${getCourse(student.startYear + 4)})`;

      const row = document.createElement("tr");
      const fullNameCell = document.createElement("td");
      const facultyCell = document.createElement("td");
      const birthdateCell = document.createElement("td");
      const studyYearsCell = document.createElement("td");

      fullNameCell.textContent = fullName;
      facultyCell.textContent = student.faculty;
      birthdateCell.textContent = `${birthdateString} (${age} лет)`;
      studyYearsCell.textContent = studyYears;

      row.appendChild(fullNameCell);
      row.appendChild(facultyCell);
      row.appendChild(birthdateCell);
      row.appendChild(studyYearsCell);

      tableBody.appendChild(row);
    });
  } else {
    // Если таблица пуста, выводим сообщение
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.setAttribute("colspan", "4");
    emptyCell.textContent = "Панель студентов пуста";
    emptyRow.appendChild(emptyCell);
    tableBody.appendChild(emptyRow);
  }
}

// Функция вычисления возраста на основе даты рождения
function calculateAge(birthdate) {
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthdate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthdate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthdate.getDate())) {
    age--;
  }

  return age;
}

// Функция форматирования даты в формате "dd.mm.yyyy"
function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth()
  const year = date.getFullYear();

  const formattedDate = `${addLeadingZero(day)}.${addLeadingZero(month + 1)}.${year}`;

  return formattedDate;
}

// Функция добавления ведущего нуля к числу, если оно меньше 10
function addLeadingZero(number) {
  return number < 10 ? `0${number}` : number;
}

// Функция определения номера курса на основе года окончания обучения
function getCourse(startYear) {
  const currentYear = new Date().getFullYear();
  const course = currentYear - startYear ;

  if (course < 1) {
    return `${course} курс`;
    
  }
  return "Закончил";
 
}

// Функция сортировки таблицы по указанному индексу столбца
function sortTable(columnIndex) {
  let sortOrder = 1; // Порядок сортировки по умолчанию (по возрастанию)

  const table = document.getElementById("studentTable");
  const tableBody = document.getElementById("studentTableBody");
  const rows = Array.from(tableBody.getElementsByTagName("tr"));

  // Переключение порядка сортировки при повторных нажатиях на заголовок столбца
  if (table.getAttribute("data-sort-by") === columnIndex.toString()) {
    sortOrder = -1;
    rows.reverse();
  } else {
    table.setAttribute("data-sort-by", columnIndex.toString());

    rows.sort(function (rowA, rowB) {
      const cellA = rowA.getElementsByTagName("td")[columnIndex];
      const cellB = rowB.getElementsByTagName("td")[columnIndex];

      const valueA = cellA.textContent.toLowerCase();
      const valueB = cellB.textContent.toLowerCase();

      if (valueA < valueB) {
        return -1 * sortOrder;
      } else if (valueA > valueB) {
        return 1 * sortOrder;
      } else {
        return 0;
      }
    });
  }

  // Удаление существующих строк и добавление отсортированных строк
  tableBody.innerHTML = "";
  rows.forEach(function (row) {
    tableBody.appendChild(row);
  });
}


  renderTable();


// Обработчик события нажатия кнопки "Add Student"
const student= document.getElementById("studentForm");
studentForm.addEventListener("submit", addStudent);
renderTable();
