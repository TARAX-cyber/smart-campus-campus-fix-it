document.addEventListener('DOMContentLoaded', function() {
  const trackForm = document.getElementById('track-form');
  const trackResult = document.getElementById('track-result');

  if (!trackForm) return;

  trackForm.addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันไม่ให้หน้าเว็บรีเฟรชตามค่าเริ่มต้นของฟอร์ม

    const searchInput = document.getElementById('search-id');
    const searchId = searchInput ? searchInput.value.trim() : '';

    if (searchId === '') {
      alert('กรุณากรอกเลขที่แจ้งปัญหา เช่น FIX-2026-0001');
      return;
    }

    const localData = localStorage.getItem('campus_fix_issues');
    let issues = [];
    if (localData) {
      issues = JSON.parse(localData);
    } else {
      trackResult.innerHTML = '<p class="error-message">ไม่พบฐานข้อมูลในระบบ กรุณาเข้าหน้าแรกก่อน</p>';
      return;
    }

    const foundIssueIndex = issues.findIndex(item => item.id === searchId);

    if (foundIssueIndex === -1) {
      trackResult.innerHTML = `<p class="error-message" style="text-align: center; margin-top: 20px;">ไม่พบข้อมูลของเลขที่แจ้ง: <strong>${searchId}</strong></p>`;
    } else {
      const foundIssue = issues[foundIssueIndex];
      renderIssueData(foundIssue, foundIssueIndex, issues, trackResult);
    }
  });
});

function renderIssueData(issue, issueIndex, issuesArray, container) {
  const votedHistory = JSON.parse(localStorage.getItem('campus_fix_voted') || '[]');
  
  const hasVoted = votedHistory.includes(issue.id);

  let statusClass = '';
  if (issue.status === 'รอดำเนินการ') statusClass = 'status-pending';
  if (issue.status === 'กำลังซ่อม') statusClass = 'status-progress';
  if (issue.status === 'เสร็จสิ้น') statusClass = 'status-done';

  container.innerHTML = `
    <article class="card" style="margin-top: 24px;">
      <h3 style="margin-bottom: 8px;">ปัญหา: ${issue.category || 'ไม่ระบุ'}</h3>
      <p><strong>เลขที่แจ้ง:</strong> ${issue.id}</p>
      <p><strong>สถานที่:</strong> ${issue.building} ${issue.room || ''}</p>
      <p><strong>ความเร่งด่วน:</strong> ${issue.urgency}</p>
      <p><strong>รายละเอียด:</strong> ${issue.detail}</p>
      <p><strong>สถานะ:</strong> <span class="status-tag ${statusClass}">${issue.status}</span></p>

      <hr class="divider">

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <p style="margin: 0; font-weight: bold;">
          มีคนพบปัญหานี้: 
          <span id="vote-count" style="color: var(--primary-color); font-size: 1.2rem;">${issue.plusone || 0}</span> 
          คน
        </p>
        
        <!-- ปุ่ม +1 ถ้าเคยโหวตแล้วให้ปิดการใช้งาน (disabled) เปลี่ยนสีเป็นสีเทา (secondary-color) -->
        <button type="button" id="btn-plusone" class="btn-primary" ${hasVoted ? 'disabled style="background-color: var(--secondary-color); cursor: not-allowed;"' : ''}>
          ${hasVoted ? 'คุณโหวตแล้ว (+1)' : 'ฉันก็เจอปัญหานี้ (+1)'}
        </button>
      </div>
    </article>
  `;

  const btnPlusOne = document.getElementById('btn-plusone');
  
  if (btnPlusOne && !hasVoted) {
    btnPlusOne.addEventListener('click', function() {
      issue.plusone = (issue.plusone || 0) + 1;
      
      issuesArray[issueIndex] = issue;
      
      localStorage.setItem('campus_fix_issues', JSON.stringify(issuesArray));
      
      votedHistory.push(issue.id);
      localStorage.setItem('campus_fix_voted', JSON.stringify(votedHistory));
      
      document.getElementById('vote-count').innerText = issue.plusone;
      btnPlusOne.innerText = 'คุณโหวตแล้ว (+1)';
      btnPlusOne.disabled = true;
      btnPlusOne.style.backgroundColor = 'var(--secondary-color)';
      btnPlusOne.style.cursor = 'not-allowed';
      
      alert('ขอบคุณที่ร่วมแจ้งปัญหา ข้อมูลถูกบันทึกแล้ว');
    });
  }
}