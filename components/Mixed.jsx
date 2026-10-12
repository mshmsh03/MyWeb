// A Latin word inside an Arabic or Kurdish sentence (a product name, Excel,
// A4, POS) is set in the Latin face and isolated left to right, the way Name
// in sections.jsx sets a name that stands alone. Text with no Arabic script
// in it is returned as it is. Server and client components both use this.
const WORD = "[A-Za-z][A-Za-z0-9]*(?:[.&+'’-][A-Za-z0-9]+)*";
const LATIN_RUN = new RegExp(`(${WORD}(?: ${WORD})*)`);

export default function Mixed({ children }) {
  if (typeof children !== 'string' || !/[؀-ۿ]/.test(children)) return children;
  // split() with a capturing group puts the matches at the odd indexes.
  return children.split(LATIN_RUN).map((part, i) =>
    i % 2 ? (
      <span key={i} className="ltr-fixed">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
