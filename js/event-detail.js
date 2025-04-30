// 活動數據
const events = {
    1: {
        title: '城市晨跑系列 - 台北篇',
        date: '2024/05/15 06:00',
        location: '台北市信義區',
        description: '清晨的台北，讓我們一起探索城市的寧靜與活力。這是一場結合運動與城市探索的慢跑活動，我們將帶領您穿越台北市信義區的街頭巷尾，發現城市的美好。',
        image: 'images/event1.jpg',
        routeMap: 'images/route-map.jpg',
        maxParticipants: 100,
        currentParticipants: 45
    },
    2: {
        title: '夜跑探險 - 台中篇',
        date: '2024/05/20 19:00',
        location: '台中市西區',
        description: '夜晚的城市，別有一番風味，讓我們一起感受夜跑的樂趣。在台中的夜色中，探索城市的另一面。',
        image: 'images/event2.jpg',
        routeMap: 'images/route-map-2.jpg',
        maxParticipants: 80,
        currentParticipants: 32
    },
    3: {
        title: '海濱慢跑 - 高雄篇',
        date: '2024/05/25 17:00',
        location: '高雄市鼓山區',
        description: '沿著海濱，感受海風的輕撫，享受慢跑的愜意時光。在高雄的海岸線上，體驗不一樣的跑步樂趣。',
        image: 'images/event3.jpg',
        routeMap: 'images/route-map-3.jpg',
        maxParticipants: 120,
        currentParticipants: 78
    }
};

// 從 URL 獲取活動 ID
function getEventId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// 更新活動詳情
function updateEventDetails() {
    const eventId = getEventId();
    const event = events[eventId];

    if (!event) {
        window.location.href = 'index.html';
        return;
    }

    // 更新頁面標題
    document.title = `${event.title} - 城市探索者`;

    // 更新活動圖片
    document.querySelector('.event-image').src = event.image;

    // 更新活動標題
    document.getElementById('event-title').textContent = event.title;

    // 更新活動日期
    document.getElementById('event-date').textContent = event.date;

    // 更新活動地點
    document.getElementById('event-location').textContent = event.location;

    // 更新參與人數
    document.getElementById('event-participants').textContent = 
        `已報名: ${event.currentParticipants}/${event.maxParticipants}`;

    // 更新活動描述
    document.getElementById('event-description').textContent = event.description;

    // 更新路線圖
    document.querySelector('.route-map img').src = event.routeMap;
}

// 處理表單提交
function handleFormSubmit(event) {
    event.preventDefault();

    // 獲取表單數據
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        emergencyContact: document.getElementById('emergency-contact').value,
        emergencyPhone: document.getElementById('emergency-phone').value,
        tShirtSize: document.getElementById('t-shirt-size').value,
        eventId: getEventId()
    };

    // 保存報名記錄到 localStorage
    saveRegistration(formData);

    // 顯示成功消息
    alert('報名成功！我們已將報名確認信發送到您的電子郵箱。');

    // 重置表單
    event.target.reset();
}

// 保存報名記錄
function saveRegistration(formData) {
    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.push({
        ...formData,
        registrationDate: new Date().toISOString()
    });
    localStorage.setItem('registrations', JSON.stringify(registrations));
}

// 頁面加載完成後執行
document.addEventListener('DOMContentLoaded', () => {
    // 更新活動詳情
    updateEventDetails();

    // 添加表單提交事件監聽器
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleFormSubmit);
    }

    // 報名按鈕點擊事件
    const registerButton = document.querySelector('.register-button');
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            alert('報名功能即將上線！');
        });
    }
}); 