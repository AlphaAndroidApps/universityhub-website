export default function PrintResumeButton() {

  // 🔥 Helper: clone node with computed styles (KEY PART)
  const cloneWithInlineStyles = (node) => {
    const clone = node.cloneNode(true);

    const originalElements = node.querySelectorAll("*");
    const clonedElements = clone.querySelectorAll("*");

    originalElements.forEach((el, index) => {
      const computed = window.getComputedStyle(el);
      let style = "";

      for (let i = 0; i < computed.length; i++) {
        const prop = computed[i];
        style += `${prop}:${computed.getPropertyValue(prop)};`;
      }

      clonedElements[index].setAttribute("style", style);
    });

    return clone;
  };

  const handleDownload = () => {
    const resume = document.getElementById("resume-print");
    if (!resume) return;

    // Clone with exact on-screen styles
    const clonedResume = cloneWithInlineStyles(resume);

    const printWindow = window.open("", "_blank", "width=900,height=1200");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume</title>

          <!-- Page setup -->
         <style>
  @page {
    size: A4;
    margin: 0;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: white;
  }

  #resume {
    width: 794px;
    margin: 0 auto;
    box-sizing: border-box;
    height: auto;
    overflow: visible;
  }

  /* Skills fix */
  .skills-container {
    break-inside: avoid-page;
    page-break-inside: avoid;
  }

  .skill-pill {
    display: inline-block !important;
    break-inside: avoid;
    page-break-inside: avoid;
    margin: 0 0.375rem 0.375rem 0;  /* ≈ gap-3 / 4 */
  }

  /* Optional: force no split even if desperate */
  .skills-container > * {
    break-inside: avoid;
  }
</style>
        </head>

        <body>
          <div id="resume">
            ${clonedResume.innerHTML}
          </div>

          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
    >
      Download Resume
    </button>
  );
}
