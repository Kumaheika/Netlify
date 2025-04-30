// 我的報名功能
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-box input');
    const filterSelect = document.querySelector('.filter-box select');
    const registrationsList = document.querySelector('.registrations-list');
    const noRegistrations = document.querySelector('.no-registrations');

    // 模擬的報名數據
    let registrations = [
        {
            id: 1,
            eventName: '2024台北馬拉松',
            date: '2024-12-15',
            status: 'upcoming'
        },
        {
            id: 2,
            eventName: '2024高雄國際馬拉松',
            date: '2024-11-10',
            status: 'completed'
        },
        {
            id: 3,
            eventName: '2024台中城市路跑',
            date: '2024-10-20',
            status: 'cancelled'
        }
    ];

    // 渲染報名列表
    function renderRegistrations(filteredRegistrations = registrations) {
        if (filteredRegistrations.length === 0) {
            registrationsList.style.display = 'none';
            noRegistrations.style.display = 'block';
            return;
        }

        registrationsList.style.display = 'grid';
        noRegistrations.style.display = 'none';

        registrationsList.innerHTML = filteredRegistrations.map(reg => `
            <div class="registration-card">
                <div class="registration-info">
                    <h3>${reg.eventName}</h3>
                    <p>日期：${reg.date}</p>
                </div>
                <span class="registration-status status-${reg.status}">
                    ${getStatusText(reg.status)}
                </span>
            </div>
        `).join('');
    }

    // 獲取狀態文字
    function getStatusText(status) {
        const statusMap = {
            upcoming: '即將開始',
            completed: '已完成',
            cancelled: '已取消'
        };
        return statusMap[status] || status;
    }

    // 搜索和過濾功能
    function filterRegistrations() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterStatus = filterSelect.value;

        const filtered = registrations.filter(reg => {
            const matchesSearch = reg.eventName.toLowerCase().includes(searchTerm);
            const matchesStatus = filterStatus === 'all' || reg.status === filterStatus;
            return matchesSearch && matchesStatus;
        });

        renderRegistrations(filtered);
    }

    // 事件監聽
    if (searchInput) {
        searchInput.addEventListener('input', filterRegistrations);
    }
    if (filterSelect) {
        filterSelect.addEventListener('change', filterRegistrations);
    }

    // 初始渲染
    if (registrationsList) {
        renderRegistrations();
    }
}); 