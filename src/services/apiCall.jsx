// or less ideally
const url =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

// const headers = {
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Origin": "*"
// };

export const getJobs =  () => {
  return fetch(url, {
    method: "Get", // or 'PUT'
  }).then(res => {
    return res.json();
  });
};


