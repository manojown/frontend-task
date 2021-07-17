class JobPortalState {
  constructor(jobs = [], totalJob = 0, activePage = 1, itemsCountPerPage = 10) {
    this.jobs = jobs;
    this.SearchJobs = jobs;
    this.searching = false;
    this.totalJob = totalJob;
    this.search = {
      expire: false
    };
    this.activePage = activePage;
    this.itemsCountPerPage = itemsCountPerPage;
  }
}

export { JobPortalState };
