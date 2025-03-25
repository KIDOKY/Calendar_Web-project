let currentDate = new Date(); // 현재 날짜
let events = JSON.parse(localStorage.getItem("events")) || {}; // 일정 저장 객체 (localStorage에서 불러오기)
let eventCategories = JSON.parse(localStorage.getItem("eventCategories")) || {}; // 카테고리 저장 객체 (localStorage에서 불러오기)
let selectedDate = null; // 선택된 날짜 저장

// 달력 렌더링
function renderCalendar() {
  const daysContainer = document.getElementById("days");
  const monthYear = document.getElementById("month-year");
  daysContainer.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  monthYear.textContent = `${year}년 ${month + 1}월`; // 연도와 월 표시

  const firstDay = new Date(year, month, 1).getDay(); // 해당 월의 첫 번째 날
  const lastDate = new Date(year, month + 1, 0).getDate(); // 해당 월의 마지막 날

  // 빈 칸 추가 (달력의 첫 번째 날짜 전까지의 공백)
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty");
    daysContainer.appendChild(emptyDiv);
  }

  // 각 날짜를 생성하여 달력에 추가
  for (let i = 1; i <= lastDate; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.textContent = i;
    dayDiv.setAttribute("data-day", i);
    dayDiv.addEventListener("click", () => showEventModal(i)); // 날짜 클릭 시 일정 추가 모달 열기

    const dateKey = `${year}-${month + 1}-${i}`; // 날짜 키 생성
    if (events[dateKey]) {
      const eventText = document.createElement("span");
      eventText.textContent = "📌";
      eventText.classList.add("event-marker");
      dayDiv.appendChild(eventText);

      // 카테고리별 색상 적용
      const category = eventCategories[dateKey];
      if (category) {
        dayDiv.classList.add(category);
      }
    }

    daysContainer.appendChild(dayDiv); // 날짜를 달력에 추가
  }
}

// 이전 달로 이동
function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

// 다음 달로 이동
function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

// 일정 추가 폼 열기
function showEventModal(day) {
  selectedDate = day;
  document.getElementById("event-modal").style.display = "flex"; // 모달 열기
}

// 일정 저장
function saveEvent() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const dateKey = `${year}-${month}-${selectedDate}`;
  const title = document.getElementById("event-title").value;
  const category = document.getElementById("category-select").value;

  if (title) {
    events[dateKey] = title; // 일정 제목 저장
    eventCategories[dateKey] = category; // 카테고리 저장
    localStorage.setItem("events", JSON.stringify(events)); // localStorage에 저장
    localStorage.setItem("eventCategories", JSON.stringify(eventCategories)); // 카테고리 정보도 저장

    document.getElementById("event-modal").style.display = "none"; // 모달 닫기
    renderCalendar(); // 달력 새로고침
  } else {
    alert("일정 제목을 입력해주세요.");
  }
}

// 모달 닫기
function closeModal() {
  document.getElementById("event-modal").style.display = "none";
  document.getElementById("event-title").value = ""; // 입력 필드 초기화
  document.getElementById("category-select").value = "work"; // 카테고리 기본값 초기화
}

// 초기 달력 렌더링
renderCalendar();
