
const titles = ['t-acc', 't-tool', 't-cay'];
const sections = ['s-acc', 's-tool', 's-cay'];
let current = 1;
function update(index) {
    if (index >= titles.length) index = 0;
    if (index < 0) index = titles.length - 1;
    current = index;
    document.querySelectorAll('.slide').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.getElementById(titles[current]).classList.add('active');
    document.getElementById(sections[current]).classList.add('active');
}
function nextSlide() { update(current + 1); resetTimer(); }
function prevSlide() { update(current - 1); resetTimer(); }
function updateCountdown() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startDate = new Date(year, month, 1, 0, 0, 0);
    const endDate = new Date(year, month, 5, 23, 59, 59);
    const timerElement = document.getElementById('countdown-timer');
    const saleText = document.getElementById('sale-text');
    let diff, message;
    if (now < startDate) {
        diff = startDate - now;
        message = "Sắp diễn ra sau: ";
        if (saleText) saleText.innerText = "SẮP CÓ SALE KHỦNG!"; 
    } else if (now >= startDate && now <= endDate) {
        diff = endDate - now;
        message = "Kết thúc sau: ";
        if (saleText) saleText.innerText = "ĐANG SALE 20% BILL!";
    } else {
        const nextMonthStart = new Date(year, month + 1, 1, 0, 0, 0);
        diff = nextMonthStart - now;
        message = "Đợt Sale tới sau: ";
        if (saleText) saleText.innerText = "HẸN GẶP LẠI ĐỢT SALE TỚI";
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (timerElement) {
        timerElement.innerHTML = `${message} ${days} ngày ${hours}h ${minutes}m ${seconds}s`;
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();
function createSakura() {
    const sakura = document.createElement('div');
    sakura.classList.add('sakura');
    sakura.innerText = '🌸';
    sakura.style.left = Math.random() * 100 + "vw";
    const size = Math.random() * 15 + 7 + "px";
    sakura.style.fontSize = size;
    const fallDuration = Math.random() * 6 + 6 + 6 ;
    sakura.style.animationDuration = fallDuration + "s";
    sakura.style.opacity = Math.random() * 0.5 + 0.1;
    document.body.appendChild(sakura);
    setTimeout(() => {
        sakura.remove();
    }, fallDuration * 1000);
}
setInterval(createSakura, 400);

function closeModal() {
    document.getElementById('announcement-modal').style.display = 'none';
}

window.onclick = function(event) {
    var modal = document.getElementById('announcement-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.opacity = "1";
    } else {
        btn.style.opacity = "0.5";
    }
}
const sliderImages = [
    'genshin impact/1109246.png',
    'genshin impact/1110664.png',
    'genshin impact/1115199.jpg',
    'genshin impact/1125706.png',
    'genshin impact/1116270.jpg',
    'genshin impact/1129503.jpg',
    'genshin impact/1129784.jpg',
    'genshin impact/1130376.jpg',
    'genshin impact/1132527.jpg',
    'genshin impact/1132521.png',
    'genshin impact/1133979.jpg',
    'genshin impact/1134432.jpg',
    'genshin impact/1137387.jpg',
    'genshin impact/1139625.png',
    'genshin impact/1140521.jpg',
    'genshin impact/1140522.png',
    'genshin impact/1141311.jpg',
    'genshin impact/1144654.jpg',
    'genshin impact/1146045.png',
    'genshin impact/1147971.jpg',
    'genshin impact/1147972.jpg',
    'genshin impact/1148532.jpg',
    'genshin impact/1156263.png',
    'genshin impact/1160941.jpg',
    'genshin impact/1161890.jpg',
    'genshin impact/1162753.jpg',
    'genshin impact/1162892.png'
];

let currentIndex = 0;
const bannerElement = document.getElementById('main-banner');

function startLiveshow() 
{
    currentIndex++;
    if (currentIndex >= sliderImages.length) {
        currentIndex = 0;
    }
    bannerElement.src = sliderImages[currentIndex];
}
setInterval(startLiveshow, 3000);
function showMethod(method) {
    // Ẩn/Hiện khung
    document.getElementById('method-card').style.display = method === 'card' ? 'block' : 'none';
    document.getElementById('method-bank').style.display = method === 'bank' ? 'block' : 'none';
    
    // Đổi màu nút
    const btns = document.querySelectorAll('.method-btn');
    btns[0].classList.toggle('active', method === 'card');
    btns[1].classList.toggle('active', method === 'bank');
}

function copyContent() {
    const text = document.getElementById("copyText").innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Đã copy nội dung chuyển khoản!");
    });
}
function updateBankQR() {
    
    const amount = document.getElementById('bank-amount').value;
    const qrImg = document.getElementById('qr-bank-img');
    const displayAmount = document.getElementById('display-amount');
    
    // 1. Lấy nội dung chuyển khoản từ thẻ b (Ví dụ: NAP SAKINA 123)
    const rawDescription = document.getElementById("copyText").innerText;
    
    // 2. Mã hóa nội dung để đưa vào URL (chuyển khoảng trắng thành %20)
    const encodedDescription = encodeURIComponent(rawDescription);

    const bankID = "970422"; // MB Bank
    const accountNo = "6610388694368";
    const template = "compact2";

    // 3. Tạo URL mới với nội dung đã được mã hóa
    const newQRUrl = `https://api.vietqr.io/image/${bankID}-${accountNo}-${template}.jpg?amount=${amount}&addInfo=${encodedDescription}`;
    
    qrImg.src = newQRUrl;
    displayAmount.innerText = parseInt(amount).toLocaleString('vi-VN') + "đ";
    // Thêm vào trong hàm updateBankQR() ở trên
qrImg.style.opacity = "0.01"; 
qrImg.onload = function() {
    qrImg.style.opacity = "1";
};
}
// Tự động tạo mã nội dung nạp tiền khi load trang
window.onload = function() {
    const randomID = Math.floor(1000 + Math.random() * 9000); // Tạo số ngẫu nhiên 4 chữ số
    const copyTextField = document.getElementById("copyText");
    if(copyTextField) {
        copyTextField.innerText = "NAP SAKINA " + randomID;
    }
    // Cập nhật QR lần đầu luôn
    if(document.getElementById('bank-amount')) {
        updateBankQR();
    }
};
// Thêm đoạn này vào cuối file script.js của bạn
window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab === 'register') {
        switchTab('register'); // Hàm switchTab bạn đã tạo ở bước trước
    }
});
// Hàm chuyển đổi Tab (Đã có, bạn kiểm tra xem khớp chưa)
function switchTab(type) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const btns = document.querySelectorAll('.method-btn');

    if (type === 'login') {
        if(loginForm) loginForm.style.display = 'block';
        if(registerForm) registerForm.style.display = 'none';
        btns[0].classList.add('active');
        btns[1].classList.remove('active');
    } else {
        if(loginForm) loginForm.style.display = 'none';
        if(registerForm) registerForm.style.display = 'block';
        btns[0].classList.remove('active');
        btns[1].classList.add('active');
    }
}

// --- ĐOẠN CODE SỬA LỖI KHÔNG ẤN ĐƯỢC ĐĂNG KÝ ---
window.addEventListener('DOMContentLoaded', () => {
    // Lấy thông tin từ link web (URL)
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');

    // Nếu trên link có chữ ?tab=register thì tự gọi hàm hiện form Đăng ký
    if (tab === 'register') {
        switchTab('register');
    }
});