import html2pdf from "html2pdf.js";

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

  const handleDownload = async () => {
    const resume = document.getElementById("resume-print");
    if (!resume) return;

    // MOBILE -> generate PDF directly (no window.print)
    if (isMobile()) {
      const options = {
        margin: 0,
        filename: "Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          onclone: (doc) => {
            const style = doc.createElement("style");
            style.textContent = `
              * { color: #000 !important; background: #fff !important; border-color: #999 !important; }
            `;
            doc.head.appendChild(style);
          }
        },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }
      };

      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      try {
        if (isIOS) {
          const newWindow = window.open("", "_blank");
          const blob = await html2pdf()
            .set(options)
            .from(resume)
            .outputPdf("blob");
          const blobUrl = URL.createObjectURL(blob);
          if (newWindow) {
            newWindow.location = blobUrl;
          } else {
            window.location.href = blobUrl;
          }
          return;
        }

        await html2pdf().set(options).from(resume).save();
      } catch (error) {
        console.error("Mobile PDF download failed:", error);
      }
      return;
    }

    // DESKTOP -> auto print
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
