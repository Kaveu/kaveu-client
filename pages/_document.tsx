import { Html, Head, Main, NextScript } from "next/document"
import { CSSProperties } from "react"

export default function Document() {
  /* const light: CSSProperties = {
    backgroundColor: "#d8ff99",
    backgroundImage: `
    radial-gradient(at 78% 26%, hsla(129,63%,65%,1) 0px, transparent 50%),
    radial-gradient(at 65% 64%, hsla(167,65%,77%,1) 0px, transparent 50%),
    radial-gradient(at 99% 53%, hsla(315,84%,78%,1) 0px, transparent 50%),
    radial-gradient(at 0% 7%, hsla(95,66%,63%,1) 0px, transparent 50%),
    radial-gradient(at 78% 26%, hsla(87,97%,65%,1) 0px, transparent 50%)`,
    backgroundAttachment: "fixed",
  } */

  const dark: CSSProperties = {
    backgroundColor: "hsla(180,0%,1%,0.75)",
    backgroundImage: `radial-gradient(at 13% 67%, hsla(318,97%,78%,1) 0px, transparent 50%),
    radial-gradient(at 76% 72%, hsla(183,70%,65%,1) 0px, transparent 50%)`,
    backgroundAttachment: "fixed",
  }

  return (
    <Html lang="en" style={dark}>
      <Head>
        <link rel="stylesheet" href="/static/css/pico.custom.css" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
