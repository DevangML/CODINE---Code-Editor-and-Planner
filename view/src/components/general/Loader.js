import React from "react"

function Loader() {
  return (
    <section className="loader">
      <section class="animation-container">
        <section class="lightning-container">
          <div class="lightning white"></div>
          <div class="lightning red"></div>
        </section>
        <section class="boom-container">
          <div class="shape circle big white"></div>
          <div class="shape circle white"></div>
          <div class="shape triangle big yellow"></div>
          <div class="shape disc white"></div>
          <div class="shape triangle blue"></div>
        </section>
        <section class="boom-container second">
          <div class="shape circle big white"></div>
          <div class="shape circle white"></div>
          <div class="shape disc white"></div>
          <div class="shape triangle blue"></div>
        </section>
      </section>

      <section class="footer">
        Implemented with ❤ by{" "}
        <a href="https://mrossignol.fr" target="_blank">
          Maxime Rossignol
        </a>{" "}
        from an original idea by{" "}
        <a href="https://www.uplabs.com/shashanksahay" traget="_blank">
          Shashank Sahay
        </a>
      </section>
    </section>
  )
}

export default Loader
