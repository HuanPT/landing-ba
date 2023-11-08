export const viewTeachers = (projects) => {
  const teachers = document.querySelector("#view-teachers");
  projects.forEach((project, i) => {
    const cardFade = i % 2 === 0 ? "fade-up" : "fade-down";
    const descriptionHTML = project.descriptions
      .map((description) => `<p>${description}</p>`)
      .join("");

    const teacherHTML = `
      <div class="col-6 col-lg-4 col-xl-3 mt-3">
        <div class="h-100" data-aos="${cardFade}" data-aos-duration="400">
          <div class="card__teacher">
            <div class="img__content">
              <span class="overlay"></span>
              <div class="card__image">
                <img src="${project.image}" alt="${project.name}">
              </div>
            </div>
            <div class="card__teacher-content">
              <h2 class="card__name mt-2">Giảng Viên <br /> ${project.name}</h2>
              <div class="card__description my-4">
                <h6 class="text-center"><i class="fa-solid fa-graduation-cap"></i> ${project.position}</h6>
                ${descriptionHTML}
              </div>
            </div>
          </div>
        </div>
      </div>`;

    teachers.innerHTML += teacherHTML;
  });

  return teachers;
};
