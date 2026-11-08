async function getIssuesData() {
  const localData = localStorage.getItem('campus_fix_issues');
  if (localData) {
    return JSON.parse(localData);
  }

  try {
    const response = await fetch('data/issues.json');
    if (!response.ok) throw new Error('ดึงข้อมูลไม่สำเร็จ');
    const data = await response.json();
    localStorage.setItem('campus_fix_issues', JSON.stringify(data.issues));
    return data.issues;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function getStatusClass(status) {
  if (status === 'รอดำเนินการ') return 'status-pending';
  if (status === 'กำลังซ่อม') return 'status-progress';
  if (status === 'เสร็จสิ้น') return 'status-done';
  return '';
}

async function loadAndRenderIssues() {
  const issues = await getIssuesData();
  const container = document.getElementById('issue-list') || document.getElementById('issues-list') || document.querySelector('.grid-container');
  if (!container) return;

  container.innerHTML = issues.map(issue => {
    const imageBtnHtml = issue.imageUrl 
      ? `<button type="button" class="btn-view-image" data-img="${encodeURIComponent(issue.imageUrl)}" data-title="${issue.category}">📷 ดูรูปภาพประกอบ</button>` 
      : '';

    return `
      <article class="card">
        <h3>${issue.category || 'แจ้งปัญหา'}</h3>
        <p><strong>สถานที่:</strong> ${issue.building} ${issue.room || ''}</p>
        <p><strong>รายละเอียด:</strong> ${issue.detail}</p>
        <p><strong>สถานะ:</strong> <span class="status-tag ${getStatusClass(issue.status)}">${issue.status}</span></p>
        ${imageBtnHtml}
      </article>
    `;
  }).join('');

  document.querySelectorAll('.btn-view-image').forEach(button => {
    button.addEventListener('click', function() {
      const imgSrc = decodeURIComponent(this.getAttribute('data-img'));
      const imgTitle = this.getAttribute('data-title');
      openImageModal(imgSrc, imgTitle);
    });
  });
}

function openImageModal(src, title) {
  let modal = document.getElementById('imageModal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h4 id="modalTitle" style="margin-bottom: 10px; font-size: 1.1rem;"></h4>
        <img id="modalImg" src="" alt="ภาพประกอบปัญหา" style="max-width: 100%; max-height: 70vh; border-radius: 4px; object-fit: contain;">
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalImg').src = src;
  modal.classList.add('active');
}

document.addEventListener('DOMContentLoaded', loadAndRenderIssues);