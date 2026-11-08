const STORAGE_KEY_NEW = 'fixit.newIssues';   
const STORAGE_KEY_CHANGES = 'fixit.changes';      
const STORAGE_KEY_STAFF = 'fixit.staff';          

const STATUS_STEPS = ['รอดำเนินการ', 'กำลังซ่อม', 'เสร็จสิ้น'];

function getFromStorage(key, defaultValue) {
  try {
    const text = localStorage.getItem(key);
    if (text === null) {
      return defaultValue;
    }
    return JSON.parse(text);
  } catch (error) {
    return defaultValue;
  }
}

function setToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

async function loadIssueData() {
  const response = await fetch('data/issues.json');
  if (!response.ok) {
    throw new Error('โหลดไฟล์ไม่สำเร็จ');
  }
  const data = await response.json();

  const newIssues = getFromStorage(STORAGE_KEY_NEW, []);
  const changes = getFromStorage(STORAGE_KEY_CHANGES, {});

  const issueData = data.issues.concat(newIssues);

  for (let i = 0; i < issueData.length; i++) {
    const issue = issueData[i];
    const change = changes[issue.id];
    if (change) {
      issue.status = change.status;
      issue.history = change.history;
    }
  }

  return { buildings: data.buildings, issues: issueData };
}

function updateIssueStatus(issue, newStatus) {
  const changes = getFromStorage(STORAGE_KEY_CHANGES, {});

  let history = issue.history;
  if (!history) {
    history = [{ status: issue.status, at: issue.reportedAt }];
  }

  history.push({ status: newStatus, at: new Date().toISOString() });

  changes[issue.id] = { status: newStatus, history: history };

  const ok = setToStorage(STORAGE_KEY_CHANGES, changes);
  if (ok) {
    return history;
  }
  return null;
}