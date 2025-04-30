// 活動數據
const events = {
    1: {
        title: '城市晨跑系列 - 台北篇',
        date: '2024/05/15 06:00',
        location: '台北市信義區',
        image: 'images/event1.jpg'
    },
    2: {
        title: '夜跑探險 - 台中篇',
        date: '2024/05/20 19:00',
        location: '台中市西區',
        image: 'images/event2.jpg'
    },
    3: {
        title: '海濱慢跑 - 高雄篇',
        date: '2024/05/25 17:00',
        location: '高雄市鼓山區',
        image: 'images/event3.jpg'
    }
};

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 創建報名記錄卡片
function createRegistrationCard(registration) {
    const event = events[registration.eventId];
    if (!event) return '';

    return `
        <div class="registration-card">
            <img src="${event.image}" alt="${event.title}">
            <div class="registration-info">
                <h3>${event.title}</h3>
                <p class="date"><i class="far fa-calendar-alt"></i> ${event.date}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                <div class="registration-details">
                    <p><strong>報名日期：</strong>${formatDate(registration.registrationDate)}</p>
                    <p><strong>姓名：</strong>${registration.name}</p>
                    <p><strong>電子郵件：</strong>${registration.email}</p>
                    <p><strong>電話：</strong>${registration.phone}</p>
                    <p><strong>T-shirt 尺寸：</strong>${registration.tShirtSize}</p>
                </div>
                <div class="registration-actions">
                    <a href="event-detail.html?id=${registration.eventId}" class="detail-button">查看活動詳情</a>
                    <button class="cancel-button" data-id="${registration.registrationDate}">取消報名</button>
                </div>
            </div>
        </div>
    `;
}

// 顯示報名記錄
function displayRegistrations() {
    const registrationsList = document.getElementById('registrations-list');
    const noRegistrations = document.getElementById('no-registrations');
    
    // 從 localStorage 獲取報名記錄
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    
    if (registrations.length === 0) {
        registrationsList.style.display = 'none';
        noRegistrations.style.display = 'block';
    } else {
        registrationsList.style.display = 'block';
        noRegistrations.style.display = 'none';
        
        // 按報名日期排序（最新的在前）
        registrations.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
        
        // 生成報名記錄卡片
        registrationsList.innerHTML = registrations.map(createRegistrationCard).join('');
        
        // 添加取消報名按鈕的事件監聽器
        document.querySelectorAll('.cancel-button').forEach(button => {
            button.addEventListener('click', handleCancelRegistration);
        });
    }
}

// 處理取消報名
function handleCancelRegistration(event) {
    const registrationDate = event.target.dataset.id;
    if (confirm('確定要取消這個報名嗎？')) {
        // 從 localStorage 中移除該報名記錄
        let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        registrations = registrations.filter(reg => reg.registrationDate !== registrationDate);
        localStorage.setItem('registrations', JSON.stringify(registrations));
        
        // 重新顯示報名記錄
        displayRegistrations();
    }
}

// 頁面加載完成後執行
document.addEventListener('DOMContentLoaded', displayRegistrations); 