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

      // ── Slideshow ──
      const track = document.getElementById("slidesTrack");
      const dots = document.querySelectorAll(".dot");
      let current = 0;
      const total = 3;

      function goTo(n) {
        current = (n + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
      }

      document
        .getElementById("nextBtn")
        .addEventListener("click", () => goTo(current + 1));
      document
        .getElementById("prevBtn")
        .addEventListener("click", () => goTo(current - 1));
      dots.forEach((d) =>
        d.addEventListener("click", () => goTo(+d.dataset.i)),
      );

      // Auto-advance every 5 s
      setInterval(() => goTo(current + 1), 5000);

      // ── Smooth active nav link on scroll ──
      const sections = document.querySelectorAll("section[id]");
      const navAnchors = document.querySelectorAll(
        ".nav-links a:not(.nav-btn)",
      );
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              navAnchors.forEach((a) => {
                a.style.color =
                  a.getAttribute("href") === "#" + e.target.id
                    ? "var(--gold)"
                    : "";
              });
            }
          });
        },
        { threshold: 0.4 },
      );
      sections.forEach((s) => observer.observe(s));