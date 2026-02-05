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

    // 📱 MOBILE → open full-page preview (NO auto-print)
    if (isMobile()) {
      window.location.href = "/print-preview";
      return;
    }

    // 🖥 DESKTOP → auto print
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
