const quotes = {
  liberty: "That to secure these rights, Governments are instituted among Men.",
  equality: "We hold these truths to be self-evident, that all men are created equal.",
  rights: "Life, Liberty and the pursuit of Happiness.",
  government: "It is the Right of the People to alter or abolish it."
};

function beginSigning() {

  const name = document.getElementById("nameInput").value;

  if (!name) {
    alert("Enter your name");
    return;
  }

  document.getElementById("signatureScene").classList.remove("hidden");

  // show quill properly
  gsap.from("#quill", {
    duration: 1.2,
    opacity: 0,
    x: -50
  });

  // write name cleanly ON LINE (no overlap)
  const sig = document.getElementById("signature");
  sig.textContent = name;

  gsap.fromTo("#signature",
    { opacity: 0 },
    { opacity: 1, duration: 2, delay: 0.8 }
  );
}

function showQuote(type) {
  document.getElementById("quoteBox").textContent = quotes[type];
}
