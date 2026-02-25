document.addEventListener("DOMContentLoaded", () => {
  const schoolRules = [
    "Respect teachers, staff, and fellow students at all times.",
    "Arrive at school on time and attend every class.",
    "Wear full and neat school uniform every day.",
    "Keep the school environment clean and protected.",
    "No bullying, fighting, or abusive language is allowed.",
    "Complete homework and submit assignments on time.",
    "Use school property responsibly and report damages immediately.",
    "Focus on learning and maintain high discipline standards."
  ];

  const typingEl = document.getElementById("typing");
  if (typingEl) {
    let ruleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeRules() {
      const currentRule = schoolRules[ruleIndex];

      if (!deleting) {
        typingEl.textContent = currentRule.slice(0, charIndex + 1);
        charIndex += 1;

        if (charIndex === currentRule.length) {
          deleting = true;
          setTimeout(typeRules, 1300);
          return;
        }
      } else {
        typingEl.textContent = currentRule.slice(0, charIndex - 1);
        charIndex -= 1;

        if (charIndex === 0) {
          deleting = false;
          ruleIndex = (ruleIndex + 1) % schoolRules.length;
        }
      }

      setTimeout(typeRules, deleting ? 35 : 58);
    }

    typeRules();
  }

  const portalForm = document.getElementById("portal-form");
  if (portalForm) {
    portalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const studentId = document.getElementById("student-id")?.value.trim();
      const studentName = document.getElementById("student-name")?.value.trim();
      const output = document.getElementById("portal-result");

      if (!output) return;

      if (!studentId || !studentName) {
        output.textContent = "Please enter both Student ID and Student Name.";
        return;
      }

      output.textContent = `Student ${studentName} (ID: ${studentId}) found. Profile is ready for review.`;
    });
  }

  const printBtn = document.getElementById("print-report");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  const downloadBtn = document.getElementById("download-report");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const reportText = [
        "MLAMKE STUDENT MANAGEMENT SYSTEM",
        "Performance Report",
        "",
        "Amina Juma - Form 3 - 82% - Excellent",
        "Salim Omari - Form 2 - 74% - Good",
        "Neema Ally - Form 4 - 68% - Improving"
      ].join("\n");

      const blob = new Blob([reportText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mlamke-report.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }
});
