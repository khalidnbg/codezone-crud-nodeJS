fetch("http://localhost:4001/api/courses")
  .then((res) => {
    res.json();
  })
  .then((data) => {
    console.log(data);
  });
