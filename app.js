// ==========================================
// 登录控制逻辑
// ==========================================
const PASSWORD = '123456'; 

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        document.getElementById('loginContainer').style.display = 'none';
    }
}

function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    if (password === PASSWORD) {
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('loginContainer').style.display = 'none';
    } else {
        alert('ACCESS DENIED');
        document.getElementById('passwordInput').value = '';
    }
}

document.getElementById('passwordInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// ==========================================
// 书签数据库
// ==========================================
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [
    { title: '书源', url: 'https://yuedu.miaogongzi.net/gx.html', desc: '喵公子书源' },
    { title: '追剧吧', url: 'https://www.zhuiju.us/', desc: '4k-高清-网盘资源' },
    { title: '图片美化', url: 'https://imgupscaler.ai', desc: '寻找设计灵感' },
    { title: 'ins下载器', url: 'https://saveinta.com/en', desc: 'Down Instagram Video' },
    { title: '无水印下载', url: 'https://dy.kukutool.com/', desc: '无水印解析' },
    { title: 'po18', url: 'https://www.po18dk.com/', desc: '小说网' },
    { title: '零界', url: 'https://xn--koy113e.com/', desc: '' },
    { title: 'seedhub', url: 'https://www.seedhub.cc/', desc: '海量电影资源' },
    { title: 'SmS', url: 'https://h5.star77.shop/profile', desc: '国际验证码' },
    { title: 'Hellotik', url: 'https://www.hellotik.app/zh', desc: '无水印解析工具' },
    { title: '视频下载', url: 'https://snapany.com/zh', desc: '万能视频图片解析下载快速、免费、简单. 从1000+平台保存视频和图片' }
];

// ==========================================
// 智能图片错误处理 (Fallback 生成器)
// ==========================================
window.handleImageError = function(imgElement, fallbackLetter) {
    const parent = imgElement.parentElement;
    imgElement.style.display = 'none'; // 隐藏加载失败的破图
    
    // 生成发光的字母方块代替黑框
    if (!parent.querySelector('.fallback-icon')) {
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'fallback-icon';
        fallbackDiv.textContent = fallbackLetter;
        parent.appendChild(fallbackDiv);
    }
};

// ==========================================
// 渲染书签列表
// ==========================================
function renderBookmarks() {
    const bookmarkGrid = document.querySelector('.bookmark-grid');
    bookmarkGrid.innerHTML = '';

    bookmarks.forEach((bookmark, index) => {
        const url = new URL(bookmark.url);
        const domain = url.hostname;
        const faviconUrl = `${url.protocol}//${domain}/favicon.ico`;
        
        // 取标题第一个字符，当图片挂了的时候用它顶上
        const firstChar = bookmark.title.charAt(0);
        
        // 容器
        const bookmarkContainer = document.createElement('div');
        bookmarkContainer.className = 'bookmark-item';
        // JS 注入递增延迟，实现"多米诺骨牌"加载动画
        bookmarkContainer.style.animationDelay = `${index * 0.05}s`; 
        
        // 卡片
        const bookmarkCard = document.createElement('a');
        bookmarkCard.href = bookmark.url;
        bookmarkCard.target = '_blank';
        bookmarkCard.className = 'bookmark-card';
        bookmarkCard.title = bookmark.desc;
        bookmarkCard.innerHTML = `
            <img src="${faviconUrl}" class="bookmark-favicon" onerror="handleImageError(this, '${firstChar}')">
        `;
        
        // 标题
        const titleElement = document.createElement('div');
        titleElement.className = 'bookmark-title';
        titleElement.textContent = bookmark.title;
        
        // 组装并挂载
        bookmarkContainer.appendChild(bookmarkCard);
        bookmarkContainer.appendChild(titleElement);
        bookmarkGrid.appendChild(bookmarkContainer);
    });
}

// 页面加载完成后初始化执行
window.onload = function() {
    checkLoginStatus();
    renderBookmarks();
};
