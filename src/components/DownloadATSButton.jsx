export default function PrintResumeButton() {

  const isMobile = () =>
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

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

    // 🚫 Mobile: stop auto-print (prevents "Preparing preview..." freeze)
    if (isMobile()) {
      alert(
        "On mobile, tap the browser menu (⋮ or Share) → Print or Save as PDF."
      );
      return;
    }

    const clonedResume = cloneWithInlineStyles(resume);
    const printWindow = window.open("", "_blank", "width=900,height=1200");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume</title>
          <style>
            @page { size: A4; margin: 0; }

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

            .skill-pill {
              display: inline-block;
              break-inside: avoid;
              page-break-inside: avoid;
              margin: 0 6px 6px 0;
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
