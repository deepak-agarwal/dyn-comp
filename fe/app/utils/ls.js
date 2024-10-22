export function setActiveCompId(newCompId) {
  localStorage.setItem('activeCompId', newCompId);
}

// Getter method to retrieve activeCompId from local storage
export function getActiveCompId() {
  return localStorage.getItem('activeCompId');
}