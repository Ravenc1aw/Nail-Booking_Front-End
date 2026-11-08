// ── Hamburger menu ──
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close menu when a link is tapped
navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ── Nav scroll effect ──
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a:not(.nav-btn)");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + e.target.id
          );
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach((s) => observer.observe(s));

// ── Booking: time slots follow opening hours ──
// Mon–Sat 10am–8pm, Sun 11am–6pm (last appointment starts one hour before closing)
const bookDate = document.getElementById("bookDate");
const bookTime = document.getElementById("bookTime");

function formatHour(h) {
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${suffix}`;
}

function buildTimeOptions() {
  const isSunday =
    bookDate.value && new Date(bookDate.value + "T00:00:00").getDay() === 0;
  const first = isSunday ? 11 : 10;
  const last = isSunday ? 17 : 19;
  const previous = bookTime.value;

  bookTime.innerHTML = '<option value="">Select a time</option>';
  for (let h = first; h <= last; h++) {
    const opt = document.createElement("option");
    opt.textContent = formatHour(h);
    bookTime.appendChild(opt);
  }
  // keep the earlier choice if it is still available
  if ([...bookTime.options].some((o) => o.value === previous)) {
    bookTime.value = previous;
  }
}

// Block past dates
const today = new Date();
bookDate.min = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-");

bookDate.addEventListener("change", buildTimeOptions);
buildTimeOptions();

// ── WhatsApp Booking ──
// Country code + number, digits only (no "+", spaces or dashes)
const WHATSAPP_NUMBER = "254729696006";

document.getElementById("bookBtn").addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const date = bookDate.value;
  const time = bookTime.value;
  const notes = document.getElementById("notes").value.trim();

  // Basic validation
  if (!firstName || !service || !date || !time) {
    alert("Please fill in your name, service, preferred date and time.");
    return;
  }

  const message = `Hello Urban Beauty Spa! I'd like to book an appointment.

Name: ${firstName} ${lastName}
Phone: ${phone || "Not provided"}
Service: ${service}
Date: ${date}
Time: ${time}
Notes: ${notes || "None"}

Please confirm my booking. Thank you!`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
});

// ── Contact form: opens the visitor's email app ──
document.getElementById("sendBtn").addEventListener("click", () => {
  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const subject = document.getElementById("cSubject").value.trim();
  const message = document.getElementById("cMessage").value.trim();

  if (!name || !message) {
    alert("Please add your name and a message.");
    return;
  }

  const body = `${message}\n\n— ${name}${email ? " (" + email + ")" : ""}`;
  window.location.href =
    "mailto:urbanspa@gmail.com?subject=" +
    encodeURIComponent(subject || "Enquiry from website") +
    "&body=" +
    encodeURIComponent(body);
});