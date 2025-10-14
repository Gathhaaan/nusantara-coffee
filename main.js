// Data kopi per wilayah untuk tooltip peta
const coffeeByRegion = {
  sumatra: {
    title: "Sumatra",
    items: ["Gayo (Aceh)", "Lintong (Sumut)", "Mandheling", "Kerinci"],
  },
  java: {
    title: "Jawa",
    items: ["Java Preanger", "Ijen Raung", "Temanggung", "Java Estate"],
  },
  kalimantan: {
    title: "Kalimantan",
    items: ["Kalimantan Specialty", "Sanggau"],
  },
  sulawesi: {
    title: "Sulawesi",
    items: ["Toraja", "Enrekang", "Kalosi"],
  },
  baliNtt: {
    title: "Bali & Nusa Tenggara",
    items: ["Bali Kintamani", "Flores Bajawa", "Lombok"],
  },
  maluku: {
    title: "Maluku",
    items: ["Maluku Islands Specialty"],
  },
  papua: {
    title: "Papua",
    items: ["Wamena", "Amungme"],
  },
}

// Data detail kopi untuk modal showcase
const coffeeDetail = [
  {
    id: "gayo",
    name: "Sumatra Gayo",
    origin: "Aceh, Sumatra",
    image: "images/coffee-beans-sumatra-gayo.jpg",
    desc: "Kopi Gayo terkenal dengan body yang penuh dan aroma rempah yang khas. Proses semi-washed menambah karakter earthy.",
    notes: ["Body penuh", "Aroma rempah", "Earthy", "Aftertaste panjang"],
  },
  {
    id: "lintong",
    name: "Lintong",
    origin: "Sumatra Utara",
    image: "images/coffee-beans-lintong.jpg",
    desc: "Rasa herbal dengan sentuhan cokelat dan rempah. Tekstur lembut dan seimbang.",
    notes: ["Herbal", "Cokelat", "Rempah", "Seimbang"],
  },
  {
    id: "java-preanger",
    name: "Java Preanger",
    origin: "Jawa Barat",
    image: "images/coffee-beans-java-preanger.jpg",
    desc: "Sejak era kolonial dikenal halus dan elegan, acidity rendah dengan nuansa karamel.",
    notes: ["Halus", "Karamel", "Acidity rendah", "Elegan"],
  },
  {
    id: "ijen-raung",
    name: "Ijen Raung",
    origin: "Jawa Timur",
    image: "images/coffee-beans-ijen-raung.jpg",
    desc: "Profil rasa bersih dengan aroma floral dan citrus yang segar dari dataran tinggi Ijen.",
    notes: ["Floral", "Citrus", "Bersih", "Segar"],
  },
  {
    id: "bali-kintamani",
    name: "Bali Kintamani",
    origin: "Bali",
    image: "images/coffee-beans-bali-kintamani.jpg",
    desc: "Terkenal fruity dan clean cup, dengan sentuhan jeruk dan gula aren.",
    notes: ["Fruity", "Clean cup", "Jeruk", "Gula aren"],
  },
  {
    id: "flores-bajawa",
    name: "Flores Bajawa",
    origin: "NTT",
    image: "images/coffee-beans-flores-bajawa.jpg",
    desc: "Rasa cokelat dan karamel berpadu acidity lembut. Tumbuh pada tanah vulkanik.",
    notes: ["Cokelat", "Karamel", "Acidity lembut", "Vulkanik"],
  },
  {
    id: "toraja",
    name: "Toraja",
    origin: "Sulawesi Selatan",
    image: "images/coffee-beans-toraja.jpg",
    desc: "Kompleks dan spicy dengan body medium-full, aftertaste lama.",
    notes: ["Kompleks", "Spicy", "Body medium-full", "Aftertaste lama"],
  },
  {
    id: "papua-wamena",
    name: "Papua Wamena",
    origin: "Papua",
    image: "images/coffee-beans-papua-wamena.jpg",
    desc: "Aroma floral dengan sweetness alami. Ditanam organik di pegunungan.",
    notes: ["Floral", "Sweetness alami", "Organik", "Pegunungan"],
  },
]

function setupYear() {
  const y = document.getElementById("year")
  if (y) y.textContent = new Date().getFullYear()
}

function setupMapTooltips() {
  const wrapper = document.querySelector(".map-wrapper")
  const tooltip = document.getElementById("tooltip")
  if (!wrapper || !tooltip) return

  const show = (btn, regionKey, evt) => {
    const data = coffeeByRegion[regionKey]
    if (!data) return
    tooltip.innerHTML = `
      <h4>${data.title}</h4>
      <ul>${data.items.map((i) => `<li>${i}</li>`).join("")}</ul>
    `
    tooltip.hidden = false

    // Posisi tooltip relatif ke tombol
    const rect = btn.getBoundingClientRect()
    const parent = wrapper.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2 - parent.left
    const topY = rect.top - parent.top
    tooltip.style.left = `${centerX}px`
    tooltip.style.top = `${topY}px`
  }

  const hide = () => {
    tooltip.hidden = true
  }

  wrapper.querySelectorAll(".hotspot").forEach((btn) => {
    const key = btn.getAttribute("data-region")
    btn.addEventListener("mouseenter", (e) => show(btn, key, e))
    btn.addEventListener("focus", (e) => show(btn, key, e))
    btn.addEventListener("mouseleave", hide)
    btn.addEventListener("blur", hide)
    // Untuk mobile: toggle on tap
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      if (tooltip.hidden) {
        show(btn, key, e)
      } else {
        hide()
      }
    })
  })

  // Klik di luar untuk menutup tooltip di mobile
  document.addEventListener("click", () => {
    if (!tooltip.hidden) tooltip.hidden = true
  })
}

function setupShowcaseModal() {
  const modal = document.getElementById("coffee-modal")
  if (!modal) return
  const img = document.getElementById("modal-image")
  const title = document.getElementById("modal-title")
  const origin = document.getElementById("modal-origin")
  const desc = document.getElementById("modal-desc")
  const notes = document.getElementById("modal-notes")

  const fillModal = (c) => {
    img.src = c.image
    img.alt = `Foto ${c.name}`
    title.textContent = c.name
    origin.textContent = `Asal: ${c.origin}`
    desc.textContent = c.desc
    notes.innerHTML = c.notes.map((n) => `<li>${n}</li>`).join("")
  }

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const article = btn.closest("[data-coffee-id]")
      const id = article?.getAttribute("data-coffee-id")
      const item = coffeeDetail.find((x) => x.id === id)
      if (item) {
        fillModal(item)
        modal.showModal()
      }
    })
  })

  // Tutup modal dengan tombol close (form[method=dialog] sudah handle ESC/click backdrop)
  const closeBtn = modal.querySelector(".modal-close")
  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.close())
  }
}

function setupContactForms() {
  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const data = Object.fromEntries(new FormData(form).entries())
      const status = form.querySelector(".form-status")
      // Validasi sederhana
      if (!data.nama || !data.nim || !data.medsos) {
        status.textContent = "Mohon lengkapi semua kolom."
        status.style.color = "#b91c1c"
        return
      }
      status.textContent = "Terkirim! (simulasi, tidak disimpan)"
      status.style.color = "#2F6B3B"
      form.reset()
    })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  setupYear()
  setupMapTooltips()
  setupShowcaseModal()
  setupContactForms()
})

//fungsi untuk slideshow background awal
// main.js (Tambahkan fungsi baru ini)

const SLIDESHOW_IMAGES = [
  "images/backgorund-kopi1.jpg",
  "images/backgorund-kopi2.jpg",
  "images/backgorund-kopi3.jpg",
];

function setupHeroSlideshow() {
  const container = document.getElementById("hero-slideshow");
  if (!container) return;

  // 1. Inisialisasi gambar (jika belum ada di HTML)
  let images = [];
  if (container.children.length === 0) {
    SLIDESHOW_IMAGES.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Background Kopi Nusantara";
      img.classList.add("hero-background-image");
      if (index === 0) {
        img.classList.add("active");
      }
      container.appendChild(img);
      images.push(img);
    });
  } else {
    // Ambil gambar yang sudah ada di HTML
    images = Array.from(container.querySelectorAll(".hero-background-image"));
  }

  if (images.length < 2) return; // Tidak perlu slideshow jika kurang dari 2 gambar

  let currentIndex = 0;

  const nextSlide = () => {
    // Sembunyikan gambar aktif saat ini
    images[currentIndex].classList.remove("active");

    // Hitung indeks gambar berikutnya
    currentIndex = (currentIndex + 1) % images.length;

    // Tampilkan gambar berikutnya
    images[currentIndex].classList.add("active");
  };

  // Mulai slideshow: ganti gambar setiap 4000ms (4 detik)
  setInterval(nextSlide, 4000); 
}

// Panggil fungsi slideshow saat DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  setupYear()
  setupMapTooltips()
  setupShowcaseModal()
  setupContactForms()
  setupHeroSlideshow() // Panggil fungsi baru
})