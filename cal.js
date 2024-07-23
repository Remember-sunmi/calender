// 문서가 완전히 로드된 후 실행 할 코드 지정
document.addEventListener("DOMContentLoaded", function () {
    // HTML 요소들을 변수에 할당
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    // 현재 월을 표시 할 곳
    const currentMonth = document.getElementById('currentMonth');
    // 날짜들을 표시할곳
    const dateBox = document.getElementById('date');

    // 오늘 날짜와 현재 연도, 월, 일을 변수에 저장
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonthIndex = today.getMonth();
    let currentDay = today.getDate();

    // 월 이름을 배열로 저장
    const monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    // 달력을 렌더링하는 함수
    function renderCalendar(month, year) {
        // 현재 월과 연도를 currentMonth 요소에 표시
        currentMonth.textContent = `${monthNames[month]} / ${year}`;
        dateBox.innerHTML = '';

        // 해당 월의 첫 번째 날과 마지막 날의 날짜를 계산
        const firstDay = new Date(year, month, 1).getDay();
        // /반환 값은 0부터 6까지의 정수이며, 각각 일요일(0), 월요일(1), ..., 토요일(6)을 의미
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // 첫 번째 주의 빈 칸을 채움
        for (let i = 0; i < firstDay; i++) {
            dateBox.innerHTML += `<div class="date empty"></div>`;
        }

        // 월의 각 날짜를 칸에 채움
        for (let day = 1; day <= daysInMonth; day++) {
            let dateClass = "date";
            // 오늘 날짜와 일치하는 경우 'today' 클래스를 추가
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dateClass += " today";
            }
            // 요일 확인 후 일요일인 경우 sunday 클래스를 추가
            const dayOfWeek = new Date(year, month, day).getDay();
            if (dayOfWeek === 0) {
                dateClass += " sunday";
            }
            dateBox.innerHTML += `<div class="${dateClass}">${day}</div>`;
        }
    }

    // 이전 달 버튼 클릭 시 이벤트 처리기
    prevBtn.addEventListener("click", function () {
        // 현재 월이 0(1월)일 경우, 이전 달은 11(12월)이며, 연도를 하나 줄임
        if (currentMonthIndex === 0) {
            currentMonthIndex = 11;
            currentYear--;
        } else {
            // 그 외의 경우, 현재 월을 하나 줄임
            currentMonthIndex--;
        }
        // 달력을 다시 렌더링
        renderCalendar(currentMonthIndex, currentYear);
    });

    // 다음 달 버튼 클릭 시 이벤트 처리기
    nextBtn.addEventListener("click", function () {
        // 현재 월이 11(12월)일 경우, 다음 달은 0(1월)이며, 연도를 하나 늘림
        if (currentMonthIndex === 11) {
            currentMonthIndex = 0;
            currentYear++;
        } else {
            // 그 외의 경우, 현재 월을 하나 늘림
            currentMonthIndex++;
        }
        // 달력을 다시 렌더링.
        renderCalendar(currentMonthIndex, currentYear);
    });

    // 초기화 시 현재 달을 기준으로 달력을 렌더링
    renderCalendar(currentMonthIndex, currentYear);
});
