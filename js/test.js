document.addEventListener("DOMContentLoaded", () => {
  let toc = document.querySelector("#TOC");
  if (!toc) {
    toc = document.createElement("div");
    toc.id = "TOC";
    document.body.prepend(toc);
  }

  let headings = document.querySelectorAll("h2,h3,h4,h5,h6");
  let sectionNumber = [0, 0, 0, 0, 0];

  for (let heading of headings) {
    let level = parseInt(heading.tagName.charAt(1) - 1);
    sectionNumber[level - 1]++;
    for (let i = level; i < sectionNumber.length; i++) {
      sectionNumber[i] = 0;
    }

    let sn = sectionNumber.slice(0, level).join(".");
    let span = document.createElement("span");
    span.className = "TOCSectNum";
    span.textContent = sn;
    heading.prepend(span);
    let a = document.createElement("a");
    a.id = sn;
    heading.before(a);
    a.append(heading);

    let div = document.createElement("div");
    div.classList.add("TOCEntry", `TOCLevel${level}`);
    let anchor = document.createElement("a");
    anchor.href = `#${sn}`;
    anchor.innerHTML = heading.innerHTML; 
    div.append(anchor);
    toc.append(div);
  }
});
