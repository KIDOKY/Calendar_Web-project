let currentDate = new Date(); // 현재 날짜
let events = JSON.parse(localStorage.getItem("events")) || {}; // 일정 저장 객체
let eventCategories = JSON.parse(localStorage.getItem("eventCategories")) || {}; // 카테고리 저장 객체
let selectedDate = null; // 선택된 날짜

// 달력 렌더링
function renderCalendar() {
  const daysContainer = document.getElementById("days");
  const monthYear = document.getElementById("month-year");
  daysContainer.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  monthYear.textContent = `${year}년 ${month + 1}월`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty");
    daysContainer.appendChild(emptyDiv);
  }

  for (let i = 1; i <= lastDate; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.textContent = i;
    dayDiv.setAttribute("data-day", i);
    dayDiv.addEventListener("click", () => showEventModal(i));

    const dateKey = `${year}-${month + 1}-${i}`;
    if (events[dateKey]) {
      const eventText = document.createElement("span");
      eventText.textContent = "📌";
      eventText.classList.add("event-marker");
      dayDiv.appendChild(eventText);

      const category = eventCategories[dateKey];
      if (category) {
        dayDiv.classList.add(category);
      }
    }

    daysContainer.appendChild(dayDiv);
  }
}

// 이전/다음 달 이동
function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}
function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

// 일정 추가 모달
function showEventModal(day) {
  selectedDate = day;
  document.getElementById("event-modal").style.display = "flex";
}

// 일정 저장
function saveEvent() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const dateKey = `${year}-${month}-${selectedDate}`;
  const title = document.getElementById("event-title").value;
  const category = document.getElementById("category-select").value;

  if (title) {
    events[dateKey] = title;
    eventCategories[dateKey] = category;
    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("eventCategories", JSON.stringify(eventCategories));

    closeModal();
    renderCalendar();
  } else {
    alert("일정 제목을 입력해주세요.");
  }
}

// 모달 닫기
function closeModal() {
  document.getElementById("event-modal").style.display = "none";
}

// 초기 렌더링
renderCalendar();
