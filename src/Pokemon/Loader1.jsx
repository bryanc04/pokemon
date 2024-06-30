import "./components/Pokemon.css";

const Loader1 = () => {
  return (
    <div class="container" style={{ color: "white" }}>
      <div id="loader">
        <div id="title" class="flex">
          <p class="loading-text">LOADING</p>
          <div class="therefore">∴</div>
          <p class="loading-number">%</p>
        </div>
        <div id="loading-bar-border">
          <div class="loading-bar"></div>
        </div>
        <div id="warning">
          <p>
            <div class="exclamation">!</div>
            &nbsp CAUTION, Do not turn off.
          </p>
          <div id="line-cascates"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader1;
