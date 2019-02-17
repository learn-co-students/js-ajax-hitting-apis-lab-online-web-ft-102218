function getRepositories() {
  const req = new XMLHttpRequest();
  const name = document.getElementById('username').value;
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${name}/repos`);
  req.send();
}

function displayRepositories() {
  let repoList = '<ul>';
  const repos = JSON.parse(this.responseText);
  const username = document.getElementById('username').value;

  for (let i = 0; i < repos.length; i++) {
    let name = repos[i].name;
    let url = repos[i].html_url;
    repoList +=
      `<li>${name} - ` +
      `<a href="${url}">Go to repo</a> - ` +
      `<a href="#" data-repository="${name}" data-username="${username}" onclick="getCommits(this)">Display Commits</a>` +
      ' - ' +
      `<a href="#" data-repository="${name}" data-username="${username}" onclick="getBranches(this)">Display Branches</a>` +
      '</li>';
  }
  repoList += '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(element) {
  let repo = element.dataset.repository;
  const username = element.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`);
  req.send();
}

function displayCommits() {
  let commitList = '<ul>';
  const commits = JSON.parse(this.responseText);
  for (let i = 0; i < commits.length; i++) {
    let author = commits[i].author.login;
    let realName = commits[i].commit.author.name;
    let msg = commits[i].commit.message;

    commitList += `<li>${author} - ${realName} - ${msg}</li>`;
  }
  commitList += '</ul>';
  document.getElementById('details').innerHTML = commitList;
}

function getBranches(element) {
  const repo = element.dataset.repository;
  const user = element.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${user}/${repo}/branches`);
  req.send();
}

function displayBranches() {
  let branchList = '<ul>';
  const branches = JSON.parse(this.responseText);
  for (let i = 0; i < branches.length; i++) {
    let bName = branches[i].name;
    branchList += `<li>${bName}</li>`;
  }
  branchList += '</ul>';
  document.getElementById('details').innerHTML = branchList;
}
