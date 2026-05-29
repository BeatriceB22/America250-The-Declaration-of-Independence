function beginSigning() {

  const name = document.getElementById("nameInput").value;

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  document.getElementById("signatureScene").classList.remove("hidden");

  // quill appears
  gsap.from("#quill", {
    duration: 1,
    opacity: 0,
    x: -40
  });

  // signature reveal
  const sig = document.getElementById("signature");
  sig.textContent = name;

  gsap.fromTo("#signature",
    { opacity: 0 },
    { opacity: 1, duration: 1.5, delay: 0.5 }
  );
}

function showQuote(type) {

  const quotes = {
    liberty: "That to secure these rights, Governments are instituted among Men.",
    equality: "We hold these truths to be self-evident, that all men are created equal.",
    rights: "Life, Liberty and the pursuit of Happiness.",
    government: "It is the Right of the People to alter or abolish it."
  };

  document.getElementById("quoteBox").textContent = quotes[type];
}
