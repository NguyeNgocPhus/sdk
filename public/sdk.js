const SDK_CSS  = `
    .icon{
        color: red;
    }
`


const runSDK = ({ baseUrl, websiteToken }) => {
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = `${SDK_CSS}`;
    document.head.appendChild(css);

    const bubbleIcon = document.createElement('div');
    bubbleIcon.alt = 'bubble-icon';
    bubbleIcon.className = 'icon';
    bubbleIcon.textContent = "nguyen ngoc pyhu"
    document.body.appendChild(bubbleIcon);
};

window.SDK = {
  run: runSDK,
};
