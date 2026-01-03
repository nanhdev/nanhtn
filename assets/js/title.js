var titles = [
  "@",
  "@N",
  "@Na",
  "@Nan",
  "@Nanh",
  "@Nanhd",
  "@Nanhde",
  "@Nanhdev",
  "@Nanhde",
  "@Nanhd",
  "@Nanh",
  "@Nan",
  "@Na",
  "@N"
];

function changeTitle() {
  var index = 0;

  setInterval(function() {
      document.title = titles[index];
      index = (index + 1) % titles.length;
  }, 1000);
}

changeTitle();
