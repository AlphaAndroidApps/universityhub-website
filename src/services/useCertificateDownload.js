import html2canvas from "html2canvas";

export const downloadCertificatePNG = async (filename = "Certificate") => {
  const element = document.getElementById("certificate");

  const canvas = await html2canvas(element, {
    scale: 4,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
