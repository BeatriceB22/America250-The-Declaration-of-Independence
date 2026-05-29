/* =========================
   DECLARATION QUOTES
========================= */

const quotes = {

  liberty:
  `"That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed."`,

  equality:
  `"We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights."`,

  rights:
  `"Among these are Life, Liberty and the pursuit of Happiness. That to secure these rights, Governments are instituted among Men."`,

  government:
  `"Whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or abolish it."`
};

/* =========================
   SIGNING SEQUENCE
========================= */

function beginSigning() {

  const name = document.getElementById("nameInput").value;

  if (!name || name.trim() === "") {
    alert("Please enter your full name.");
    return;
  }

  const scene = document.getElementById("signatureScene");
  scene.classList.remove("hidden");

  /* Fade & age the Declaration */
  gsap.to("#declarationImage", {
    duration: 2.2,
    scale: 1.05,
    opacity: 0.25,
    filter: "blur(4px) sepia(0.4)",
    ease: "power2.out"
  });

  /* Split parchment effect (more dramatic) */
  gsap.to("#splitLeft", {
    duration: 2.8,
    x: "-170%",
    rotation: -6,
    ease: "power3.inOut"
  });

  gsap.to("#splitRight", {
    duration: 2.8,
    x: "170%",
    rotation: 6,
    ease: "power3.inOut"
  });

  /* Quill movement (more natural arc) */
  gsap.to("#quill", {
    duration: 3.8,
    left: "72%",
    top: "130px",
    rotation: 10,
    ease: "power2.inOut"
  });

  /* Signature "ink reveal" effect */
  const signature = document.getElementById("signature");
  signature.innerHTML = name;

  // reset first (important for replays)
  gsap.set("#signature", {
    opacity: 1,
    clipPath: "inset(0 100% 0 0)"
  });

  gsap.to("#signature", {
    duration: 3.2,
    delay: 1.2,
    clipPath: "inset(0 0% 0 0)",
    ease: "power1.inOut"
  });
}

/* =========================
   QUOTE DISPLAY
========================= */

function showQuote(type) {

  const box = document.getElementById("quoteBox");

  gsap.fromTo(box,
    { opacity: 0.3 },
    { opacity: 1, duration: 0.4 }
  );

  box.innerHTML = quotes[type] || "";
}

/* =========================
   CERTIFICATE DOWNLOAD
========================= */

async function downloadCertificate() {

  const { jsPDF } = window.jspdf;

  const name = document.getElementById("nameInput").value || "Participant";

  /* Create certificate container */
  const certificate = document.createElement("div");

  certificate.style.width = "1200px";
  certificate.style.height = "850px";
  certificate.style.padding = "100px";
  certificate.style.boxSizing = "border-box";

  certificate.style.background =
    "linear-gradient(rgba(255,248,220,.96), rgba(255,248,220,.96)), url('https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop')";
  certificate.style.backgroundSize = "cover";

  certificate.style.fontFamily = "Georgia, serif";
  certificate.style.color = "#2b1d0e";

  certificate.innerHTML = `
    <div style="
      border:14px solid #7a5531;
      height:100%;
      padding:70px;
      text-align:center;
      box-sizing:border-box;
      box-shadow: inset 0 0 40px rgba(0,0,0,.2);
    ">

      <h1 style="
        font-size:64px;
        margin-bottom:40px;
        font-family:'Cormorant Garamond', serif;
        letter-spacing:1px;
      ">
        Certificate of Civic Participation
      </h1>

      <p style="font-size:28px;">
        This certifies that
      </p>

      <div style="
        font-size:100px;
        margin:40px 0;
        font-family:'Tangerine', cursive;
      ">
        ${name}
      </div>

      <p style="
        font-size:28px;
        line-height:1.8;
        max-width:900px;
        margin:0 auto;
      ">
        has affirmed the enduring principles of liberty,
        equality, and self-government inspired by the
        Declaration of Independence and the founding ideals
        of the United States.
      </p>

      <div style="
        margin-top:80px;
        font-size:20px;
        letter-spacing:4px;
        opacity:0.8;
      ">
        1776 • LIBERTY • EQUALITY • SELF-GOVERNMENT
      </div>

      <div style="
        margin-top:80px;
        font-size:34px;
        opacity:0.6;
      ">
        ✦
      </div>

    </div>
  `;

  document.body.appendChild(certificate);

  const canvas = await html2canvas(certificate, {
    scale: 2
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("landscape");

  pdf.addImage(imgData, "PNG", 0, 0, 297, 210);

  pdf.save("Declaration_Certificate.pdf");

  document.body.removeChild(certificate);
}
