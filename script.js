function beginSigning() {

  const name = document.getElementById("nameInput").value;

  if (!name) {
    alert("Please enter your full name.");
    return;
  }

  document.getElementById("signatureScene").classList.remove("hidden");

  gsap.from("#quill", {
    duration: 1,
    opacity: 0,
    x: -50
  });

  const sig = document.getElementById("signature");
  sig.textContent = name;

  gsap.fromTo("#signature",
    { opacity: 0 },
    { opacity: 1, duration: 1.5, delay: 0.4 }
  );
}

function showQuote(type) {

  const quotes = {
    liberty: "“We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights...”",
    equality: "“That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed...”",
    rights: "“Life, Liberty and the pursuit of Happiness.”",
    government: "“Whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or abolish it...”"
  };

  document.getElementById("quoteBox").textContent = quotes[type];
}
