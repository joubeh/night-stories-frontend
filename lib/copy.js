export default async function copy(content) {
  if (navigator?.clipboard) {
    try {
      await navigator.clipboard.writeText(content);
      return;
    } catch (err) {
      console.error("Clipboard API failed", err);
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = content;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus({ preventScroll: true });
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Clipboard API failed", err);
  }

  document.body.removeChild(textArea);
}
