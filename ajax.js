const promise = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.npoint.io/5cd2cc5a81af49b9b213", true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject("Internal server error!");
    }
  };

  xhr.onerror = () => {
    reject("Network error!");
  };
  xhr.send();
});

function html(item) {
  return `<div class="testimonial">
    <img src="${item.image}" class="profile-testimonial" />
    <p class="quote">"${item.content}"</p>
    <p class="author">- ${item.author}</p>
    <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
</div>`;
}

async function allTestimonials() {
  let testimonialHTML = ``;
  const testimonialData = await promise;

  testimonialData.forEach((item) => {
    testimonialHTML += html(item);
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML;
}

allTestimonials();

async function filterTestimonials(rating) {
  let testimonialHTML = ``;
  const testimonialData = await promise;

  const testimonialFiltered = testimonialData.filter((item) => {
    return item.rating === rating;
  });

  if (testimonialFiltered.length === 0) {
    testimonialHTML = `<h3> Data not found! </h3>`;
  } else {
    testimonialFiltered.forEach((item) => {
      testimonialHTML += html(item);
    });
  }

  document.getElementById("testimonials").innerHTML = testimonialHTML;
}
